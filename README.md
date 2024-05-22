# Exercise Description

Develop an application to manage phone numbers of an organization. This application allows the user to allocate numbers of an organization.

## Table of Contents

1. [Acceptance Criteria](#acceptance-criteria)
2. [Technical Information](#technical-information)
3. [Documentation](#documentation)
   - [Application Structure](#application-structure)
   - [Backend Structure](#backend)
   - [Frontend Structure](#frontend)
4. [Tech Stack](#tech-stack)
   - [Frontend](#frontend)
   - [Backend](#backend)
   - [Database](#database)
   - [Containerization](#containerization)
5. [How to Run this Program](#how-to-run-this-program)
   - [With Docker](#with-docker)
   - [Without Docker](#without-docker)

## Acceptance Criteria

- The application can be used by different organizations. They will be differentiated by their own ID.
- Each organization can view a list with the users who have a phone number assigned. This list contains the ID/passport, the name and the surname of the user, and the corresponding number.
- A number can be allocated to a user. To do this, it is necessary to send the ID/passport, the name, and the surname.
- The number to allocate must be in a list of available numbers. This list is a master data which will be populated as setup of the project.
- The user can only have one number.

## Technical Information

- All the data will be stored in a MongoDB database.
- The application must be developed in NodeJS in Back End and React in Front End, both must be done with TypeScript.
- Implement the tests that you consider.
- Document the API with OpenAPI.
- Usage of containers is a nice to have.

# Documentation

## Application Structure
<img src="documentation/appstructure.png" alt="App Structure Diagram" width="400" height="100">

## Backend
<img src="documentation/backendstructure.png" alt="Backend Structure Diagram" width="250" height="300">

## Frontend
<img src="documentation/frontendstructure.png" alt="Frontend Structure Diagram" width="600" height="250">

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### Containerization
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

# How to Run this Program

## With Docker

```sh
docker-compose build
docker-compose up
```

## Without Docker

To run the program from the source code, the following steps must be followed from the root directory:

```sh
npm install
cd ./backend
npm install
npm run dev # Backend running
```

**Backend disclaimer:** If you are using a Node version higher than 20.X.X, instead of `npm run dev` you have to use `node --no-warnings=ExperimentalWarning --loader ts-node/esm ./src/index.ts`

```sh
cd ./frontend
npm install
npm run dev # Frontend running
```

**Default ports**: 
- Frontend: 5173
- Backend: 3000

---
