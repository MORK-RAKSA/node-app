
// src/server.ts
import app from "@/src/app"
import configs from "@/src/config";
import {connectMongoDB} from './database/connectMongoDB'; 

async function run() {
  await connectMongoDB();
  app.listen(configs.port, () => {
    console.log(`User Service running on Port: ${configs.port}`)
  })
}

run();
