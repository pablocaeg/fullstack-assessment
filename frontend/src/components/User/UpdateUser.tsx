import React, { useState } from 'react';
import { User } from '../../types';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { updateUser } from '../../api';
import PhoneNumberInput from './PhoneNumberInput';

interface Props {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onCancel: () => void;
}

const UpdateUser: React.FC<Props> = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState<{
    passport: string;
    name: string;
    surname: string;
    phone: string;
  }>({
    passport: user.passport.toString(),
    name: user.name,
    surname: user.surname,
    phone: user.phone.toString()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);

    const updatedUser = {
      passport: parseInt(formData.passport, 10),
      name: formData.name,
      surname: formData.surname,
      phone: parseInt(formData.phone, 10),
      organizationId: user.organizationId
    };

    if (isNaN(updatedUser.passport) || isNaN(updatedUser.phone)) {
      toast.error("Passport and Phone must be numeric values");
      return;
    }

    try {
      const response = await updateUser(user.passport, updatedUser);
      console.log('Response from update API:', response);
      onUpdate(updatedUser);
      toast.success("User updated successfully");
    } catch (error) {
      console.error('Failed to update user:', error);
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error("Failed to update user: " + error.response.data);
        }
      }
    }
  };

  return (
    <form className="organization-edit-form" onSubmit={handleSubmit}>
      <input
        type="number"
        name="passport"
        value={formData.passport}
        onChange={handleChange}
        placeholder="Passport"
        required
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        placeholder="Surname"
        required
      />
      <PhoneNumberInput
        value={formData.phone}
        onChange={handlePhoneChange}
      />
      <div className="edit-buttons">
        <button type="submit" className="button">Save</button>
        <button type="button" onClick={onCancel} className="button cancel">Cancel</button>
      </div>
    </form>
  );
};

export default UpdateUser;
