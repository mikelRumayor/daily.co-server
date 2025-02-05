const http = require('./http');

const ERRORS = {
  CANCELED: 'CANCELED',
  MALFORMED_CONTENT: 'MALFORMED_CONTENT',
  NETWORK: 'NETWORK',
  NOT_FOUND: 'NOT_FOUND',
  SCHEMA: 'SCHEMA',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  UNKNOWN: 'UNKNOWN',
};

const OPERATION = {
  create: 'create',
  delete: 'delete',
  read: 'read',
  update: 'update',
};

function method(operation) {
  const TO_HTTP_METHOD = {
    create: 'post',
    delete: 'delete',
    read: 'get',
    update: 'put',
  };

  return TO_HTTP_METHOD[operation] || operation;
}

async function rest(resource, operation, content, options = {}) {
  const { data, status } = await http(
    resource,
    method(operation),
    content,
    options,
  );

  if (status === 400) {
    throw new Error(
      (data.error && data.error.message) ||
        data.message ||
        ERRORS.MALFORMED_CONTENT,
    );
  }

  if (status === 401) {
    throw new Error(ERRORS.UNAUTHORIZED);
  }

  if (status === 404) {
    throw new Error(ERRORS.NOT_FOUND);
  }

  if ((status < 200 || status >= 300) && status !== 304) {
    throw new Error(ERRORS.UNKNOWN);
  }

  if (typeof data === 'object' && 'error' in data) {
    throw new Error(data.error || data.message);
  }

  return data;
}

Object.values(OPERATION).forEach(operation => {
  rest[operation] = (resource, content, options) =>
    rest(resource, operation, content, options);
});

module.exports = rest;
