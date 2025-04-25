import React from 'react';

const ActivityCard = ({ activity, onClick }) => {
  const { id, title, date, location, rating, isUpcoming } = activity;

  return (
    <div
      onClick={() => onClick(id)}
      className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between border border-gray-200"
      title={`View details for ${title}`}
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">Date:</span> {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-3">
          <span className="font-medium">Location:</span> {location}
        </p>
      </div>

      {isUpcoming ? (
        <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full w-max">
          Upcoming
        </span>
      ) : (
        rating !== undefined && (
          <div className="flex items-center space-x-1 text-yellow-500 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
            </svg>
            <span>{rating.toFixed(1)}</span>
          </div>
        )
      )}
    </div>
  );
};

export default ActivityCard;
