// CONTROLER
// define and export an object that contains multiple functions.

module.exports = {
    index(req, res, next){   // define function called index, which will contain a route handler for the / route in src/routes/static.js.
        res.render("static/index", {title: "Welcome to Bloccit"});
    }
  }