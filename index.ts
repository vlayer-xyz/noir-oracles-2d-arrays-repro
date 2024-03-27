import Fastify from "fastify";

const app = Fastify();

let response = {
  id: 2,
  jsonrpc: "2.0",
  result: {
    values: [
      {
        Array: [
          {
            inner: {
              Array: [
                {
                  Single: {
                    inner: "0x",
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  },
};

app.post("/", async (request, reply) => {
  reply.send(response);
});

await app.listen({ port: 5555 });
