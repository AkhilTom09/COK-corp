"use client";

import { useState } from 'react';
import Link from 'next/link';

const INITIAL_PROJECTS = [
  { id: 'big-short', title: 'Big Short Option Backtester', status: 'In Progress', progress: 65, admin: 'Adith', priority: 'High', updated: '2 hours ago' },
  { id: 'note-server', title: 'Mobile Note Access API Server', status: 'Blocked', progress: 40, admin: 'Adith', priority: 'Medium', updated: '1 day ago' },
  { id: 'code-engine', title: 'Code Engine MCP Indexer', status: 'Completed', progress: 100, admin: 'System', priority: 'Low', updated: '3 days ago' },
  { id: 'project_1', title: 'My Awesome First Project', status: 'In Progress', progress: 10, admin: 'Adith', priority: 'High', updated: 'Just now' },
];

export default function ProjectsDashboard() {
  const [projects] = useState(INITIAL_PROJECTS);
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.status === filter);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Premium Top Navigation Bar */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>ApexTracker</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Notification Badge Bell */}
          <div style={{ position: 'relative', cursor: 'pointer', fontSize: '1.25rem' }}>
            🔔
            <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 5px', borderRadius: '9999px' }}>3</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>A</div>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155' }}>Adith (Admin)</span>
          </div>
        </div>
      </nav>

      {/* Main Container Dashboard */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.25rem 0' }}>Project Portfolio</h2>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>Monitor progress, timelines, and live status reviews across all workspaces.</p>
          </div>
          <button style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            + Create New Project
          </button>
        </div>

        {/* Dynamic Interactive Filter Pill Bar */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
          {['All', 'In Progress', 'Blocked', 'Completed'].map((status) => (
            <button 
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: filter === status ? '#0f172a' : '#e2e8f0',
                color: filter === status ? '#ffffff' : '#475569',
                fontWeight: 600,
                fontSize: '0.875rem',
                transition: 'all 0.2s ease'
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Responsive Grid System Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filteredProjects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  {/* Priority Tag indicator */}
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', borderRadius: '6px', backgroundColor: project.priority === 'High' ? '#fee2e2' : project.priority === 'Medium' ? '#ffedd5' : '#f1f5f9', color: project.priority === 'High' ? '#ef4444' : project.priority === 'Medium' ? '#f97316' : '#64748b' }}>
                    {project.priority} Priority
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.625rem', borderRadius: '20px', backgroundColor: project.status === 'Completed' ? '#dcfce7' : project.status === 'Blocked' ? '#fee2e2' : '#fef9c3', color: project.status === 'Completed' ? '#15803d' : project.status === 'Blocked' ? '#b91c1c' : '#a16207' }}>
                    ● {project.status}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 600, color: '#0f172a' }}>{project.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>Lead Manager: <b>{project.admin}</b></p>
                
                {/* Progress Visual Tracker */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: '#64748b', fontWeight: 500 }}>Completion Progress</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{project.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: project.status === 'Blocked' ? '#ef4444' : '#4f46e5', transition: 'width 0.4s ease' }} />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span>🔗 4 Resources</span>
                  <span>Updated {project.updated}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}