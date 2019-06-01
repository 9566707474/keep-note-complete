using NoteService.Exceptions;
using NoteService.Models;
using NoteService.Repository;
using System;
using System.Collections.Generic;

namespace NoteService.Service
{
    public class NoteService : INoteService
    {
        //define a private variable to represent repository

        //Use constructor Injection to inject all required dependencies.

        private INoteRepository noteRepository;

        public NoteService(INoteRepository _noteRepository)
        {
            noteRepository = _noteRepository;
        }

        //This method should be used to create a new note.
        public bool CreateNote(Note note)
        {
            var result = noteRepository.CreateNote(note);
            if (!result)
            {
                throw new NoteAlreadyExistsException("");
            }

            return result;
        }

        //This method should be used to delete an existing note for a user
        public bool DeleteNote(string userId, int noteId)
        {
            var result = noteRepository.DeleteNote(userId, noteId);
            if (!result)
            {
                throw new NoteNotFoundExeption($"NoteId {noteId} for user {userId} does not exist");
            }

            return result;
        }

        //This methos is used to retreive all notes for a user
        public List<Note> GetAllNotesByUserId(string userId)
        {
            var result = noteRepository.FindAllNotesByUser(userId);
            if (result == null)
            {
                throw new NoteNotFoundExeption("");
            }
            return result;
        }

        public Note GetNoteByNoteId(string userId, int noteId)
        {
            var result = noteRepository.GetNoteByNoteId(userId, noteId);
            if (result == null)
            {
                throw new NoteNotFoundExeption("");
            }

            return result;
        }

        //This method is used to update an existing note for a user
        public Note UpdateNote(int noteId, string userId, Note note)
        {
            var result = noteRepository.UpdateNote(noteId,userId,note);
            if (!result)
            {
                throw new NoteNotFoundExeption($"NoteId {noteId} for user {userId} does not exist");
            }

            return note;
        }

    }
}
