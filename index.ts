import { Server } from 'hapi';
import * as Boom from 'boom';
import * as path from 'path'
import * as fs from 'fs';
import {
    uploader, cleanFolder, zipFilter
} from "./utils";

// setup
const UPLOAD_PATH = 'uploads';
const fileOptions: FileUploaderOption = { dest: `${UPLOAD_PATH}/`, fileFilter: zipFilter };

cleanFolder(UPLOAD_PATH);
if (!fs.existsSync(UPLOAD_PATH)) fs.mkdirSync(UPLOAD_PATH);

// app
const app = new Server({
    port: 3001,
    host: 'localhost',
    routes: {
        cors: true
    }
});

app.route({
    method: 'POST',
    path: '/upload',
    options: {
        payload: {
            output: 'stream',
            allow: 'multipart/form-data'
        }
    },
    handler: async function (request, h) {
        try {
            const data = request.payload;
            const file = data['file']; // accept file field

            //save on disk
            const fileDetails = await uploader(file, fileOptions);
            //console.log(fileDetails);
            return {sucess: true};
        } catch (err) {
            return Boom.badRequest(err.message, err);
        }
    }
});

const init = async () => {
    await app.start();
    console.log(`Server running at: ${app.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();