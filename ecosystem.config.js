module.exports = {
  apps : [{
    name: 'node-app',
    cwd: './server',
    script: 'bin/www.js',
    watch: true,
    exec_mode: 'cluster',
    max_restarts: 3,
    env: {
      NODE_CONFIG_DIR: './server/config',
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_CONFIG_DIR: './server/config',
      NODE_ENV: 'production'
    }
  }]
};
