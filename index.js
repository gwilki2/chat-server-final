const app = require('./src/app')
const port = require('./src/config/appConfig').port || 3002

app.listen(port, () => console.log(`app listening on port ${port}`))