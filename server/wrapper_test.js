var server = require('./server_test');
var server = http.createServer(app);

var boot = function () {
  server.listen6666), function(){
  console.info('Express server listening on port ' + 6666);
  });
}

var shutdown = function() {
  server.close();
}

if (require.main === module) {
  boot();
}
else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = 6666;
}