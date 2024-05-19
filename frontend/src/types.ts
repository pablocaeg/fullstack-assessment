export interface Organization {
  id: number;
  name: string;
  description: string;
}

export interface User {
  passport: number;
  name: string;
  surname: string;
  phone: number;
  organizationId: number;
}