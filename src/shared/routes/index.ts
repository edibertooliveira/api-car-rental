import { Router } from 'express';
import carsRouter from '../../modules/cars/routes/car.routes';

const router = Router();

router.use(carsRouter);

export default router;
