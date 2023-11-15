import { SweetAlertIcon } from 'sweetalert2'

export class SwalOption {

    constructor() { }

    Success(title:string = '', text:string = '', ButtonText:string = 'ปิด') {

        let icon:SweetAlertIcon = 'success'
        return { 
            title: title, 
            text: text, 
            icon: icon, 
            confirmButtonColor: '#0d6efd', 
            confirmButtonText: ButtonText 
        };
    }

    Warning(title:string = '', text:string = '', ButtonText:string = 'ปิด') {

        let icon:SweetAlertIcon = 'warning'
        return { 
            title: title, 
            text: text, 
            icon: icon, 
            confirmButtonColor: '#dc3545', 
            confirmButtonText: ButtonText 
        };
    }    

    Confirm(text:string = '') {

        return { 
            title:'ยืนยันการทำรายการ',
            text: text,
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#0d6efd'
        };
    }  

}