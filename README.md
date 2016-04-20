# Recruit
Platform for tech-testing potential hires.  Built in Node, React, Redux, Express, with MongoDB as data store.

### DEVELOPMENT
#### Setup
1. Install Node Modules:  
```npm i```

2. Testing Environment:  
```npm i -g mocha```

#### Run 
1.  Client
  1. Run tests:  
```npm run test:watch```

  2. Run webpack to compile front-end in dev mode:  
```npm start```

2.  Server
  1.  Run tests:  
```cd server && npm run test:watch```

  2.  Build back-end (ES6/ES7 transpiling => ES5):  
```cd server && npm run build```

  3.  Run node/express back-end server for API routes:  
```cd server && nodemon build/server```


### PRODUCTION
#### Run 
1.  Build Client:  
```npm run dist```

2.  Restart Server:  
```pm2 restart <job#>```

(If there are issues with restart, stop job and start: 
```cd server/build && pm2 start server.js```
)