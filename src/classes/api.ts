import * as request from "request";
import * as requestPromise from "request-promise";

interface Options {
    method: string,
    url?: string,
    uri?: string,
    headers: any,
    formData?: any,
    body?: any,
    json?: boolean,
    form?: any
}

class Api {
    URL: string;
    readonly headers: any;
    //TODO Make a token for this API
    constructor() {
        this.URL = 'http://farm-api.test/api/';
        this.headers = {
            'cache-control': 'no-cache',
            Accept: 'application/json',
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE3ZTI5MDdlODU1N2JjNmI4MGM5YjFlMjBlZjhmNTU5MjM5MjM2ODUwNDdkNGQwMzI1OGZjYmQ3ODNjM2MzNWQ3YjYxMjUyMzczZmQzMWEwIn0.eyJhdWQiOiIxIiwianRpIjoiYTdlMjkwN2U4NTU3YmM2YjgwYzliMWUyMGVmOGY1NTkyMzkyMzY4NTA0N2Q0ZDAzMjU4ZmNiZDc4M2MzYzM1ZDdiNjEyNTIzNzNmZDMxYTAiLCJpYXQiOjE1MzczNjc0NzUsIm5iZiI6MTUzNzM2NzQ3NSwiZXhwIjoxNTY4OTAzNDc1LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.idEDWC74fTEb16Uq3SxYuTXiBZcyhp0tIPq_FFarQKeWCSwn1bd5mr_5uVdjUzo3rnOpnNnCiC3G8odPjTlYWNSYcyrdn79gNymZxAzdjQJ5ugd1tDAsP20dNicyrntkRsZ6PijEOdzeciNQqb6S0G-Ez2fKhytnJ6tQQAb1xVhAgh0ZI_jPqdizweBx-WeDB1N-7qE1IMkCSqxo1r00Sg1aVLYtWUMtqkHIGsTNep5dm63iJ-k7rM3oTPxe55h_371cewAqwn7u0tYaGMFbGt2VE1s42rZ928AX7cH94O57fPdnba0bcQCZkohFHN0we1b6Q4vSNNbCkyuwYSuZXavpYi5Gmnz55NOI3TW5PacbbgiAGtzfszcBkTmrr0CCCJBO3QjaX5hJXxd4KDkbge0XijiDLATzdiI2Byo3FTjeBcBy_M0aSpjHIouLlkr1eYDOKFRpHMTNjiI4B-p8NBbgl0Dq-Abk6bZ5DXJiATekGI09h1QCuh_3Dnnf0K9bcGCoCkjD-nVQ9vyYOvemdxz3pXTIuozyJM8tobH3HWLx3XmrGXLFrd3jIlF72BaeYWlGzWXUPVnKhnXdVqcC8ICy8OASMDScc3N5Hl3RBK8Gb3RrS-_VQGVOS0kA0xOi75e1w9Usb3j0eAK4mKjBGaa0kGMun0Tg_PIWUsyUwKk',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        };
    }

    post(append: string, params?: any) {
        const options: Options = {
            method: 'POST',
            uri: this.URL + append,
            headers: this.headers,
            form: params
        };
        return requestPromise(options);
    }

    // Build get verb
    get(append: string, params?: any) {
        const options: Options = {
            method: 'GET',
            url: this.URL + append,
            headers: this.headers,
            formData: params
        };
        return requestPromise(this.URL + append, options);
    }
}
export {Api, Options};