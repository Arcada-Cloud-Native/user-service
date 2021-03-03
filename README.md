# user-service
**Max Nordlund, Sebastian Lundgren, Matts Hultin**

## Documentation
OpenApi documentation can be found [here](https://github.com/Arcada-Cloud-Native/user-service/blob/main/userServices.yaml)

## Route
https://beanhats-user-service.azurewebsites.net/api/users

* GET - return all users

* /{userId}
  * GET - return a user by ID
  * PATCH - updateUser (Needs Authorization token from login)
  
  * DELETE - deleteUser (Needs Authorization token from login)

* /signup
  * POST - creates a user
  post a JSON with this info filled and the user will be created
  
  {
    "firstName": "", 
    "lastName": "", 
    "address": "", 
    "email": "", 
    "town": "", 
    "state": "", 
    "phoneNumber": "", 
    "zipCode": "",
    "password": ""
  }

* /login
  * POST - userLogin
  post a JSON with 
  
  {
    "email": "", 
    "password": ""
  }
  
  and you will be logged in and get a hash-token in return, you have to add that token to "Headers" as Authorization

* /logout
  * GET - logout user
  * removes Auth header and key is removed
