import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { environment } from 'projects/table-edit-only/src/environments/environment';
import { Content, Personnel } from '../../models/personnel.model';
@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {
    public fileName: any;
    @Output()
    upload: EventEmitter<Content> = new EventEmitter<Content>();
    public files: any;
    public personnelFromExcell: Personnel[];
    constructor(private toaster: ToastrService) {
    }
    ngOnInit() { }

    public readFile() {
        this.upload.emit({
            data: this.personnelFromExcell
        });
        this.toaster.success(environment.messages.processed_success, 'OK');
    }
    //load inputExcell to personnelFromExcell array
    public onFileChange(evt: any, input: any) {
        if (input.files.length > 0) {
            this.fileName = input.files[0].name;
            this.files = {
                name: input.files[0].name,
                size: input.files[0].size,
                type: input.files[0].type,
                lastModifiedDate: input.files[0].lastModifiedDate
            };

            const target: DataTransfer = <DataTransfer>(evt.target);
            if (target.files.length !== 1)
                this.toaster.error(environment.messages.multiple_files_error, 'Error');

            const reader: FileReader = new FileReader();
            reader.onload = (targetFiles: any) => {
                const bstr: string = targetFiles.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                this.personnelFromExcell = <Array<Personnel>>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

            };
            reader.readAsBinaryString(target.files[0]);
            this.toaster.success(environment.messages.upload_success, 'OK');
        }
        else {
            this.toaster.success(environment.messages.files_error, 'OK');
        }
    }
}
