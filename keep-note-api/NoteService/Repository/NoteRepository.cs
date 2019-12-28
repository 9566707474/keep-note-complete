﻿using MongoDB.Driver;
using NoteService.Models;
using System.Collections.Generic;
using System.Linq;

namespace NoteService.Repository
{
    public class NoteRepository : INoteRepository
    {
        private INoteContext context;

        //define a private variable to represent NoteContext
        public NoteRepository(INoteContext _context)
        {
            context = _context;
        }

        //This method should be used to create a new note. NoteId should be autogenerated and
        // must start with 101.This should create a new NotUser if not exists else should push 
        //new note entry into existing NoteUser collection. UserId is identified by CreatedBy
        public bool CreateNote(Note note)
        {
            var notes = context.Notes.Find(p => p.UserId == note.CreatedBy).FirstOrDefault();
            if (notes == null)
            {
                context.Notes.InsertOne(new NoteUser() { UserId = note.CreatedBy, Notes = new List<Note> { note } });
                return true;
            }
            else
            {
                var filter = Builders<NoteUser>.Filter.Eq("UserId", note.CreatedBy);
                note.Id = notes.Notes?.LastOrDefault()?.Id == null ? 1 : notes.Notes.LastOrDefault().Id + 1;
                notes.Notes.Add(note);
                var result = context.Notes.ReplaceOne(filter, notes);
                return result.IsAcknowledged && result.ModifiedCount > 0;
            }
        }

        //This method should be used to retreive all notes for a user
        public List<Note> FindAllNotesByUser(string userId)
        {
            var result = context.Notes.Find(p => p.UserId == userId).FirstOrDefault();
            if (result?.Notes == null)
            {
                return null;
            }
            else
            {
                return result.Notes;
            }
        }

        //This method should be used to delete a note for a specific user
        public bool DeleteNote(string userId, int noteId)
        {
            var notes = context.Notes.Find(p => p.UserId == userId).FirstOrDefault();
            if (notes?.Notes == null)
            {
                return false;
            }

            var note = notes.Notes.Where(p => p.Id == noteId).SingleOrDefault();
            if (note == null)
            {
                return false;
            }

            var filter = Builders<NoteUser>.Filter.Eq("UserId", userId);
            notes.Notes.Remove(note);
            var result = context.Notes.ReplaceOne(filter, notes);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        //This method is used to update an existing note for a user
        public bool UpdateNote(int noteId, string userId, Note note)
        {
            var notes = context.Notes.Find(p => p.UserId == userId).FirstOrDefault();
            if (notes?.Notes == null)
            {
                return false;
            }

            var noteValue = notes.Notes.Where(p => p.Id == noteId).FirstOrDefault();
            if (noteValue == null)
            {
                return false;
            }

            var filter = Builders<NoteUser>.Filter.Eq("UserId", userId);
            notes.Notes.Remove(noteValue);
            notes.Notes.Add(note);
            var result = context.Notes.ReplaceOne(filter, notes);

            return result.IsAcknowledged;
        }

        public Note GetNoteByNoteId(string userId, int noteId)
        {
            var notes = context.Notes.Find(p => p.UserId == userId).FirstOrDefault();
            if (notes?.Notes == null)
            {
                return null;
            }

            return notes.Notes.Where(p => p.Id == noteId).FirstOrDefault();
        }
    }
}