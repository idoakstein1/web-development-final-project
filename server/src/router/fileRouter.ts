import { Router } from 'express';
import multer from 'multer';
import { getConfig } from '../services';

export const fileRouter = Router();

const base = `http://localhost:${getConfig().port}` + '/';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        console.log('Original filename:', file.originalname);

        const ext = file.originalname
            .split('.')
            .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
            .slice(1)
            .join('.');
        const filename = Date.now() + '.' + ext;

        cb(null, Date.now() + '.' + ext);
    },
});
const upload = multer({ storage });

fileRouter.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).send({ message: 'No file uploaded' });
        return;
    }

    res.status(200).send({ url: base + req.file.path });
});
