import {
  apiPrefix,
  apiVersion,
  pingUrl,
  token,
  httpCodes
} from '../config/config.js';

const {
  secret,
  headerName
} = token;

const {
  HTTP_INVALID_TOKEN,
  HTTP_NOT_AUTHORIZED
} = httpCodes;

export default function(req, res, next) {
  const validateToken = token => secret === token;

  // Do not check token if it is a ping method
  if (req.baseUrl === apiPrefix + apiVersion + pingUrl
        || req.baseUrl === apiPrefix + pingUrl) {
    next(); // To move to next middleware
    return;
  }

  const token = (req.body && req.body[headerName]) ||
              (req.query && req.query[headerName]) ||
              req.headers[headerName];

  if (!token) {
    res.status(HTTP_INVALID_TOKEN);
    res.json({
      status: HTTP_INVALID_TOKEN,
      message: 'Invalid Token'
    });
    return;
  }

  try {
    // Authorize the user to see if s/he can access our resources
    if (!validateToken(token)) {
      res.status(HTTP_NOT_AUTHORIZED);
      res.json({
        status: HTTP_NOT_AUTHORIZED,
        message: 'Not Authorized'
      });
      return;
    }

    next(); // To move to next middleware
  } catch (err) {
    next(err); // To move to next error middleware
  }
}
