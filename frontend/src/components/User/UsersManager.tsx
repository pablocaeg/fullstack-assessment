import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsersByOrganization } from '../../api';
import { User } from '../../types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateUser from './CreateUser';
import UserList from './UserList';

const UsersManager: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsersByOrganization(parseInt(id!, 10));
        setUsers(usersData);
        setFilteredUsers(usersData); // Initialize filtered users
      } catch (error) {
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [id]);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.passport.toString().includes(searchTerm)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, users]);

  const numberOfPages = Math.ceil(filteredUsers.length / pageSize);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="organization-manager">
      <div className="sidebar">
        <h3 className="contentTitle">Create New User</h3>
        <CreateUser setUsers={setUsers} />
      </div>
      <div className="content">
        <h3 className="contentTitle">Users in Organization with ID "{id}"</h3>
        <input
          type="text"
          placeholder="Search by passport"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {filteredUsers.length > 0 ? (
          <div>
            <UserList users={filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize)} setUsers={setUsers} />
            {filteredUsers.length > pageSize && (
              <div className="pagination">
              {[...Array(numberOfPages)].map((_, index) => (
                <button key={index} onClick={() => setCurrentPage(index + 1)} className={index + 1 === currentPage ? 'active' : ''}>
                  {index + 1}
                </button>
              ))}
            </div>
            )}
          </div>
        ) : (
          <p>No users found for this organization.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UsersManager;
