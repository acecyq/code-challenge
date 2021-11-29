const https = require("https");

class Datasource {
  constructor(options) {
    this.requestOptions = options;
  }

  requestOptions = {};

  fetchData(options) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let output = "";

        res.on("data", (chunk) => {
          output += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(output));
        });
      });

      req.on("error", (e) => {
        console.error(e);
        reject(e);
      });

      req.end();
    });
  }

  getPrices() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.fetchData(this.requestOptions);
        const prices = response.data.prices;
        resolve(
          prices.map((price) => ({
            ...price,
            mid() {
              return (price.buy + price.sell) / 2;
            },
            quote() {
              return price.pair.substring(3);
            },
          }))
        );
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}

// Testing

requestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  hostname: "static.ngnrs.io",
  method: "GET",
  path: "/test/prices",
  port: 443,
};
const ds = new Datasource(requestOptions);
ds.getPrices()
  .then((prices) => {
    prices.forEach((price) => {
      console.log(
        `Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`
      );
    });
  })
  .catch((error) => {
    console.err(error);
  });
