# Recruit
Platform for tech-testing potential hires.  Built in Node, React, Redux, Express, with MongoDB as data store.

## DEVELOPMENT
### Setup
1. Install Node Modules:  
```npm i```

2. Testing Environment:  
```npm i -g mocha```

### Run 
#### Front-End
Run tests:  
```npm run test:watch```

Run webpack to compile front-end in dev mode:  
```npm start```

#### Back-End
Run tests:  
```cd server && npm run test:watch```

Run node/express back-end server for API routes:  
```cd server && nodemon server.js```


## PRODUCTION
#### Front-End
Build:  
```npm run dist```

#### Back-End
Restart server:
```pm2 restart <job#>```