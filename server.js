/*********************************************************************************
 * WEB700 – Assignment 03
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
 * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Dinh Khoa Chau Student ID: 174120238 Date: 2025-02-10
 *
 ********************************************************************************/

const express = require('express')
const path = require('path')
const collegeData = require('./modules/collegeData')

const app = express()
const HTTP_PORT = process.env.PORT || 8080

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'))
})

app.get('/htmlDemo', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/htmlDemo.html'))
})

app.get('/students', (req, res) => {
  if (req.query.course) {
    collegeData
      .getStudentsByCourse(req.query.course)
      .then((students) => res.json(students))
      .catch(() => res.json({ message: 'no results' }))
  } else {
    collegeData
      .getAllStudents()
      .then((students) => res.json(students))
      .catch(() => res.json({ message: 'no results' }))
  }
})

app.get('/tas', (req, res) => {
  collegeData
    .getTAs()
    .then((tas) => res.json(tas))
    .catch(() => res.json({ message: 'no results' }))
})

app.get('/courses', (req, res) => {
  collegeData
    .getCourses()
    .then((courses) => res.json(courses))
    .catch(() => res.json({ message: 'no results' }))
})

app.get('/student/:num', (req, res) => {
  collegeData
    .getStudentByNum(req.params.num)
    .then((student) => res.json(student))
    .catch(() => res.json({ message: 'no results' }))
})

// 404 route - must be last!
app.use((req, res) => {
  res.status(404).send('Page Not Found')
})

// Initialize the data before starting the server
collegeData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log('Server listening on port: ' + HTTP_PORT)
    })
  })
  .catch((err) => {
    console.error(`Failed to initialize data: ${err}`)
  })
