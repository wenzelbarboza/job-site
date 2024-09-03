### Tasks to complete in backend:
- [ ] Set up JWT authentication for user
  - [X] On login, create session token and refresh token
  - [X] Save refresh token in DB, and then send both tokens to user
  - [x] User verification middleware
  - [x] If session is invalid, check refresh token, if verrified generate session token else error
  - [x] on Logout clear tokens from browser, and from DB

