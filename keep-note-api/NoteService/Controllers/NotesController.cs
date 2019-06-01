using Microsoft.AspNetCore.Mvc;
using NoteService.Exceptions;
using NoteService.Models;
using NoteService.Service;
using System;

namespace NoteService.Controllers
{
    /*
      As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
      the class with [ApiController] annotation and define the controller level route as per REST Api standard.
  */
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        /*
        NoteService should  be injected through constructor injection. Please note that we should not create service
        object using the new keyword
        */
        private INoteService noteService;

        public NotesController(INoteService _service)
        {
            noteService = _service;
        }

        /*
	    * Define a handler method which will create a specific note by reading the
	    * Serialized object from request body and save the note details in the
	    * database.This handler method should return any one of the status messages
	    * basis on different situations: 
	    * 1. 201(CREATED) - If the note created successfully. 
	    
	    * This handler method should map to the URL "/api/note/{userId}" using HTTP POST method
	    */
        // POST api/<controller>
        [HttpPost("{userId}")]
        public IActionResult Post(string userId, [FromBody]Note note)
        {
            try
            {
                var result = noteService.CreateNote(note);
                return StatusCode(201, note);
            }
            catch (NoteAlreadyExistsException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        /*
         * Define a handler method which will delete a note from a database.
         * This handler method should return any one of the status messages basis 
         * on different situations: 
         * 1. 200(OK) - If the note deleted successfully from database. 
         * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
         *
         * This handler method should map to the URL "/api/note/{userId}/{noteId}" using HTTP Delete
         */
        [HttpDelete("{userId}/{noteId}")]
        public IActionResult Delete(string userId, int noteId)
        {
            try
            {
                var result = noteService.DeleteNote(userId, noteId);
                return Ok(result);
            }
            catch (NoteNotFoundExeption ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /*
         * Define a handler method which will update a specific note by reading the
         * Serialized object from request body and save the updated note details in a
         * database. 
         * This handler method should return any one of the status messages
         * basis on different situations: 
         * 1. 200(OK) - If the note updated successfully.
         * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
         * 
         * This handler method should map to the URL "/api/note/{userId}/{noteId}" using HTTP PUT method.
         */
        [HttpPut("{userId}/{noteId}")]
        public IActionResult Put(string userId, int noteId, [FromBody]Note value)
        {
            try
            {
                var result = noteService.UpdateNote(noteId, userId, value);
                return Ok(result);
            }
            catch (NoteNotFoundExeption ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /*
         * Define a handler method which will get us the all notes by a userId.
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the note found successfully. 
         * 
         * This handler method should map to the URL "/api/note/{userId}" using HTTP GET method
         */
        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            try
            {
                var result = noteService.GetAllNotesByUserId(userId);
                return Ok(result);
            }
            catch (NoteNotFoundExeption)
            {
                return NotFound(userId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /*
         * Define a handler method which will show details of a specific note created by specific 
         * user. This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the note found successfully. 
         * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
         * This handler method should map to the URL "/api/note/{userId}/{noteId}" using HTTP GET method
         * where "id" should be replaced by a valid reminderId without {}
         * 
         */
        [HttpGet("{userId}/{noteId}")]
        public IActionResult Get(string userId, int noteId)
        {
            try
            {
                var result = noteService.GetNoteByNoteId(userId, noteId);
                return Ok(result);
            }
            catch (NoteNotFoundExeption)
            {
                return NotFound(userId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
