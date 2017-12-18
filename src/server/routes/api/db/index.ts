import { Router } from 'express';

import { DBFileIndexRouter } from './file/index';

const DBIndexRouter: Router = Router();

DBIndexRouter
	.use('/file', DBFileIndexRouter)

export { DBIndexRouter };
