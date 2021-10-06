import BaseRouter from './baseRouter';

class IndexRouter extends BaseRouter {
    constructor() {
        super();
        this.connectEndpoints();
    }

    private connectEndpoints(): void {
        this.router.get('/index', this.indexController.index);
        this.router.get('/*', this.indexController.unknown);
    }
}

const router = new IndexRouter().router;
router.use('/', router);

export default router;
