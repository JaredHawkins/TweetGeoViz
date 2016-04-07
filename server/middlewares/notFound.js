import { httpCodes } from '../config/config.js';
const { HTTP_NOT_FOUND } = httpCodes;

export default function(req, res) {
  res.sendStatus(HTTP_NOT_FOUND);
}
