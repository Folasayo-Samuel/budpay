const https = require("https");

const API_BASE_URL = "https://api.budpay.com/api/v2";

class BudpayClient {
  constructor(apiKey, secretKey) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  createPayment(payment) {
    return new Promise((resolve, reject) => {
      const requestData = JSON.stringify(payment);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
      };

      const req = https.request(
        `${API_BASE_URL}/payments`,
        requestOptions,
        (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              const payment = JSON.parse(data);
              resolve(payment);
            } else {
              reject(
                new Error(
                  `Request failed with status ${res.statusCode}: ${data}`
                )
              );
            }
          });
        }
      );

      req.on("error", (error) => {
        reject(error);
      });

      req.write(requestData);
      req.end();
    });
  }

  verifyPayment(paymentId) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      };

      const req = https.request(
        `${API_BASE_URL}/payments/${paymentId}`,
        requestOptions,
        (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              const payment = JSON.parse(data);
              resolve(payment);
            } else {
              reject(
                new Error(
                  `Request failed with status ${res.statusCode}: ${data}`
                )
              );
            }
          });
        }
      );

      req.on("error", (error) => {
        reject(error);
      });

      req.end();
    });
  }

  registerWebhook(webhook) {
    return new Promise((resolve, reject) => {
      const requestData = JSON.stringify(webhook);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
      };

      const req = https.request(
        `${API_BASE_URL}/webhooks`,
        requestOptions,
        (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              const webhook = JSON.parse(data);
              resolve(webhook);
            } else {
              reject(
                new Error(
                  `Request failed with status ${res.statusCode}: ${data}`
                )
              );
            }
          });
        }
      );

      req.on("error", (error) => {
        reject(error);
      });

      req.write(requestData);
      req.end();
    });
  }
}

module.exports = BudpayClient;
