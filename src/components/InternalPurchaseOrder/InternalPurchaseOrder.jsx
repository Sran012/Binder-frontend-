import { useState, useEffect } from 'react';
import GenerateFactoryCode from '../GenerateFactoryCode/GenerateFactoryCode';
import SearchableDropdown from '../GenerateFactoryCode/components/SearchableDropdown';

const InternalPurchaseOrder = ({ onBack }) => {
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [initialData, setInitialData] = useState({
    orderType: '',      // 'production' | 'sampling' | 'company'
    buyerCode: '',
    programName: ''
  });
  const [buyerCodeOptions, setBuyerCodeOptions] = useState([]);
  const [errors, setErrors] = useState({});

  const orderTypeOptions = ['Production', 'Sampling', 'Company'];

  // Load buyer codes from localStorage
  useEffect(() => {
    try {
      const buyerCodes = JSON.parse(localStorage.getItem('buyerCodes') || '[]');
      const codes = buyerCodes.map(buyer => buyer.code);
      setBuyerCodeOptions(codes);
    } catch (error) {
      console.error('Error loading buyer codes:', error);
      setBuyerCodeOptions([]);
    }
  }, []);

  const handleOrderTypeChange = (value) => {
    setInitialData(prev => ({ ...prev, orderType: value }));
    if (errors.orderType) {
      setErrors(prev => ({ ...prev, orderType: '' }));
    }
  };

  const handleBuyerCodeChange = (value) => {
    setInitialData(prev => ({ ...prev, buyerCode: value }));
    if (errors.buyerCode) {
      setErrors(prev => ({ ...prev, buyerCode: '' }));
    }
  };

  const handleProgramNameChange = (e) => {
    const value = e.target.value;
    setInitialData(prev => ({ ...prev, programName: value }));
    if (errors.programName) {
      setErrors(prev => ({ ...prev, programName: '' }));
    }
  };

  const validateInitialScreen = () => {
    const newErrors = {};
    
    if (!initialData.orderType?.trim()) {
      newErrors.orderType = 'Order Type is required';
    }
    if (!initialData.buyerCode?.trim()) {
      newErrors.buyerCode = 'Buyer Code is required';
    }
    if (!initialData.programName?.trim()) {
      newErrors.programName = 'Program Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateInitialScreen()) {
      setShowInitialScreen(false);
    }
  };

  // If initial screen is completed, show GenerateFactoryCode
  if (!showInitialScreen) {
    return (
      <GenerateFactoryCode 
        onBack={onBack}
        initialFormData={initialData}
      />
    );
  }

  // Initial Selection Screen
  return (
    <div className="w-full min-h-screen" style={{ padding: '40px', background: '#fafafa' }}>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 mb-4 transition-colors"
          style={{ 
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#f5f5f5',
            border: '1px solid #e0e0e0',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ← Back to Departments
        </button>
        <h1 className="text-sm font-bold mb-2" style={{ color: '#333', fontSize: '40px' }}>Internal Purchase Order</h1>
        <p className="text-base text-gray-600" style={{ color: '#666' }}>Select order type and enter required information</p>
      </div>

      <div className="bg-white rounded-lg border" style={{ padding: '32px', borderColor: '#e0e0e0', maxWidth: '800px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Order Type */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2" style={{ color: '#555' }}>
              ORDER FOR <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <SearchableDropdown
              value={initialData.orderType}
              onChange={handleOrderTypeChange}
              options={orderTypeOptions}
              placeholder="Select order type"
              className={errors.orderType ? 'border-red-600' : ''}
              style={{ 
                padding: '10px 14px', 
                height: '44px', 
                width: '40%',
                borderColor: errors.orderType ? '#ef4444' : '#d0d0d0'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#999';
                e.target.style.boxShadow = '0 0 0 2px rgba(150, 150, 150, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.orderType ? '#ef4444' : '#d0d0d0';
                e.target.style.boxShadow = '';
              }}
            />
            {errors.orderType && (
              <span className="text-red-600 text-xs font-medium mt-1">{errors.orderType}</span>
            )}
          </div>

          {/* Buyer Code */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2" style={{ color: '#555' }}>
              BUYER CODE <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <SearchableDropdown
              value={initialData.buyerCode}
              onChange={handleBuyerCodeChange}
              options={buyerCodeOptions}
              placeholder="Select or type buyer code"
              strictMode={false}
              className={errors.buyerCode ? 'border-red-600' : ''}
              style={{ 
                padding: '10px 14px', 
                height: '44px', 
                width: '40%',
                borderColor: errors.buyerCode ? '#ef4444' : '#d0d0d0'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#999';
                e.target.style.boxShadow = '0 0 0 2px rgba(150, 150, 150, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.buyerCode ? '#ef4444' : '#d0d0d0';
                e.target.style.boxShadow = '';
              }}
            />
            {errors.buyerCode && (
              <span className="text-red-600 text-xs font-medium mt-1">{errors.buyerCode}</span>
            )}
          </div>

          {/* Program Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2" style={{ color: '#555' }}>
              PROGRAM NAME <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={initialData.programName}
              onChange={handleProgramNameChange}
              placeholder="Enter program name"
              className={errors.programName ? 'border-red-600' : ''}
              style={{ 
                padding: '10px 14px', 
                height: '44px', 
                width: '40%',
                border: `1px solid ${errors.programName ? '#ef4444' : '#d0d0d0'}`,
                borderRadius: '8px',
                fontSize: '14px',
                color: '#333',
                background: '#fff'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#999';
                e.target.style.boxShadow = '0 0 0 2px rgba(150, 150, 150, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.programName ? '#ef4444' : '#d0d0d0';
                e.target.style.boxShadow = '';
              }}
            />
            {errors.programName && (
              <span className="text-red-600 text-xs font-medium mt-1">{errors.programName}</span>
            )}
          </div>

          {/* Continue Button */}
          <div className="flex justify-start mt-4">
            <button
              type="button"
              onClick={handleContinue}
              className="flex items-center gap-2 text-white rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.3)',
                cursor: 'pointer'
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalPurchaseOrder;

