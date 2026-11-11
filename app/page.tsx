"use client";

import React, { useState } from 'react';
import ProjectDetailTemplate from '../components/ProjectDetailTemplate';

// 1. Structural Database Template Matrix
const MOCK_DB_PROJECTS = [
  { 
    id: 'C2026_01', 
    title: 'Vaduthala Railway Overbridge Construction', 
    status: 'Work Progressing', 
    progress: 45, 
    admin: 'Akhil', 
    priority: 'High Priority', 
    updated: '10 mins ago',
    description: 'Construction of a railway overbridge at Vaduthala to eliminate the existing level crossing bottleneck, improve traffic flow, enhance road safety, and provide seamless connectivity between key urban corridors. The project includes bridge construction, approach roads, utility relocation, drainage improvements, and associated traffic management works.',
    comments: [
      { id: 1, user: 'Clerk George', text: 'Test piling started.', time: '17 May 2026' },
      { id: 1, user: 'Clerk George', text: 'Test piling completed.', time: '22 June 2026' }
    ],
    resources: ['📄 Railway_Overbridge_Plan.pdf', '🔗 Environmental Impact Data'],
    budgetTotal: 3500,
    budgetUsed: 5500
  },
  { 
    id: 'thammanam-road', 
    title: 'Thammanam–Pulleppady Road Four-Lane Widening & Land Acquisition', 
    status: 'Not Started', 
    progress: 0, 
    admin: 'Adith', 
    priority: 'High Priority', 
    updated: '1 day ago',
    description: 'Crucial urban arterial roadway alignment project aimed at easing heavy peak traffic gridlock across downtown Ernakulam sectors.',
    comments: [
      { id: 1, user: 'System', text: 'Land valuation files pending physical verification stamp at the taluk revenue office.', time: '1 day ago' },
      { id: 2, user: 'Adith', text: 'Following up with municipal surveyors regarding division line objections.', time: '5 hours ago' }
    ],
    resources: ['📄 Property_Survey_Map_V4.pdf', '🔗 Clearance Tracker']
  },
  { 
    id: 'water-supply-190mld', 
    title: 'Perandoor Canal Bridge', 
    status: 'Work Progressing', 
    progress: 12, 
    admin: 'System', 
    priority: 'Medium Priority', 
    updated: '3 hours ago',
    description: 'Comprehensive engineering phase for a mega-capacity purification grid to solve distribution deficits in local coastal divisions.',
    comments: [
      { id: 1, user: 'System', text: 'Initial allocation budget drafts uploaded successfully to state finance portal.', time: '3 hours ago' }
    ],
    resources: ['📄 Intake_Structure_Drafts.pdf']
  },
  { 
    id: 'canal-rejuvenation', 
    title: 'Vembanad Lake & Canal Rejuvenation Mission', 
    status: 'Estimate Stage', 
    progress: 0, 
    admin: 'Adith', 
    priority: 'Medium Priority', 
    updated: '1 week ago',
    description: 'Proposed desiltation, eco-restoration, and structural pathway embankments across primary tidal water channels feeding the lake basin.',
    comments: [
      { id: 1, user: 'Adith', text: 'Project closed out due to budgetary realignments and overlap with centrally funded irrigation initiatives.', time: '1 week ago' }
    ],
    resources: ['📄 Decommissioning_Report.pdf']
  },
  { 
    id: 'traffic-management', 
    title: 'Integrated Traffic Management System (ITMS)', 
    status: 'Completed', 
    progress: 100, 
    admin: 'System', 
    priority: 'Low Priority', 
    updated: '2 days ago',
    description: 'Deployment of automated smart traffic signal controllers alongside PTZ violation detection networks across 35 major junctions.',
    comments: [
      { id: 1, user: 'System', text: 'Red Light Violation Detection hardware networks fully synchronized with central servers.', time: '2 days ago' }
    ],
    resources: ['📄 Junction_Hardware_Specs.pdf', '🔗 Live Camera Interface']
  },
  { 
    id: 'goshree-bridge', 
    title: 'Goshree–Bolghatty Parallel Bridge Engineering Framework', 
    status: 'Estimate Stage', 
    progress: 5, 
    admin: 'Adith', 
    priority: 'Low Priority', 
    updated: '5 hours ago',
    description: 'Preparatory alignment assessment mapping and load-bearing test setups for the twin island connectivity thoroughfare.',
    comments: [
      { id: 1, user: 'Adith', text: 'Preliminary soil testing data requested from offshore drilling consultant.', time: '5 hours ago' }
    ],
    resources: ['📄 Bridge_Structural_Scope.pdf']
  }
];

