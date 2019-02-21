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
  - ````yml endpoint: https://us1.prisma.sh/heath-dunlop-37e897/swtor-profiler-api/dev
    datamodel: datamodel.graphql ```
    ````