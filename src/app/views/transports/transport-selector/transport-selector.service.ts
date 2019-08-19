import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    Observable,
    throwError
} from 'rxjs';
import {
    tap,
    catchError
} from 'rxjs/operators';
import { environment } from '@environment/environment';
import { TransportItemModel } from './store/transport-selector.model';

@Injectable({
    providedIn: 'root'
})
export class TransportSelectorService {

    private config = environment.transports;

    constructor(private http: HttpClient) {}

    public getList(): Observable<TransportItemModel[]> {
        const url = `${this.config.baseUrl}${this.config.resources.listUrl}`;
        console.log('url', url);
        return this.http.get<TransportItemModel[]>(url).pipe(
            tap(data => console.log(`${TransportSelectorService.name}::getList (tap)\n\tdata: %o`, data)),
            catchError(this.handleError)
        );
    }

    public get(id: number): Observable<TransportItemModel> {
        const url = `${this.config.baseUrl}${this.config.resources.getById}/${id}`;
        return this.http.get<TransportItemModel>(url).pipe(
            tap(data => console.log(`${TransportSelectorService.name}::getItem (tap)\n\tdata: %o`, data)),
            catchError(this.handleError));
    }

    private handleError(error: any): Observable<never> {
        console.error(`${TransportSelectorService.name}::handleError\n\tdata: %o`, error);
        return throwError(error);
    }
}
