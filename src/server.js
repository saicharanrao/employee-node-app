import Routes from './routes';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

class Server {

    constructor() {
        this.app = express();
        this.app.use(cors());
        // parse application/json
        this.app.use(bodyParser.json());
        this.port = 3000;
        this.app.listen(this.port);

        // Register Routes
        new Routes(this.app);
    }

}

new Server();
