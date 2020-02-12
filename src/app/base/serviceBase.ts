import { HttpResultModel } from './../common/model/HttpResultModel';
import { HttpService } from './../common/service/http.service';

export abstract class ServiceBase<T> {

    constructor(
        public url: string,
        public http: HttpService) {
    }

    get(): Promise<HttpResultModel> {        
        return this.http.get(this.url);
    }

    getByUid(uid: string): Promise<HttpResultModel> {
        return this.http.get(`${this.url}/${uid}`);
    }

    post(model: T): Promise<HttpResultModel> {
        return this.http.post(this.url, model);
    }

    put(uid: string, model: T): Promise<HttpResultModel> {
        return this.http.put(`${this.url}/${uid}`, model);
    }

    delete(uid: string): Promise<HttpResultModel> {
        return this.http.delete(`${this.url}/${uid}`);
    }
}
