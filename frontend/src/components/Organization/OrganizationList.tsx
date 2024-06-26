import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Organization } from '../../types';
import { deleteOrganization } from '../../api';
import { toast } from 'react-toastify';
import UpdateOrganization from './UpdateOrganization';

interface Props {
  organizations: Organization[];
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
}

const Organizations: React.FC<Props> = ({ organizations, setOrganizations }) => {
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const navigate = useNavigate();

  const handleEditClick = (org: Organization) => {
    setEditingOrg(org);
  };

  const handleCancelClick = () => {
    setEditingOrg(null);
  };

  const handleUpdateOrganization = (updatedOrg: Organization) => {
    setOrganizations(prevOrgs =>
      prevOrgs.map(org => (org.id === updatedOrg.id ? updatedOrg : org))
    );
    setEditingOrg(null);
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

  const handleCheckClick = (id: number) => {
    navigate(`/organization/${id}/users`);
  };

  return (
    <div className="organizations">
      {organizations.length > 0 ? (
        <div className="card-container">
          {organizations.map(org => (
            <div key={org.id} className="organization-card">
              {editingOrg && editingOrg.id === org.id ? (
                <UpdateOrganization
                  organization={editingOrg}
                  onUpdate={handleUpdateOrganization}
                  onCancel={handleCancelClick}
                />
              ) : (
                <div className="organization-details">
                  <div className="organization-id"><strong>ID: </strong> {org.id}</div>
                  <div className="organization-name"><strong>Name:</strong> {org.name}</div>
                  <div className="organization-description"><strong>Description:</strong> {org.description}</div>
                  <div className="buttons">
                    <button onClick={() => handleCheckClick(org.id)} className="button check">Check</button>
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
