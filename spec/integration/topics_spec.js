const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("routes : topics", () => {

    beforeEach((done) => {
        this.topic;
        sequelize.sync({force: true}).then((res) => {
  
         Topic.create({
           title: "JS Frameworks",
           description: "There is a lot of them"
         })
          .then((topic) => {
            this.topic = topic;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
  
        });
  
      });

  describe("GET /topics", () => {
    it("should return a status code 200 and all topics", (done) => {
               request.get(base, (err, res, body) => {
                 expect(res.statusCode).toBe(200);
                 expect(err).toBeNull();
                 expect(body).toContain("Topics");
                 expect(body).toContain("JS Frameworks");
                 done();
               });
             });
           });

    describe("GET /topics/new", () => {

    it("should render a new topic form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Topic");
        done();
        });
     });
        
    });

    describe("POST /topics/create", () => {
        const options = {
          url: `${base}create`,
          form: {
            title: "blink-182 songs",
            description: "What's your favorite blink-182 song?"
          }
        };
  
        it("should create a new topic and redirect", (done) => {
          request.post(options,
            (err, res, body) => {
              Topic.findOne({where: {title: "blink-182 songs"}})
              .then((topic) => {
                expect(res.statusCode).toBe(303);
                expect(topic.title).toBe("blink-182 songs");
                expect(topic.description).toBe("What's your favorite blink-182 song?");
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });

        it("should not create a new topic that fails validations", (done) => {
          const options = {
            url: `${base}/${this.topic.id}/posts/create`,
            form: {
              title: "c",
              description: "d"
            }
          };
    
          request.post(options,
            (err, res, body) => {
              Topic.findOne({where: {title: "c"}})
              .then((topic) => {
                  expect(topic).toBeNull();
                  done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
      });

      describe("GET /topics/:id", () => { // semi-colon in the URI indicates that id is the URL parameter. An id is passed in the request.

        it("should render a view with the selected topic", (done) => {
          request.get(`${base}${this.topic.id}`, (err, res, body) => { // make a request and pass in the ID of the topic we created in the beforeEach call.
            expect(err).toBeNull();
            expect(body).toContain("JS Frameworks"); // set the success code, include the view for the tile of the topic
            done();
          });
        });
   
      });

      describe("POST /topics/:id/destroy", () => {

        it("should delete the topic with the associated ID", (done) => {
   
    //#1 returns all the record in the table (this is a Sequelize model)
          Topic.all()
          .then((topics) => {
   
    //#2  once returned, store the number of topics returned from the database...
            const topicCountBeforeDelete = topics.length;
            expect(topicCountBeforeDelete).toBe(1); // then set the expectation that there should only be one record.
   
    //#3 delete request
            request.post(`${base}${this.topic.id}/destroy`, (err, res, body) => {
              Topic.all() // get all the topics from the table...
              .then((topics) => {
                expect(err).toBeNull();
                expect(topics.length).toBe(topicCountBeforeDelete - 1); // and make sure we reduced the number of topics by one. 
                done();
              })
   
            });
          });
   
        });
   
      });

      describe("GET /topics/:id/edit", () => {

        it("should render a view with an edit topic form", (done) => {
          request.get(`${base}${this.topic.id}/edit`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Edit Topic");
            expect(body).toContain("JS Frameworks");
            done();
          });
        });
   
      });

      describe("POST /topics/:id/update", () => {

        it("should update the topic with the given values", (done) => {
           const options = {
              url: `${base}${this.topic.id}/update`,
              form: {
                title: "JavaScript Frameworks",
                description: "There are a lot of them"
              }
            };
   //#1 call post and pass our object with the URL and form properties we need.
            request.post(options,
              (err, res, body) => {
   
              expect(err).toBeNull();
   //#2 set expectation that there should be no error and that we changed the title of the topic.
              Topic.findOne({
                where: { id: this.topic.id }
              })
              .then((topic) => {
                expect(topic.title).toBe("JavaScript Frameworks");
                done();
              });
            });
        });
   
      });

  });