import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Users, 
  Calendar,
  Phone,
  Mail,
  Car,
  Shield,
  Zap,
  Wifi,
  Home,
  Star,
  Flag
} from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showViewingForm, setShowViewingForm] = useState(false);
  const [viewingDate, setViewingDate] = useState('');
  const [viewingTime, setViewingTime] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'parking':
        return <Car className="h-5 w-5" />;
      case 'security':
        return <Shield className="h-5 w-5" />;
      case 'generator':
        return <Zap className="h-5 w-5" />;
      case 'internet':
        return <Wifi className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  const handleViewingRequest = () => {
    if (viewingDate && viewingTime) {
      alert('Viewing request submitted! / Ombi la kuona limetumwa!');
      setShowViewingForm(false);
      setViewingDate('');
      setViewingTime('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to search
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                <span>Save</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-orange-600 transition-colors">
                <Flag className="h-5 w-5" />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Title & Location */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-lg">
              {property.location.address}, {property.location.city}, {property.location.district}
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <Bed className="h-5 w-5 mr-1" />
              <span>{property.bedrooms} bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-1" />
              <span>{property.bathrooms} bathrooms</span>
            </div>
            <div className="flex items-center">
              <Home className="h-5 w-5 mr-1" />
              <span className="capitalize">{property.propertyType}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === 0 ? property.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === property.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex space-x-2 p-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About this property / Kuhusu mali hii
              </h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Amenities / Huduma
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Location / Mahali
              </h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive map coming soon</p>
                  <p className="text-sm">
                    {property.location.address}, {property.location.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking & Contact */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(property.priceMonthly)}
                </div>
                <div className="text-gray-600">per month</div>
                <div className="text-sm text-gray-500 mt-1">
                  + {formatPrice(property.priceMonthly * 0.15)} service fee
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowViewingForm(!showViewingForm)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Omba Kuonyeshwa</span>
                </button>

                <button className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Contact Owner</span>
                </button>

                {/* Viewing Request Form */}
                {showViewingForm && (
                  <div className="border-t border-gray-200 pt-4 space-y-4">
                    <h3 className="font-semibold text-gray-900">Request Viewing</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={viewingDate}
                        onChange={(e) => setViewingDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={viewingTime}
                        onChange={(e) => setViewingTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message (Optional)
                      </label>
                      <textarea
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Any specific questions or requirements..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      onClick={handleViewingRequest}
                      disabled={!viewingDate || !viewingTime}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Submit Request
                    </button>
                  </div>
                )}
              </div>

              {/* Property Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Property ID:</span>
                  <span className="font-mono">{property.id}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                  <span>Status:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium capitalize">
                    {property.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Owner Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Property Owner / Mmiliki
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Property Owner</div>
                  <div className="text-sm text-gray-600">Verified owner</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>Call Owner</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;