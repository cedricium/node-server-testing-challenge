const db = require('../../data/config')

const find = async () => {
  const students = await db('students')
  return students
}

const findById = async id => {
  const [student] = await db('students').where({ id })
  return student
}

const add = async student => {
  const [id] = await db('students').insert(student)
  const newStudent = await findById(id)
  return newStudent
}

const remove = async id => {
  await db('students').where({ id }).del()
}

module.exports = {
  find,
  findById,
  add,
  remove,
}
