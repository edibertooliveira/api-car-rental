import { Router } from 'express';
import { CategoriesController } from '../controllers/';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.post('/', categoriesController.create);
categoriesRouter.get('/imports', categoriesController.import);

export default categoriesRouter;
