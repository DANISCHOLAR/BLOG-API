const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../index.js")


require("dotenv").config()

//

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  describe("GET /blog", () => {
    it("should return all blogs", async () => {
      const res = await request(app).get("/blog");
      expect(res.statusCode).toBe(200);

    });
  });

  describe("GET /blog/:id", () => {
    it("should return a published blog", async () => {
      const res = await request(app).get(
        "blog/636470311483982a73466e47"
      );
        

      expect(res.statusCode).toBe(200);
      // expect(typeof response.body).toBe("object")
    });
  });
  
  