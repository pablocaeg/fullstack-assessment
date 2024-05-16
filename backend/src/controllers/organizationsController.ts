import { Request, Response } from 'express';
import * as organizationService from '../services/organizationsService';

export const getOrganizations = async (req: Request, res: Response): Promise<void> => {
  try {
    const orgs = await organizationService.getAllOrganizations();
    res.json(orgs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};

export const getOrganizationById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).send('Invalid organization ID');
    return;
  }

  try {
    const org = await organizationService.getOrganizationById(id);
    if (org) {
      res.json(org);
    } else {
      res.status(404).send('Organization not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};

export const createOrganization = async (req: Request, res: Response): Promise<void> => {
  const { id, nombre, descripcion } = req.body;

  if (!id || !nombre || !descripcion) {
    res.status(400).send('Missing required fields: id, nombre, descripcion');
    return;
  }

  try {
    const newOrg = await organizationService.createOrganization(req.body);
    res.status(201).json(newOrg);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

export const updateOrganization = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).send('Invalid organization ID');
    return;
  }

  const { nombre, descripcion } = req.body;

  if (!nombre && !descripcion) {
    res.status(400).send('No valid fields to update');
    return;
  }

  try {
    const updatedOrg = await organizationService.updateOrganization(id, req.body);
    if (updatedOrg) {
      res.json(updatedOrg);
    } else {
      res.status(404).send('Organization not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

export const deleteOrganization = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).send('Invalid organization ID');
    return;
  }

  try {
    const success = await organizationService.deleteOrganization(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send('Organization not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};
