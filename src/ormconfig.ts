import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + "/entities/*.entity{.ts,.js}"],
  logging:true,
 // migrations: ["src/migrations/*.ts"],
  synchronize:true,
  // cli: {
  //   migrationsDir: "src/migrations"
  // },
  
};

export = config;
