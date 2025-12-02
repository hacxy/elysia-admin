import type { defaultNS } from '../config/i18n';
import type Resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: Resources
  }
}
