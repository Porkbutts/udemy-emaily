// eslint-disable-next-line consistent-return
module.exports = (minCredits) => (req, res, next) => {
  if (req.user.credits < minCredits) {
    return res.status(403).send({ error: `Insufficient credits. You need at least ${minCredits} credits!` });
  }
  next();
};
