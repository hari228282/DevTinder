# DevTinder APIs

### authRouter
- POST /signup
- POST /login
- POST /logout

### profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

### connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:userId
- POST /request/review/rejected/:userId


### userRouter
- GET /uer/connections
- GET /user/requests/recieved
- GET /user/feed/ - Gets you the profiles of other on platform

Status: ignore, interested, accepted, rejected