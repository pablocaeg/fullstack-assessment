import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createUser } from '../api';
import { User } from '../types';
import { toast } from 'react-toastify';

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const CreateUser: React.FC<Props> = ({ setUsers }) => {
  const { id } = useParams<{ id: string }>();
  const [newUser, setNewUser] = useState<Omit<User, 'passport' | 'phone'> & { passport: string, phone: string }>({
    passport: '',
    name: '',
    surname: '',
    phone: '',
    organizationId: parseInt(id!, 10)
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const userToCreate: User = {
      ...newUser,
      passport: parseInt(newUser.passport, 10),
      phone: parseInt(newUser.phone, 10)
    };

    if (isNaN(userToCreate.passport) || isNaN(userToCreate.phone)) {
      toast.error("Passport and Phone must be numeric values");
      return;
    }

    try {
      await createUser(userToCreate);
      setUsers(prevUsers => [...prevUsers, userToCreate]);
      setNewUser({ passport: '', name: '', surname: '', phone: '', organizationId: parseInt(id!, 10) });
      toast.success("User created successfully");
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  return (
    <form onSubmit={handleCreateUser} className="create-form">
      <div className="form-group">
        <label htmlFor="passport">Passport</label>
        <input
          type="number"
          name="passport"
          id="passport"
          value={newUser.passport}
          onChange={handleInputChange}
          placeholder="Enter passport number"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Enter name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          id="surname"
          value={newUser.surname}
          onChange={handleInputChange}
          placeholder="Enter surname"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          name="phone"
          id="phone"
          value={newUser.phone}
          onChange={handleInputChange}
          placeholder="Enter phone number"
          required
        />
      </div>
      <button type="submit" className="buttoncreate">Create</button>
    </form>
  );
};

export default CreateUser;
