"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
  name: "api",
  mixins: [ApiGateway],

  // More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
  settings: {
    port: process.env.PORT || 3000,

    routes: [
      {
        path: "/api",
        whitelist: [
          // Access to any actions in all services under "/api" URL
          "**"
        ],
        onBeforeCall(ctx, route, req, res) {
          if (req.headers["authorization"])
            ctx.meta.authorization = req.headers["authorization"];
        }
      }
    ]

    // Serve assets from "public" folder
  }
};
