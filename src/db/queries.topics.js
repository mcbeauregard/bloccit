const Topic = require("./models").Topic;

module.exports = {

//#1
  getAllTopics(callback){
    return Topic.all()

//#2
    .then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getTopic(id, callback){
    return Topic.findById(id)
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addTopic(newTopic, callback){ // takes two arguments. First, is the arguments, second is the callback to return the new topic.
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
    .then((topic) => {  // when successful, the callabck is passed to the then method for execution, containing the new topic. 
      callback(null, topic); // inside it calls the callback passes into addTopic, with null and the topic that came from the database.
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteTopic(id, callback){
    return Topic.destroy({
      where: {id}
    })
    .then((topic) => {
      callback(null, topic);
    })
    .catch((err) => {
      callback(err);
    })
  }
}