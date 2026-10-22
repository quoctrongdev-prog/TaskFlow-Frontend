//Lưu Access Token trong bộ nhớ JavaScript
//Tìm hiểu thêm
let accessToken: string | null = null;

//Hàm này chỉ đọc giá trị accessToken sau khi đã 
//được cập nhật bởi setAccessToken
export function getAccessToken(): string | null {
  return accessToken;
}

//Biến được cập nhật khi gọi hàm setter (setAccessToken)
export function setAccessToken(token: string | null): void {
  accessToken = token;
}
