import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { MuiDateSectionName } from '../../models/muiPickersAdapter';
import { useUtils } from '../useUtils';
import { FieldSectionsValueBoundaries, FieldSection } from './useField.types';
import {
  applyMeridiemChange,
  changeSectionValueFormat,
  cleanTrailingZeroInNumericSectionValue,
  doesSectionHaveTrailingZeros,
  getDateSectionConfigFromFormatToken,
  getDateSectionGetterAndSetter,
} from './useField.utils';
import { UpdateSectionValueParams } from './useFieldState';

interface CharacterEditingQuery {
  value: string;
  sectionIndex: number;
  dateSectionName: MuiDateSectionName;
}

interface ApplyCharacterEditingParams {
  keyPressed: string;
  sectionIndex: number;
}

interface UseFieldEditingParams<TDate, TSection extends FieldSection> {
  sections: TSection[];
  updateSectionValue: (params: UpdateSectionValueParams<TDate, TSection>) => void;
}

/**
 * The letter editing and the numeric editing each define a `CharacterEditingApplier`.
 * This function decides what the new section value should be and if the focus should switch to the next section.
 *
 * If it returns `null`, then the section value is not updated and the focus does not move.
 */
type CharacterEditingApplier<TDate, TSection extends FieldSection> = (
  params: ApplyCharacterEditingParams,
  sectionsValueBoundaries: FieldSectionsValueBoundaries<TDate, TSection>,
  activeDate: TDate | null,
) => { sectionValue: string; shouldGoToNextSection: boolean } | null;

/**
 * Function called by `applyQuery` which decides:
 * - what is the new section value ?
 * - should the query used to get this value be stored for the next key press ?
 *
 * If it returns `{ sectionValue: string; shouldGoToNextSection: boolean }`,
 * Then we store the query and update the section with the new value.
 *
 * If it returns `{ saveQuery: true` },
 * Then we store the query and don't update the section.
 *
 * If it returns `{ saveQuery: false },
 * Then we do nothing.
 */
type QueryApplier<TSection extends FieldSection> = (
  queryValue: string,
  activeSection: TSection,
) => { sectionValue: string; shouldGoToNextSection: boolean } | { saveQuery: boolean };

const QUERY_LIFE_DURATION_MS = 5000;

const isQueryResponseWithoutValue = <TSection extends FieldSection>(
  response: ReturnType<QueryApplier<TSection>>,
): response is { saveQuery: boolean } => (response as { saveQuery: boolean }).saveQuery != null;

/**
 * Update the active section value when the user pressed a key that is not a navigation key (arrow key for example).
 * This hook has two main editing behaviors
 *
 * 1. The numeric editing when the user presses a digit
 * 2. The letter editing when the user presses another key
 */
