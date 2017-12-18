import { join } from 'path';

import { Router } from 'express';
import * as multer from 'multer';

import * as Mobil from '../../../../db/file/mobil';

declare var module: any,
			__dirname: any,
			require: any;

const MobilRouter: Router = Router();
const dest = join(__dirname, '..', '..', '..', '..', 'public', 'uploads', 'mobil');
const upload = multer({
	// dest,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dest)
		},
		filename: (req, file, cb) => {
			const [name, ext] = file.originalname.split('.');
			cb(null, name.replace(/\s/g, '-') + '-' + Date.now() + '.' + ext)
		}
	})
})

MobilRouter
	.post('/post', upload.single('photo'), (req, res) => {
		console.log('POST: /api/db/file/mobil/post')
		const { mobil } = req.body;
		mobil.image = req.file.filename;
		Mobil.add(mobil);
		res.send('Post success')
	})
	.get('/get/:id', (req, res) => {
		res.json(Mobil.get(req.params.id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/mobil/gets')
		res.json(Mobil.gets())
	})
	.put('/put', upload.single('photo'), (req, res) => {
		console.log('PUT: /api/db/file/mobil/put')
		const { mobil } = req.body;
		if ( req.file ) {
			mobil.image = req.file.filename;
		}
		Mobil.update(mobil)
		res.send('Put success')
	})
	.delete('/delete/:id', (req, res) => {
		Mobil.remove(req.params.id)
		res.send('Delete success')
	})

export { MobilRouter }
