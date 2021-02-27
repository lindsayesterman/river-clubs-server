const app = require("../src/app");
const knex = require("knex");

describe("Endpoints", function () {
  let db;

  console.log(process.env.TEST_DATABASE_URL);

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw("TRUNCATE clubs RESTART IDENTITY CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE clubs RESTART IDENTITY CASCADE")
  );

  function makeClubsArray() {
    return [
      {
        id: 1,
        name: "scrtime saver",
        description: "app for digital minimalism",
        leadership: "",
        topic: "tech",
        date_created: "2029-01-22T16:28:32.615Z",
      },
      {
        id: 2,
        name: "project finder",
        description: "helps young devs build portfolio",
        leadership: "",
        topic: "other",
        date_created: "2029-01-22T16:28:32.615Z",
      },
    ];
  }

  context("Given there are clubs in the database", () => {
    const testClubs = makeClubsArray();

    beforeEach("insert clubs", () => {
      return db.into("clubs").insert(testClubs);
    });

    it("responds with 200 and all of the users", () => {
      return supertest(app).get("/api/clubs").expect(200, testClubs);
    });
  });
});
