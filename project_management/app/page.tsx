"use client";

import React, { useState } from 'react';

// 1. Template Structure mimicking a Database Schema
const MOCK_DB_PROJECTS = [
  { 
    id: 'big-short', 
    title: 'Big Short Option Backtester', 
    status: 'In Progress', 
    progress: 65, 
    admin: 'Adith', 
    priority: 'High', 
    updated: '2 hours ago',
    description: 'Production-grade options strategy engine simulating RSI signals on the Nifty 50 index with dynamic stop loss trackers.',
    comments: [
      { id: 1, user: 'Adith', text: 'Completed testing the custom RSI indicator parameters over the historical 5-year log.', time: '2 hours ago' },
      { id: 2, user: 'System', text: 'Automated integration check completed successfully.', time: '5 hours ago' }
    ],
    resources: ['📄 Options_Backtest_V1.pdf', '🔗 Core Data Repository']
  },
  { 
    id: 'note-server', 
    title: 'Mobile Note Access API Server', 
    status: 'Blocked', 
    progress: 40, 
    admin: 'Adith', 
    priority: 'Medium', 
    updated: '1 day ago',
    description: 'Local server environment designed to securely parse personal notes and serve them via custom API layers to remote mobile instances.',
    comments: [
      { id: 1, user: 'System', text: 'Port connection error detected on incoming network interface hook.', time: '1 day ago' }
    ],
    resources: ['📄 API_Endpoints_Spec.pdf']
  }
];

export default function UnifiedProjectTracker() {
  const [projects, setProjects] = useState(MOCK_DB_PROJECTS);
  const [filter, setFilter] = useState('All');
  
  // Active state to determine if we show the full dashboard list or 1 active project view
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  // Find the selected project object if one is open
  const currentProject = projects.find(p => p.id === activeProjectId);

  // Filter Logic
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.status === filter);

  // Handle adding a live comment locally
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !activeProjectId) return;

    setProjects(prevProjects => 
      prevProjects.map(p => {
        if (p.id === activeProjectId) {
          return {
            ...p,
            comments: [...p.comments, { id: Date.now(), user: 'Adith', text: newComment, time: 'Just now' }]
          };
        }
        return p;
      })
    );
    setNewComment('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Universal Top Navigation Header Bar */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveProjectId(null)}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>ApexTracker</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ position: 'relative', fontSize: '1.25rem' }}>
            🔔<span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 5px', borderRadius: '9999px' }}>2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>A</div>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155' }}>Adith (Admin)</span>
          </div>
        </div>
      </nav>

      {/* Main Framework View Wrapper */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        
        {/* VIEW 1: DYNAMIC PROJECT DETAIL PAGE VIEW */}
        {currentProject ? (
          <div>
            <button 
              onClick={() => setActiveProjectId(null)} 
              style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginBottom: '1.5rem', padding: 0 }}
            >
              ← Back to Project Portfolio
            </button>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>{currentProject.title}</h2>
                <span style={{ padding: '0.35rem 0.75rem', backgroundColor: currentProject.status === 'Blocked' ? '#fee2e2' : '#ffedd5', color: currentProject.status === 'Blocked' ? '#b91c1c' : '#f97316', fontWeight: 700, borderRadius: '20px', fontSize: '0.85rem' }}>
                  {currentProject.status}
                </span>
              </div>
              <p style={{ color: '#475569', marginTop: '0.5rem', fontSize: '1.05rem', maxWidth: '800px' }}>{currentProject.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
              {/* Left Column: Comments */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem' }}>Team Logs & Workspace Feed</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    {currentProject.comments.map((c) => (
                      <div key={c.id} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem' }}>
                          <b>{c.user}</b><span>{c.time}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.925rem', color: '#334155' }}>{c.text}</p>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Type an operational workspace update..." 
                      style={{ flex: 1, padding: '0.625rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                    />
                    <button type="submit" style={{ backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '0.625rem 1.15rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                      Post Log
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Attachments Document Vault */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', height: 'fit-content' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem' }}>Project Resources</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentProject.resources.map((res, i) => (
                    <div key={i} style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', fontSize: '0.9rem', color: '#334155' }}>
                      {res}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          // VIEW 2: PORTFOLIO MAIN LIST DASHBOARD VIEW
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', margin: '0' }}>Project Portfolio</h2>
                <p style={{ color: '#64748b', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>Track metrics across engineering dependencies instantly.</p>
              </div>
            </div>

            {/* Pill Filters */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              {['All', 'In Progress', 'Blocked'].map((status) => (
                <button 
                  key={status} 
                  onClick={() => setFilter(status)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', backgroundColor: filter === status ? '#0f172a' : '#e2e8f0', color: filter === status ? '#ffffff' : '#475569', fontWeight: 600, fontSize: '0.875rem' }}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Grid Layout Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => setActiveProjectId(project.id)}
                  style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', borderRadius: '6px', backgroundColor: project.priority === 'High' ? '#fee2e2' : '#ffedd5', color: project.priority === 'High' ? '#ef4444' : '#f97316' }}>
                      {project.priority} Priority
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.625rem', borderRadius: '20px', backgroundColor: project.status === 'Blocked' ? '#fee2e2' : '#fef9c3', color: project.status === 'Blocked' ? '#b91c1c' : '#a16207' }}>
                      ● {project.status}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 600, color: '#0f172a' }}>{project.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>Manager: <b>{project.admin}</b></p>
                  
                  {/* Progress Ring Bar */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      <span style={{ color: '#64748b' }}>Completion Metrics</span>
                      <span style={{ fontWeight: 700 }}>{project.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: project.status === 'Blocked' ? '#ef4444' : '#4f46e5' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}