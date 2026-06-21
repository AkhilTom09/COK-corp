"use client";

import React, { useState } from 'react';
import ProjectDetailTemplate from '../components/ProjectDetailTemplate';

// 1. Structural Database Template Matrix
const MOCK_DB_PROJECTS = [
  { 
    id: 'big-short', 
    title: 'Big Short Option Backtester', 
    status: 'In Progress', 
    progress: 65, 
    admin: 'Adith', 
    priority: 'High', 
    updated: '2 hours ago',
    description: 'Production-grade options strategy engine simulating RSI signals on the Nifty 50 index with dynamic stop-loss trackers.',
    comments: [
      { id: 1, user: 'Adith', text: 'Completed testing the custom RSI indicator parameters over the historical 5-year log.', time: '2 hours ago' },
      { id: 2, user: 'System', text: 'Automated integration check completed successfully.', time: '5 hours ago' }
    ],
    resources: ['📄 Options_Backtest_V1.pdf', '🔗 Core Data Repository', '📄 Risk_Management_Rules.pdf']
  },
  { 
    id: 'note-server', 
    title: 'Mobile Note Access API Server', 
    status: 'Blocked', 
    progress: 40, 
    admin: 'Adith', 
    priority: 'Medium', 
    updated: '1 day ago',
    description: 'Local backend microservice environment designed to securely parse personal files and serve them via high-performance network protocols to remote mobile clients.',
    comments: [
      { id: 1, user: 'System', text: 'Port connection error detected on incoming network interface hook.', time: '1 day ago' },
      { id: 2, user: 'Adith', text: 'Debugging local IP mapping restrictions on the MacBook firewall now.', time: '18 hours ago' }
    ],
    resources: ['📄 API_Endpoints_Spec.pdf', '🔗 Local Networking Logs']
  },
  { 
    id: 'code-engine', 
    title: 'Code Engine MCP Indexer', 
    status: 'Completed', 
    progress: 100, 
    admin: 'System', 
    priority: 'Low', 
    updated: '3 days ago',
    description: 'Advanced code parser utility utilizing tree-sitter libraries to index structural semantic context across legacy codebases.',
    comments: [
      { id: 1, user: 'System', text: 'Production deployment build successfully initialized globally.', time: '3 days ago' }
    ],
    resources: ['📄 System_Architecture_V2.pdf', '🔗 Live Deployment Endpoint']
  }
];

export default function HomeDashboard() {
  const [projects, setProjects] = useState(MOCK_DB_PROJECTS);
  const [filter, setFilter] = useState('All');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Safely locate the chosen project data block
  const selectedProject = projects.find(p => p.id === activeProjectId);
  
  // Apply visual category filtering
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.status === filter);

  // Centralized Database Update Simulator Hook
  const handleAddComment = (projectId: string, text: string) => {
    setProjects(prevProjects => 
      prevProjects.map(p => p.id === projectId 
        ? { ...p, comments: [...p.comments, { id: Date.now(), user: 'Adith', text, time: 'Just now' }] } 
        : p
      )
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Universal Sticky Top Bar Navigation */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveProjectId(null)}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>ApexTracker</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ position: 'relative', fontSize: '1.25rem', cursor: 'pointer' }}>
            🔔<span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 5px', borderRadius: '9999px' }}>3</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>A</div>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155' }}>Adith (Admin)</span>
          </div>
        </div>
      </nav>

      {/* Main Core View Area */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        
        {/* COMPILATION SECURITY GUARD: Confirm both the pointer and match exist before invoking the layout template */}
        {activeProjectId && selectedProject ? (
          <ProjectDetailTemplate 
            project={selectedProject} 
            onBack={() => setActiveProjectId(null)} 
            onAddComment={handleAddComment}
          />
        ) : (
          
          // MASTER PORTFOLIO GRID VIEW
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Project Portfolio</h2>
              <p style={{ color: '#64748b', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>Monitor progress metrics and engineering tracks across workspaces.</p>
            </div>

            {/* Pill Filters bar */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              {['All', 'In Progress', 'Blocked', 'Completed'].map((status) => (
                <button 
                  key={status} 
                  onClick={() => setFilter(status)}
                  style={{ 
                    padding: '0.5rem 1.15rem', 
                    borderRadius: '20px', 
                    border: 'none', 
                    cursor: 'pointer', 
                    backgroundColor: filter === status ? '#0f172a' : '#e2e8f0', 
                    color: filter === status ? '#ffffff' : '#475569', 
                    fontWeight: 600, 
                    fontSize: '0.875rem',
                    transition: 'all 0.15s ease'
                  }}
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
                  style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', cursor: 'pointer', transition: 'transform 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', borderRadius: '6px', backgroundColor: project.priority === 'High' ? '#fee2e2' : project.priority === 'Medium' ? '#ffedd5' : '#f1f5f9', color: project.priority === 'High' ? '#ef4444' : project.priority === 'Medium' ? '#f97316' : '#64748b' }}>
                      {project.priority} Priority
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.625rem', borderRadius: '20px', backgroundColor: project.status === 'Completed' ? '#dcfce7' : project.status === 'Blocked' ? '#fee2e2' : '#fef9c3', color: project.status === 'Completed' ? '#15803d' : project.status === 'Blocked' ? '#b91c1c' : '#a16207' }}>
                      ● {project.status}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 600, color: '#0f172a' }}>{project.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>Lead Manager: <b>{project.admin}</b></p>
                  
                  {/* Progress Indicator Bar */}
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      <span style={{ color: '#64748b', fontWeight: 500 }}>Completion Progress</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{project.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: project.status === 'Completed' ? '#10b981' : project.status === 'Blocked' ? '#ef4444' : '#4f46e5' }} />
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