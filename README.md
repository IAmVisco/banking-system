# Banking system
Really cheap take on something that should be a banking system.  
*I used Yarn but npm is fine too.*

## Installing
1. Make sure you have `DATABASE_URL` enviromental variable that points to your local or [Mongo Atlas](https://www.mongodb.com/cloud/atlas) MongoDB.
1. `yarn install`

## Populate DB
```
yarn run seed
```
Will create and seed missing tables once and create 5 users on every run.
 
## Running
Dev server with hot reload:
```
yarn run watch 
```

## License
MIT
