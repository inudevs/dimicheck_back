# dimicheck_back

## commands

### develop (nodemon)
```console
yarn dev
```

### start
```console
yarn start
```

## routes

### swagger document
<http://localhost:3000/api-docs/>

### api
<http://localhost:3000/api/>

#### status
<http://localhost:3000/api/status>

##### get
<http://localhost:3000/api/status/get>

##### set
<http://localhost:3000/api/status/set>

#### auth
<http://localhost:3000/api/auth>

##### signin
<http://localhost:3000/api/signin>

## status code
```json
{
  "class": 0,
  "ingang": 1,
  "club": 2,
  "home": 3,
  "rest": 4,
  "laundry": 5,
  "delay": 6,
  "mento": 7,
  "it": 8,
  "contest": 9,
  "etc": 10
}
```
