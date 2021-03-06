var http = require('http');
var _ = require('lodash');

var statusHtml = "<html><body>No data available</body></html>";

var url = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(statusHtml);
}).listen (8989, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8181/');

console.log('Load book list');
http.get(url, function(res) {
  var body = '';

  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    console.log('Done with books');

    var bookList = JSON.parse(body).records;

    statusHtml = "<html><body>";
        _.map(bookList, function(d) {
            statusHtml += "<h1>" + d.title + " / " + d.year + "</h1>";
            statusHtml += "<p>" + d.author + "</p>";
        });

    statusHtml += "</body></html>";
  });
  
}).on('error', function(e) {
  console.log('Error: ', e);
});