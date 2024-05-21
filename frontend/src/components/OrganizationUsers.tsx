import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsersByOrganization, updateUser, deleteUser } from '../api';
import { User } from '../types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateUser from './CreateUser';
import PhoneNumberInput from './PhoneNomberInput';

const OrganizationUsers: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
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

  const handleEditClick = (user: User) => {
    setEditingUser(user);
  };

  const handleCancelClick = () => {
    setEditingUser(null);
  };

  const handleSaveClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      const formData = new FormData(e.target as HTMLFormElement);
      const updatedUser = {
        passport: parseInt(formData.get('passport') as string, 10),
        name: formData.get('name') as string,
        surname: formData.get('surname') as string,
        phone: editingUser.phone, // Use the current phone value from state
        organizationId: editingUser.organizationId
      };

      if (isNaN(updatedUser.passport) || isNaN(updatedUser.phone)) {
        toast.error("Passport and Phone must be numeric values");
        return;
      }

      try {
        await updateUser(editingUser.passport, updatedUser);
        setUsers(prevUsers =>
          prevUsers.map(user => (user.passport === editingUser.passport ? updatedUser : user))
        );
        toast.success("User updated successfully");
        setEditingUser(null);
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Failed to update user: " + error.message);
        }
      }
    }
  };

  const handleDeleteClick = async (passport: number) => {
    try {
      await deleteUser(passport);
      setUsers(prevUsers => prevUsers.filter(user => user.passport !== passport));
      toast.success("User deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to delete user: " + error.message);
      }
    }
  };

  const handlePhoneChange = (value: string) => {
    setEditingUser(prevUser => {
      if (prevUser) {
        const phone = parseInt(value, 10);
        return {
          ...prevUser,
          phone: isNaN(phone) ? 0 : phone
        };
      }
      return prevUser;
    });
  };

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
            <div className="card-container">
              {filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(user => (
                <div key={user.passport} className="organization-card">
                  {editingUser && editingUser.passport === user.passport ? (
                    <form className="organization-edit-form" onSubmit={handleSaveClick}>
                      <input
                        type="number"
                        name="passport"
                        defaultValue={editingUser.passport}
                        placeholder="Passport"
                        required
                      />
                      <input
                        type="text"
                        name="name"
                        defaultValue={editingUser.name}
                        placeholder="Name"
                        required
                      />
                      <input
                        type="text"
                        name="surname"
                        defaultValue={editingUser.surname}
                        placeholder="Surname"
                        required
                      />
                      <PhoneNumberInput
                        value={editingUser.phone.toString()}
                        onChange={handlePhoneChange}
                      />
                      <div className="edit-buttons">
                        <button type="submit" className="button">Save</button>
                        <button type="button" onClick={handleCancelClick} className="button cancel">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="organization-details">
                      <div><strong>Passport:</strong> {user.passport}</div>
                      <div><strong>Name:</strong> {user.name}</div>
                      <div><strong>Surname:</strong> {user.surname}</div>
                      <div><strong>Phone:</strong> {user.phone}</div>
                      <div className="buttons">
                        <button onClick={() => handleEditClick(user)} className="button edit">Edit</button>
                        <button onClick={() => handleDeleteClick(user.passport)} className="button delete">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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

export default OrganizationUsers;
