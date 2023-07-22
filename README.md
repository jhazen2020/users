# Users service
Service that houses the users domain. Anything that is closely related to users' functionality is housed here.

## Development Setup
We are using docker, nestjs, postgres and auth0 credentials to get this fully working. Getting Auth0 credentials might be a pain to create an accout so if you want to just run graphql queries locally, take off the  @UseGuards(GqlAuthGuard) in the resolver. This will by pass the authorization checks.

### Steps for setup:

1. Install git, nvm (node version manager), Docker Desktop, docker-compose.
2. 


