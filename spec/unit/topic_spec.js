const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
//#1 declares 2 variables to represent a topic and post for testing
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

//#2 creates topic and stores in database
      Topic.create({
        title: "Freelance Developers Vancouver",
        description: "Connect with developers, learn about jobs and tools. "
      })
      .then((topic) => {
        this.topic = topic;
//#3 creates post
        Post.create({
          title: "Test: New to the group",
          body: "Test: My name is Jane.",
//#4 associate topic id with this post
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
});

    describe("#create()", () => {
    // this is a test for our create method of our topic model
    it("should create a topic object with a title, description, and assigned topic", (done) => {
        //#1 creates topic & associates it with topic id
               Topic.create({
                 title: "Web desginer jobs",
                 description: "Looking for web designers",
                 topicId: this.topic.id
               })
               .then((topic) => {
        
        //#2 ensures topic is saved successfully
                 expect(topic.title).toBe("Web desginer jobs");
                 expect(topic.description).toBe("Looking for web designers");
                 done();
        
               })
               .catch((err) => {
                 console.log(err);
                 done();
               });
             });

             it("should not create a topic with a missing title, description.", (done) => {
                Topic.create({
                  title: "Web desginer"
                })
                .then((post) => {
                  done();
           
                })
                .catch((err) => {
           
                  expect(err.message).toContain("Topic.description cannot be null");
                  done();
           
                })
              });

           });

    describe("#getPosts()", () => {

        it("should return the associated posts with the topic method it was called on.", (done) => {
   
          this.topic.getPosts()
          .then((posts) => {
            expect(posts[0].title).toBe("Test: New to the group");
            expect(posts[0].description).toBe("Test: My name is Jane.");
            done();
          });
   
        });
   
      });

  });


  
