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
  - ``git clone https://github.com/limaneto/claro-brasil-challenge-backend-nodejs.git``
  - ``run npm install`` to install the dependencies
  - ``npm start``
  
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
 
  
  