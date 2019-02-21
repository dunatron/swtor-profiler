## Setup

- create `package.json` file with known packages:
  - dependencies : (yarn add or npm install)
    - graphql
    - graphql-cli
    - prisma
    - prisma-binding
    - graphql-yog
  - custom packages:
    - (add here)
- run `yarn` or npm `install` in root directory(server)
- add the `prisma` package to global to run commands(note: add this to server too)
- run `primsa init` in root directory(server) - You will have options of where to deploy.
  - `Demo Server`: will run through a set of options =>
    - choose demo server with the least latency
    - choose a name for your server e.g. "swtor-profiler-api"
    - choose a name for your stage e.g "dev"
    - Note: this will then create two files `prisma.yml` & `datamodel.graphql` which both deserver there own write up below
- `prisma.yml`: when it is firt created through the `prisma init` function it will look like this
  - ```yml endpoint: https://us1.prisma.sh/heath-dunlop-37e897/swtor-profiler-api/dev
    [datamodel: datamodel.graphql](endpoint: https://us1.prisma.sh/heath-dunlop-37e897/swtor-profiler-api/dev
    datamodel: datamodel.graphql)
    ```
- create a `variables.env` file
  - ```
    FRONTEND_URL="http://localhost:7777"
    PRISMA_ENDPOINT="https://us1.prisma.sh/heath-dunlop-37e897/the-trader/dev"
    PRISMA_SECRET="th!sIsYoURDBPa$$WorD"
    APP_SECRET="jwtsecret123"
    STRIPE_SECRET="sk_123youchangethis"
    PORT=4444
    CLOUDINARY_CLOUD_NAME="CLUDINARY_NAME_CHANGE"
    CLOUDINARY_API_KEY="CLUDINARY_API_KEY_CHANGE"
    CLOUDINARY_API_SECRET="CLUDINARY_API_SECRET_CHANGE"
    ```
- You can the change your `prisma.yml` file to use your `variables.env file`
  - ```
    endpoint: ${env:PRISMA_ENDPOINT}
    datamodel: datamodel.graphql
    hooks:
      post-deploy:
        - graphql get-schema -p prisma
    ```
