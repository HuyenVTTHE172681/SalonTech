export interface User {
  email: string;
  password: string;
  userName: string;
}

export class Register {
  name: string;
  email: string;
  userName: string;
  password: string;
  
  constructor() {
    this.name = "";
    this.email = "";
    this.userName = "";
    this.password = "";
  }
}