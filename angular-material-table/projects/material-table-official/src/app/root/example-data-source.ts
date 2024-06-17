import { DataSource } from "@angular/cdk/collections";
import { Observable, ReplaySubject } from "rxjs";
import { PeriodicElement } from "./periodic-data-model";

export class ExampleDataSource extends DataSource<PeriodicElement> {
    private _dataStream = new ReplaySubject<PeriodicElement[]>();
  
    constructor(initialData: PeriodicElement[]) {
      super();
      this.setData(initialData);
    }
  
    connect(): Observable<PeriodicElement[]> {
      return this._dataStream;
    }
  
    disconnect() {}
  
    setData(data: PeriodicElement[]) {
      this._dataStream.next(data);
    }
  }
  