import { httpCodes } from '../config/config.js';
const { HTTP_SERVER_ERROR } = httpCodes;

export default function(err, req, res) {
  res.sendStatus(HTTP_SERVER_ERROR);
}
