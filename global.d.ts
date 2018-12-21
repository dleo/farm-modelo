// Type definitions for model micro service
// Project: Model Micro Service
// Definitions by: David Lopez <dleo.lopez@gmail.com>
interface FileUploaderOption {
    dest: string;
    fileFilter?(fileName: string): boolean;
}

interface FileDetails {
    fieldname: string;
    originalname: string;
    filename: string;
    mimetype: string;
    destination: string;
    path: string;
    size: number;
}