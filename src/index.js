
const app = require('./app')
app.listen(global.gConfig.node_port, () => {
    logger.info("http://localhost:"+global.gConfig.node_port+"/api-docs")
})
