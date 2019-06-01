using System;
using System.Collections.Generic;
using System.Linq;
using ReminderService.Exceptions;
using ReminderService.Models;
using ReminderService.Repository;

namespace ReminderService.Service
{
    public class ReminderService : IReminderService
    {
        private IReminderRepository reminderRepository;

        public ReminderService(IReminderRepository reminderRepository)
        {
            this.reminderRepository = reminderRepository;
        }

        public Reminder CreateReminder(Reminder reminder)
        {
            try
            {
                var result = reminderRepository.CreateReminder(reminder);
                if (result == null)
                {
                    throw new ReminderNotCreatedException("This reminder already exists");
                }

                return result;
            }
            catch (ReminderNotCreatedException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool DeleteReminder(int reminderId)
        {
            try
            {
                var result = reminderRepository.DeleteReminder(reminderId);
                if (!result)
                {
                    throw new ReminderNotFoundException("This reminder id not found");
                }

                return result;
            }
            catch (ReminderNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Reminder> GetAllRemindersByUserId(string userId)
        {
            try
            {
                var result = reminderRepository.GetAllRemindersByUserId(userId);
                if (result == null)
                {
                    throw new ReminderNotFoundException();
                }

                return result;
            }
            catch (ReminderNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Reminder GetReminderById(int reminderId)
        {
            try
            {
                var result = reminderRepository.GetReminderById(reminderId);
                if (result == null)
                {
                    throw new ReminderNotFoundException("This reminder id not found");
                }

                return result;
            }
            catch (ReminderNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateReminder(int reminderId, Reminder reminder)
        {
            try
            {
                var result = reminderRepository.UpdateReminder(reminderId, reminder);
                if (!result)
                {
                    throw new ReminderNotFoundException("This reminder id not found");
                }

                return result;
            }
            catch (ReminderNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
