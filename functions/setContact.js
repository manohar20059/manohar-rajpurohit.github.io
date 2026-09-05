// Netlify function: POST updates CONTACT_JSON (store in environment is persistent per Netlify UI; this example returns success
// NOTE: To persist securely you should use a small server or a third-party KV store; Netlify environment variables cannot be updated from inside the function without using Netlify API and an admin token.
exports.handler = async (event) => {
  const key = event.headers['x-api-key'] || event.headers['X-API-KEY'];
  if(!key || key !== process.env.CONTACT_API_KEY) {
    return { statusCode: 403, body: 'Forbidden' };
  }
  // For demo, we just echo back. To persist, call Netlify API with a management token (not included here).
  return { statusCode: 200, body: JSON.stringify({ ok:true, received: JSON.parse(event.body) }) };
};
