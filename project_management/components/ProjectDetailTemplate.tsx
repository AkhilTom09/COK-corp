"use client";

import React, { useState } from 'react';

// Define what properties this component expects to receive from the database
interface ProjectData {
  id: string;
  title: string;
  status: string;
  progress: number;
  admin: string;
  priority: string;
  description: string;
  comments: Array<{ id: number; user: string; text: string; time: string }>;
  resources: string[];
}

interface TemplateProps {
  project: ProjectData;
  onBack: () => void;
  onAddComment: (projectId: string, commentText: string) => void;
}

export default function ProjectDetailTemplate({ project, onBack, onAddComment }: TemplateProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(project.id, newComment);
    setNewComment('');
  };

  return (
    <div>
      <button 
        onClick={onBack} 
        style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginBottom: '1.5rem', padding: 0 }}
      >
        ← Back to Project Portfolio
      </button>

      {/* Header Info Block */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>{project.title}</h2>
          <span style={{ 
            padding: '0.35rem 0.75rem', 
            backgroundColor: project.status === 'Completed' ? '#dcfce7' : project.status === 'Blocked' ? '#fee2e2' : '#ffedd5', 
            color: project.status === 'Completed' ? '#15803d' : project.status === 'Blocked' ? '#b91c1c' : '#f97316', 
            fontWeight: 700, borderRadius: '20px', fontSize: '0.85rem' 
          }}>
            ● {project.status}
          </span>
        </div>
        <p style={{ color: '#475569', marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: '1.5' }}>{project.description}</p>
      </div>

      {/* Split Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left Side: Comments feed */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.15rem', fontWeight: 600 }}>Team Logs & Workspace Feed</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {project.comments.map((c) => (
              <div key={c.id} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.35rem' }}>
                  <b>{c.user}</b><span>{c.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.925rem', color: '#334155' }}>{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type a workflow log update..." 
              style={{ flex: 1, padding: '0.625rem 0.85rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
            <button type="submit" style={{ backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
              Post Log
            </button>
          </form>
        </div>

        {/* Right Side: Resources Vault */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', fontWeight: 600 }}>Project Resources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {project.resources.map((res, i) => (
              <div key={i} style={{ padding: '0.625rem', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '0.9rem', color: '#334155' }}>
                {res}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}