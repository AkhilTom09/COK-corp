"use client";

import { useState, use } from 'react';
import Link from 'next/link';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the dynamic URL parameter (e.g., 'big-short')
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  // Mock State Data
  const [comments, setComments] = useState([
    { id: 1, user: 'Adith', text: 'Completed testing the custom RSI indicator parameters over the historical 5-year log.', time: '2 hours ago' },
    { id: 2, user: 'System', text: 'Automated integration check completed successfully.', time: '5 hours ago' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), user: 'Adith', text: newComment, time: 'Just now' }]);
    setNewComment('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Back Button Link Nav */}
        <Link href="/" style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 600, fontSize: '0.95rem', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← Back to Portfolio Dashboard
        </Link>

        {/* Project Header Shell */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>
              {projectId === 'big-short' ? 'Big Short Option Backtester' : projectId === 'note-server' ? 'Mobile Note Access API Server' : 'Code Engine MCP Indexer'}
            </h1>
            <span style={{ padding: '0.35rem 0.75rem', backgroundColor: '#ffedd5', color: '#f97316', fontWeight: 700, borderRadius: '20px', fontSize: '0.85rem' }}>In Progress</span>
          </div>
          <p style={{ color: '#475569', marginTop: '0.5rem', fontSize: '1.05rem', maxWidth: '700px' }}>
            Production-grade deployment tracking log for core engineering components. Linked safely with repository pipelines.
          </p>
        </div>

        {/* Left/Right Flex Split Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          
          {/* LEFT PANEL: Timeline and Comments Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Visual Timeline Tracking Component */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.15rem', color: '#0f172a' }}>Milestone History Timeline</h3>
              <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '1.5rem', marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#4f46e5' }}>● Current Sprint Phase</div>
                  <h4 style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>Integrate Core Database Relational Schemas</h4>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>✓ Completed</div>
                  <h4 style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', color: '#475569' }}>Initial Interface Wireframes and Mock Logic Compiled</h4>
                </div>
              </div>
            </div>

            {/* Live Interactive Collaboration Comments Log */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', color: '#0f172a' }}>Team Chat & Log Updates</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {comments.map((c) => (
                  <div key={c.id} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      <b>{c.user}</b>
                      <span>{c.time}</span>
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
                  placeholder="Type an update or comment..." 
                  style={{ flex: 1, padding: '0.625rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
                <button type="submit" style={{ backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '0.625rem 1.15rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                  Post
                </button>
              </form>
            </div>

          </div>

          {/* RIGHT PANEL: Attachments and Associated Resources Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', color: '#0f172a' }}>Assets & Documents</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', fontSize: '0.9rem', color: '#334155' }}>
                  📄 Architecture_Spec.pdf
                </a>
                <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', fontSize: '0.9rem', color: '#334155' }}>
                  🔗 Core Figma Design File
                </a>
              </div>
              <button style={{ width: '100%', marginTop: '1rem', backgroundColor: '#f1f5f9', border: '1px dashed #cbd5e1', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
                + Add Resource Link/File
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}