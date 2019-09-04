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

  describe('`add()` method', () => {
    test('should return a new Student object', async () => {
      const mockStudent = { name: 'Billy', grade: 8 }
      const newStudent = await Students.add(mockStudent)
      expect(newStudent).toHaveProperty('name', mockStudent.name)
      expect(newStudent).toHaveProperty('grade', mockStudent.grade)
      expect(newStudent).toHaveProperty('id')
    })

    test('should increase the number of students by one (1)', async () => {
      const beforeCount = (await Students.find()).length
      const mockStudent = { name: 'Billy', grade: 8 }
      await Students.add(mockStudent)
      const afterCount = (await Students.find()).length
      expect(afterCount).toBe(beforeCount + 1)
    })
  })

  describe('`remove()` method', () => {
    test('should delete the given student from the list of students', async () => {
      const beforeCount = (await Students.find()).length
      await Students.remove(2)
      const afterCount = (await Students.find()).length
      expect(afterCount).toBe(beforeCount - 1)
    })
  })
})
