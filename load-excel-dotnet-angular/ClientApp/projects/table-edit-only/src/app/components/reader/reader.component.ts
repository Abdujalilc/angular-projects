import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Content, Personnel } from '../../models/personnel.model';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html'
})
export class ReaderComponent implements OnInit {
  public isFileRead: boolean;
  public fileContent: Content;
  editedPersonnel: Personnel | null = null;
  isNewRecord: boolean = false;

  @ViewChild('readOnlyTemplate')
  readOnlyTemplate: TemplateRef<Personnel> | undefined;

  @ViewChild('editTemplate')
  editTemplate: TemplateRef<Personnel> | undefined;

  constructor(private toaster: ToastrService) {
    this.isFileRead = true;
    this.fileContent = new Content();
  }

  ngOnInit() {

  }

  public upload(content: Content): void {
    this.reset();
    this.isFileRead = false;
    if (content) {
      this.fileContent.data = new Array<Personnel>();
      content.data.forEach((element, index) => {
        if (index === 0) return;
        const personnel = new Personnel(
          index,element[0],element[1],element[2],element[3],element[4],element[5]
          ,element[6],element[7],element[8],element[9],element[10]
          );
        this.fileContent.data.push(personnel);
      });
    }
  }

  public IterateFiledata(data, position) {
    var s = []
    for (var i = 0; i < data.length; i++) {
      if (typeof data[i][position] != 'undefined') {
        s.push(data[i][position])
      }
    }
    return s
  }

  public reset(): void {
    this.isFileRead = true;
    this.fileContent = new Content();
  }

  loadTemplate(personnel: Personnel) {
    if (this.editedPersonnel && this.editedPersonnel.payroll_Number === personnel.payroll_Number) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  /*private loadUsers() {
    this.serv.getUsers().subscribe((data: Array<Personnel>) => {
      this.personnels = data;
    });
  }*/

  /*addUser() {
    this.editedPersonnel = new Personnel(0);
    this.personnels.push(this.editedPersonnel);
    this.isNewRecord = true;
  }*/

  editUser(personnel: Personnel) {
    this.editedPersonnel = personnel;
  }

  savePersonnel(editedPersonnel: Personnel) {
    if (editedPersonnel) {
      const itemIndex = this.fileContent.data.findIndex(
        (book) => book.payroll_Number === editedPersonnel.payroll_Number
      )
      if (itemIndex !== -1)
        this.fileContent.data[itemIndex] = editedPersonnel
    }
    this.editedPersonnel = null;
  }

  cancel() {
    if (this.isNewRecord) {
      //this.personnels.pop();
      this.isNewRecord = false;
    }
    this.editedPersonnel = null;
  }

  deleteUser(payroll_Number: string) {
    if (payroll_Number) {
      const personnelIndex = this.fileContent.data.findIndex(
        (book) => book.payroll_Number === payroll_Number
      )
      if (personnelIndex !== -1)
        this.fileContent.data.splice(personnelIndex, 1)
    }
    this.editedPersonnel = null;
  }
}
