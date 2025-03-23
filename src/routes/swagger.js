export default [
    {
      method: 'GET',
      path: '/api/docs',
      handler: (request, h) => {
        return h.file('swagger/index.html');
      }
    },
    {
      method: 'GET',
      path: '/swagger/{param*}',
      handler: {
        directory: {
          path: 'swagger',
          listing: false
        }
      }
    }
  ];
  