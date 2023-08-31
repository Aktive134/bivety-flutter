import * as dotenv from "dotenv";
dotenv.config();

interface IDATABASE {
   url: string
}

interface IConfig {
    serverPort: string
    saltFactor: number
    Database: IDATABASE
}


const Configuration: IConfig = {
    serverPort: process.env.PORT as string,
    saltFactor: Number(process.env.SALT_FACTOR),
    Database: {
        url: process.env.MONGO_URL as string,
    }
}

export default Configuration;
