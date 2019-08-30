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
