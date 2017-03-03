"use strict";

module.exports = ({ app, controllers }) => {
    app.post("/venue/comment", controllers.venue.postComment);
    app.get("/venue/:googleId", controllers.venue.getVenue);
    app.get("/venue/:googleId/:username", controllers.venue.getVenueToUser);
};