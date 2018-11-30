const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Post = require("./models").Post;
const Comment = require("./models").Comment;
const Favorite = require("./models").Favorite;

module.exports = {
  createUser(newUser, callback){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback){

      let result = {};  // result will hold user, posts, and comment
       User.findById(id)
       .then((user) => {

        if(!user) {
           callback(404);
         } else {
    
           result["user"] = user; // stores user
    
           Post.scope({method: ["lastFiveFor", id]}).all()
           .then((posts) => {

            result["posts"] = posts; // stores results of posts
   
             Comment.scope({method: ["lastFiveFor", id]}).all()
             .then((comments) => { //get last five comments
               result["comments"] = comments; // stores comments
               callback(null, result);
             })
             Favorite.scope({method: ["allFavorite", id]}).all()
             .then((favorites) => { //get all favorites
               result["favorites"] = favorites; // stores favorites
               callback(null, result);
             })
             .catch((err) => {
               callback(err);
             })
           })
           .catch((err) => {
            callback(err);
          })
         }
       })
     }
}