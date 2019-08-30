
exports.up = function(knex) {
  return knex.schema.createTable('students', table => {
    table.increments()
    table.string('name', 30)
      .notNullable()
      .unique()
    table.integer('grade')
      .notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('students')
}
