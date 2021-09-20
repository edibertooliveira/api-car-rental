import { Router } from 'express';
import CarsController from "../controllers/CarsController";

const carsRouter = Router();

const carsController = new CarsController();

carsRouter.get(
  '/', carsController.index
);

carsRouter.post(
    '/', carsController.create
);

export default carsRouter;