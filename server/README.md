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
  - Tou will also want to update your package.json file to use custom script so you can do things such as deploy your prisma server with a `variables.env` file

  ```
  "scripts": {
    "start": "nodemon -e js,graphql -x node src/index.js",
    "dev": "nodemon -e js,graphql -x node --inspect src/index.js",
    "test": "jest",
    "deploy": "prisma deploy --env-file variables.env",
    "reset": "prisma reset --env-file variables.env"
  },
  ```

- run `yarn` or npm `install` in root directory(server)
- add the `prisma` package to global to run commands(note: add this to server too)
- run `primsa init` in root directory(server) - You will have options of where to deploy.
  - `Demo Server`: will run through a set of options =>
    - choose demo server with the least latency
    - choose a name for your server e.g. "swtor-profiler-api"
    - choose a name for your stage e.g "dev"
    - Note: this will then create two files `prisma.yml` & `datamodel.graphql` which both deserver there own write up below
- `prisma.yml`: when it is first created through the `prisma init` function it will look like this
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
- As we are using `graphql-yoga` it is probably a good time to setup our `.graphqlconfig` file which will help us auto-generate a lot of boilerplate:

  - `.graphqlconfig.yml`

  ```yml
  projects:
  app:
    schemaPath: "src/schema.graphql"
    extensions:
      endpoints:
        default: "http://localhost:4444"
  prisma:
    schemaPath: "src/generated/prisma.graphql"
    extensions:
      prisma: prisma.yml
  ```

- You could then run `yarn deploy` in this server directory which will deploy your api
  - It will create a new folder and file `src/generated/prisma.graphql`
- Note: You will need to do0 the below steps all as 1
- create a `src` directory and `index.js` file for the base of our server to run i.e run `touch src/index.js` in the server root

  - In this file there are three other files that we require to run this. 1 of which we have created.
    - `variables.env`
    - `createServer.js`
    - `db.js`
  - The source file will look like the following:

  ```js
  require("dotenv").config({ path: "./variables.env" })

  const createServer = require("./createServer")
  const db = require("./db")
  const { runAllJobs } = require("./cronjobs")
  const server = createServer()

  const expressLogger = function(req, res, next) {
    console.log("express endpoint called")
    next()
  }

  server.use(expressLogger)
  server.get("/tron-search", function(req, res) {
    var foo = require("../cronjob-files/pages.json")
    res.send(foo)
  })

  server.start(
    {
      cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
      },
    },
    details => {
      console.log(
        `Server is now running on port http:/localhost:${details.port}`
      )
    }
  )
  ```

- `src/createServer.js`

  - current options include `graphql-yoga`, `Apollo-server`
  - This file will take your chosen graphql server as well as your `Mutation`, `Query`, and `Subscription` files
  - Typical file:

  ```js
  const { GraphQLServer } = require("graphql-yoga")
  const Mutation = require("./resolvers/Mutation")
  const Query = require("./resolvers/Query")
  const db = require("./db")

  /** collect our graphql resolvers **/
  const resolvers = {
    Query,
    Mutation,
  }

  /** create the graphql yoga server **/
  function createServer() {
    return new GraphQLServer({
      typeDefs: "src/schema.graphql",
      resolvers: resolvers,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      context: req => ({ ...req, db }),
    })
  }

  module.exports = createServer
  ```

- `src/db.js`

  - This will set up our Prisma server.
  - Useful as its own component/file so we can require it for edge cases to query.
  - Typical file:

  ```js
  // This file connects to the remote prisma DB and gives us the ability to query it with JS
  const { Prisma } = require("prisma-binding")

  const db = new Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: true,
  })

  module.exports = db
  ```

- You will then need to create a `Mutation` and `Query` file to use as our `createServer.js` file need then and is currently missing them.

  - create a resolvers folder
  - `src/Qury.js`:

  ```js
  const { forwardTo } = require("prisma-binding")

  const Query = {
    users: forwardTo("db"),
    user: forwardTo("db"),
  }

  module.exports = Query)
  ```

  - `Mutation.js`:

  ```js
  const { forwardTo } = require("prisma-binding")
  const bcrypt = require("bcryptjs")
  const jwt = require("jsonwebtoken")
  const { hasPermission } = require("../utils")

  const Mutation = {
    async signup(parent, args, ctx, info) {
      // lowercase their email
      args.email = args.email.toLowerCase()
      // hash their password
      const password = await bcrypt.hash(args.password, 10)
      // create the user in the database
      const user = await ctx.db.mutation.createUser(
        {
          data: {
            ...args,
            password,
            permissions: { set: ["USER"] },
          },
        },
        info
      )
      // create the JWT token for them
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
      // We set the jwt as a cookie on the response
      ctx.response.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
      })
      // return data to client
      return user
    },

    async signin(parent, { email, password }, ctx, info) {
      // 1. check if there is a user with that email
      const user = await ctx.db.query.user({ where: { email } })
      if (!user) {
        throw new Error(`No such user found for email ${email}`)
      }
      // 2. Check if their password is correct
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error("Invalid Password!")
      }
      // 3. generate the JWT Token
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
      // 4. Set the cookie with the token
      ctx.response.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })
      // 5. Return the user
      return user
    },

    signout(parent, args, ctx, info) {
      ctx.response.clearCookie("token")
      return { message: "Goodbye!" }
    },
  }

  module.exports = Query)
  ```

  - `src/utils.js`:

  ```js
  function hasPermission(user, permissionsNeeded) {
    const matchedPermissions = user.permissions.filter(permissionTheyHave =>
      permissionsNeeded.includes(permissionTheyHave)
    )
    if (!matchedPermissions.length) {
      throw new Error(`You do not have sufficient permissions
        : ${permissionsNeeded}
        You Have:
        ${user.permissions}
        `)
    }
  }

  exports.hasPermission = hasPermission
  ```

- WE should then create our `scheme.graphql` file which will be needed for our `createServer.js` file to now how to resolve our Querys and mutations.

  - This file is also used to help auto-generate boiler plate CRUD functions with our `.graphqlconfig` file(see section)
  - `src/schema.graphql`

  ```js
  # import * from './generated/prisma.graphql'

  type SuccessMessage {
    message: String
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): User!
    signin(email: String!, password: String!): User!
    signout: SuccessMessage
    requestReset(email: String!): SuccessMessage
    resetPassword(
      resetToken: String!
      password: String!
      confirmPassword: String!
    ): User!
    updatePermissions(permissions: [Permission], userId: ID!): User
  }

  type Query {
    me: User
    users: [User]!
  }

  type User {
    id: ID!
    name: String!
  }

  ```
