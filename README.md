# user-service
**Max Nordlund, Sebastian Lundgren, Matts Hultin**

## Documentation
OpenApi documentation can be found [here](https://github.com/Arcada-Cloud-Native/user-service/blob/main/userServices.yaml)

## Route
https://beanhats-user-service.azurewebsites.net/api/users

* GET - return all users

* /{userId}
  * GET - return a user by ID
  * PATCH - updateUser
  * DELETE - deleteUser

* /signup
  * POST - creates a user

* /login
  * POST - userLogin

* /logout
  * GET - logout user
