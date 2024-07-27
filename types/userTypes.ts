interface IuserLogin {
  email: string;
  password: string;
}

interface IconvertAssistant {
  title: string;
  userType: string;
}

interface Iuser {
  firstName: string;
  middlename: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  idType: string;
  idNumber: string;
  insurance: string;
  insuranceId: string;
}

interface IuserResponse {
  status: string;
  data: Iuser;
}
