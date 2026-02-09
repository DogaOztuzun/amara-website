/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAILCHIMP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
