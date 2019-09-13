let test = require('tape')
let arc = require('@architect/architect')
let data = require('@begin/data')

test('env', t => {
  t.plan(4)
  t.ok(data, 'data')
  t.ok(data.get, 'data')
  t.ok(data.set, 'data')
  t.ok(data.destroy, 'data')
})

/**
 * kick a sandbox up
 */
let end
test('sandbox.start', async t => {
  t.plan(1)
  end = await arc.sandbox.start()
  t.ok(true, 'started sandbox')
})

/**
 * working with one document
 *
 * - set
 * - get
 * - destroy
 */

test('data.set one document', async t => {
  t.plan(1)
  let result = await data.set({
    table: 'todos',
    key: 'asdf1234'
  })
  t.ok(result.key === 'asdf1234', 'wrote document')
  console.log(result)
})

test('data.get one document', async t => {
  t.plan(1)
  let todo = await data.get({
    table: 'todos',
    key: 'asdf1234'
  })
  t.ok(todo.key === 'asdf1234', 'read document')
  console.log(todo)
})

test('data.del one document', async t => {
  t.plan(1)
  let result = await data.destroy({
    table: 'todos',
    key: 'asdf1234'
  })
  t.ok(result, 'deleted document')
  console.log(result)
})

/**
 * if no key is supplied one is created
 */
test('data.set generates a unique key if one is not supplied', async t => {
  t.plan(1)
  let result = await data.set({
    table: 'todos'
  })
  t.ok(result.key, 'saved document has a key')
  console.log(result)
})

/**
 * Any metadata is fine
 */
test('data.set allows for any JSON document; only table and key are reserved', async t => {
  t.plan(1)
  let result = await data.set({
    table: 'todos',
    text: 'write some tests',
    complete: false,
    timeframe: new Date(Date.now()).toISOString()
  })
  t.ok(result.key, 'saved document has contents')
  console.log(result)
})

/**
 * Save a batch of documents by passing an array
 */
test('data.set accepts an array to batch save documents', async t => {
  t.plan(1)
  let result = await data.set([{
    table: 'todos',
    text: 'help someone today',
    complete: true,
    timeframe: new Date(Date.now()).toISOString()
  },
  {
    table: 'todos',
    message: 'leave the phone at home on accident purpose',
    complete: false,
    timeframe: new Date(Date.now()).toISOString()
  },
  {
    table: 'todos',
    message: 'bathe',
    complete: false,
    timeframe: new Date(Date.now()).toISOString()

  }])
  t.ok(result.length, 'saved batch')
  console.log(result)
})

test('data.get can read an entire table', async t => {
  t.plan(1)
  let result = await data.get({
    table: 'todos'
  })
  t.ok(result, 'got todos')
  console.log(result)
})

/**
 * shut down the sandbox cleanly
 */
test('sandbox.end', async t => {
  t.plan(1)
  end()
  t.ok(true, 'shutdown')
})
