import { Configuration } from '@apttus/core';
export const environment: Configuration = {
  production: false,
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
  maxBufferSize: 100,
  disableBuffer: false,
  subqueryLimit: 10,
  disableCache: false,
  encryptResponse: false,
  cartRetryLimit: 10,
  productIdentifier: 'Id',
  type: 'Salesforce',
  debounceTime: 1000,
  proxy: 'https://apttus-proxy.herokuapp.com',
  useIndexedDB: false,
  skipPricing: true,
  skipRules: false,
  expandDepth: 7,
  hashRouting: false,
  packageNamespace: 'Apttus_WebStore',
  pricingMode: 'turbo',
  // *** TODO: Replace with Salesforce environment variables ***
  storefront: 'E-Commerce',
  organizationId: '00D3I0000008mFM',
  sentryDsn: 'https://6ad10246235742dc89f89b4c3f53f4aa@sentry.io/1230495',
  endpoint: 'https://dc5-cpqqacommunity1.cs123.force.com/ecomm'
};
