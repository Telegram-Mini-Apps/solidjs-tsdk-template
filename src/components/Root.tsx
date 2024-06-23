import { ErrorBoundary, type Component, Switch, Match } from 'solid-js';

import { App } from '@/components/App.js';
import { TonConnectUIProvider } from '@/tonconnect/TonConnectUIProvider.js';
import { getWebApp } from '@/utils/getWebApp.js';

const Inner: Component = () => {
  if (getWebApp().initDataUnsafe.start_param === 'debug') {
    import('eruda').then((lib) => lib.default.init());
  }

  return (
    <TonConnectUIProvider
      manifestUrl={new URL('tonconnect-manifest.json', window.location.href).toString()}
    >
      <App/>
    </TonConnectUIProvider>
  );
};

export const Root: Component = () => (
  <ErrorBoundary
    fallback={err => {
      console.error('ErrorBoundary handled error:', err);

      return (
        <div>
          <p>ErrorBoundary handled error:</p>
          <blockquote>
            <code>
              <Switch fallback={JSON.stringify(err)}>
                <Match when={typeof err === 'string' ? err : false}>
                  {v => v()}
                </Match>
                <Match when={err instanceof Error ? err.message : false}>
                  {v => v()}
                </Match>
              </Switch>
            </code>
          </blockquote>
        </div>
      );
    }}
  >
    <Inner/>
  </ErrorBoundary>
);
