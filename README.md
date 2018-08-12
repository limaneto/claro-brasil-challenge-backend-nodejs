[![Build Status](https://travis-ci.com/limaneto/claro-brasil-challenge-backend-nodejs.svg?branch=master)](https://travis-ci.com/limaneto/claro-brasil-challenge-backend-nodejs)

Claro Brasil Challenge - Node JS
===================

O objetivo deste desafio é avaliar a competência técnica dos candidatos a desenvolvedor NodeJS na **Claro Brasil**. Será solicitado o desenvolvimento de uma API restful para fazer o Controle de Devices cadastrados no sistema.

## Requirements ##
 - Node 8
 - MongoDB
 
## Running ##
 To get the project up and running, having in mind that you need node and mongodb installed
 on your local machine follow the bellow steps:
  - run ``git clone https://github.com/limaneto/claro-brasil-challenge-backend-nodejs.git``
  - run ``run npm install`` to install the dependencies
  - run ``mongod``
  - run ``mongo``
  - run ``npm start``
  
## Testing ##
  Assuming you already setup the project in the step before just run:
  - ``npm test``
  
  Bear in min this project is hooked with Travis CI and runs tests there in every commint pushed and shows a up to date badge of passing tests.
  <img src="https://docs.google.com/uc?export=download&id=1TsKiC2LvsMhZCVxfFo8t6Ez7590zYgR0" alt="Travis Build"/>
  
## Code Overview ##
  
#### Dependencies ####
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [date-fns](https://date-fns.org/) - For date manipulation
- [dotenv](https://github.com/motdotla/dotenv) - Loads env variables
- [helmet](https://helmetjs.github.io/) - Handles HTTP headers for security purpose

#### Application Structure
- `/components` - contains all the models related services, such as route, validators, controller, and the model itself.
- `/config` - load env variables, start the database, config the outer routes.
- `/utils` - phrases, error constructor, initial users for make test easier since you cannot create users, and a utility file to mimic underscore and lodash.

I decided to use the components architecture because I think improves the code organization, when you are developing new
functionalities you know all the steps you have to take, it is easier to find all the files of the module,
easier to understand the business logic, easier to understand what the project is about, etc.

I decided to separate the validation of the business logic on its own files, that way the controller would not get so
complex.

All the validation errors are just passed to the ``next()`` middleware not passing through the controller,
and to create a unified error message I use the error constructor ``ApiError``. 
  