
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Cedric', grade: 9 },
        {id: 2, name: 'Bob', grade: 11 },
        {id: 3, name: 'Dan', grade: 12 }
      ])
    })
}
