# Authorization 
## author: Yasmeen Mekky

# Overview and Purpose
This microservice handles the authorization of users in Kettle. It creates, logs in, and logs out users from the database.

# Events received

User sign up event:
`{
    "type": "user_signup",
    "data": {"email" : email, "pass": password}
}`

User logs in event:
`{
    "type": "user_login",
    "data": {"email" : email, "pass": password}
}`

# API end-points

## /api/events
### Receieves events from the event bus and forwards it to the below end-points
### parameters: event
- POST method
- If event type == "user_signup", /api/auth/sign_up is called.
- If event type == "user_login", /api/auth/login is called.

## /api/auth/sign_up
### Registers a user in the database, given their username and password
### parameters: user, password
*e.g: `curl -d '{"user": "user123", "password": "abcd"}' -H "Content-Type: application/json"  -X POST http://localhost:4000/api/auth/sign_up`*

 - POST method
 - If the user is signed up successfully, a **201** status code and a JSON object `{status: 'user-created'}` is sent.    
 - If the user already exists, a **403** status code and a JSON object `{status: 'user-already-exists'}` is sent. 
 - If the correct request parameters are missing, a **400** status code is sent.
 - If a server or databse error occurs, a **500** status code and a JSON object `{status: 'error-processing-request'}` is sent.

## /api/auth/log_in
### Logs in a user if their password matches their username
### parameters: user, password
*e.g: `/api/auth/log_in?user=user123&password=abcd`*

- GET method
- If the password matches the username, a **200** status code and a JSON object `{status: 'login-successful'}` is sent.
- If the user doesn't exist, a **404** status code and a JSON object `{status: 'user-not-found'}` is sent.
- If the password doesn't match, a **403** status code and a JSON object `{status: 'incorrect-password'}` is sent.
- If the correct request parameters are missing, a **400** status code is sent.
- If a server or databse error occurs, a **500** status code and a JSON object `{status: 'error-processing-request'}` is sent.
