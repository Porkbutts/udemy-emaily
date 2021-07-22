# node-react-fullstack-course

## Pre-requisites

- `node`
- `npm`

## Install

```bash
npm install
```

## Run the application

Create a file called `.env` with the following variables defined:

```bash
# Google OAuth
GOOG_OAUTH_CLIENT_ID=<google oauth client id>
GOOG_OAUTH_CLIENT_SECRET=<google oauth client secret>

# Facebook OAuth
FACEBOOK_OAUTH_CLIENT_ID=<facebook oauth client id>
FACEBOOK_OAUTH_CLIENT_SECRET=<facebook oauth client secret>

# MongoDB connection string
MONGO_URI=<mongo uri>

# Cookie hashing
COOKIE_KEY=<cookie key> 
```

Then start the application in development mode:

```bash
npm run dev
```
