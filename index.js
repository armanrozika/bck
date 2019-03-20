const Hapi = require('hapi');
require('env2')('.env'); 

console.log(process.env.DATABASE_URL);
const server = new Hapi.Server()

server.connection({
	host: 'localhost',
	port: 3000
})

server.register({ // register all your plugins
  register: require('hapi-postgres-connection') // no options required
}, function (err) {
  if (err) {
    // handle plugin startup error
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    let email = 'name';
    let select = `SELECT * FROM barang`;
    request.pg.client.query(select, function(err, result) {
      console.log(err, result);
      return reply(result.rows);
    })
  }
});


server.start()