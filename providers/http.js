const axios = require('axios');

const API = process.env.API_URI;
const API_KEY = process.env.API_KEY

async function http(url, method = 'get', data, options = {}) {
  const hasBody = ['delete', 'patch', 'post', 'put'].includes(
    method.toLowerCase(),
  );
  let response;

  try {
    response = await axios({
      [hasBody ? 'data' : 'params']: data,
      baseURL: API,
      method,
      url,
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      ...options,
    });
  } catch (error) {
    if (!error.response) {
      throw new Error('NETWORK');
    }

    ({ response } = error);
  }

  return response;
}

['get', 'patch', 'post', 'put'].forEach(method => {
  http[method] = (url, data, configuration) =>
    http(url, method, data, configuration);
});

module.exports = http;
