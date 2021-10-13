import { Router } from "express";
import IndexController from "../controllers";

export default class BaseRouter {
    public router: Router;
    indexController: IndexController;

    constructor() {
        this.router = Router();
        this.indexController = new IndexController();
    }
}
