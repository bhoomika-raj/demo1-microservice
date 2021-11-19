import { App } from "./note";

const port = process.env.PORT || 2222;
const appInstance = new App();
const app = appInstance.app;

app.listen(port, () => {
  console.log("server is running on port number: " + port);
});
