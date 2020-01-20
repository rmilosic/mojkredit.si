var serverlessSDK = require('./serverless_sdk/index.js')
serverlessSDK = new serverlessSDK({
tenantId: 'milosicr',
applicationName: 'credit-api',
appUid: '000000000000000000',
tenantUid: '000000000000000000',
deploymentUid: 'undefined',
serviceName: 'mojkredit-backend',
stageName: 'dev',
pluginVersion: '3.2.5'})
const handlerWrapperArgs = { functionName: 'mojkredit-backend-dev-sberbank', timeout: 6}
try {
  const userHandler = require('./api/sberbank.js')
  module.exports.handler = serverlessSDK.handler(userHandler.getCalculation, handlerWrapperArgs)
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs)
}
