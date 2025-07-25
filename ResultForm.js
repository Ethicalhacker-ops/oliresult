import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResultForm = ({ resultData, onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(resultData || {
    rollNumber: '',
    testDate: new Date().toISOString().split('T')[0],
    listeningScore: '',
    readingScore: '',
    writingScore: '',
    speakingScore: '',
    overallBand: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = resultData?._id 
        ? `/api/admin/results/${resultData._id}`
        : '/api/admin/results';
      
      const { data } = resultData?._id
        ? await axios.put(url, formData)
        : await axios.post(url, formData);
      
      toast.success(resultData?._id ? 'Result updated!' : 'Result added!');
      onSuccess(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Test Date</label>
          <input
            type="date"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['listening', 'reading', 'writing', 'speaking'].map((skill) => (
          <div key={skill}>
            <label className="block text-sm font-medium text-gray-700">
              {skill.charAt(0).toUpperCase() + skill.slice(1)} Score
            </label>
            <select
              name={`${skill}Score`}
              value={formData[`${skill}Score`]}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select</option>
              {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Overall Band</label>
        <select
          name="overallBand"
          value={formData.overallBand}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select</option>
          {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          name="comments"
          rows={3}
          value={formData.comments}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {resultData?._id ? 'Update Result' : 'Add Result'}
        </button>
      </div>
    </form>
  );
};

export default ResultForm;
