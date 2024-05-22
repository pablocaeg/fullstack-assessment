import React, { useState } from 'react';
import { User } from '../../types';
import { deleteUser } from '../../api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import UpdateUser from './UpdateUser';

interface Props {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList: React.FC<Props> = ({ users, setUsers }) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
  };

  const handleCancelClick = () => {
    setEditingUser(null);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.passport === editingUser?.passport ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleDeleteClick = async (passport: number) => {
    try {
      await deleteUser(passport);
      setUsers(prevUsers => prevUsers.filter(user => user.passport !== passport));
      toast.success("User deleted successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error("Failed to delete user: " + error.response.data);
        }
      }
    }
  };

  return (
    <div className="users">
      {users.length > 0 ? (
        <div className="card-container">
          {users.map(user => (
            <div key={user.passport} className="organization-card">
              {editingUser && editingUser.passport === user.passport ? (
                <UpdateUser
                  user={editingUser}
                  onUpdate={handleUpdateUser}
                  onCancel={handleCancelClick}
                />
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
      ) : <p>No users found for this organization.</p>}
    </div>
  );
};

export default UserList;
