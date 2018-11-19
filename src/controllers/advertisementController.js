const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
    index(req, res, next){
        advertisementQueries.getAllAdvertisements((err, advertisements) => {

            //#3
                    if(err){
                      res.redirect(500, "static/index");
                    } else {
                      res.render("advertisements/index", {advertisements});
                    }
                  })
    },

    new(req, res, next){
        res.render("advertisements/new");
    },

    create(req, res, next){ 
        let newAdvertisement = {
        title: req.body.title,
        description: req.body.description
        };
        advertisementQueries.addAdvertisement(newAdvertisement, (err, advertisement) => { 
        if(err){  
            res.redirect(500, "/advertisements/new");
        } else { 
            res.redirect(303, `/advertisements/${advertisement.id}`);
        }
        });
    },

    show(req, res, next){

        //#1 show action
        advertisementQueries.getAdvertisement(req.params.id, (err, advertisement) => { // we use re.params because the information we need is in the URL, i.e. the value 5 is stored in ID. We must use ID to define this route.
        
        //#2 callback
            if(err || advertisement == null){  // check error or advertisement with no record
                res.redirect(404, "/"); //  if err or null is found, return a not found status code, and then redirect to root page.
            } else {
                res.render("advertisements/show", {advertisement}); // otherwise, return the SHOW partial view and pass the advertisement record and render it.
            }
            });
        },

        destroy(req, res, next){
            advertisementQueries.deleteAdvertisement(req.params.id, (err, advertisement) => {  // calls deleteAdvertisement and passes the URL for the advertisement ID.
            if(err){
                res.redirect(500, `/advertisements/${advertisement.id}`) // if error, return a server error and redirect to show view.
            } else {
                res.redirect(303, "/advertisements") // otherwise, it's a success and redirect to the /advertisements path.
            }
            });
        },
        
        edit(req, res, next){ // edit action
            advertisementQueries.getAdvertisement(req.params.id, (err, advertisement) => { // use the getAdvertisement method to get the advertisement with matching ID.
            if(err || advertisement == null){
                res.redirect(404, "/");
            } else {
                res.render("advertisements/edit", {advertisement}); // otherwise, render edit view
            }
            });
        },

        update(req, res, next){ // update action

            //#1 calls updateAdvertisement and pass ID from the URL and body request, which contains the key-value pairs we want to update
            advertisementQueries.updateAdvertisement(req.params.id, req.body, (err, advertisement) => {
            
            //#2
                if(err || advertisement == null){
                    res.redirect(404, `/advertisements/${req.params.id}/edit`); // if error found, return 404 and redirect to edit view
                } else {
                    res.redirect(`/advertisements/${advertisement.id}`); // otherwise, render the updated SHOW view with the newly updated advertisement
                }
                });
            }
    }