# How to run this program (with Docker)


---

# How to run this program (without Docker)

To run the program from the source code, the following steps must be followed from the root directory:

```sh
npm install
cd ./backend
npm install
npm run dev # Backend running
cd ./frontend
npm install
npm run dev # Frontend running
```

**Default ports**: 
- Frontend: 5173
- Backend: 3000

---

# Introduction

Develop an application to manage phone numbers of an organisation. This application allows the user to allocate numbers of an organisation.

## Acceptance Criteria

- The application can be used by different organisations. They will be differentiated by their own ID.
- Each organisation can view a list with the users who have a phone number assigned. This list contains the ID/passport, the name and the surname of the user, and the corresponding number.
- A number can be allocated to a user. To do this, it is necessary to send the ID/passport, the name, and the surname.
- The number to allocate must be in a list of available numbers. This list is a master data which will be populated as setup of the project.
- The user can only have one number.

## Technical Information

- All the data will be stored in a MongoDB database.
- The application must be developed in NodeJS in Back End and React in Front End, both must be done with TypeScript.
- Implement the tests that you consider.
- Document the API with OpenAPI.
- Usage of containers is a nice to have.
