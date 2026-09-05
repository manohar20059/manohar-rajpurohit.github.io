// Netlify function: GET returns CONTACT_JSON if x-api-key matches CONTACT_API_KEY
exports.handler = async (event) => {
  const key = event.headers['x-api-key'] || event.headers['X-API-KEY'];
  if(!key || key !== process.env.CONTACT_API_KEY) {
    return { statusCode: 403, body: 'Forbidden' };
  }
  const contactJson = process.env.CONTACT_JSON || '{}';
  return { statusCode: 200, body: contactJson, headers: { "Content-Type": "application/json" } };
};
