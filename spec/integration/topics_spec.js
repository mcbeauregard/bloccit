const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require('../../src/db/models').Post;
const User = require("../../src/db/models").User;

describe("routes : topics", () => {

    beforeEach((done) => {
        this.topic;
        sequelize.sync({force: true}).then(() => {
         Topic.create({
           title: "JS Frameworks",
           description: "There is a lot of them"
         })
          .then((res) => {
            this.topic = res;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          })
        });
      });

  // #1: define the admin user context
  describe("admin user performing CRUD actions for Topic", () => {

    // #2: // before each test in admin user context, send an authentication request
           // to a route we will create to mock an authentication request
         beforeEach((done) => {
           User.create({
             email: "admin@example.com",
             password: "123456",
             role: "admin"
           })
           .then((user) => {
             request.get({         // mock authentication
               url: "http://localhost:3000/auth/fake",
               form: {
                 role: user.role,     // mock authenticate as admin user
                 userId: user.id,
                 email: user.email
               }
             },
               (err, res, body) => {
                 done();
               }
             );
           });
         });
    
    describe("GET /topics", () => {
      it("should respond with all topics", (done) => {
                 request.get(base, (err, res, body) => {
                   expect(err).toBeNull();
                   expect(body).toContain("Topics");
                   expect(body).toContain("JS Frameworks");
                   done();
                 });
               });
             });
  
      describe("GET /topics/new", () => {
  
      it("should render a new topics", (done) => {
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
    
          it("should  a new topic and redirect", (done) => {
            request.post(options,
              (err, res, body) => {
                Topic.findOne({where: { 
                title: "blink-182 songs",
                description: "What's your favorite blink-182 song?"}
              })
                .then((topic) => {
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
            Topic.all()
            .then((topics) => {
              const topicCountBeforeDelete = topics.length;
              expect(topicCountBeforeDelete).toBe(1); 
              request.post(`${base}${this.topic.id}/destroy`, (err, res, body) => {
                Topic.all()
                .then((topics) => {
                  expect(err).toBeNull();
                  expect(topics.length).toBe(topicCountBeforeDelete - 1); 
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
             request.post ({
                url: `${base}${this.topic.id}/update`,
                form: {
                  title: "JavaScript Frameworks",
                  description: "There are a lot of them"
                }
              },
                (err, res, body) => {
                expect(err).toBeNull();
                Topic.findOne({
                  where: { id: 1}
                })
                .then((topic) => {
                  expect(topic.title).toBe("JavaScript Frameworks");
                  done();
                });
              });
          });
        });
    });
    
     // #3: define the member user context
       describe("member user performing CRUD actions for Topic", () => {
    
     // #4: Send mock request and authenticate as a member user
         beforeEach((done) => {
           request.get({
             url: "http://localhost:3000/auth/fake",
             form: {
               role: "member"
             }
           });
               done();
         });
    
    describe("GET /topics", () => {
      it("should return all topics", (done) => {
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
  
      it("should render a new topic form to view", (done) => {
          request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Topics");
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
          }
    
          it("should create a new topic and redirect", (done) => {
              request.post(options,
              (err, res, body) => {
                Topic.findOne({where: {title: "blink-182 songs"}})
                .then((topic) => {
                  expect(topic.title).toBe("blink-182 songs"),
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
            Topic.all()
            .then((topics) => {
              const topicCountBeforeDelete = topics.length;
              expect(topicCountBeforeDelete).toBe(1); // then set the expectation that there should only be one record.
                request.post(`${base}${this.topic.id}/destroy`, (err, res, body) => {
                Topic.all() // get all the topics from the table...
                .then((topics) => {
                  expect(err).toBeNull();
                  expect(topics.length).toBe(topicCountBeforeDelete); // and make sure we reduced the number of topics by one. 
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
                  title: "JS Frameworks",
                  description: "There are a lot of them"
                }
              }
              request.post(options,
                (err, res, body) => {
                expect(err).toBeNull();
                Topic.findOne({
                  where: { id: 1}
                })
                .then((topic) => {
                  expect(topic.title).toBe("JS Frameworks");
                  done();
                });
              });
          });
        });
      });
    });

    //