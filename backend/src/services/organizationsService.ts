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
  // Ensure ID is not being updated
  const { id: _, ...updates } = organizationUpdates;
  return organizationRepository.updateOne({ id }, updates);
};

export const deleteOrganization = async (id: number): Promise<boolean> => {
  return organizationRepository.deleteOne({ id });
};
