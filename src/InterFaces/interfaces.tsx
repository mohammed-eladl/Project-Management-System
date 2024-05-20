export interface AuthForContext {
  loginData?: object | null;
  saveLoginData?: () => void;
  baseUrl?: string;
  requestHeaders?: object;
}
export interface ProjectInterface {
  id: number;
  title: string;
  task: [];
  description: string;
  creationDate: string;
}


export interface Employee {
    country:string;
    creationDate: string;
    email: string;
    id:number;
    imagePath:string | null;
    isActivated:boolean;
    isVerified:boolean;
    modificationDate:string
    userName:string;
    verificationCode:string;
    phoneNumber:string;   
    status: string 
  }


export interface TaskInterface {
  id: number;
  title: string;
  status: string;
  employee: Employee;
  project: ProjectInterface;
  creationDate: string;
}


