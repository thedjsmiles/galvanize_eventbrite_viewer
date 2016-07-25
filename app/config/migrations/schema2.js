exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table){
      table.increments('id').primary()
      table.string('order_id')
    })
  ])
}
exports.down = function(knex, Promise) {
  knex.schema.dropTable('github_users')
}
