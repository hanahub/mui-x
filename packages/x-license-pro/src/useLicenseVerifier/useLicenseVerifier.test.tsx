import * as React from 'react';
import { expect } from 'chai';
// @ts-ignore Remove once the test utils are typed
import { createRenderer } from '@mui/monorepo/test/utils';
import { useLicenseVerifier, LicenseInfo } from '@mui/x-license-pro';
import { sharedLicenseStatuses } from './useLicenseVerifier';
import { generateReleaseInfo } from '../verifyLicense';

const releaseDate = new Date(3000, 0, 0, 0, 0, 0, 0);
const releaseInfo = generateReleaseInfo(releaseDate);

function TestComponent() {
  useLicenseVerifier('x-date-pickers-pro', releaseInfo);
  return <div />;
}

describe('useLicenseVerifier', () => {
  const { render } = createRenderer();

  describe('error', () => {
    beforeEach(() => {
      Object.keys(sharedLicenseStatuses).forEach((key) => {
        // @ts-ignore
        delete sharedLicenseStatuses[key];
      });
    });

    it('should log the missing license key error only once', () => {
      LicenseInfo.setLicenseKey('');
      expect(() => {
        render(<TestComponent />);
      }).toErrorDev(['MUI: Missing license key']);
    });
  });
});
