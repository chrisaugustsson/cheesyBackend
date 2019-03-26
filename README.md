Cheezy Trade
==============
This is the final project for the course Ramverk2, held by BTH. 

It's a fake trading platform for cheese, where you can register and deposit CD (Cheese Dollars) in order to buy or sell Cheese.

This is the backend that supplies a API for the frontend and also has realtime functionality using websockets.

How to install
-----------------------------
Clone the repo and run NPM install.

The service uses a MongoDB database that is not included in this installation. It won't work unless a MondoDB is set up properly.

Express as framework
-------------------------------
This project utilizes ExpressJS which is a JavaScript framework used with NodeJS. Express offers an open environment where you get to set the structure for your application. This can lead to a well-organized application, or a total disaster. In this case, the structure was already well defined and therefore making Express a good choice since it doesn’t limit the creativity in the decision making.

The structure in this application is well proven and is divided in a certain mapping structure. The structure leads as follows: 
* Config – Contains configuration files
* Helpers – Contains helper functions used across the application
* Middlewares – Contains middleware functions that is used as a middle layer between routs
* Models – Different models that needs to communicate with a database
* Public – Public assets such as photos
* RealTime – Realtime functionality
* Routes – All the routes for the application
* Tests – Contains test files for the application

MongoDB as database
-------------------------------------
This project use MongoDB as the database. MongoDB is a NoSQL type of database and scales very well thanks to the way MongoDB is architected. It’s a non-relational database which can easily add or remove properties in a collection. All the data coming from the database is delivered in a JSON-format which corresponds well with NodeJS and Express. If a SQL type of database would be used for this application, it would need several connection table and different type of Joins due to the rules of many to many relationships I a SQL database. MongoDB however, can have everything stored in a JSON format and only requires one query to fetch all the necessary information served, conveniently, in a JSON format.

SocketIO
------------------------------------
For the real time functionality, this application uses SocketIO. This helps to set up a Websocket environment really easy and reduces development time. It can also be used on both the frontend and the backend, making the connection very smooth.

Authenticaiton
----------------------------
Authentication is this application uses JSONWebtokens. Using JSONWebtokens, makes authentication very convenient. The client logins using a username and password and then gets a web-token. This token is then used in each request made to the server as a proof of authorization. The token comes with an expiration time, making it useless after a certain amount of time. It is also encrypted making it impossible to change, since this would affect the encryption – making the token useless.

A drawback however, would be if the token got in the wrong hands. As long as someone has the token, this person could authenticate towards the server and potentially get access to information he/she shouldn’t. A bonus using web-tokens, is that it can be used between multiple platforms since it is not tied to any session.
