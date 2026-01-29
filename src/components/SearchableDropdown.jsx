import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import './SearchableDropdown.css';

const SearchableDropdown = ({ options, value, onChange, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleOptionSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleOptionSelect(filteredOptions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // Clicking the dropdown arrow should clear current selection and reopen options
  const handleArrowClick = (e) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className={`searchable-dropdown ${error ? 'error' : ''}`} ref={dropdownRef}>
      <div 
        className={`dropdown-input ${isOpen ? 'open' : ''}`}
        onClick={handleInputClick}
      >
        <span className={`selected-value ${!value ? 'placeholder' : ''}`}>
          {value || placeholder}
        </span>
        <button
          type="button"
          className={`dropdown-arrow-button ${isOpen ? 'up' : 'down'}`}
          onClick={handleArrowClick}
          aria-label="Open options"
        >
          <ChevronDown size={16} />
        </button>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="search-container">
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <FaSearch className="search-icon" />
          </div>
          
          <div className="options-container">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={`option-item ${option === value ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="no-options">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;