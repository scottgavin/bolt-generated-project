import React from 'react';
    import { useUpdates } from '../contexts/UpdateContext';
    import { useUser } from '../contexts/UserContext';

    const UpdateList: React.FC = () => {
      const { updates, editUpdate, deleteUpdate } = useUpdates();
      const { user } = useUser();

      return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-4">Your Updates</h2>
          {updates.filter(update => update.userId === user?.id).map(update => (
            <div key={update.id} className="mb-4 p-2 border border-gray-300 rounded">
              <p>{update.text}</p>
              <p className="text-sm text-gray-500">Tags: {update.tags.join(', ')}</p>
              <button
                onClick={() => editUpdate(update.id, update.text, update.tags)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUpdate(update.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      );
    };

    export default UpdateList;
