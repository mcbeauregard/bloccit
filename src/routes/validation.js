module.exports = {
    validatePosts(req, res, next) {
  
  //#1 checks that the method is a post
      if(req.method === "POST") {
  
  //#2 call checkParams to check topicID, if fails error message called via checkBody
        req.checkParams("topicId", "must be valid").notEmpty().isInt();
        req.checkBody("title", "must be at least 2 characters in length").isLength({min: 2});
        req.checkBody("body", "must be at least 10 characters in length").isLength({min: 10});
      }
  
  //#3 Gather any validation errors
      const errors = req.validationErrors();
  
      if (errors) {
  
  //#4 If there are errors let user know.
        req.flash("error", errors);
        return res.redirect(303, req.headers.referer)
      } else {
        return next();
      }
    }
  }