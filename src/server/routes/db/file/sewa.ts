import { Router } from 'express';

import * as Mobil from '../../../db/file/mobil';
import * as Sewa from '../../../db/file/sewa';
import * as Supir from '../../../db/file/supir';

declare var module: any,
			__dirname: any,
			require: any;

export const SewaRouter: Router = Router();

SewaRouter
	.post('add', (req, res, next) => {
		Sewa.add(req.body.Sewa)
	})