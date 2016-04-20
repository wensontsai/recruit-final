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

  2.  Run Babel to transpile Node/Express back-end for API routes:  
```cd server && npm run build-dev:watch```


### PRODUCTION
#### Run 
1.  Build Client:  
```npm run dist```

2.  Build Server:  
```cd server && npm run build```

3.  Restart Server:  
```pm2 restart <job#>```

(If there are issues with restart, stop job and start fresh:  
```cd server/build && pm2 start server.js```
)