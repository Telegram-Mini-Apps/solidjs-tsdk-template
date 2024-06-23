import type { WebApp } from '@twa-dev/types';

export function getWebApp(): WebApp {
  return window.Telegram.WebApp;
}