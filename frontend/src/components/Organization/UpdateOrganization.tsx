import React, { useState } from 'react';
import { Organization } from '../../types';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { updateOrganization } from '../../api';

interface Props {
  organization: Organization;
  onUpdate: (updatedOrg: Organization) => void;
  onCancel: () => void;
}

const UpdateOrganization: React.FC<Props> = ({ organization, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
  }>({
    name: organization.name,
    description: organization.description
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);

    try {
      const updatedOrg = { name: formData.name, description: formData.description };
      const response = await updateOrganization(organization.id, updatedOrg);
      onUpdate(response);
      toast.success("Organization updated successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error("Failed to update organization: " + error.response.data);
        }
      }
    }
  };

  return (
    <form className="organization-edit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Organization Name"
        required
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Organization Description"
        required
      />
      <div className="edit-buttons">
        <button type="submit" className="button">Save</button>
        <button type="button" onClick={onCancel} className="button cancel">Cancel</button>
      </div>
    </form>
  );
};

export default UpdateOrganization;
