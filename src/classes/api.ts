import * as request from "request";
import * as requestPromise from "request-promise";

interface Options {
    method: string,
    url: string,
    headers: any,
    formData?: any
}

class Api {
    URL: string;
    readonly headers: any;

    constructor() {
        console.log('here');
        this.URL = 'http://farm-api.test/api/';
        this.headers = {
            'cache-control': 'no-cache',
            Accept: 'application/json',
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUwZWYxM2Y0YTczOWVkNGNjMmI0MTc3MDg4ZGI5ZjMzZDY0NTU0YTM4MDAyODMzNGM1ZjhlYTYyODI2MDJkZTQ5MWUwNDNjYjk3MWU4NmVmIn0.eyJhdWQiOiIxIiwianRpIjoiZTBlZjEzZjRhNzM5ZWQ0Y2MyYjQxNzcwODhkYjlmMzNkNjQ1NTRhMzgwMDI4MzM0YzVmOGVhNjI4MjYwMmRlNDkxZTA0M2NiOTcxZTg2ZWYiLCJpYXQiOjE1NDYwMzA5NTQsIm5iZiI6MTU0NjAzMDk1NCwiZXhwIjoxNTc3NTY2OTU0LCJzdWIiOiI4Iiwic2NvcGVzIjpbInN1ZWxvLWNsaW1hOnByb2dyYW1hY2lvbi1yaWVnb3M6c2F2ZSIsInN1ZWxvLWNsaW1hOnByb2dyYW1hY2lvbi1yaWVnb3MiLCJzdWVsby1jbGltYTpwcm9ncmFtYWNpb24tcmllZ29zOnVwZGF0ZSIsInN1ZWxvLWNsaW1hOnByb2dyYW1hY2lvbi1yaWVnb3M6cmVtb3ZlIl19.peo2jLL5pbL8fU5MRnXtIP28gnnhh402BzmvKB9ISkCxonyf_v3tVUNK102DN5wC2GmV0b4n-s_kx3BVO-K89AUgHhxvdK4zERphLWQAwXVaZS-fgFdEt3bGhXlLsGVuj7qvXaAYgBcE4yNhxSbo4N9QJhyt9lZFbQtCR7S1n705EPSe6WDmCUO-4rK0Lwv3FTuQwuYbDJ2kjUYp3zEtvFZVmSRXgfCh3CdthIBcyejgFbzSLP2IpmYqF3yLZqJ6E5ULngYsPcgzGdRtZVkTOVu3Nm1Qsr2X2myq7n3n_YlHX_INVl_fGMGCscscPS4wG-50LEyGLrHXG2DtVbBSxvmyhFdBesLDOKe7WIWZqWhmfouYbw5avKm8UWTRB29A62rAQ7qVcA2VA88W6Iwg1VYYRByPoUouf1cTmkFfl4XztR7NeJKNfLWQkglnVQ3_quDYzuYS8UBJ5aJPPgCAA3jvuuD4J9eHqk480Q7S-qq3fNjESxfi-m3qws9O2gM9_2I-KJaISnNtiUtsJkjLp2BXOQqyEu5frc3f-pDOGus3r1RIgP8cCqKEeC7rS2kpHqKUhsAm5-wPdzLafucy0uZlAvqL48vzVZCNR_Wvhuwmx9q_lf7TlFj9sOMgFFWoRsrMZHUn7fzUuHCgfcS3zHqOghM0oUdd-F_RDZHWdtU',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        };
    }

    post(append: string, params?: any) {
        const options: Options = {
            method: 'POST',
            url: this.URL,
            headers: this.headers,
            formData: params
        };
        return requestPromise(this.URL + append, options);
    }
}
export {Api, Options};