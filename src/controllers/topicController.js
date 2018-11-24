const topicQueries = require("../db/queries.topics.js");
const Authorizer = require("../policies/topic");

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
        const authorized = new Authorizer(req.user).new();
   
        if(authorized) {
          res.render("topics/new");
        } else {
          req.flash("notice", "You are not authorized to do that.");
          res.redirect("/topics");
        }
      },

      create(req, res, next){
            const authorized = new Authorizer(req.user).create();
       
            if(authorized) {
              let newTopic = {
                title: req.body.title,
                description: req.body.description
              };
              topicQueries.addTopic(newTopic, (err, topic) => {
                if(err){
                  res.redirect(500, "topics/new");
                } else {
                  res.redirect(303, `/topics/${topic.id}`);
                }
              });
            } else {
              req.flash("notice", "You are not authorized to do that.");
              res.redirect("/topics");
            }
          },

  show(req, res, next){
         topicQueries.getTopic(req.params.id, (err, topic) => { // we use re.params because the information we need is in the URL, i.e. the value 5 is stored in ID. We must use ID to define this route.
           if(err || topic == null){  // check error or topic with no record
             res.redirect(404, "/"); //  if err or null is found, return a not found status code, and then redirect to root page.
           } else {
             res.render("topics/show", {topic}); // otherwise, return the SHOW partial view and pass the topic record and render it.
           }
         });
       },

   destroy(req, res, next){

     topicQueries.deleteTopic(req, (err, topic) => {
       if(err){
         res.redirect(err, `/topics/${req.params.id}`)
       } else {
         res.redirect(303, "/topics")
       }
     });
   },
    
      edit(req, res, next){
            topicQueries.getTopic(req.params.id, (err, topic) => {
              if(err || topic == null){
                res.redirect(404, "/");
              } else {
                const authorized = new Authorizer(req.user, topic).edit();
                if(authorized){
                  res.render("topics/edit", {topic});
                } else {
                  req.flash("You are not authorized to do that.")
                  res.redirect(`/topics/${req.params.id}`)
                }
              }
            });
          },

  update(req, res, next){
     topicQueries.updateTopic(req, req.body, (err, topic) => {
       if(err || topic == null){
         res.redirect(401, `/topics/${req.params.id}/edit`);
       } else {
         res.redirect(`/topics/${req.params.id}`);
       }
     });
   }
}
//