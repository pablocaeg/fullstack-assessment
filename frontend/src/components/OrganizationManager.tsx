import React, { useState, useEffect } from 'react';
import Organizations from './Organizations';
import CreateOrganization from './CreateOrganization';
import { getOrganizations, createOrganization } from '../api';
import { Organization } from '../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrganizationManager: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Failed to fetch organization: " + error.message);
        }
      }
    };
    fetchOrganizations();
  }, []);

  const handleAddOrganization = async (orgData: Organization) => {
    try {
      await createOrganization(orgData);
      setOrganizations(prev => [...prev, orgData]);
      toast.success("Organization added successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to create organization: " + error.message);
      }
    }
  };

  const numberOfPages = Math.ceil(organizations.length / pageSize);

  return (
    <div className="organization-manager">
      <div className="sidebar">
        <h3 className="contentTitle">Create New Organization</h3>
        <CreateOrganization onAddOrganization={handleAddOrganization} />
      </div>
      <div className="content">
        <h3 className="contentTitle">Organizations</h3>
        <Organizations
          organizations={organizations.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
          setOrganizations={setOrganizations}
        />
        {organizations.length > pageSize && (
          <div className="pagination">
            {[...Array(numberOfPages)].map((_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)} className={index + 1 === currentPage ? 'active' : ''}>
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrganizationManager;
