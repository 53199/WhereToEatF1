import React from 'react';
import { motion } from 'framer-motion';
import { Place } from '../types/maps';
import { 
  Star, 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  Globe,
  DollarSign,
  ChevronRight,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import { getPlaceTypeIcon } from '../utils/placeIcons';

interface PlaceDetailsProps {
  place: Place;
  onClose: () => void;
}

export function PlaceDetails({ place, onClose }: PlaceDetailsProps) {
  const { icon: Icon, color } = getPlaceTypeIcon(place.types[0]);
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0);
  const [showAllReviews, setShowAllReviews] = React.useState(false);

  const displayedReviews = showAllReviews 
    ? place.reviews 
    : place.reviews?.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="overflow-hidden rounded-lg"
    >
      {/* Photos Carousel */}
      <div className="relative h-64">
        {place.photos ? (
          <>
            <div className="relative h-full">
              <motion.img
                key={activePhotoIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={place.photos[activePhotoIndex].photo_reference}
                alt={`${place.name} - Photo ${activePhotoIndex + 1}`}
                className="h-full w-full object-cover"
              />
              {place.photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
                  {place.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePhotoIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === activePhotoIndex 
                          ? 'bg-white w-4' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <Icon className="h-20 w-20" style={{ color }} />
          </div>
        )}
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-lg 
                   hover:bg-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {/* En-tête */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-6 w-6" style={{ color }} />
              <h2 className="text-2xl font-bold text-gray-900">{place.name}</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              {place.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{place.rating.toFixed(1)}</span>
                  {place.user_ratings_total && (
                    <span className="text-gray-500">
                      ({place.user_ratings_total})
                    </span>
                  )}
                </div>
              )}
              
              {place.price_level !== undefined && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: place.price_level + 1 }).map((_, i) => (
                    <DollarSign key={i} className="h-5 w-5 text-green-600" />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
              <p className="text-gray-600">{place.vicinity}</p>
            </div>

            {place.opening_hours && (
              <div className="flex items-start gap-2">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                <div>
                  <span className={`font-medium ${
                    place.opening_hours.isOpen ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {place.opening_hours.isOpen ? 'Ouvert' : 'Fermé'}
                  </span>
                  {place.opening_hours.weekday_text && (
                    <div className="mt-2 space-y-1">
                      {place.opening_hours.weekday_text.map((text, index) => (
                        <p key={index} className="text-sm text-gray-600">{text}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {place.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-400" />
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Site web
                </a>
              </div>
            )}

            {place.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <a
                  href={`tel:${place.phone}`}
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {place.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Avis */}
        {place.reviews && place.reviews.length > 0 && (
          <div className="p-6">
            <h3 className="mb-4 font-semibold text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-gray-400" />
              Avis des utilisateurs
            </h3>
            
            <div className="space-y-4">
              {displayedReviews?.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">
                          {review.author_name}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(review.time * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                </motion.div>
              ))}
            </div>

            {place.reviews.length > 3 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg 
                         bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 
                         hover:bg-gray-100 transition-colors"
              >
                {showAllReviews ? 'Voir moins d\'avis' : 'Voir plus d\'avis'}
                <ChevronRight className={`h-4 w-4 transition-transform ${
                  showAllReviews ? 'rotate-90' : ''
                }`} />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}