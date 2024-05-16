export interface User {
  passport: number;
  name: string;
  surname: string;
  phone: number;
}

export const users: User[] = [
  { passport: 123456789, name: 'John', surname: 'Doe', phone: 1234567890 },
  { passport: 987654321, name: 'Jane', surname: 'Smith', phone: 9876543210 }
];