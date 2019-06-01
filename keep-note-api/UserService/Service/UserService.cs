using System;
using UserService.Exceptions;
using UserService.Models;
using UserService.Repository;

namespace UserService.Service
{
    public class UserService : IUserService
    {
        private IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public bool DeleteUser(string userId)
        {
            try
            {
                var result = userRepository.DeleteUser(userId);
                if (!result)
                {
                    throw new UserNotFoundException("This user id does not exist");
                }

                return result;
            }
            catch (UserNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public User GetUserById(string userId)
        {
            try
            {
                var result = userRepository.GetUserById(userId);
                if (result == null)
                {
                    throw new UserNotFoundException("This user id does not exist");
                }
                return result;
            }
            catch (UserNotFoundException)
            {
                throw;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public User RegisterUser(User user)
        {
            try
            {
                var result = userRepository.RegisterUser(user);
                if (result == null)
                {
                    throw new UserNotCreatedException("This user id already exists");
                }

                return result;
            }
            catch (UserNotCreatedException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdateUser(string userId, User user)
        {
            try
            {
                var result = userRepository.UpdateUser(userId, user);
                if (!result)
                {
                    throw new UserNotFoundException("This user id does not exist");
                }
                return result;
            }
            catch (UserNotFoundException)
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
