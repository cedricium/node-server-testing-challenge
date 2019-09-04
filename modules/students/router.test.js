const request = require('supertest')
const server = require('../../server')
const db = require('../../data/config')

describe('Students API router', () => {
  beforeEach(async () => {
    await db('students').truncate()
    await db.seed.run()
  })

  describe('`GET /api/students/`', () => {
    test('should return HTTP status code 200', async () => {
      const res = await request(server).get('/api/students')
      expect(res.status).toBe(200)
    })

    test('should return an array of Student objects', async () => {
      const res = await request(server).get('/api/students')
      expect(res.body).toBeInstanceOf(Array)
    })
  })

  describe('`GET /api/students/:id`', () => {
    describe('valid student (found in database)', () => {
      test('should return a Student object', async () => {
        const res = await request(server).get('/api/students/1')
        expect(res.body).toBeInstanceOf(Object)
      })

      test('should contain properties `id`, `name`, and `grade`', async () => {
        const res = await request(server).get('/api/students/1')
        const student = res.body
        expect(student).toHaveProperty('id')
        expect(student).toHaveProperty('name')
        expect(student).toHaveProperty('grade')
      })
    })

    describe('invalid student (not in database)', () => {
      test('should return HTTP status code 404', async () => {
        const res = await request(server).get('/api/students/999')
        expect(res.status).toBe(404)
      })

      test('should contain 404 message in response body', async () => {
        const notFoundMsg = 'No student found with the given id'
        const res = await request(server).get('/api/students/999')
        expect(res.body).toHaveProperty('message', notFoundMsg)
      })
    })
  })

  describe('`POST /api/students`', () => {
    describe('missing required properties results in error', () => {
      test('should return HTTP status code 400', async () => {
        const res = await request(server).post('/api/students').send({})
        expect(res.status).toBe(400)
      })

      test('should contain error message in response body', async () => {
        const missingPropsMsg = 'Please provide both `name` and `grade` properties'
        const res = await request(server).post('/api/students').send({})
        expect(res.body).toHaveProperty('message', missingPropsMsg)
      })
    })

    describe('valid req.body successfully adds student', () => {
      test('should return HTTP status code 201', async () => {
        const mockStudent = { name: 'Billy', grade: 8 }
        const res = await request(server).post('/api/students').send(mockStudent)
        expect(res.status).toBe(201)
      })

      test('should return a Student object with `id`, `name`, and `grade` properties', async () => {
        const mockStudent = { name: 'Billy', grade: 8 }
        const res = await request(server).post('/api/students').send(mockStudent)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name', mockStudent.name)
        expect(res.body).toHaveProperty('grade', mockStudent.grade)
      })
    })
  })

  describe('`DELETE /api/students/:id`', () => {
    test('should return HTTP status code 204', async () => {
      const res = await request(server).delete('/api/students/1')
      expect(res.status).toBe(204)
    })

    test('should have a body with no content', async () => {
      const res = await request(server).delete('/api/students/1')
      expect(res.body).toMatchObject({})
    })
  })
})
