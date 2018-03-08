var http = require("http");
var url = require("url");

var mysql = require('mysql');
  var con = mysql.createConnection({
    host: 'au-cdbr-sl-syd-01.cleardb.net',
    user: 'b67ad6dd246eb7',
    password: '55292e33',
    database: 'ibmx_ea7fcc09d45813b'
  });


function onRequest(request, response) {

var _url = url.parse(request.url, true);
var pathname = _url.pathname;

if(pathname != "/student")
{
response.writeHead(200, {"Content-Type": "text/html"});
var cont="<html>" +
"<head>" +
"<title>Homepage</title>" +
"</head>" +
"<body>" +
"<center>" +
"<table border=2>" +
"<form method=get action=student >" +
"<h1>Student Detail Form</h1>" +
"<tr>" +
"<td>" +
"Name : </td> <td><input type=text name=t1></td></br>" +
"</tr>" +
"<tr>" +
"<td>" +
"Enrol Id : </td> <td><input type=text name=t2></td></br>" +
"</tr>" +
"<tr>" +
"<td>" +
"Department: </td> <td><input type=text name=t3></td></br>" +
"</tr>" +
"<tr>" +
"<td>" +
"Class: </td> <td><select name=cat><option>CBA</option><option>BDA</option><option>MA</option></select></td></br>" +
"<tr>" +
"<td>" +
"<input type=submit value=submit></td>" +
"</tr>" +
"</form>" +
"</center>" +
"</table>" +
"</body>" +
"</html>";
response.write(cont);

}

if(pathname == "/student")
{
response.writeHead(200, {"Content-Type": "text/html"});

var queryString="insert into student values('"+_url.query['t1']+"','"+_url.query['t2']+"','"+_url.query['cat']+"','"+_url.query['t3']+"')";
con.query(queryString, function(error,data,fields)
{
if(error)
{
throw error;
}
else{

console.log("success");
}
}
)
con.end();

response.write("insertion success");
}
response.end();

}

http.createServer(onRequest).listen(8080);
console.log("Server has started.");