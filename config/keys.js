module.exports = {
  googleClientID: process.env.GOOG_OAUTH_CLIENT_ID,
  googleClientSecret: process.env.GOOG_OAUTH_CLIENT_SECRET,
  mongoURI: `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.ayxvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  cookieKey: process.env.COOKIE_KEY,
};
