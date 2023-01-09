import express, { RequestHandler, Router } from 'express';
import index from './routes/index';

type Definition = { [key: string]: Definition | RequestHandler; };

class Api {

    public start(port: number): void {
        const app = express();

        // Register the routes.
        app.use(this.registerRoutes(index));

        // Start the server.
        app.listen(port, () => {
            console.log(`⚡Listening on port ${port}`);
        });
    }

    private registerRoutes(definition: Definition): Router {
        const router = Router({ mergeParams: true });

        for (const key in definition) {
            switch (key) {
                case 'post':
                    router.post('/', definition[key] as RequestHandler);
                    break;
                case 'get':
                    router.get('/', definition[key] as RequestHandler);
                    break;
                case 'put':
                    router.put('/', definition[key] as RequestHandler);
                    break;
                case 'delete':
                    router.delete('/', definition[key] as RequestHandler);
                    break;
                default:
                    router.use(key, this.registerRoutes(definition[key] as Definition));
                    break;
            }
        }

        return router;
    }
}

const api = new Api();
export default api;