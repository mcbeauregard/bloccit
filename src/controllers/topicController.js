const topicQueries = require("../db/queries.topics.js");

module.exports = {
  index(req, res, next){
     topicQueries.getAllTopics((err, topics) => {
       if(err){
         res.redirect(500, "static/index");
       } else {
         res.render("topics/index", {topics});
       }
     })
  },
  new(req, res, next){
    res.render("topics/new");
  },
  create(req, res, next){ // grabs value from the body property of the request and assigns them to a JavaScript object. 
    let newTopic = {
      title: req.body.title,
      description: req.body.description
    };
    topicQueries.addTopic(newTopic, (err, topic) => { // calls addTopic method and passed the onject as an argument.
      if(err){  // if there's an error, send error code and redirect back to the new view.
        res.redirect(500, "/topics/new");
      } else {  // otherwise, send a success code and redirect to the show view for the new topic.
        res.redirect(303, `/topics/${topic.id}`);
      }
    });
  }
}