const app = require('/Users/ronetsu/Documents/Koulu/Fullstack/Part4/blogilista/backend/app.js')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
