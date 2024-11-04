import React, { useState } from 'react';
    import { useUpdates } from '../contexts/UpdateContext';

    const TAGS = [
      'Feature Launch',
      'Bug Fix',
      'Customer Support',
      'Documentation',
      'Team Achievement',
      'Process Improvement'
    ];

    const UpdateForm: React.FC = () => {
      const { addUpdate } = useUpdates();
      const [text, setText] = useState('');
      const [selectedTags, setSelectedTags] = useState<string[]>([]);
      const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
      const [linkUrl, setLinkUrl] = useState('');
      const [error, setError] = useState('');

      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageBase64(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.length > 500) {
          setError('Text exceeds 500 characters');
          return;
        }
        if (selectedTags.length === 0) {
          setError('Please select at least one tag');
          return;
        }
        await addUpdate(text, selectedTags, imageBase64, linkUrl);
        setText('');
        setSelectedTags([]);
        setImageBase64(undefined);
        setLinkUrl('');
        setError('');
      };

      return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-4">Submit Update</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Update Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              maxLength={500}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tags</label>
            <select
              multiple
              value={selectedTags}
              onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {TAGS.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Link URL</label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
      );
    };

    export default UpdateForm;
