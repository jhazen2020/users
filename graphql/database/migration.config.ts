import { DataSource, DataSourceOptions } from "typeorm";
import { typeOrmConfig } from "./typeOrmConfig";

const datasource = new DataSource(typeOrmConfig as DataSourceOptions); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;