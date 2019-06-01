# Keep-Note-Complete

## Assignment Step Description
This is the final step towards Keep Note Application. You need to Integrate Keep-note frontend application built in UI module with your backend microservices.

In this step, we will perform the following activities

1. Implement JWT authentication in Angular application.
2. Integrate frontend with backend.
3. Do necessary refactoring in frontend to match the backend.
4. Use microservices as per the following:

        *  Authentication service should only store UserId and password and should be used only for Authentication.
           
        *   User service should be used for maintaining User profile. User service should be used for maintaining User profile.
           
        *   Category and Reminder service should be used to maintain common Category and Reminders which are accessible to all Notes.
           
        *   Note service should be used for maintaining Notes. Frontend should display the Category and Reminder extracted from Category and Reminder services. Then Note service should save the selected Category and Reminder along with Note.

5. Dockerize every piece of your application.

All microservices and frontend in a seperate docker container.
Use docker-compose to run all services / application lay

6. Add swagger documentation in each microservice.
7. Create a new repository as "Keep-Note-Complete". Add a Readme file and list down all the requirements/features of the application.
8. Push both frontend and backend in the same repository


### Important instructions for Participants
> - We expect you to write the assignment on your own by following through the guidelines, learning plan, and the practice exercises
> - The code must not be plagirized, the mentors will randomly pick the submissions and may ask you to explain the solution
> - The code must be properly indented, code structure maintained as per the boilerplate and properly commented
> - Follow through the problem statement shared with you
