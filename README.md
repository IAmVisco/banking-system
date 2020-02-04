# Banking system
Really cheap take on something that should be a banking system.

## Running
*I used Yarn but npm is fine too.*
```
yarn install
```
Make sure you have `DATABASE_URL` enviromental variable that points to your local or [Mongo Atlas](https://www.mongodb.com/cloud/atlas) MongoDB.
Dev server with hot reload:
```
yarn run watch 
```
OR more prod-like env:
```
yarn run start
```
## Populate DB
```
yarn run seed
```
Will create and seed missing tables once and create 5 users on every run. 

## License
MIT
