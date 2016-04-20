module.exports = {
  appName: 'DRESSLER  RECRUIT',  
  secret: 'recruit_eat_your_fruit',
  db: {
    dev: 'mongodb://localhost/recruit',
    test: 'mongodb://localhost/recruit_test'
  },
  email: {
    testPath: 'http://localhost:3000/exams',
    service: 'Gmail',
    auth: {
      host: 'user%40gmail.com:pass@smtp.gmail.com',
      user: 'shrugsandhugs10000@gmail.com',
      pass: 'shrugsandhugs',
      sender_name: 'wenson _'
    }
  }
};