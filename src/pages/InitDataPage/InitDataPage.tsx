import { createMemo, Show, type Component } from 'solid-js';
import type { WebAppUser } from '@twa-dev/types';

import { DisplayData, type DisplayDataRow } from '@/components/DisplayData/DisplayData.js';
import { Link } from '@/components/Link/Link.js';
import { Page } from '@/components/Page/Page.js';

import './InitDataPage.css';
import { getWebApp } from '@/utils/getWebApp.js';

// TODO: @twa-dev/sdk is outdated, as well as @twa-dev/types.
interface ExactWebAppUser extends WebAppUser {
  allows_write_to_pm?: boolean;
  added_to_attachment_menu?: boolean;
}

function getUserRows(user: ExactWebAppUser): DisplayDataRow[] {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photo_url },
    { title: 'last_name', value: user.last_name },
    { title: 'first_name', value: user.first_name },
    { title: 'is_bot', value: user.is_bot },
    { title: 'is_premium', value: user.is_premium },
    { title: 'language_code', value: user.language_code },
    { title: 'allows_to_write_to_pm', value: user.allows_write_to_pm },
    { title: 'added_to_attachment_menu', value: user.added_to_attachment_menu },
  ];
}

export const InitDataPage: Component = () => {
  const {
    initData: initDataRaw,
    initDataUnsafe: initData,
  } = getWebApp();

  const initDataRows = createMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initDataRaw
      ? [
        { title: 'raw', value: initDataRaw },
        { title: 'auth_date', value: new Date(initData.auth_date * 1000).toLocaleString() },
        { title: 'auth_date (raw)', value: initData.auth_date },
        { title: 'hash', value: initData.hash },
        { title: 'can_send_after', value: initData.can_send_after },
        { title: 'query_id', value: initData.query_id },
        { title: 'start_param', value: initData.start_param },
        { title: 'chat_type', value: initData.chat_type },
        { title: 'chat_instance', value: initData.chat_instance },
      ]
      : undefined;
  });

  const userRows = createMemo<DisplayDataRow[] | undefined>(() => {
    const { user } = initData;
    return user ? getUserRows(user) : undefined;
  });

  const receiverRows = createMemo<DisplayDataRow[] | undefined>(() => {
    const { receiver } = initData;
    return receiver ? getUserRows(receiver) : undefined;
  });

  const chatRows = createMemo<DisplayDataRow[] | undefined>(() => {
    const { chat } = initData;
    return chat
      ? [
        { title: 'id', value: chat.id.toString() },
        { title: 'title', value: chat.title },
        { title: 'type', value: chat.type },
        { title: 'username', value: chat.username },
        { title: 'photo_url', value: chat.photo_url },
      ]
      : undefined;
  });

  return (
    <Page
      title="Init Data"
      disclaimer={(
        <>
          This page displays application
          {' '}
          <Link href="https://docs.telegram-mini-apps.com/platform/init-data">
            init data
          </Link>
          .
        </>
      )}
    >
      <Show when={initDataRows()} fallback={<i>Application was launched with missing init data</i>}>
        {(rows) => (
          <>
            <div class="init-data-page__section">
              <h2 class="init-data-page__section-title">Init data</h2>
              <DisplayData rows={rows()}/>
            </div>

            <div class="init-data-page__section">
              <h2 class="init-data-page__section-title">User</h2>
              <Show when={userRows()} fallback={<i>User information missing</i>}>
                {(uRows) => <DisplayData rows={uRows()}/>}
              </Show>
            </div>

            <div class="init-data-page__section">
              <h2 class="init-data-page__section-title">Receiver</h2>
              <Show when={receiverRows()} fallback={<i>Receiver information missing</i>}>
                {(rRows) => <DisplayData rows={rRows()}/>}
              </Show>
            </div>

            <div class="init-data-page__section">
              <h2 class="init-data-page__section-title">Chat</h2>
              <Show when={chatRows()} fallback={<i>Chat information missing</i>}>
                {(cRows) => <DisplayData rows={cRows()}/>}
              </Show>
            </div>
          </>
        )}
      </Show>
    </Page>
  );
};
