const rep = require("pactum-json-reporter");
const {
  settings,
  reporter,
  spec,
  request: req,
  response: res,
} = require("pactum");
require("dotenv").config();

req.setBaseUrl("https://gorest.co.in/public/v2");

const token = process.env.TOKEN;
// const id = 5130675;

before(() => {
  settings.setReporterAutoRun(false);
  reporter.add(rep);
});

after(async () => {
  await reporter.end();
});

describe("Show all user", () => {
  before(() => {
    this.spec = spec();
  });

  it("given all user", () => {
    this.spec.get("/users").withBearerToken(token);
  });

  it("should return a response", async () => {
    await this.spec.toss();
  });

  it("should return a status 200", () => {
    this.spec.response().to.have.status(200);
  });

  after(() => {
    this.spec.end();
  });
});

describe("Create a new user success", () => {
  before(() => {
    this.spec = spec();
  });

  it("send a json include name, email, gender, status", () => {
    this.spec.post("/users").withBearerToken(token).withJson({
      name: "Dede2",
      email: "test3345@gmail.com",
      gender: "male",
      status: "inactive",
    });
  });

  it("should return a response", async () => {
    await this.spec.toss().then().catch();
  });

  it("should return a status 201", () => {
    this.spec.expectStatus(201);
  });

  after(() => {
    this.spec.end();
  });
});

describe("Create a new user fail email already exist", () => {
  before(() => {
    this.spec = spec();
  });

  it("send a json include name, email, gender, status", () => {
    this.spec.post("/users").withBearerToken(token).withJson({
      name: "Dede2",
      email: "test3345@gmail.com",
      gender: "male",
      status: "inactive",
    });
  });

  it("should return a response", async () => {
    await this.spec.toss().then().catch();
  });

  it("should return a status 442", () => {
    this.spec.response().to.have.status(442);
  });

  after(() => {
    this.spec.end();
  });
});

describe("Get data user by id", () => {
  before(() => {
    this.spec = spec();
  });

  it("send a parameters id", () => {
    this.spec
      .get("/users/{id}")
      .withBearerToken(token)
      .withPathParams("id", 5130672225);
  });

  it("should return a response", async () => {
    await this.spec.toss().then().catch();
  });

  it("should return a status 200", () => {
    this.spec.response().to.have.status(200);
  });

  after(() => {
    this.spec.end();
  });
});

describe("Get data user by id not found", () => {
  before(() => {
    this.spec = spec();
  });

  it("send a parameters id", () => {
    this.spec
      .get("/users/{id}")
      .withBearerToken(token)
      .withPathParams("id", 5130675221);
  });

  it("should return a response", async () => {
    await this.spec.toss().then().catch();
  });

  it("should return a status 404", () => {
    this.spec.response().to.have.status(404);
  });

  after(() => {
    this.spec.end();
  });
});

describe("Update user by id", () => {
  before(() => {
    this.spec = spec();
  });

  it("send a json only name updated", () => {
    this.spec
      .put("/users/{id}")
      .withBearerToken(token)
      .withPathParams("id", 5130685)
      .withJson({
        name: "CRRRR",
      });
  });

  it("should return a response", async () => {
    await this.spec.toss().then().catch();
  });

  it("should return a status 201", () => {
    this.spec.response().to.have.status(201);
  });

  after(() => {
    this.spec.end();
  });
});

describe("Update user failed id not found", () => {
  before(() => {
    this.spec = spec();
  });

  it("send a json only name updated", () => {
    this.spec
      .put("/users/{id}")
      .withBearerToken(token)
      .withPathParams("id", 5130685111)
      .withJson({
        name: "CRRRR",
      });
  });

  it("should return a response", async () => {
    await this.spec.toss().then().catch();
  });

  it("should return a status 404", () => {
    this.spec.expectStatus(404).returns(res.json);
  });

  after(() => {
    this.spec.end();
  });
});

describe("Delete user by id", () => {
  before(() => {
    this.spec = spec();
  });

  it("send only params id to delete data", () => {
    this.spec
      .put("/users/{id}")
      .withBearerToken(token)
      .withPathParams("id", 5130685);
  });

  it("should return a response", async () => {
    await this.spec.toss().then().catch();
  });

  it("should return a status 204", () => {
    this.spec.response().to.have.status(204);
  });

  after(() => {
    this.spec.end();
  });
});

describe("Delete user failed id not found", () => {
  before(() => {
    this.spec = spec();
  });

  it("send only params id to delete data", () => {
    this.spec
      .put("/users/{id}")
      .withBearerToken(token)
      .withPathParams("id", 5130685);
  });

  it("should return a response", async () => {
    await this.spec.toss().then().catch();
  });

  it("should return a status 404", () => {
    this.spec.response().to.have.status(404);
  });

  after(() => {
    this.spec.end();
  });
});
