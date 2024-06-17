export class Personnel {
    public personnelId: number;
    public payroll_Number: string;
    public forenames: string;
    public surname: string;
    public date_of_Birth: string;
    public telephone: number;
    public mobile: number;
    public address: string;
    public address_2: string;
    public postcode: string;
    public eMail_Home: string;
    public start_Date: string;
    constructor(_personnelId?, _payroll_Number?, _forenames?, _surname?, _date_of_Birth?, _telephone?,
        _mobile?, _address?, _address_2?, _postcode?, _eMail_Home?, _start_Date?
    ) {
        this.personnelId = _personnelId,
        this.payroll_Number = _payroll_Number,
        this.forenames = _forenames,
        this.surname = _surname,
        this.date_of_Birth = _date_of_Birth,
        this.telephone = _telephone,
        this.mobile = _mobile,
        this.address = _address,
        this.address_2 = _address_2,
        this.postcode = _postcode,
        this.eMail_Home = _eMail_Home,
        this.start_Date = _start_Date
    }
}
export class Content {
    public data: Array<Personnel>
}