# Todo List Application - Seminar DBMS, semester 221 - HCMUT

This application's purpose is to demonstrate how to work with the mongoDB database with the [`mongoose`](https://mongoosejs.com/) library. The frontend is written JavaScript with the React library, while the backend is in Node.js and uses the [`express`](https://expressjs.com/). The application features basic CRUD operations on the MongoDB database.

### Live application

The application is live at <https://todo-list-1yzy.onrender.com>.

### Run this application on your local computer

In order to run this application, you must have [`Node.js`](https://nodejs.org/en/download/) installed on your computer. After cloning (or downloading) the source code, navigate into the [`client`] folder and type [`npm install`] to install the required dependecies. After that, find the file  [`index.js`] inside [`client`] and remove the two marked lines. Then, you can now run the frontend of this application by typing [`npm start`].

In the case of the backend, a [`.env`] file, which contains the environment variables for the project (namely port number, database connection string and other sensitive information), needs to be created to run the backend. Inside this file, you should add the connection string to your database and a port number for the backend to listen on (if not provided, the default port inside [`server.js`] file will be used).

    MONGO_URL = <your MongoDB connection string>
    PORT = 3001

After that, search all files in [`client`] for the variables [`URL`] and change them all to [`http://localhost:<port>/`]. For example, if your backend is listening on port 3001, the [`URL`] should be changed to [`http://localhost:3001/`].

You should now be able to run the backend and connect to the database on your local computer.The process of getting the backend running is identical to that of the frontend after navigating to the [`server`] folder instead of [`client`].