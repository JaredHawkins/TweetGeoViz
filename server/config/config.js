export const ip = 'localhost';
export const port = 2063;
export const apiPrefix = '/tgvapi';
export const apiVersion = '/v1';
export const pingUrl = '/ping';
export const token = {
  secret: '914AF1EA-7B67-11E5-96EC-563519B61C82',
  headerName: 'x-access-token'
};
export const httpCodes = {
  HTTP_SUCCESS: 200,
  HTTP_CLIENT_ERROR: 400,
  HTTP_INVALID_TOKEN: 401,
  HTTP_NOT_AUTHORIZED: 403,
  HTTP_NOT_FOUND: 404,
  HTTP_SERVER_ERROR: 500
};
export const mongoConfig = {
  server: 'mongodb://127.0.0.1:27017/',
  databaseName: 'twitter',
  collection: 'ControlTweets',
  connectionOptions: {
    server: {
      auto_reconnect: true,
      reconnectTries: 50,
      reconnectInterval: 5000
    }
  }
};
