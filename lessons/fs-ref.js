const fs = require('fs')
const path = require('path')

// создание папки notes

/*fs.mkdir(path.join(__dirname, 'notes'), error => {
  if (error) throw new Error()

  console.log('Dir was created')
})*/

//создание файла myNotes.txt
//1-ый параметр - путь
//2-ый параметр - контент (то что записываем в файл)
//3-ый параметр - callback

/*fs.writeFile(
  path.join(__dirname, 'notes', 'myNotes.txt'),
  'Hello world',
  err => {
    if (err) throw new Error()
    console.log('File was created')
  }
)*/

//добавление нового контента в файл myNotes.txt

/*
fs.appendFile(
  path.join(__dirname, 'notes', 'myNotes.txt'),
  ' This is new information',
  err => {
    if (err) throw new Error()
    console.log(' File was changed')
  }
)
*/

//чтение файла

/*fs.readFile(path.join(__dirname, 'notes', 'myNotes.txt'),
  'utf-8',
  (err, data) => {
  if (err) throw new Error()

  console.log(data)
})*/

// переименовать файл myNotes.txt в mainNotes.txt

fs.rename(
  path.join(__dirname, 'notes', 'myNotes.txt'),
  path.join(__dirname, 'notes', 'mainNotes.txt'),
  (err) => {
    if (err) throw new Error()

    console.log('File was renamed')
  }
)
