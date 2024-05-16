export interface Organization {
  id: number;
  name: string;
  description: string;
}

export const orgs: Organization[] = [
  { id: 1, name: 'Org1', description: 'Description1' },
  { id: 2, name: 'Org2', description: 'Description2' },
];
