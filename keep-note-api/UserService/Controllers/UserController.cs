using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Exceptions;
using UserService.Models;
using UserService.Service;

namespace UserService.Controllers
{
    /*
   As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
   the class with [ApiController] annotation and define the controller level route as per REST Api standard.
   */
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        /*
   UserService should  be injected through constructor injection. Please note that we should not create service
   object using the new keyword
  */

        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        /*
         * Define a handler method which will create a specific user by reading the
         * Serialized object from request body and save the user details in the
         * database. This handler method should return any one of the status messages
         * basis on different situations:
         * 1. 201(CREATED) - If the user created successfully. 
         * 2. 409(CONFLICT) - If the userId conflicts with any existing user
         * 
         * This handler method should map to the URL "/api/user" using HTTP POST method
         */
        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody]User value)
        {
            try
            {
                var result = userService.RegisterUser(value);
                return StatusCode(201, result);
            }
            catch (UserNotCreatedException ex)
            {
                return Conflict(ex?.Message);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        /*
         * Define a handler method which will update a specific user by reading the
         * Serialized object from request body and save the updated user details in a
         * database. This handler method should return any one of the status messages
         * basis on different situations: 
         * 1. 200(OK) - If the user updated successfully.
         * 2. 404(NOT FOUND) - If the user with specified userId is not found.
         * 
         * This handler method should map to the URL "/api/user/{id}" using HTTP PUT method.
         */
        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody]User value)
        {
            try
            {
                userService.UpdateUser(id, value);
                return Ok(value);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex?.Message);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        /*
         * Define a handler method which will delete a user from a database.
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the user deleted successfully from database. 
         * 2. 404(NOT FOUND) - If the user with specified userId is not found.
         *
         * This handler method should map to the URL "/api/user/{id}" using HTTP Delete
         * method" where "id" should be replaced by a valid userId without {}
         */
        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                var result = userService.DeleteUser(id);
                return Ok(result);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        /*
         * Define a handler method which will show details of a specific user. This
         * handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the user found successfully. 
         * 2. 404(NOT FOUND) - If the user with specified userId is not found. 
         * This handler method should map to the URL "/api/user/{id}" using HTTP GET method where "id" should be
         * replaced by a valid userId without {}
         */
        // GET api/<controller>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                var result = userService.GetUserById(id);
                return Ok(result);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex?.Message);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
