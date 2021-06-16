import { Configuration } from '@apttus/core';
export const environment: Configuration = {
  production: true,
  defaultImageSrc: './assets/images/default.png',
  defaultCountry: 'US',
  defaultLanguage: 'en-US',
  enableErrorLogging: false,
  enableErrorReporting: false,
  enableMultiCurrency: false,
  enableQueryLogs: false,
  enablePerformanceLogs: false,
  defaultCurrency: 'USD',
  bufferTime: 10,
  maxBufferSize: 100,
  disableBuffer: false,
  subqueryLimit: 10,
  disableCache: false,
  encryptResponse: false,
  cartRetryLimit: 5,
  productIdentifier: 'Id',
  type: 'Salesforce',
  debounceTime: 1000,
  useIndexedDB: true,
  expandDepth: 8,
  hashRouting: true,
  skipPricing: false,
  skipRules: false,
  apiVersion: '3',
  packageNamespace: 'Apttus_WebStore',
  // Salesforce environment variables
  storefront: 'ECommerce',
  endpoint: null
};
