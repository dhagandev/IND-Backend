const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:8080' : 'deployment server url'

module.exports = server;