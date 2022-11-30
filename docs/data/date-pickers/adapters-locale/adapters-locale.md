---
product: date-pickers
title: Date and Time pickers - Localized dates
components: LocalizationProvider
githubLabel: 'component: pickers'
packageName: '@mui/x-date-pickers'
---

# Localized dates

<p class="description">Date and Time Pickers support formats from different locales.</p>

## Getting started

The default locale of MUI is English (United States). If you want to use other locales—follow the instructions below.

:::warning
This page focuses on date format localization.
If you need to translate text inside of a component, check out at the [Translated components](/x/react-date-pickers/localization/) page.
:::

## Set a custom locale

### With `dayjs`

For `dayjs`, import the locale and then pass its name to `LocalizationProvider`:

```tsx
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
  {children}
</LocalizationProvider>;
```

{{"demo": "LocalizationDayjs.js"}}

### With `date-fns`

For `date-fns`, import the locale and pass it to `LocalizationProvider`:

```tsx
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import de from 'date-fns/locale/de';

<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
  {children}
</LocalizationProvider>;
```

{{"demo": "LocalizationDateFns.js"}}

### With `luxon`

For `luxon`, pass the locale name to `LocalizationProvider`:

```tsx
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

<LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
  {children}
</LocalizationProvider>;
```

{{"demo": "LocalizationLuxon.js"}}

### With `moment`

For `moment`, import the locale and then pass its name to `LocalizationProvider`:

```tsx
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/de';

<LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
  {children}
</LocalizationProvider>;
```

{{"demo": "LocalizationMoment.js"}}

:::warning
Some of the `moment` methods do not support scoped locales.
For accurate localization, you will have to manually update the global locale before updating it in `LocalizationProvider`.

```tsx
function App({ children }) {
  const [locale, setLocale] = React.useState('en-us');

  if (moment.locale() !== locale) {
    moment.locale(locale);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
      <Stack>
        <Button onClick={() => setLocale('de')}>Switch to German</Button>
        {children}
      </Stack>
    </LocalizationProvider>
  );
}
```

:::

## 12h/24h format

All the time and datetime components will automatically adjust to the locale's time setting, i.e. the 12-hour or 24-hour format.
You can override the default setting with the `ampm` prop:

{{"demo": "AmPMCustomization.js"}}

## Custom formats

:::warning
The format received by the props described below depends on the date library you are using.
Please refer to each library's documentation for the full format table:

- [Day.js](https://day.js.org/docs/display/format)
- [date-fns](https://date-fns.org/docs/format)
- [Luxon](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)
- [Moment.js](https://momentjs.com/docs/#/displaying/format/)

:::

### Custom field format

The fields have a default format that depends on the picker being used, the views enabled, and the 12h/24h format.

If this default format does not suit you, you can customize it using the `format` prop:

:::info
This prop is available on all fields and pickers.
:::

{{"demo": "CustomFieldFormat.js"}}

### Custom toolbar format

To customize the format used in the toolbar, use the `toolbarFormat` prop of the toolbar slot.

:::info
This prop is available on all pickers.
:::

{{"demo": "CustomToolbarFormat.js"}}

### Custom day of week format

Use use `dayOfWeekFormatter` to customize day names in the calendar header.
This prop takes the short name of the day provided by the date library as an input, and returns it's formatted version.
The default formatter only keeps the first letter and capitalises it.

:::info
This prop is available on all components that render a day calendar, including the Date Calendar as well as all Date Pickers, Date Time Pickers, and Date Range Pickers.
:::

The example bellow adds a dot at the end of each day in the calendar header:

{{"demo": "CustomDayOfWeekFormat.js"}}
