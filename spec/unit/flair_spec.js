const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Win contests",
        description: "Find travel, cash, and gift card contests"
      })
      .then((topic) => {
        this.topic = topic;

        Flair.create({
          name: "Gas card",
          color: "blue",
          topicId: this.topic.id
        })
        .then((falir) => {
          this.flair = flair;
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
    // this is a test for our create method of our post model
    it("should create a flaie object with a name, color, and assigned topic", (done) => {
        //#1 creates post & associates it with topic id
               Falir.create({
                 name: "Travel contests",
                 color: "Purple",
                 topicId: this.topic.id
               })
               .then((flair) => {
                 expect(flair.name).toBe("Travel contests");
                 expect(flair.color).toBe("Purple");
                 done();
        
               })
               .catch((err) => {
                 console.log(err);
                 done();
               });
             });
        
             it("should not create a flair with missing name, color, or assigned topic", (done) => {
                Flair.create({
                  name: "Electronic contests"
                })
                .then((flair) => {
                  done();
                })
                .catch((err) => {
                  expect(err.message).toContain("Flair.color cannot be null");
                  expect(flair.topicId).toContain("Flair.topicID cannot be null");
                  done();
           
                })
              });

           });
  

  describe("#setTopic()", () => {

    it("should associate a topic and a flair together", (done) => {
      Topic.create({
        title: "Win contests",
        description: "Find travel, cash, and gift card contests"
      })
      .then((newTopic) => {
        expect(this.flair.topicId).toBe(this.topic.id);
        this.flair.setTopic(newTopic)
        .then((flair) => {
          expect(flair.topicId).toBe(newTopic.id);
          done();
        });
      })
    });
    });

    describe("#getTopic()", () => {

        it("should return the associated topic", (done) => {
   
          this.flair.getTopic()
          .then((associatedTopic) => {
            expect(associatedTopic.title).toBe("Win contests");
            done();
          });
   
        });
   
      });

  });