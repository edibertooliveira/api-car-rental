import { Router } from 'express';
import { CategoriesController } from '../controllers/';
import uploadConfig from '@config/multerConfig';
import multer from 'multer';

const upload = multer(uploadConfig.multer);
const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.post('/', categoriesController.create);
categoriesRouter.post(
  '/imports',
  upload.single('file'),
  categoriesController.import,
);

export default categoriesRouter;
