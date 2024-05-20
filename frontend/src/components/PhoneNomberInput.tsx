import React, { useState, useEffect } from 'react';
import { useCombobox } from 'downshift';
import { loadCsv } from '../utils/loadCsv';

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange }) => {
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        const numbers = await loadCsv();
        setPhoneNumbers(numbers);
      } catch (error) {
        console.error('Failed to load phone numbers:', error);
      }
    };
    fetchPhoneNumbers();
  }, []);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: phoneNumbers,
    inputValue,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || '');
      onChange(inputValue || '');
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setInputValue(selectedItem);
        onChange(selectedItem);
      }
    },
  });

  return (
    <div className="combobox-container">
      <input
        {...getInputProps({
          placeholder: 'Enter phone number',
          className: 'combobox-input'
        })}
      />
      <ul {...getMenuProps()} className={`combobox-menu ${isOpen ? 'visible' : ''}`}>
        {isOpen &&
          phoneNumbers
            .filter((item) =>
              item.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item, index) => (
              <li
                {...getItemProps({ item, index })}
                key={index}
                className={`combobox-item ${highlightedIndex === index ? 'highlighted' : ''}`}
              >
                {item}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default PhoneNumberInput;
