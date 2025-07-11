import React, { useState } from 'react';
import { Filter, X, Sliders, Home, Building, Users, Car, Shield, Zap } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types';
import { tanzanianCities, propertyTypes, amenities } from '../data/mockData';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  onClose,
  isOpen = true
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = localFilters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    handleFilterChange('amenities', newAmenities);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose?.();
  };

  const clearFilters = () => {
    const emptyFilters: SearchFiltersType = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'generator':
        return <Zap className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location / Eneo
        </label>
        <select
          value={localFilters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All cities / Miji yote</option>
          {tanzanianCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range / Bei (TZS)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              placeholder="Min price"
              value={localFilters.priceMin || ''}
              onChange={(e) => handleFilterChange('priceMin', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Max price"
              value={localFilters.priceMax || ''}
              onChange={(e) => handleFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Popular ranges: 200K-500K, 500K-1M, 1M-2M, 2M+
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type / Aina ya Mali
        </label>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleFilterChange('propertyType', 
                localFilters.propertyType === type.value ? undefined : type.value
              )}
              className={`flex items-center justify-center px-3 py-2 rounded-lg border transition-colors ${
                localFilters.propertyType === type.value
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type.value === 'house' && <Home className="h-4 w-4 mr-2" />}
              {type.value === 'apartment' && <Building className="h-4 w-4 mr-2" />}
              {type.value === 'studio' && <Users className="h-4 w-4 mr-2" />}
              {type.value === 'villa' && <Home className="h-4 w-4 mr-2" />}
              <span className="text-sm">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms / Vyumba
          </label>
          <select
            value={localFilters.bedrooms || ''}
            onChange={(e) => handleFilterChange('bedrooms', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}+ bedroom{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms / Bafu
          </label>
          <select
            value={localFilters.bathrooms || ''}
            onChange={(e) => handleFilterChange('bathrooms', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}+ bathroom{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amenities / Huduma
        </label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.slice(0, 8).map((amenity) => (
            <button
              key={amenity}
              onClick={() => handleAmenityToggle(amenity)}
              className={`flex items-center px-3 py-2 rounded-lg border text-sm transition-colors ${
                (localFilters.amenities || []).includes(amenity)
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {getAmenityIcon(amenity)}
              <span className="ml-2">{amenity}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available From / Inapatikana Kutoka
        </label>
        <input
          type="date"
          value={localFilters.availabilityDate || ''}
          onChange={(e) => handleFilterChange('availabilityDate', e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button
          onClick={clearFilters}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;