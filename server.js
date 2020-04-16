require('dotenv').config()

const server = require('./index.js')

const port = process.env.PORT;


server.listen(port, () => {
    console.log(`listening to the sprint port on http://localhost:${port}`)
})