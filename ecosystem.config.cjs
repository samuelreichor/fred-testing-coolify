module.exports = {
  apps: [
    {
      port: '3004',
      name: 'fredmansky-at-fredmansky-www',
      script: './.output/server/index.mjs',
      cwd: '/var/www/frdmsk/htdocs/current/frontend',
      exec_mode: 'fork',
    },
  ],
};
