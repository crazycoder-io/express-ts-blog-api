import { Request, Response } from 'express';

class IndexController {
    public index(req: Request, res: Response): void {
        res.send('welcome');
    }

    public unknown(req: Request, res: Response): void {
        const error = new Error('Not Found');
        
        res.status(404).json({
            message: error.message,
        });
    }
}

export default IndexController;
