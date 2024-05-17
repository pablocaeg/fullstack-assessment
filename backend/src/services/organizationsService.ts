import { Organization } from '../models/organizations';
import { OrganizationRepository } from '../repositories/organizationsRepository';

const organizationRepository = new OrganizationRepository();

export const getAllOrganizations = async (): Promise<Organization[]> => {
  return organizationRepository.findAll();
};

export const getOrganizationById = async (id: number): Promise<Organization | null> => {
  return organizationRepository.findById(id);
};

export const createOrganization = async (organization: Organization): Promise<Organization> => {
  if (typeof organization.id !== 'number' || isNaN(organization.id)) {
    throw new Error('ID must be a valid number');
  }

  const existingOrganization = await organizationRepository.findById(organization.id);
  if (existingOrganization) {
    throw new Error('Organization with this ID already exists.');
  }
  
  return organizationRepository.insertOne(organization);
};

export const updateOrganization = async (id: number, organizationUpdates: Partial<Organization>): Promise<Organization | null> => {
  if (typeof organizationUpdates.id !== 'number' || isNaN(organizationUpdates.id)) {
    throw new Error('ID must be a valid number');
  }

  const existingOrganizationByPassport = await organizationRepository.findById(organizationUpdates.id);
  if (existingOrganizationByPassport && organizationUpdates.id !== id) {
    throw new Error('Organization with this id already exists.');
  }

  return organizationRepository.updateOne({ id }, organizationUpdates);
};

export const deleteOrganization = async (id: number): Promise<boolean> => {
  return organizationRepository.deleteOne({ id });
};
