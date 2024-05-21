import React, { useState } from 'react';
import { Organization } from '../types';
import { toast } from 'react-toastify';

interface Props {
  onAddOrganization: (org: Organization) => void;
}

const CreateOrganization: React.FC<Props> = ({ onAddOrganization }) => {
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    description: string;
  }>({
    id: '',
    name: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const idAsNumber = parseInt(formData.id, 10);
    if (!isNaN(idAsNumber)) {
      await onAddOrganization({
        ...formData,
        id: idAsNumber
      });
      setFormData({ id: '', name: '', description: '' });
    } else {
      toast.error("Invalid ID: must be a numeric value");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <div className="form-group">
        <label htmlFor="id">ID</label>
        <input
          type="number"
          name="id"
          id="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Enter organization ID"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter organization name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter organization description"
          required
        />
      </div>
      <button type="submit" className="buttoncreate">Create</button>
    </form>
  );
};

export default CreateOrganization;
