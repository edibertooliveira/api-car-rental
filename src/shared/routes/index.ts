import { Router } from 'express';
import carsRouter from '../../modules/cars/routes/car.routes';
import docsRouter from './doc.routes';

const router = Router();

router.use('/cars', carsRouter);
router.use(docsRouter);

export default router;
