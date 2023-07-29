# Users service
This repo houses anything that is in the User domain for my resume project. This project demonstrates the ability to call back end resources for authorized users, updates a user's information and view other users' with server side pagination. The users list will mask all data that is not the data of the user that called for the users list.

Docker, Typescript, TypeOrm, NestJs, NestJs cache and Auth0 are used in the backend. Getting Auth0 credentials might be a pain to create an account but you have to if you want to just run graphql queries locally.

## Development Setup

1. You will need to create an Auth0 account. @todo will create terraform for this so it's easy for someone.
2. Install git. 
3. Install nvm (node version manager). Install version specified in package.json.
4. Install Docker Desktop
5. Install docker-compose.
6. Copy the '.env.example' file to '.env'. Add variable values.
7. Run docker compose for the 'docker-compose.debug.yml'. docker-compose -f docker-compose.debug.yml up

## Start up explanation.

The docker container for the database will spin up first for development. This will add a new database called users and the additional extensions for the postgres db. Once the docker db has started, the NestJs container will start. This will add any migrations and seed the users database. At this point you will be able to use the service assuming, you have added the env variables correctly. http://localhost:3000

## Future work

This repos still needs a lot of work:
1. Create unit tests.
2. Comments through the code.
3. Add CI/CD on merge.
4. Add tests to the CI/CD.
