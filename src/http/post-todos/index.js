let data = require('@begin/data')

exports.handler = async function post (req) {
  let todo = req.body
  todo.created = todo.created || Date.now()
  await data.set({
    table: 'todos',
    ...todo
  })
  return {
    statusCode: 302,
    location: '/'
  }
}
