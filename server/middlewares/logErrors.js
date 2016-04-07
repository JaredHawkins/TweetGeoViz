/*eslint no-console:0*/
export default function(err, req, res, next) {
  let { method } = req;

  const {
    url,
    body
  } = req;

  method = method.toUpperCase();

  console.log(`error in -> ${url}`);
  if (method === 'POST' || method === 'PUT') {
    console.log(`with body -> ${JSON.stringify(body)}`);
  }
  console.log(err);
  console.log(err.stack);
  next(err);
}
