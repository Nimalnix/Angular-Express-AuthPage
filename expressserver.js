var mysql = require("mysql");
var exp = require("express");
var cors = require("cors");
var app = exp();
app.use(exp.json());
app.use(cors());
var bparser = require("body-parser");
bparserInit = bparser.urlencoded({ extended: false });
mssqlconnection = mysql.createConnection({
  host: "localhost",
  database: "angularassignment",
  user: "root",
  password: "root",
  port: 3306,
});

function checkConnection(error) {
  if (error == undefined) {
    console.log("connected to the database");
  } else {
    console.log("Error code" + error.errno);
    console.log(error.message);
  }
}

function feedback(error) {
  if (error == undefined) {
    console.log(
      "open the browser and visit the url http://localhost:5052/getAllUsers"
    );
  } else {
    console.log(error.errno);
    console.log(error.message);
  }
}

var queryResults = undefined;

function processResults(error, results) {
  queryResults = results;
  console.log(results);
}

function displayAllUsers(request, response) {
  mssqlconnection.connect(checkConnection);
  mssqlconnection.query("select * from signup", processResults);
  response.send(queryResults);
}

function getUserByEmail(request, response) {
  var email = request.query.email;
  mssqlconnection.query(
    "select * from signin where email=?",
    [email],
    processResults
  );
  response.send(queryResults);
}

var statusMessage = "";

function checkInsertStatus(error) {
  if (error == undefined) {
    statusMessage = "<b>Insert successsful</b>";
  } else {
    statusMessage = "<b>Insert failure" + error.message + "</b>";
  }
}

function insertUser(request, response) {
  firstname = request.body.firstname;
  lastname = request.body.lastname;
  email = request.body.email;
  phonenumber = request.body.phonenumber;
  zipcode = request.body.zipcode;
  mssqlconnection.connect(checkConnection);
  mssqlconnection.query(
    "insert into signup values(?,?,?,?,?)",
    [firstname, lastname, email, phonenumber, zipcode],
    checkInsertStatus
  );
  response.send(statusMessage);
}

function updateUser(request, response) {
  firstname = request.body.firstname;
  lastname = request.body.lastname;
  email = request.body.email;
  phonenumber = request.body.phonenumber;
  zipcode = request.body.zipcode;
  var updatedUser = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    phonenumber: phonenumber,
    zipcode: zipcode,
  };

  mssqlconnection.query(
    "update signup set ? where email = ?",
    [updatedUser, email],
    checkInsertStatus
  );
  response.send(statusMessage);
}

function deleteUser(request, response) {
  var email = request.query.email;
  mssqlconnection.query(
    "delete from signup where email = ?",
    [email],
    checkInsertStatus
  );
  response.send(statusMessage);
}

function insertUserCredentials(request, response) {
  email = request.body.email;
  password = request.body.password;
  // mssqlconnection.connect(checkConnection);
  mssqlconnection.query(
    "insert into signin values(?,?)",
    [email, password],
    checkInsertStatus
  );
  response.send(statusMessage);
}

function allcontacts(request, response) {
  mssqlconnection.connect(checkConnection);
  mssqlconnection.query("select * from Contact", processResults);
  response.send(queryResults);
}


function AddContact(request,response) {
  var FirstName = request.body.FirstName;
  var LastName = request.body.LastName;
  var EmailID = request.body.EmailID;
  var PhoneNumber = request.body.PhoneNumber;
  var Address = request.body.Address;

  mssqlconnection.connect(checkConnection);
  mssqlconnection.query("insert into Contact values(?,?,?,?,?)", [
    FirstName,
    LastName,
    EmailID,
    PhoneNumber,
    Address,
  ], processResults);
  response.send(statusMessage);
}

function updatecontact(request, response) {
  var FirstName = request.body.FirstName;
  var LastName = request.body.LastName;
  var EmailID = request.body.EmailID;
  var PhoneNumber = request.body.PhoneNumber;
  var Address = request.body.Address;
  mssqlconnection.connect(checkConnection);
  mssqlconnection.query(
    "update Contact set LastName=?,EmailID=?,PhoneNumber=?,Address=? where FirstName=?",
    [LastName, EmailID, PhoneNumber, Address, FirstName],
    processResults
  );
  response.send(statusMessage);
}


function DeleteContact(request, response) {
  var email = request.body.email;
  mssqlconnection.query(
    "delete from Contact where EmailID = ?",
    [email],
    checkInsertStatus
  );
  response.send(statusMessage);
}
app.get("/allcontact", allcontacts);
app.post("/addcontact", bparserInit, AddContact);
app.post("/updatecontact", bparserInit, updatecontact);
app.delete("/deletecontact", bparserInit, DeleteContact);
app.listen(5051, feedback);
app.get("/getAllUsers", displayAllUsers);
app.get("/getuserbyemail", getUserByEmail);
app.post("/insertuser", bparserInit, insertUser);
app.put("/updateuser", bparserInit, updateUser); // New route for updating a user
app.delete("/deleteuser", deleteUser); // New route for deleting a user
app.post("/insertusercredentials", bparserInit, insertUserCredentials);

mssqlconnection.connect(checkConnection);
