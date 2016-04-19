# Recruit
Platform for tech-testing potential hires.  Built in Node, React, Redux, Express, with MongoDB as data store.

## DEVELOPMENT
#### Setup
1. Install Node Modules:  
```npm i```

2. Testing Environment:  
```npm i -g mocha```

#### Run 
1.  Front-End 
  1. Run tests:  
```npm run test:watch```
  2. Run webpack to compile front-end in dev mode:  
```npm start```

2.  Back-End 
  1.  Run tests:  
```cd server && npm run test:watch```
  2.  Run node/express back-end server for API routes:  
```cd server && nodemon server.js```


## PRODUCTION
#### Run 
1.  Front-End build:  
```npm run dist```

2.  Back-End restart server:  
```pm2 restart <job#>```