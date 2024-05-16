import { Organization, orgs } from '../models/organizations'

export const getAllOrganizations = (): Organization[] => {
  return orgs;
};

export const getOrganizationById = (id: number): Organization | undefined => {
  return orgs.find(org => org.id === id);
};

export const createOrganization = (org: Organization): Organization => {
  if (orgs.some(existingOrg => existingOrg.id === org.id)) {
    throw new Error('Organization with this ID already exists.');
  }
  orgs.push(org);
  return org;
};

export const updateOrganization = (id: number, orgUpdates: Partial<Organization>): Organization | undefined => {
  const orgIndex = orgs.findIndex(org => org.id === id);
  if (orgIndex !== -1) {
    orgs[orgIndex] = { ...orgs[orgIndex], ...orgUpdates };
    return orgs[orgIndex];
  }
  return undefined;
};

export const deleteOrganization = (id: number): boolean => {
  const orgIndex = orgs.findIndex(org => org.id === id);
  if (orgIndex !== -1) {
    orgs.splice(orgIndex, 1);
    return true;
  }
  return false;
};
