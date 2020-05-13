import { Configuration } from '@apttus/core';
export const environment: Configuration = {
  production: true,
  defaultImageSrc: './assets/images/default.png',
  defaultCountry: 'US',
  defaultLanguage: 'en-US',
  enableErrorLogging: false,
  enableErrorReporting: false,
  enableMultiCurrency: false,
  enableQueryLogs: true,
  enablePerformanceLogs: true,
  defaultCurrency: 'USD',
  bufferTime: 20,
  maxBufferSize: 10,
  disableBuffer: false,
  subqueryLimit: 10,
  disableCache: true,
  encryptResponse: false,
  cartRetryLimit: 20,
  productIdentifier: 'Id',
  type: 'Salesforce',
  debounceTime: 500,
  proxy: 'https://apttus-proxy.herokuapp.com',
  useIndexedDB: false,
  expandDepth: 8,
  hashRouting: true,
  packageNamespace: 'Apttus_WebStore',
  // *** TODO: Replace with Salesforce environment variables ***
  storefront: 'Posteitaliane',
  organizationId: '00DJ0000003HSZL',
  sentryDsn: 'https://6ad10246235742dc89f89b4c3f53f4aa@sentry.io/1230495',
  endpoint: 'https://sandbox-ldvtesting.cs10.force.com/customer'
};
