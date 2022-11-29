import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors'
import db from '../db/connection';


class Server {

    private app: Application;
    private port: String;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }


    // TODO conectar base de datos
    async dbConnection() {

        try {

            await db.authenticate();
            console.log('Database online')

        } catch (error) {
            console.log(error)
        }

    }


    middlewares() {

        // COORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );


        // Carpeta pública
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.apiPaths.usuarios, userRoutes)
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('servidor corriendo ' + this.port)
        })
    }

}

export default Server;