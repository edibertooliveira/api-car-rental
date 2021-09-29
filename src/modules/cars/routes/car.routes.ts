import { Router } from 'express';
import { CarsController, CarProfileController } from '../controllers';

const carsRouter = Router();

const carsController = new CarsController();
const carProfileController = new CarProfileController();

carsRouter.get('/', carsController.index);

carsRouter.post('/', carsController.create);
carsRouter
  .route('/:id')
  .get(carProfileController.show)
  .put(carProfileController.update)
  .delete(carProfileController.destroy);

export default carsRouter;
