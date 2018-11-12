const advertisementQueries = require("../db/queries.advertisement.js");

module.exports = {
    index(req, res, next){
        advertisementQueries.getAllaAdvertisements((err, advertisements) => {

            //#3
                    if(err){
                      res.redirect(500, "static/index");
                    } else {
                      res.render("advertisements/index", {advertisements});
                    }
                  })
    }
  }