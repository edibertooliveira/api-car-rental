import { Router } from 'express';
import carsRouter from '@modules/cars/infra/http/routes/car.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/category.routes';

const router = Router();

router.use('/cars', carsRouter);
router.use('/categories', categoriesRouter);

export default router;
