# Take-Home-Challenge

## Information

This app allows users to generate sequential integers.

<br>Time Taken to develop: <b>2 hours<b>

## Installation

Instructions on how to install

```  
  git clone https://github.com/muslimomar/Take-Home-Challenge 
  cd Take-Home-Challenge
  npm install
  npm run start
  ```

## Documentation

Local environment <b>URL</b>:<br>http://localhost:3000

Production environment <b>URL</b>:<br>https://take-home-web.herokuapp.com

Note: for testing it in your machine please run the app and just replace the "Production URL" with the "Local URL" above.

You can use postman or curl to test the API.<br>
Postman collection url: https://documenter.getpostman.com/view/5834717/Szt8dUyD

<b>Authentication</b>
- <code>curl -X “POST” https://take-home-web.herokuapp.com/api/auth/signup --data “email=mislimumer@gmail.com&password=12345678&fullName=Muslim omar” -i</code>
<br><br>It will return you the `Authorization` token in the headers as "Authorization" field and you can use it with secured requests, or read the next line for login.

- <code>curl -X “POST” https://take-home-web.herokuapp.com/api/auth/login --data “email=mislimumer@gmail.com&password=12345678” -i</code>
<br><br>It returns the `Authorization` token same as above.

<b>Integers</b>

The below endpoints are secured, so you have to use the "Authorization" token that you got from the Authentication endpoints (register/login)


- <code>curl https://take-home-web.herokuapp.com/api/integer/current -H "Authorization: Bearer yourAuthorizationToken" </code>
<br><br>It returns the current integer in `data` field.

- <code>curl https://take-home-web.herokuapp.com/api/integer/next -H "Authorization: Bearer yourAuthorizationToken" </code>
<br><br>It increments the current integer by "1" and returns it in `data` field.

- <code>curl https://take-home-web.herokuapp.com/api/integer/current -X “PUT” --data “integer=100” -H "Authorization: Bearer yourAuthorizationToken" </code>
<br><br>Pass "integer" field (minimum is 0), and it will reset your integer to the provided value and return it in `data` field




