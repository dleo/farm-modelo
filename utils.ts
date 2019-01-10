import * as del from 'del';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as unzip from 'unzip';
import * as child from 'child_process';
import * as ncp from 'ncp';
import {Api} from "./src/classes/api";
import {SectorService} from "./src/classes/sectors";
import * as moment from "moment";

const zipFilter = function (fileName: string) {
    // zip file only
    if (!fileName.match(/\.(zip)$/)) {
        return false;
    }

    return true;
};
const cleanFolder = function (folderPath) {
    // delete files inside folder but not the folder itself
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

const uploader = function (file: any, options: FileUploaderOption) {
    if (!file) throw new Error('no file(s)');

    return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
};

const _fileHandler = function (file: any, options: FileUploaderOption) {
    if (!file) throw new Error('no file');

    if (options.fileFilter && !options.fileFilter(file.hapi.filename)) {
        throw new Error('type not allowed');
    }

    const orignalname = file.hapi.filename;
    const filename = uuid.v1();
    const path = `${options.dest}${filename}`;
    var fileStream = fs.createWriteStream(path);
    // After write upload file, we must unzip
    fileStream.on('finish', () => {
        fs.createReadStream(path)
            .pipe(unzip.Extract({path: `${options.dest}`}).on('finish', function () {
                commandCaller(options);
            }))
        ;
    });

    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });

        file.pipe(fileStream);

        file.on('end', function (err) {
            const fileDetails: FileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename,
                filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            };
            resolve(fileDetails);
        })
    })
};

const _filesHandler = function (files: any[], options: FileUploaderOption) {
    if (!files || !Array.isArray(files)) throw new Error('no files');

    const promises = files.map(x => _fileHandler(x, options));
    return Promise.all(promises);
};

const commandCaller = function (fileOptions: FileUploaderOption) {
    cleanFolder('modelo_riego');
    ncp(fileOptions.dest, 'modelo_riego', function (err) {
        if (err) {
            return console.error(err);
        }
        child.exec('ls -l', function (error, stdout, stderr) {
            _readFileToJson();
            if (error) {
                return console.error(error);
            }
        });
    })
};

const _readFileToJson = function () {
    var obj;
    fs.readFile('plan_de_riego.json', 'utf8', function (err, data) {
        if (err) throw err;
        // Map sectors
        const sectors = new SectorService(new Api());

        sectors.getSectors().then(() => {
            obj = JSON.parse(data);
            let api = new Api();
            obj.forEach(function (value) {
                const sector = sectors.map(value.sector);
                if (typeof sector == 'undefined') {
                    console.error("Can't call service");
                    return;
                }
                // TODO Calculate the endtime
                const end = moment(value.dateTime);
                const sectorsParam = [];
                sectorsParam.push(sector.id);
                let params = {
                    'sectors': sectorsParam,
                    'start': moment(value.dateTime).format('YYYY-MM-DD HH:mm:ss'),
                    'end': end.add(6, 'h').format('YYYY-MM-DD HH:mm:ss')
                };
                api.post('programmingirrigations', params)
                    .then(function (messages) {
                        console.log(messages)
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
        });

    });
};

export {zipFilter, cleanFolder, uploader}
