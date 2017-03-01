"use strict";

module.exports = ({ app, controllers }) => {
    app.post("/venue/comment", controllers.venue.postComment);
    app.get("/venue", controllers.venue.getVenue);
};