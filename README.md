# PraccHub
Web application that helps Valorant teams practice

## API Endpoints

### Authentication
* Register : `POST /auth/register/`
* Login : `POST /auth/login/`
* Refresh Token : `POST /auth/refresh-token/`
* Revoke Token : `POST /auth/revoke-token/`

#### Email Verification
* Verify Email Token : `GET /auth/verify/:token`
* Resend Email Verification Token : `POST /auth/resend`

#### Password Reset
* Recover Password : `POST /auth/recover`
* Reset Password : `POST /auth/reset/:token`

### Users
* Index : `GET /users`
* Get Myself : `GET /users/myself`
* Update Myself : `PUT /users/myself`
* Delete a User : `DELETE /users/:id/`

### Hubs
* Index : `GET /hubs`
* Get Hub By Id : `GET /hubs/:id`
* Create Hub : `POST /hubs`
* Update Hub : `PUT /hubs/:id`
* Delete Hub : `DELETE /hubs/:id`
* Leave Hub : `POST /hubs/:id/leave`
* Kick Team : `POST /hubs/:id/team/:teamId/kick`
* Request To Join Hub : `POST /hubs/:id/request`
* Accept/Reject Request : `POST /hubs/:id/team/:teamId/request`

### Teams
* Index : `GET /teams`
* Get My Teams : `GET /teams/myself`
* Get Team By Id : `GET /teams/:id`
* Create Team : `POST /teams`
* Update Team : `PUT /teams/:id`
* Delete Team : `DELETE /teams/:id`
* Kick Member : `POST /teams/:id/user/:userId/kick`
* Invite User To Team : `POST /teams/:id/user/:userId/invite`
* Accept Invite : `POST /teams/:id/invite/accept`
* Reject Invite : `POST /teams/:id/invite/reject`
* Set Active Team : `POST /teams/:id/set-active`

### Scrims
* Get By Hub Id : `GET /scrims/hub/:hubId`
* Get By Team Id : `GET /scrims/team/:teamId`
* Get Scrim By Id : `GET /scrims/:id`
* Create Scrim : `POST /scrims`
* Delete Scrim : `DELETE /scrims/:id`
* Request To Join : `POST /scrims/:id/request`
* Accept/Reject Request : `POST /scrims/:id/team/:teamId/request`
* Finish Scrim : `POST /scrims/:id/finish`