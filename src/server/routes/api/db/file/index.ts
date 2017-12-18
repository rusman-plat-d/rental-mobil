import { Router } from 'express';
import { MobilRouter } from './mobil';

const DBFileIndexRouter: Router = Router();

DBFileIndexRouter
	.use('/mobil', MobilRouter)

export { DBFileIndexRouter }
