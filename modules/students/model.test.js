const Students = require('./model')
const db = require('../../data/config')

describe('Students model', () => {
  beforeEach(async () => {
    await db('students').truncate()
    await db.seed.run()
  })

  describe('`find()` method', () => {
    test('should return all students', async () => {
      const students = await Students.find()
      expect(students).toHaveLength(3)
    })
  })

  describe('`findById()` method', () => {
    test('should return one (1) student with the matching id', async () => {
      const expectedStudent = { id: 1, name: 'Cedric', grade: 9 }
      const actualStudent = await Students.findById(1)
      expect(actualStudent).toEqual(expectedStudent)
    })
  })

  describe('`remove()` method', () => {
    test('should delete the given student from the list of students', async () => {
      await Students.remove(2)
      const students = await db('students')
      expect(students).toHaveLength(2)
    })
  })
})
