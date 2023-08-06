# Users service
This repo houses anything that is in the User domain for my resume project. This project demonstrates the ability to call back end resources for authorized users, updates a user's information and view other users' with server side pagination. The users list will mask all data that is not the data of the user that called for the users list.

Docker, Typescript, TypeOrm, NestJs, NestJs cache and Auth0 are used in the backend. Getting Auth0 credentials might be a pain to create an account but you have to if you want to just run graphql queries locally.

## Development Setup

1. You will need to create an Auth0 account. @todo will create terraform for this so it's easy for someone.
1. Install git. 
1. Install nvm (node version manager). Install version specified in package.json.
1. Install Docker Desktop
1. Install docker-compose.
1. Copy the '.env.example' file to '.env'. Add variable values.
1. Run docker compose for the 'docker-compose.debug.yml'. docker-compose -f docker-compose.debug.yml up

You know should be able to go to http://localhost:3000/graphql. Port should be the value in your .env.

## Start up explanation.

The docker container for the database will spin up first for development. This will add a new database called users and the additional extensions for the postgres db. Once the docker db has started, the NestJs container will start. This will add any migrations and seed the users database. At this point you will be able to use the service assuming, you have added the env variables correctly. http://localhost:3000

## Future work

This repos still needs a lot of work:
1. Create unit tests.
1. Comments through the code.
1. Add batch file for CI on merge. Use github actions.
1. Add tests to the CI/CD.
1. Add Roles with decorator for users resolver. (auth0 server, admin, basic user)
1. Switch docker-compose.yml to use yarn build and yarn start:prod
1. Decide to use graphl-os or hosted gateway. Both by apollo. Prefer to the hosted gateway
but do not want to spend money on a resume project. look in solutions and modify the authentication
process after to put it on the gateway if that is chosen