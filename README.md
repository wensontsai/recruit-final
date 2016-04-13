# Recruit
Platform for tech-testing potential hires.  Built with Node, React, Redux, Express, with MongoDB as data store.

## DEVELOPMENT
### Setup
1. Install Node Modules:  
```npm i```

2. Testing Environment:  
```npm i -g mocha```

### Run 
#### Front-End
run tests:  
```npm run test:watch```

run webpack to compile front-end in dev mode:  
```npm start```

#### Back-End
run tests:  
```cd server && npm run test:watch```

run node/express back-end server for API routes:  
```cd server && nodemon server.js```


## PRODUCTION
#### Front-End
build:
```npm run dist```