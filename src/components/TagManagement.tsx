import React, { useState } from 'react';

    const TagManagement: React.FC = () => {
      const [tags, setTags] = useState<string[]>([
        'Feature Launch',
        'Bug Fix',
        'Customer Support',
        'Documentation',
        'Team Achievement',
        'Process Improvement'
      ]);
      const [newTag, setNewTag] = useState('');

      const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
          setTags([...tags, newTag]);
          setNewTag('');
        }
      };

      const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
      };

      return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-4">Manage Tags</h2>
          <div className="mb-4">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="New tag"
            />
            <button onClick={addTag} className="w-full bg-green-500 text-white p-2 rounded mt-2">Add Tag</button>
          </div>
          <ul>
            {tags.map(tag => (
              <li key={tag} className="flex justify-between items-center mb-2">
                <span>{tag}</span>
                <button onClick={() => removeTag(tag)} className="text-red-500">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default TagManagement;
