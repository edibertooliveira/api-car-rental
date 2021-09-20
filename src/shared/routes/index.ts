import { Router } from 'express';
import carsRouter from "../../modules/cars/routes/car.routes";

const router = Router();

router.use('/cars', carsRouter)

export default router