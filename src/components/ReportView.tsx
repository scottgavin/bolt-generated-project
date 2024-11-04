import React, { useState } from 'react';
    import { useUpdates } from '../contexts/UpdateContext';
    import jsPDF from 'jspdf';

    const ReportView: React.FC = () => {
      const { updates } = useUpdates();
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');

      const filteredUpdates = updates.filter(update => {
        const updateDate = new Date(update.createdAt);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || updateDate >= start) && (!end || updateDate <= end);
      });

      const groupedUpdates = filteredUpdates.reduce((acc, update) => {
        const week = `${update.createdAt.getFullYear()}-W${Math.ceil(update.createdAt.getDate() / 7)}`;
        if (!acc[week]) acc[week] = {};
        if (!acc[week][update.department]) acc[week][update.department] = [];
        acc[week][update.department].push(update);
        return acc;
      }, {} as Record<string, Record<string, typeof updates>>);

      const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Weekly Report', 10, 10);
        let y = 20;
        Object.entries(groupedUpdates).forEach(([week, departments]) => {
          doc.text(`Week: ${week}`, 10, y);
          y += 10;
          Object.entries(departments).forEach(([department, updates]) => {
            doc.text(`Department: ${department}`, 10, y);
            y += 10;
            updates.forEach(update => {
              doc.text(`- ${update.text}`, 10, y);
              y += 10;
            });
          });
        });
        doc.save('weekly-report.pdf');
      };

      return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-4">Weekly Reports</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button onClick={exportPDF} className="w-full bg-blue-500 text-white p-2 rounded">Export PDF</button>
          <div className="mt-4">
            {Object.entries(groupedUpdates).map(([week, departments]) => (
              <div key={week} className="mb-4">
                <h3 className="font-bold">Week: {week}</h3>
                {Object.entries(departments).map(([department, updates]) => (
                  <div key={department}>
                    <h4 className="font-semibold">Department: {department}</h4>
                    <ul>
                      {updates.map(update => (
                        <li key={update.id}>{update.text}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    };

    export default ReportView;
