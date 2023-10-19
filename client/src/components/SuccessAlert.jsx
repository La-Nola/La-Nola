import React from 'react';

const SuccessAlert = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-10">
          <div className="relative max-w-xl py-6 pl-2 mx-auto bg-white border-b-4 border-blue-800 rounded-md shadow dark:bg-gray-800" role="alert">
            <div className="flex px-6">
              <div className="py-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 mr-4 text-blue-800 dark:text-blue-400 bi bi-check2-circle" viewBox="0 0 16 16">
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
              </div>
              <div>
              <p className="mb-1 text-lg font-bold text-blue-500 dark:text-gray-300">
              Willkommen bei La-Nola
                </p>
                <p className="mb-1 text-md font-bold text-gray-400 dark:text-gray-300">
                {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SuccessAlert;
