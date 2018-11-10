const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController"); // imports staticController module

// ROUTER
// Calls get method on router. Accepts a get request. 
// The Router instance also defines methods for the other HTTP verbs, such as  POST and DELETE.
// A route handler must complete the request so that the next function in the middleware chain can execute. 
router.get("/", staticController.index);
router.get("/", staticController.about);

module.exports = router;