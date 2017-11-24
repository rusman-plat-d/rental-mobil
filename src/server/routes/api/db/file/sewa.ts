import { Router } from 'express';
import * as multer from 'multer';

import * as Sewa from '../../../../db/file/sewa';

declare var module: any,
			__dirname: any,
			require: any;

const SewaRouter: Router = Router();

SewaRouter
	// .use((req, res, next) => {
	// 	res.set('Access-Control-Allow-Origin', '*')
	// 	next()
	// })
	.post('/post', (req, res) => {
		console.log('POST: /api/db/file/sewa/post')
		const sewa: Sewa.Sewa = req.body.data;
		Sewa.add(sewa);
		res.json({success: true})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/sewa/get/'+id)
		res.json(Sewa.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/sewa/gets')
		res.json(Sewa.gets())
	})
	.put('/put', (req, res) => {
		console.log('PUT: /api/db/file/sewa/put')
		const sewa: Sewa.Sewa = req.body.data;
		Sewa.update(sewa)
		res.json({success: true})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/sewa/delete/'+id)
		Sewa.remove(id)
		res.json({success: true})
	})

export { SewaRouter }
