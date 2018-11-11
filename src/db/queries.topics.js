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
    return Topic.destroy({ // calls the destroy method on the Topic model.
      where: {id} // look for topics where the ID matches the ID passed into the deleteTopic method.
    })
    .then((topic) => {  // when successful, the callabck is passed to the then method for execution, deleting the topic. 
      callback(null, topic); // inside it calls the callback passes into deleteTopic, with null and the topic that came from the database.
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateTopic(id, updatedTopic, callback){
    return Topic.findById(id)
    .then((topic) => {
      if(!topic){
        return callback("Topic not found");
      }

//#1
      topic.update(updatedTopic, {
        fields: Object.keys(updatedTopic)
      })
      .then(() => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}