# Junior Dev Assigment for Maia Raya 

## Running the Code 
This section will explain how to run the code for task 2-5 :


## Task 2 Fibonnacci
To run the fibonnacci program we must enter to folder other_test in terminal 

`cd other_test`

then inside it, we run this code :

`node task2_fibonnacci.js parameter`

you can change the 'parameter' word with an integer which represent how many fibonnacci number you want to print, example : `node task2_fibonnacci.js 13`.


## Task 3 Recursion
To run the Recursion program we must enter to folder other_test in terminal 

`cd other_test`

then inside it, we run this code :

`node task3_recursion.js bilangan pangkat`

you can change the 'bilangan' word with an integer which represent the number, and 'pangkat' word with integer which represent the power of, example : `node task3_recursion.js 2 8`. 


## Task 4 Palindrome
To run the Recursion program we must enter to folder other_test in terminal 

`cd other_test`

then inside it, we run this code :

`node task4_palindrome.js`

the program will show a question to us to write a sentence that we want to check, write the sentences than press enter. it will output true or false based on the sentence we provide.


## Task 5 RESTful API
To run the code we can use either standard npm or docker container,

To run with standard server, first enter to rest_api folder
`cd rest_api` then run the server with `npm start`.

To run with docker we need to enter to rest_api folder too, `cd rest_api`, then run `docker build -t maiarental:1.0 .` wait until the images was build, then we can run the docker images.

for full documentation about using the API can be found in the documentation section below.

### **Documentation for REST API**
Documentation of this API can be seen on :
1. Postman : https://documenter.getpostman.com/view/15024355/Tzsfkjjo
2. Swagger : http://localhost:3000/docs

### **Environment Variable**
This is the detail setting of environmental variable used in the API :

```
MONGO_URI = mongodb://maiaraya:QW0RPNXNcAzfTuxv@glints11-shard-00-00.i3tuf.mongodb.net:27017,glints11-shard-00-01.i3tuf.mongodb.net:27017,glints11-shard-00-02.i3tuf.mongodb.net:27017/user_api_sejuta_cita?ssl=true&replicaSet=atlas-g8iawr-shard-0&authSource=admin&retryWrites=true&w=majority

JWT_SECRET = maiaraya
PORT = 3000
```

*notes : database user valid until 1st September 2021