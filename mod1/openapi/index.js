const path = require("path");
const codegen = require("swagger-node-codegen");

run = async () => {
  try {
    await codegen.generate({
      swagger: path.resolve(__dirname, "./openapi.yaml"),
      target_dir: path.resolve(__dirname, "./server"),
    });
    console.log("Done!");
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
};

run();
