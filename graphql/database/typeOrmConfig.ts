import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'; 

dotenv.config();

export const typeOrmConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt( process.env.DB_PORT || '5432' ),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: ['dist/database/migrations/**/*.js'],
    cli: {
        migrationsDir: 'database/migrations',
    },
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    extends: "./../../tsconfig.json",
    compilerOptions: {
        module: "commonjs"
      }
    
};