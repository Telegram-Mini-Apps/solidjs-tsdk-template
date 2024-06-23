import type { Component } from 'solid-js';

import { DisplayData } from '@/components/DisplayData/DisplayData.js';
import { Link } from '@/components/Link/Link.js';
import { Page } from '@/components/Page/Page.js';
import { getWebApp } from '@/utils/getWebApp.js';

export const ThemeParamsPage: Component = () => {
  return (
    <Page
      title="Theme Params"
      disclaimer={(
        <>
          This page displays current
          {' '}
          <Link href="https://docs.telegram-mini-apps.com/platform/theming">
            theme parameters
          </Link>
          . It is reactive, so, changing theme externally will lead to this page updates.
        </>
      )}
    >
      <DisplayData
        rows={
          Object
            .entries(getWebApp().themeParams)
            .map(([title, value]) => ({ title, value }))
        }
      />
    </Page>
  );
};
