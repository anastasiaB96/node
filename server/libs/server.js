import * as http from 'http';
import app from '../app';

export async function createServer() {
  const server = http.createServer(app.callback());

  server.on('close', () => {});

  return server;
}
