const fs = require('fs')
const path = require('path')

class Data {
  constructor(students, courses) {
    this.students = students
    this.courses = courses
  }
}

let dataCollection = null

function initialize() {
  return new Promise((resolve, reject) => {
    const studentsPath = path.join(__dirname, '..', 'data', 'students.json')
    const coursesPath = path.join(__dirname, '..', 'data', 'courses.json')

    fs.readFile(studentsPath, 'utf8', (err, studentData) => {
      if (err) {
        reject('unable to read students.json')
        return
      }

      fs.readFile(coursesPath, 'utf8', (err, courseData) => {
        if (err) {
          reject('unable to read courses.json')
          return
        }

        const students = JSON.parse(studentData)
        const courses = JSON.parse(courseData)
        dataCollection = new Data(students, courses)
        resolve()
      })
    })
  })
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection?.students?.length) {
      resolve(dataCollection.students)
    } else {
      reject('no results returned')
    }
  })
}

function getTAs() {
  return new Promise((resolve, reject) => {
    if (dataCollection?.students) {
      const tas = dataCollection.students.filter((s) => s.TA)
      tas.length > 0 ? resolve(tas) : reject('no results returned')
    } else {
      reject('no results returned')
    }
  })
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection?.courses?.length) {
      resolve(dataCollection.courses)
    } else {
      reject('no results returned')
    }
  })
}

function getStudentsByCourse(course) {
  return new Promise((resolve, reject) => {
    if (dataCollection?.students) {
      const studentsByCourse = dataCollection.students.filter(
        (student) => student.course == course
      )
      studentsByCourse.length > 0
        ? resolve(studentsByCourse)
        : reject('no results returned')
    } else {
      reject('no results returned')
    }
  })
}

function getStudentByNum(num) {
  return new Promise((resolve, reject) => {
    if (dataCollection?.students) {
      const student = dataCollection.students.find((s) => s.studentNum == num)
      student ? resolve(student) : reject('no results returned')
    } else {
      reject('no results returned')
    }
  })
}

module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses,
  getStudentsByCourse,
  getStudentByNum,
}
