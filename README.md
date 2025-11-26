# Task-Tracker-CLI

A simple command line interface (CLI) app to track and manage tasks.

Track what to do, what is done, and what is currently being working on.

FUNCTIONALITY:
 - Store tasks, with its name, description, and deadline
 - Change task status (to-do/in-progress/complete)
 - Retrieve task based on task ID, name, or status
 - Delete tasks

RESOURCES:
 - USERS: Me
 - PRODUCT: Tasks

ENDPOINTS:
 - task-cli add [:description]
 - task-cli update [:id] [:description]
 - task-cli delete [:id]

 - task-cli mark-in-progress [:id]
 - task-cli mark-done [:id]

 - task-cli list
 - task-cli list done
 - task-cli list todo
 - task-cli list in-progress

