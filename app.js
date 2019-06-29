const express = require('express')
const expressGraphQL = require('express-graphql')

const schema = require('./schema/schema.js')

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql : true
})); // middleware

app.listen(5000, () => {
    console.log("server is running")
}); 