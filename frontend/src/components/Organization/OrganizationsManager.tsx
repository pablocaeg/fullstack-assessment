import React, { useState, useEffect } from 'react';
import OrganizationList from './OrganizationList';
import CreateOrganization from './CreateOrganization';
import { getOrganizations, createOrganization } from '../../api';
import { Organization } from '../../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';

const OrganizationManager: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 4;

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data);
        setFilteredOrganizations(data); // Initialize filtered organizations
      } catch (error) {
        if (error instanceof AxiosError) {
          if(error.response) {
            toast.error("Failed to fetch organization: " + error.response.data);
          }
        }
      }
    };
    fetchOrganizations();
  }, []);

  useEffect(() => {
    const filtered = organizations.filter(org =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrganizations(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, organizations]);

  const handleAddOrganization = async (orgData: Organization) => {
    try {
      await createOrganization(orgData);
      setOrganizations(prev => [...prev, orgData]);
      toast.success("Organization added successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        if(error.response) {
          toast.error("Failed to create organization: " + error.response.data);
        }
      }
    }
  };

  const numberOfPages = Math.ceil(filteredOrganizations.length / pageSize);

  return (
    <div className="organization-manager">
      <div className="sidebar">
        <h3 className="contentTitle">Create New Organization</h3>
        <CreateOrganization onAddOrganization={handleAddOrganization} />
      </div>
      <div className="content">
        <h3 className="contentTitle">Organizations</h3>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <OrganizationList
          organizations={filteredOrganizations.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
          setOrganizations={setOrganizations}
        />
        {filteredOrganizations.length > pageSize && (
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
