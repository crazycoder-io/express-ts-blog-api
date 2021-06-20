import { Request, Response, Router } from 'express';

const router = Router();

router
    .get('/index', (req: Request, res: Response) => {
        res.send('welcome');
    })
    .get('/*', (req, res) => {
        const error = new Error('Not Found');
    
        res.status(404).json({
            message: error.message,
        });
    });

export default router;