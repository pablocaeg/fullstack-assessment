import React, { useState } from 'react';
import { Organization } from '../types';
import { updateOrganization, deleteOrganization } from '../api';
import { toast } from 'react-toastify';

interface Props {
  organizations: Organization[];
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
}

const Organizations: React.FC<Props> = ({ organizations, setOrganizations }) => {
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [prevId, setPrevId] = useState<number | null>(null);

  const handleEditClick = (org: Organization) => {
    setEditingOrg(org);
    setPrevId(org.id);
  };

  const handleCancelClick = () => {
    setEditingOrg(null);
    setPrevId(null);
  };

  const handleSaveClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrg && prevId !== null) {
      const formData = new FormData(e.target as HTMLFormElement);
      const updatedOrg = {
        id: parseInt(formData.get('id') as string, 10),
        name: formData.get('name') as string,
        description: formData.get('description') as string
      };
      try {
        await updateOrganization(prevId, updatedOrg);
        setOrganizations(prevOrgs =>
          prevOrgs.map(org => (org.id === prevId ? updatedOrg : org))
        );
        toast.success("Organization updated successfully");
      } catch (error) {
        toast.error("Failed to update organization");
      }
      setEditingOrg(null);
      setPrevId(null);
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteOrganization(id);
      setOrganizations(prevOrgs => prevOrgs.filter(org => org.id !== id));
      toast.success("Organization deleted successfully");
    } catch (error) {
      toast.error("Failed to delete organization");
    }
  };

  return (
    <div className="organizations">
      {organizations.length > 0 ? (
        <div className="card-container">
          {organizations.map(org => (
            <div key={org.id} className="organization-card">
              {editingOrg && editingOrg.id === org.id ? (
                <form className="organization-edit-form" onSubmit={handleSaveClick}>
                  <input
                    type="number"
                    name="id"
                    defaultValue={editingOrg.id}
                    placeholder="Organization ID"
                  />
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingOrg.name}
                    placeholder="Organization Name"
                  />
                  <input
                    name="description"
                    defaultValue={editingOrg.description}
                    placeholder="Organization Description"
                  />
                  <div className="edit-buttons">
                    <button type="submit" className="button">Save</button>
                    <button type="button" onClick={handleCancelClick} className="button cancel">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="organization-details">
                  <div className="organization-id"><strong>ID: </strong> {org.id}</div>
                  <div className="organization-name"><strong>Name:</strong> {org.name}</div>
                  <div className="organization-description"><strong>Description:</strong> {org.description}</div>
                  <div className="buttons">
                    <button onClick={() => handleEditClick(org)} className="button edit">Edit</button>
                    <button onClick={() => handleDeleteClick(org.id)} className="button delete">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : <p>There are no organizations to show</p>}
    </div>
  );
};

export default Organizations;
