import { fastifyCors } from "@fastify/cors";
import fastifySwagger, { type SwaggerOptions } from "@fastify/swagger";
import {
  fastify,
  type FastifyPluginCallback,
  type RawServerDefault,
} from "fastify";
import {
  jsonSchemaTransform,
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import ScalarApiReference from "@scalar/fastify-api-reference";
import { listWebhooks } from "./routes/list-webhooks";
import { env } from "./env";
import { getWebhook } from "./routes/get-webhook";
import { deleteWebhook } from "./routes/delete-webhook";

const app = fastify().withTypeProvider<ZodTypeProvider>();

const swaggerPlugin = fastifySwagger as FastifyPluginCallback<
  SwaggerOptions,
  RawServerDefault,
  ZodTypeProvider
>;

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  //   credentials: true,
});

app.register(swaggerPlugin, {
  openapi: {
    info: {
      title: "Webhook Inspector API",
      description: "Api for capturing and inspecting webhook requests",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, { routePrefix: "/docs" });

app.register(listWebhooks);
app.register(getWebhook);
app.register(deleteWebhook);

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running on http://localhost:3333");
  console.log("Docs available on http://localhost:3333/docs ");
});
