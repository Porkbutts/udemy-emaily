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

# Stripe payment processing
STRIPE_PUB_KEY=<stripe public key>
STRIPE_SECRET_KEY=<stripe private key>

# SendGrid email API key
SEND_GRID_API_KEY=<sendgrid api key>

# Used in the email response link. Set to localhost in development, or the prod URL in prod.
REDIRECT_DOMAIN=http://localhost:3000
```

Then start the application in development mode:

```bash
npm run dev
```

This will start the express server and react client.

## Services and infrastructure used
The app uses free-tier of multiple services:
- Heroku: hosts the application
- MongoDB: NoSQL database
- Stripe: payments processing
- SendGrid: email service
