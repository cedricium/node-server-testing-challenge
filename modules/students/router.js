const router = require('express').Router()
const Students = require('./model')

router.get('/', async (req, res) => {
  try {
    const students = await Students.find()
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const student = await Students.findById(id)
    if (!student) {
      return res.status(404).json({
        message: 'No student found with the given id'
      })
    } else {
      return res.status(200).json(student)
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Students.remove(id)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

module.exports = router
