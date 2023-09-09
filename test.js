const { spec, request } = require("pactum");

const token =
  "b6a644e3ef96461df7e4ada151a9a0917a5109bf899ffd36f5a8adb1c0843790";
const id = 5122665;
// const token = process.env.TOKEN;
request.setBaseUrl("https://gorest.co.in/public/v2/users");

it("get all data user", async () => {
  await spec().get("/").withBearerToken(token).expectStatus(200).returns(JSON);
});

it("get user data by id", async () => {
  await spec().get(`/${id}`).withBearerToken(token).expectStatus(200)
    .expectJson;
});
