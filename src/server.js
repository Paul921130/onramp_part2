// src/server.js
import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
    let server = createServer({
        environment,

        models: {
            user: Model,
            propertie: Model,
        },

        seeds(server) {
            server.create("propertie", {
                city: "Attleboro",
                state: "Georgia",
                type: "Apartment",
                price: "218",
            });

            server.create("propertie", {
                city: "Enterprise",
                state: "Georgia",
                type: "Condo",
                price: "696",
            });

            server.create("propertie", {
                city: "Enterprise",
                state: "Georgia",
                type: "Apartment",
                price: "2196",
            });
            server.create("propertie", {
                city: "Enterprise",
                state: "Georgia",
                type: "Apartment",
                price: "4496",
            });

            server.create("propertie", {
                city: "South Hill",
                state: "Georgia",
                type: "Condo",
                price: "696",
            });
            server.create("propertie", {
                city: "Enterprise",
                state: "Wyoming",
                type: "Condo",
                price: "696",
            });

            server.create("propertie", {
                city: "South Hill",
                state: "Montana",
                type: "Condo",
                price: "1190",
            });
        },

        routes() {
            this.namespace = "api";
            this.timing = 4000; // default
            this.get("/properties", (schema) => {
                console.log(schema);
                return schema.properties.all();
            });
        },
    });

    return server;
}