export const useFieldCharacterEditing = <TDate, TSection extends FieldSection>({
  sections,
  updateSectionValue,
}: UseFieldEditingParams<TDate, TSection>) => {
  const utils = useUtils<TDate>();

  const [query, setQuery] = React.useState<CharacterEditingQuery | null>(null);

  React.useEffect(() => {
    if (query != null && sections[query.sectionIndex]?.dateSectionName !== query.dateSectionName) {
      setQuery(null);
    }
  }, [sections, query]);

  React.useEffect(() => {
    if (query != null) {
      const timeout = setTimeout(() => setQuery(null), QUERY_LIFE_DURATION_MS);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    return () => {};
  }, [query]);

  const applyQuery = (
    { keyPressed, sectionIndex }: ApplyCharacterEditingParams,
    getFirstSectionValueMatchingWithQuery: QueryApplier<TSection>,
    isValidQueryValue?: (queryValue: string) => boolean,
  ): ReturnType<CharacterEditingApplier<TDate, TSection>> => {
    const cleanKeyPressed = keyPressed.toLowerCase();
    const activeSection = sections[sectionIndex];

    // The current query targets the section being editing
    // We can try to concatenated value
    if (
      query != null &&
      (!isValidQueryValue || isValidQueryValue(query.value)) &&
      query.sectionIndex === sectionIndex
    ) {
      const concatenatedQueryValue = `${query.value}${cleanKeyPressed}`;

      const queryResponse = getFirstSectionValueMatchingWithQuery(
        concatenatedQueryValue,
        activeSection,
      );
      if (!isQueryResponseWithoutValue(queryResponse)) {
        setQuery({
          sectionIndex,
          value: concatenatedQueryValue,
          dateSectionName: activeSection.dateSectionName,
        });
        return queryResponse;
      }
    }

    const queryResponse = getFirstSectionValueMatchingWithQuery(cleanKeyPressed, activeSection);
    if (isQueryResponseWithoutValue(queryResponse) && !queryResponse.saveQuery) {
      setQuery(null);
      return null;
    }

    setQuery({
      sectionIndex,
      value: cleanKeyPressed,
      dateSectionName: activeSection.dateSectionName,
    });

    if (isQueryResponseWithoutValue(queryResponse)) {
      return null;
    }

    return queryResponse;
  };

  const applyLetterEditing: CharacterEditingApplier<TDate, TSection> = (params) => {
    const getFirstSectionValueMatchingWithQuery: QueryApplier<TSection> = (
      queryValue,
      activeSection,
    ) => {
      switch (activeSection.dateSectionName) {
        case 'month': {
          const getMonthResponse = (format: string): ReturnType<QueryApplier<TSection>> => {
            const matchingMonths = utils
              .getMonthArray(utils.date()!)
              .map((month) => utils.formatByString(month, format!))
              .filter((month) => month.toLowerCase().startsWith(queryValue));

            if (matchingMonths.length === 0) {
              return { saveQuery: false };
            }

            return {
              sectionValue: matchingMonths[0],
              shouldGoToNextSection: matchingMonths.length === 1,
            };
          };

          if (activeSection.contentType === 'letter') {
            return getMonthResponse(activeSection.formatValue);
          }

          // When editing a digit-format month and the user presses a letter,
          // We can support the letter editing by using the letter-format month and re-formatting the result.
          // We just have to make sure that the default month format is a letter format,
          if (
            getDateSectionConfigFromFormatToken(utils, utils.formats.month).contentType === 'letter'
          ) {
            const monthResponse = getMonthResponse(utils.formats.month);
            if (isQueryResponseWithoutValue(monthResponse)) {
              return { saveQuery: false };
            }

            const formattedValue = changeSectionValueFormat(
              utils,
              monthResponse.sectionValue,
              utils.formats.month,
              activeSection.formatValue,
            );

            return {
              ...monthResponse,
              sectionValue: formattedValue,
            };
          }

          return { saveQuery: false };
        }

        case 'meridiem': {
          const now = utils.date()!;
          const sectionValue = [utils.endOfDay(now), utils.startOfDay(now)]
            .map((date) => utils.formatByString(date, activeSection.formatValue))
            .find((meridiem) => meridiem.toLowerCase().startsWith(queryValue));

          if (sectionValue == null) {
            return { saveQuery: false };
          }

          return { sectionValue, shouldGoToNextSection: true };
        }

        default: {
          return { saveQuery: false };
        }
      }
    };

    return applyQuery(params, getFirstSectionValueMatchingWithQuery);
  };

  const applyNumericEditing: CharacterEditingApplier<TDate, TSection> = (
    params,
    sectionsValueBoundaries,
    activeDate,
  ) => {
    const getNewSectionValue = (
      queryValue: string,
      activeSection: TSection,
      hasTrailingZeroes: boolean,
    ): ReturnType<QueryApplier<TSection>> => {
      const queryValueNumber = Number(`${queryValue}`);
      const sectionBoundaries = sectionsValueBoundaries[activeSection.dateSectionName](
        activeDate,
        activeSection,
      );

      if (queryValueNumber > sectionBoundaries.maximum) {
        return { saveQuery: false };
      }

      // If the user types `0` on a month section,
      // It is below the minimum, but we want to store the `0` in the query,
      // So that when he pressed `1`, it will store `01` and move to the next section.
      if (queryValueNumber < sectionBoundaries.minimum) {
        return { saveQuery: true };
      }

      const shouldGoToNextSection =
        Number(`${queryValue}0`) > sectionBoundaries.maximum ||
        queryValue.length === sectionBoundaries.maximum.toString().length;

      // queryValue without trailing `0` (`01` => `1`)
      let newSectionValue = queryValueNumber.toString();
      if (hasTrailingZeroes) {
        newSectionValue = cleanTrailingZeroInNumericSectionValue(
          newSectionValue,
          sectionBoundaries.maximum,
        );
      }

      return { sectionValue: newSectionValue, shouldGoToNextSection };
    };

    const getFirstSectionValueMatchingWithQuery: QueryApplier<TSection> = (
      queryValue,
      activeSection,
    ) => {
      if (activeSection.contentType === 'digit') {
        return getNewSectionValue(queryValue, activeSection, activeSection.hasTrailingZeroes);
      }

      // When editing a letter-format month and the user presses a digit,
      // We can support the numeric editing by using the digit-format month and re-formatting the result.
      if (activeSection.dateSectionName === 'month') {
        const response = getNewSectionValue(
          queryValue,
          activeSection,
          doesSectionHaveTrailingZeros(utils, 'digit', 'MM'),
        );

        if (isQueryResponseWithoutValue(response)) {
          return response;
        }

        const formattedValue = changeSectionValueFormat(
          utils,
          response.sectionValue,
          'MM',
          activeSection.formatValue,
        );
        return {
          ...response,
          sectionValue: formattedValue,
        };
      }

      return { saveQuery: false };
    };

    return applyQuery(
      params,
      getFirstSectionValueMatchingWithQuery,
      (queryValue) => !Number.isNaN(Number(queryValue)),
    );
  };

  return useEventCallback((params: ApplyCharacterEditingParams) => {
    const activeSection = sections[params.sectionIndex];
    const isNumericEditing = !Number.isNaN(Number(params.keyPressed));

    const getNewSectionValue = isNumericEditing ? applyNumericEditing : applyLetterEditing;

    updateSectionValue({
      activeSection,
      setSectionValueOnDate: (activeDate, sectionsValueBoundaries) => {
        const response = getNewSectionValue(params, sectionsValueBoundaries, activeDate);
        if (response == null) {
          return null;
        }

        if (activeSection.dateSectionName === 'meridiem') {
          const newDate = applyMeridiemChange(utils, activeDate, response.sectionValue);

          return {
            date: newDate,
            shouldGoToNextSection: true,
          };
        }

        const { getter, setter } = getDateSectionGetterAndSetter(
          utils,
          activeSection.dateSectionName,
        );

        let newSectionValue: number;
        // We can't parse the day on the current date, otherwise we might try to parse `31` on a 30-days month.
        // So we take for granted that for days, the digit rendered is always 1-indexed, just like the digit stored in the date.
        if (activeSection.contentType === 'digit' && activeSection.dateSectionName === 'day') {
          newSectionValue = Number(response.sectionValue);
        } else {
          // The month is stored as 0-indexed in the date (0 = January, 1 = February, ...).
          // But it is often rendered as 1-indexed in the input (1 = January, 2 = February, ...).
          // This parsing makes sure that we store the digit according to the date index and not the input index.
          const sectionDate = utils.parse(response.sectionValue, activeSection.formatValue)!;
          newSectionValue = getter(sectionDate);
        }

        const newDate = setter(activeDate, newSectionValue);

        return {
          date: newDate,
          shouldGoToNextSection: response.shouldGoToNextSection,
        };
      },
      setSectionValueOnSections: (sectionsValueBoundaries) =>
        getNewSectionValue(params, sectionsValueBoundaries, null),
    });
  });
};
