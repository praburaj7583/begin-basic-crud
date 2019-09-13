let data = require('@begin/data')

exports.handler = async function destroy (req) {
  await data.destroy({
    table: 'todos',
    ...req.body
  })
  return {
    statusCode: 302,
    location: '/'
  }
}
