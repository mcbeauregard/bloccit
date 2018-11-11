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
  },

  show(req, res, next){

    //#1 show action
         topicQueries.getTopic(req.params.id, (err, topic) => { // we use re.params because the information we need is in the URL, i.e. the value 5 is stored in ID. We must use ID to define this route.
    
    //#2 callback
           if(err || topic == null){  // check error or topic with no record
             res.redirect(404, "/"); //  if err or null is found, return a not found status code, and then redirect to root page.
           } else {
             res.render("topics/show", {topic}); // otherwise, return the SHOW partial view and pass the topic record and render it.
           }
         });
       },

    destroy(req, res, next){
        topicQueries.deleteTopic(req.params.id, (err, topic) => {  // calls deleteTopic and passes the URL for the topic ID.
          if(err){
            res.redirect(500, `/topics/${topic.id}`) // if error, return a server error and redirect to show view.
          } else {
            res.redirect(303, "/topics") // otherwise, it's a success and redirect to the /topics path.
          }
        });
      }   
}