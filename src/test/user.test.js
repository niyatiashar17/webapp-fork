const supertest = require("supertest");
const app = require("../../index.js");
require("dotenv").config();
const logger = require("../logger/logger");
//const { request } = require("chai");
// const dotenv = require("dotenv");
// dotenv.config();
const request01 = supertest(app);
//const app = require("../router/router");
//const chai = require("chai");
//const chai = await import("chai");
//const expect = chai.expect;
//require("mysql2/node_modules/iconv-lite").encodingExists("foo");
const accountData = {
  username: "aws123@northeastern.edu",
  firstName: "Test",
  lastName: "Updated",
  password: "Test@1234",
};

describe("HealthCheck", () => {
  describe("/healthz endpoint", () => {
    it("should return a 200 status when the database is available", async () => {
      try {
        logger.debug("Debugging Health Check", { severity: "DEBUG" });
        logger.info("Health check initiated", { severity: "INFO" });
        await request01.get("/healthz").expect(200);
      } catch (error) {
        logger.error(`Health check failed ${error}`, { severity: "ERROR" });
        throw error;
      }
    });
  });
});

describe("userrouter", () => {
  describe("Post endpoint", () => {
    it("should create account and validate", async () => {
      try {
        logger.debug("Debugging Initiating  account creation", {
          severity: "DEBUG",
        });
        logger.info("Account creation initiated", { severity: "INFO" });
        await request01.post("/v2/user").send(accountData).expect(201);
        logger.info("Account created successfully", { severity: "INFO" });

        //.set("Authorization", authHeader)
        //.end((error, res) => {
        //if (error) {
        //console.error("test failed", err);
        //return done(error);
        //process.exit(1);
        //}
        //else {
        //console.error("test pass", err);
        //process.exit(1);
        //}

        //it("GET endpoint", (done) => {
        // Once the account is created, make a GET request to validate its existence

        //basic authentication credentials
        const authHeader =
          "Basic " +
          Buffer.from(
            `${accountData.username}:${accountData.password}`
          ).toString("base64");

        logger.info("Validating account existence", { severity: "INFO" });
        const data = await request01
          .get("/v2/user/self")
          .set("Authorization", authHeader)
          .expect(200);
        logger.info("Account validation successful", { severity: "INFO" });

        // .end((getError, getRes) => {
        //   if (getError) {
        //     return done(getError);
        //   }
        // Assert that the user details match what was created
        // expect(getRes.body.username).toEqual(accountData.username);
        // expect(getRes.body.firstName).toEqual(accountData.firstName);
        // expect(getRes.body.lastName).toEqual(accountData.lastName);
      } catch (error) {
        console.log(error);
        logger.error(`Account creation/validation failed ${error}`, {
          severity: "ERROR",
        });
        throw error;
      }
    });
  });
});

describe("userrouter", () => {
  describe("Put endpoint", () => {
    it("should update the account and validate the update happening", async () => {
      try {
        const updatedData = {
          password: "Updatedtest@1234",
          firstName: "ABC",
          lastName: "XYZ",
        };
        const authHeader1 =
          "Basic " +
          Buffer.from(
            `${accountData.username}:${accountData.password}`
          ).toString("base64");
        logger.info("Account update initiated", { severity: "INFO" });
        await request01
          .put("/v2/user/self")
          .set("Authorization", authHeader1)
          .send(updatedData)
          .expect(204);
        logger.info("Account updated successfully", { severity: "INFO" });
        const authHeader =
          "Basic " +
          Buffer.from(
            `${accountData.username}:${updatedData.password}`
          ).toString("base64");

        logger.info("Validating account update", { severity: "INFO" });
        const data = await request01
          .get("/v2/user/self")
          .set("Authorization", authHeader)
          .expect(200);
        logger.info("Account update validation successful", {
          severity: "INFO",
        });

        // This will inform root suite about the completion of tests
      } catch (error) {
        logger.error(`Account update/validation failed ${error}`, {
          severity: "ERROR",
        });
        throw error;
      }
    });
  });
});

// after(function () {
//   console.log("hi");
// });
