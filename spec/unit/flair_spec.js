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
          color: "Blue",
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
});

    describe("#create()", () => {
    // this is a test for our create method of our post model
    it("should create a flaie object with a name, color, and assigned topic", (done) => {
        //#1 creates post & associates it with topic id
               Flair.create({
                 name: "Travel contests",
                 color: "Purple",
                 topicId: this.topic.id
               })
               .then((flair) => {
                 expect(flair.name).toBe("Travel contests");
                 expect(flair.color).toBe("Purple");
                 expect(flair.topicId).toBe(this.topic.id);
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
                  done();
           
                })
              });
           });
  });