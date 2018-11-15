const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
//#1 declares 2 variables to represent a topic and post for testing
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Freelance Developers Vancouver",
        description: "Connect with developers, learn about jobs and tools. "
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Test: New to the group",
          body: "Test: My name is Jane.",
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
               })
               .then((topic) => {
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
                  title: "Web desginer jobs",
                  description: "Looking for web designers"
                })
                .then((topic) => {
                  done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Topic.title cannot be null");
                    expect(err.message).toContain("Topic.description cannot be null");
                    done();
           
                })
              });

           });

           describe("#getTopic()", () => {
            it("should return the associated topic", (done) => {
      
             this.post.getTopic()
             .then((associatedTopic) => {
               expect(associatedTopic.title).toBe("Freelance Developers Vancouver");
               done();
             });
           });
         });
      });