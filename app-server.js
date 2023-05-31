const { PORT } = require('./config')

const app = require('./app')
const { API_KEY } = require('./config')

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
    console.log(`API KEY: ${API_KEY}`)
})