// Clean global geometric typography system variables
const FONT_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export default function HomeDashboard() {
  const [projects, setProjects] = useState(MOCK_DB_PROJECTS);
  const [filter, setFilter] = useState('All');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const selectedProject = projects.find(p => p.id === activeProjectId);
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.status === filter);

  const handleAddComment = (projectId: string, text: string) => {
    setProjects(prevProjects => 
      prevProjects.map(p => p.id === projectId 
        ? { ...p, comments: [...p.comments, { id: Date.now(), user: 'Adith', text, time: 'Just now' }] } 
        : p
      )
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: FONT_STACK, WebkitFontSmoothing: 'antialiased' }}>
      
      {/* Navigation Header */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f3f4f6', padding: '0.85rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }} onClick={() => setActiveProjectId(null)}>
          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', backgroundColor: '#0f172a', borderRadius: '6px', color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>A</div> */}
          <h1 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>Future Kochi Mission</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ position: 'relative', fontSize: '1.1rem', cursor: 'pointer', color: '#4b5563' }}>
            ‼️<span style={{ position: 'absolute', top: '-2px', right: '-2px', backgroundColor: '#ef4444', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '1px 4px', borderRadius: '9999px' }}>3</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid #e5e7eb', paddingLeft: '1.25rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.8rem' }}>A</div>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#4b5563' }}>Adith</span>
          </div>
        </div>
      </nav>

      {/* Main Core View Area */}
      <main style={{ maxWidth: '1140px', margin: '0 auto', padding: '3rem 2rem' }}>
        
        {activeProjectId && selectedProject ? (
          <ProjectDetailTemplate 
            project={selectedProject} 
            onBack={() => setActiveProjectId(null)} 
            onAddComment={handleAddComment}
          />
        ) : (
          
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.03em' }}>Project Portfolio</h2>
              <p style={{ color: '#6b7280', margin: '0.35rem 0 0 0', fontSize: '0.9rem', fontWeight: 400 }}>Monitor metrics and active tracks across software workspaces.</p>
            </div>

            {/* Premium Sub-Navigation Tab Segment */}
            <div style={{ marginBottom: '1.75rem', display: 'flex', gap: '0.35rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>
              {/* {['All', 'In Progress', 'Planning', 'Cancelled', 'Completed'].map((status) => ( */}
              {['All', 'Not Started', 'File Initiated', 'Estimate Stage', 'Administrative Sanction Stage', 'Technical Sanction Stage', 'Tender Stage', 'Work Order Stage', 'Work Progressing', 'Completed',  'Delayed'].map((status) => (
                <button 
                  key={status} 
                  onClick={() => setFilter(status)}
                  style={{ 
                    padding: '0.4rem 1rem', 
                    borderRadius: '6px', 
                    border: 'none', 
                    cursor: 'pointer', 
                    backgroundColor: filter === status ? '#0f172a' : 'transparent', 
                    color: filter === status ? '#ffffff' : '#6b7280', 
                    fontWeight: 500, 
                    fontSize: '0.85rem',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    if (filter !== status) e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    if (filter !== status) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Stacked Row Layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredProjects.map((project) => {
                // Computed semantic theme values
                const isHigh = project.priority === 'High Priority';
                const isMed = project.priority === 'Medium Priority';
                // const accentColor = isHigh ? '#ef4444' : isMed ? '#f97316' : '#6b7280';
                const accentColor = isHigh ? '#b22b4e' : isMed ? '#e95d2b' : '#f9c8a5';
                const priorityBg = isHigh ? '#fef2f2' : isMed ? '#fff7ed' : '#f9fafb';

                const isComplete = project.status === 'Completed';
                const isCancelled = project.status === 'Cancelled';
                const isNotStarted = project.status === 'Not Started';
                const statusColor = isComplete ? '#10b981' : isCancelled ? '#9ca3af' : isNotStarted ? '#80768f': '#0b97f5';
                const statusBg = isComplete ? '#ecfdf5' : isCancelled ? '#f9fafb' : isNotStarted ? '#ebebeb' : '#ebfbff';

                return (
                  <div 
                    key={project.id}
                    onClick={() => setActiveProjectId(project.id)}
                    style={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '10px', 
                      padding: '1.15rem 1.5rem', 
                      border: '1px solid #e5e7eb', 
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)', 
                      cursor: 'pointer', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '2rem',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#cbd5e1';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.04), 0 4px 6px -4px rgba(0,0,0,0.04)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.02)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {/* Visual left accent bar matching urgency */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: accentColor }} />

                    {/* Column 1: Priority */}
                    <div style={{ width: '150px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: priorityBg, color: accentColor, border: `1px solid ${accentColor}15` }}>
                        {project.priority}
                      </span>
                    </div>

                    {/* Column 2: Core Context Heading */}
                    <div style={{ flex: '1 1 0%', minWidth: '240px' }}>
                      <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem', fontWeight: 600, color: '#111827', letterSpacing: '-0.01em' }}>
                        {project.title}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: 0, fontWeight: 400 }}>
                        Manager <span style={{ color: '#4b5563', fontWeight: 500 }}>{project.admin}</span>
                      </p>
                    </div>

                    {/* Column 3: Custom Micro Status pill */}
                    <div style={{ width: '120px', flexShrink: 0 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: statusBg, color: statusColor }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: statusColor }} />
                        {project.status}
                      </span>
                    </div>
                    
                    {/* Column 4: High-fidelity Progress Meter */}
                    <div style={{ width: '180px', flexShrink: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem', fontWeight: 500 }}>
                        <span style={{ color: '#9ca3af' }}>Progress</span>
                        <span style={{ color: '#111827', fontWeight: 600 }}>{project.progress}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${project.progress}%`, height: '100%', borderRadius: '9999px', backgroundColor: isComplete ? '#10b981' : isCancelled ? '#ef4444' : isNotStarted ? '#7c3cdc': '#e6ae4d', transition: 'width 0.4s ease' }} />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}