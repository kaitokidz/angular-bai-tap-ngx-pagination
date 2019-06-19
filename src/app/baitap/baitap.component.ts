import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-baitap',
  templateUrl: './baitap.component.html',
  styleUrls: ['./baitap.component.scss']
})
export class BaitapComponent implements OnInit {

  public MaSP      : string = '';
  public TenSP     : string = '';
  public Gia       : string = '';

  // Biến boolean kiểm tra đang thực hiện thao tác add hay edit sản phẩm để hiện button phù hợp
  public isAdd     : boolean = true;
  // Trường hợp đang dùng chức năng cập nhật sản phẩm thì ô input nhập MaSP sẽ bị disable, không được phép chỉnh sửa
  public disableMaSP : boolean = false;
  public lstSanPham  : any     = this.setData();

  // Phân trang
  public p : number = 1;
  

  constructor() {
    this.getLocalStorage();
  }

  ngOnInit() {

  }

  /**
   * setData()
   * mảng dữ liệu mẫu
   */
  public setData(): any {
    return [
      { MaSP: 1, TenSP: "Sony Xperia", Gia: 124},
      { MaSP: 2, TenSP: "Sony XZ2", Gia: 534},
      { MaSP: 3, TenSP: "HTC U Ultra", Gia: 343},
      { MaSP: 4, TenSP: "HTC U12 Plus", Gia: 245},
      { MaSP: 5, TenSP: "iPhone XS Max", Gia: 1300},
      { MaSP: 6, TenSP: "Xiaomi Redmi Note 3 Pro", Gia: 200},
      { MaSP: 7, TenSP: "Xiaomi Mi 9", Gia: 400},
      { MaSP: 8, TenSP: "Galaxy Note 9", Gia: 800},
      { MaSP: 9, TenSP: "Galaxy S10", Gia: 900},
      { MaSP: 10, TenSP: "Nokia X9", Gia: 400},
      { MaSP: 11, TenSP: "Oppo One Plus", Gia: 360},
    ];
  }

  /**
   * themSanPham(_maSP, _tenSP, _giaSP)
   * thêm sản phẩm vào mảng lstSanPham
   */
  public themSanPham(_maSP:string, _tenSP :string, _giaSP : any) {
   
    const objSanPham = {
      MaSP  : _maSP,
      TenSP : _tenSP,
      Gia   : _giaSP * 1, // Convert to number
    };

    this.lstSanPham.push(objSanPham);    

    this.setLocalStorage();    
  }

  /**
   * getLocalStorage()
   */
  public getLocalStorage() {

    let data:any = JSON.parse(localStorage.getItem('lstSanPham'));

    if(data) {

      this.lstSanPham = data;

    } else {
      // Nếu ko có localStorage thì lấy data từ dữ liệu mẫu
      this.lstSanPham = this.setData();
    }

    return this.lstSanPham;
  }

  /**
   * setLocalStorage()
   * method gán dữ liệu localStorage
   */
  public setLocalStorage() {
    localStorage.setItem('lstSanPham', JSON.stringify(this.lstSanPham));
  }

  /**
   * suaSanPham(_maSP)
   * method lấy dữ liệu từ table đổ lên input dựa vào mã sản phẩm
   */
  public suaSanPham(_maSP : string) {
    
    let sanPham:any = this.lstSanPham.find(function(sanPham:any){
      return sanPham.MaSP === _maSP;
    });   
        
    // dùng interpolation để gán value vào input
    this.MaSP  = sanPham.MaSP;
    this.TenSP = sanPham.TenSP;
    this.Gia   = sanPham.Gia;

    // isAdd = false để hiện button cập nhật sản phẩm
    this.isAdd       = false;
    this.disableMaSP = true;
  }

  /**
   * capNhatSanPham(_maSP, _tenSP, _giaSP)
   * method update lại thông tin sản phẩm
   */
  public capNhatSanPham(_maSP : any, _tenSP :string, _giaSP : any) {
   
    this.lstSanPham = this.getLocalStorage();

    // Tìm kiếm index của sản phẩm cần sửa
    let timKiemIndex:any = this.lstSanPham.findIndex(function(sanPham:any){
      return sanPham.MaSP == _maSP;
    });

    // Lấy giá trị sản phẩm
    let sanPhamCapNhat = this.lstSanPham[timKiemIndex];

    // Cập nhật sản phẩm
    sanPhamCapNhat.TenSP = _tenSP;
    sanPhamCapNhat.Gia   = _giaSP * 1;

    this.setLocalStorage();
  }

  /**
   * cancelCapNhat()
   * 
   * method cancel cập nhật, quay lại trạng thái add sản phẩm mới
   */
  public cancelCapNhat() {
    this.isAdd       = true;
    this.disableMaSP = false;
    this.MaSP        = '';
    this.TenSP       = '';
    this.Gia         = '';
  }


  /**
   * xoaSanPham(index)
   * method xóa sản phẩm dựa vào index của mảng lstSanPham
   */
  public xoaSanPham(_maSP : string) {

    this.lstSanPham = this.getLocalStorage();    

    // Tìm kiếm index của sản phẩm cần xóa
    let timKiemIndex:any = this.lstSanPham.findIndex(function(sanPham:any){
      return sanPham.MaSP == _maSP;
    });

    //Xóa sản phẩm khỏi mảng
    this.lstSanPham.splice(timKiemIndex,1);

    this.setLocalStorage();
  }


  /**
   * timKiemSanPham(_keyword)
   * tìm kiếm sản phẩm dựa vào keyword truyền vào, so sánh với tên sản phẩm
   */
  public timKiemSanPham(_keyword : string) {

    this.lstSanPham = this.getLocalStorage();
  
    if(_keyword) {
      
      let sanPham =  this.lstSanPham.filter(
        sp => sp.TenSP.toLowerCase().indexOf(_keyword.toLowerCase()) > -1
      );  

      this.lstSanPham = sanPham;
    }
    // Reset lại ô nhập sản phẩm
    this.cancelCapNhat();
  }
}
