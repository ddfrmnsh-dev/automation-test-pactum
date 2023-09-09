const pjr = require("pactum-json-reporter");
const { settings, reporter, spec, request } = require("pactum");
require("dotenv").config();
request.setBaseUrl("https://gorest.co.in/public/v2/users");
// const token =
//   "b6a644e3ef96461df7e4ada151a9a0917a5109bf899ffd36f5a8adb1c0843790";
// global hook
const token = process.env.TOKEN;
before(() => {
  settings.setReporterAutoRun(false);
  reporter.add(pjr);
});

// global after block
after(async () => {
  await reporter.end();
});

describe("should have a user with name bolt", () => {
  before(() => {
    this.spec = spec();
  });

  it("given a user is requested", () => {
    this.spec.get("/").withBearerToken(token);
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

describe("should have a user with name bolt", () => {
  before(() => {
    this.spec = spec();
  });

  it("given a user is requested", () => {
    this.spec.get("/").withBearerToken(token);
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
