const User = require("../user/model-user");
const { toData } = require("./jwt");

function auth(req, res, next) {
  console.log("==============", req.headers);

  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  console.log("---------------", auth);
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      console.log(data);
      User.findByPk(data.id)
        .then(user => {
          if (!user) return next("User does not exist");

          req.user = user;
          next();
        })
        .catch(next);
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
}

module.exports = auth;
