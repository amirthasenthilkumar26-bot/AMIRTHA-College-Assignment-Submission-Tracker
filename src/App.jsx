import React, { useState } from 'react';

function App() {
  // 1. Core State: Store the list of assignments
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Java OOPs Concepts Lab", subject: "Java Programming", dueDate: "2026-07-05", status: "Pending" },
    { id: 2, title: "DBMS Normalization Assignment", subject: "Database Systems", dueDate: "2026-06-20", status: "Submitted" },
    { id: 3, title: "React Components Practice", subject: "Web Development", dueDate: "2026-07-10", status: "Pending" },
  ]);

  // 2. Form States: Capture user inputs for a new task
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');

  // 3. Logic: Add a new assignment to the dashboard
  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!title || !subject || !dueDate) {
      alert("Please fill in all the details!");
      return;
    }

    const newAssignment = {
      id: Date.now(), // Generates a unique ID
      title: title,
      subject: subject,
      dueDate: dueDate,
      status: "Pending"
    };

    setAssignments([...assignments, newAssignment]);
    
    // Reset form inputs
    setTitle('');
    setSubject('');
    setDueDate('');
  };

  // 4. Logic: Toggle status between Pending and Submitted
  const toggleStatus = (id) => {
    setAssignments(assignments.map(item => 
      item.id === id 
        ? { ...item, status: item.status === "Pending" ? "Submitted" : "Pending" } 
        : item
    ));
  };

  // 5. Logic: Delete an assignment
  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(item => item.id !== id));
  };

  // 6. Calculations: Dashboard Statistics Counters
  const totalCount = assignments.length;
  const submittedCount = assignments.filter(a => a.status === "Submitted").length;
  const pendingCount = assignments.filter(a => a.status === "Pending").length;

  return (
    <div style={{ padding: '25px', fontFamily: '"Segoe UI", Roboto, sans-serif', maxWidth: '950px', margin: '0 auto', color: '#333' }}>
      
      {/* HEADER SECTION */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#0056b3', fontSize: '32px', marginBottom: '10px' }}>🎓 College Assignment Submission Tracker</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>An efficient, automated dashboard for professors to manage and monitor student submissions.</p>
      </header>
      
      {/* STATS CARDS DISPLAY */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', marginBottom: '35px' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#0d47a1', fontSize: '18px' }}>Total Tasks</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#0d47a1' }}>{totalCount}</p>
        </div>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1b5e20', fontSize: '18px' }}>Completed / Submitted</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#1b5e20' }}>{submittedCount}</p>
        </div>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff3e0', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#e65100', fontSize: '18px' }}>Pending Evaluation</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#e65100' }}>{pendingCount}</p>
        </div>
      </div>

      {/* CREATION FORM CONTAINER */}
      <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '10px', marginBottom: '35px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>➕ Distribute New Assignment Task</h3>
        <form onSubmit={handleAddAssignment} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input 
            type="text" placeholder="e.g., Array Structures Lab" value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 2, minWidth: '200px', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}
          />
          <input 
            type="text" placeholder="e.g., Data Structures" value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}
          />
          <input 
            type="date" value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}
          />
          <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'background 0.2s' }}>
            Publish Task
          </button>
        </form>
      </div>

      {/* TRACKING RECORDS DATA TABLE */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #eee' }}>
        <h3 style={{ padding: '20px 25px 5px 25px', margin: 0, color: '#333' }}>📋 Live Submission Ledger</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '15px', fontSize: '15px' }}>Assignment Title</th>
              <th style={{ padding: '15px', fontSize: '15px' }}>Subject Course</th>
              <th style={{ padding: '15px', fontSize: '15px' }}>Deadline Date</th>
              <th style={{ padding: '15px', fontSize: '15px' }}>Live Status</th>
              <th style={{ padding: '15px', fontSize: '15px', textAlgin: 'center' }}>Management Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#999', fontSize: '16px' }}>No assignments tracked yet. Create one above!</td>
              </tr>
            ) : (
              assignments.map((assignment) => (
                <tr key={assignment.id} style={{ borderBottom: '1px solid #eee', transition: 'background 0.2s' }}>
                  <td style={{ padding: '15px', fontWeight: '500' }}>{assignment.title}</td>
                  <td style={{ padding: '15px', color: '#555' }}>{assignment.subject}</td>
                  <td style={{ padding: '15px', color: '#666', fontFamily: 'monospace' }}>{assignment.dueDate}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '6px 12px', 
                      borderRadius: '50px', 
                      fontSize: '13px',
                      fontWeight: 'bold',
                      backgroundColor: assignment.status === 'Submitted' ? '#d4edda' : '#f8d7da',
                      color: assignment.status === 'Submitted' ? '#155724' : '#721c24',
                      display: 'inline-block'
                    }}>
                      {assignment.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => toggleStatus(assignment.id)}
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: assignment.status === 'Pending' ? '#28a745' : '#ffc107', 
                        color: assignment.status === 'Pending' ? 'white' : '#333', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '13px'
                      }}
                    >
                      {assignment.status === 'Pending' ? 'Mark Received' : 'Revert to Pending'}
                    </button>
                    <button 
                      onClick={() => deleteAssignment(assignment.id)}
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '13px'
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;