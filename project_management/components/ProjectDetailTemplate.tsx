"use client";

import React, { useState } from 'react';

// Comprehensive property interface handling structural municipal project fields
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
  budgetTotal?: number; 
  budgetUsed?: number;
  department?: string;
  category?: string;
  wardZone?: string;
  
  locationDetails?: {
    coverageArea?: string;
    wardBoundary?: string;
    siteAddress?: string;
  };
  financialBreakdown?: {
    fundingSource?: string;
    approvedBudget?: number;
    releasedAmount?: number;
    spentAmount?: number;
  };
  executionTimeline?: {
    startDate?: string;
    expectedCompletionDate?: string;
    actualCompletionDate?: string;
  };
  contractorProfile?: {
    companyName?: string;
    contractValue?: number;
    contractPeriod?: string;
    contactPerson?: string;
    contactDetails?: string;
    qualityScore?: number;
  };
}

interface TemplateProps {
  project: ProjectData;
  onBack: () => void;
  onAddComment: (projectId: string, commentText: string) => void;
}

const FONT_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export default function ProjectDetailTemplate({ project, onBack, onAddComment }: TemplateProps) {
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'governance' | 'logs'>('overview');

  // Primary Financial Computations with safe fallback mappings
  const totalBudget = project.budgetTotal || project.financialBreakdown?.approvedBudget || 2500000; 
  const usedBudget = project.budgetUsed || project.financialBreakdown?.spentAmount || Math.floor(totalBudget * (project.progress / 100));
  const budgetPercentage = Math.min(Math.round((usedBudget / totalBudget) * 100), 100);
  const releasedAmount = project.financialBreakdown?.releasedAmount || Math.floor(totalBudget * 0.8);
  const remainingBudget = totalBudget - usedBudget;

  // Structural context defaults if specific objects are absent from database pass
  const loc = project.locationDetails || { coverageArea: "Vaduthala Sector", wardBoundary: "Ward 34", siteAddress: "Vaduthala LC Gate Junction, Kochi" };
  const fin = project.financialBreakdown || { fundingSource: "KIIFB (Kerala Infrastructure Investment Fund Board)" };
  const time = project.executionTimeline || { startDate: "12 Jan 2026", expectedCompletionDate: "30 Nov 2026", actualCompletionDate: "Pending Execution" };
  const contractor = project.contractorProfile || { companyName: "Marymatha Construction Co.", contractValue: totalBudget, contractPeriod: "10 Months", contactPerson: "Er. K. V. Joseph", contactDetails: "+91 484 239 4511", qualityScore: 8.8 };

  // Theme configuration structures matching main dashboard layout exactly
  const isHigh = project.priority === 'High Priority';
  const isMed = project.priority === 'Medium Priority';
  const accentColor = isHigh ? '#b22b4e' : isMed ? '#e95d2b' : '#f9c8a5';
  const priorityBg = isHigh ? '#fef2f2' : isMed ? '#fff7ed' : '#f9fafb';

  const isComplete = project.status === 'Completed';
  const isCancelled = project.status === 'Cancelled';
  const isPlanning = project.status === 'Planning';
  const statusColor = isComplete ? '#10b981' : isCancelled ? '#ef4444' : isPlanning ? '#7c3cdc': '#f59e0b';
  const statusBg = isComplete ? '#ecfdf5' : isCancelled ? '#fef2f2' : isPlanning ? '#f8f3ff' : '#fffbeb';

  const department = 'Roads'
  const category = 'Development'
  const wardZone = '24/Vaduthala'

  const lifecycleStatuses = ['Planning', 'In Progress', 'Completed'];

  const phaseMatrix = [
    { key: 'A', name: 'Phase A: Clearance', planStart: 0, planEnd: 2, actStart: 0, actEnd: 5, budgetWeight: 0.15 },
    { key: 'B', name: 'Phase B: Piling Work', planStart: 2, planEnd: 5, actStart: 3, actEnd: 6, budgetWeight: 0.60 },
    { key: 'C', name: 'Phase C: Girder Launch', planStart: 5, planEnd: 6, actStart: 5.35, actEnd: 6, budgetWeight: 0.25 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(project.id, newComment);
    setNewComment('');
  };

  // Shared subcomponent block styles to guarantee uniform alignment grids
  const moduleBoxStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)'
  };

  const fieldRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '0.8rem',
    marginBottom: '0.8rem',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '0.875rem'
  };

  const labelStyle = { color: '#6b7280', fontWeight: 400 };
  const valueStyle = { color: '#111827', fontWeight: 500, textAlign: 'right' as const };

  return (
    <div style={{ fontFamily: FONT_STACK, WebkitFontSmoothing: 'antialiased' }}>
      
      {/* Back Button Navigation Anchor */}
      <button 
        onClick={onBack} 
        style={{ 
          background: 'none', 
          color: '#4b5563', 
          fontWeight: 500, 
          fontSize: '0.85rem', 
          cursor: 'pointer', 
          marginBottom: '2rem', 
          padding: '0.4rem 0.75rem',
          borderRadius: '6px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.02)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
          e.currentTarget.style.borderColor = '#cbd5e1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = '#e5e7eb';
        }}
      >
        ← Back to Project Portfolio
      </button>

      {/* Main Core Header Context Container Block */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '10px', 
        padding: '2rem', 
        border: '1px solid #e5e7eb', 
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)', 
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: accentColor }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: priorityBg, color: accentColor, border: `1px solid ${accentColor}15` }}>
                {project.priority}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.725rem', fontWeight: 600, padding: '0.15rem 0.55rem', borderRadius: '9999px', backgroundColor: statusBg, color: statusColor }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: statusColor }} />
                {project.status}
              </span>
            </div>
            
            <h2 style={{ fontSize: '1.65rem', fontWeight: 700, margin: 0, color: '#111827', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
              {project.title}
            </h2>
            
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.5rem', marginBottom: 0, fontWeight: 400 }}>
              Lead Administrator: <span style={{ color: '#4b5563', fontWeight: 500 }}>{project.admin}</span>
            </p>
          </div>
        </div>
      </div>

      {/* NEW SIDE-TABBED PANEL SYSTEM MAIN GRID WRAPPER */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: NAVIGATION BAR MODULE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {[
            { id: 'overview', label: '📋 Mission Overview' },
            { id: 'metrics', label: '⏳ Execution Metrics' },
            { id: 'governance', label: '🏛️ Governance & Operations' },
            { id: 'logs', label: '💬 Activity Logs & Vault' }
          ].map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: isTabActive ? 600 : 500,
                  backgroundColor: isTabActive ? '#0f172a' : 'transparent',
                  color: isTabActive ? '#ffffff' : '#4b5563',
                  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  if (!isTabActive) e.currentTarget.style.backgroundColor = '#eaeaea';
                }}
                onMouseLeave={(e) => {
                  if (!isTabActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: DYNAMIC COMPONENT PANEL AREA */}
        <div style={{ minWidth: 0 }}>
          
          {/* TAB 1: OVERVIEW COMPONENT PANEL */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={moduleBoxStyle}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Project Outline</h3>
                <p style={{ color: '#4b5563', margin: 0, fontSize: '0.925rem', lineHeight: '1.6', fontWeight: 400 }}>
                  {project.description}
                </p>
                
                {/* Dynamic Municipal Metadata Strip Row moved here cleanly */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                  gap: '1rem', 
                  marginTop: '1.5rem', 
                  padding: '0.85rem 1rem', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  border: '1px solid #f3f4f6'
                }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', fontWeight: 600 }}>Project ID</span>
                    <span style={{ fontSize: '0.825rem', color: '#374151', fontWeight: 500 }}>{project.id}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', fontWeight: 600 }}>Department</span>
                    <span style={{ fontSize: '0.825rem', color: '#374151', fontWeight: 500 }}>{project.department || department}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', fontWeight: 600 }}>Category</span>
                    <span style={{ fontSize: '0.825rem', color: '#374151', fontWeight: 500 }}>{project.category || category}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', fontWeight: 600 }}>Ward / Zone</span>
                    <span style={{ fontSize: '0.825rem', color: '#374151', fontWeight: 500 }}>{project.wardZone || wardZone}</span>
                  </div>
                </div>
              </div>

              {/* Large restored progress bar view */}
              <div style={moduleBoxStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                  <span style={{ color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Project Progress</span>
                  <span style={{ color: '#111827' }}>{project.progress}% Complete</span>
                </div>
                <div style={{ width: '100%', height: '14px', backgroundColor: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${project.progress}%`, 
                    height: '100%', 
                    borderRadius: '9999px', 
                    backgroundColor: isComplete ? '#10b981' : isCancelled ? '#ef4444' : isPlanning ? '#7c3cdc' : '#e6ae4d', 
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
                  }} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: METRICS CHARTS PANEL */}
          {activeTab === 'metrics' && (
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
              gap: '1.5rem'
            }}>
              {/* LEFT GRAPH CARD: TIME TRACKING TIMELINE */}
              <div style={moduleBoxStyle}>
                <div style={{ fontSize: '0.75rem', marginBottom: '1.25rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  ⏳ Schedule Tracking (Plan vs. Reality)
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ width: '120px', flexShrink: 0, fontSize: '0.75rem', fontWeight: 600, color: '#4b5563' }}>Phases</div>
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 500, color: '#9ca3af' }}>
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {phaseMatrix.map((phase, idx) => {
                    const totalSlots = 6;
                    const planLeft = `${(phase.planStart / totalSlots) * 100}%`;
                    const planWidth = `${((phase.planEnd - phase.planStart) / totalSlots) * 100}%`;
                    
                    const hasDelay = phase.actEnd > phase.planEnd;
                    const normalActEnd = hasDelay ? phase.planEnd : phase.actEnd;
                    
                    const actLeft = `${(phase.actStart / totalSlots) * 100}%`;
                    const actWidth = `${((normalActEnd - phase.actStart) / totalSlots) * 100}%`;
                    const delayWidth = hasDelay ? `${((phase.actEnd - phase.planEnd) / totalSlots) * 100}%` : '0%';

                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', position: 'relative' }} title={`${phase.name}\nPlanned: Slot ${phase.planStart + 1}-${phase.planEnd}\nActual: Slot ${phase.actStart + 1}-${phase.actEnd}`}>
                        <div style={{ width: '120px', flexShrink: 0, fontSize: '0.8rem', fontWeight: 500, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '0.5rem' }}>
                          {phase.name}
                        </div>
                        
                        <div style={{ flex: 1, height: '32px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                          <div style={{ position: 'relative', width: '100%', height: '8px', backgroundColor: '#f3f4f6', borderRadius: '2px' }}>
                            <div style={{ position: 'absolute', left: planLeft, width: planWidth, height: '100%', backgroundColor: '#bfdbfe', borderRadius: '2px', transition: 'all 0.3s' }} />
                          </div>
                          <div style={{ position: 'relative', width: '100%', height: '8px' }}>
                            <div style={{ position: 'absolute', left: actLeft, width: actWidth, height: '100%', backgroundColor: '#2563eb', borderRadius: '2px', display: 'flex', transition: 'all 0.3s' }}>
                              {hasDelay && (
                                <div style={{ position: 'absolute', left: '100%', width: delayWidth, height: '100%', backgroundColor: '#ef4444', borderRadius: '0 2px 2px 0' }} title="Schedule Overrun Delay" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6', fontSize: '0.7rem', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '10px', height: '6px', backgroundColor: '#bfdbfe', borderRadius: '1px' }} /> Planned</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '10px', height: '6px', backgroundColor: '#2563eb', borderRadius: '1px' }} /> Actual Track</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '10px', height: '6px', backgroundColor: '#ef4444', borderRadius: '1px' }} /> Schedule Delay</div>
                </div>
              </div>

              {/* RIGHT GRAPH CARD: BUDGET CONSUMPTION TRACKING */}
              <div style={moduleBoxStyle}>
                <div style={{ fontSize: '0.75rem', marginBottom: '1.25rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  💳 Capital Expenditure (Budget Milestones)
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ width: '120px', flexShrink: 0, fontSize: '0.75rem', fontWeight: 600, color: '#4b5563' }}>Phases</div>
                  <div style={{ flex: 1, fontSize: '0.75rem', fontWeight: 600, color: '#4b5563', textAlign: 'right', paddingRight: '0.5rem' }}>Financial Utilization Progress Bar</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {phaseMatrix.map((phase, idx) => {
                    const plannedCap = Math.floor(totalBudget * phase.budgetWeight);
                    const actualCap = idx === 1 ? Math.floor(plannedCap * 1.3) : Math.floor(plannedCap * (project.progress / 100));

                    const planPercent = (plannedCap / totalBudget) * 100;
                    const actPercent = (actualCap / totalBudget) * 100;

                    const isOverBudget = actualCap > plannedCap;
                    const normalActPercent = isOverBudget ? planPercent : actPercent;
                    const budgetOverrunWidth = isOverBudget ? `${((actualCap - plannedCap) / totalBudget) * 100}%` : '0%';

                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center' }} title={`${phase.name}\nPlanned Allocation: ₹${plannedCap.toLocaleString('en-IN')}\nActual Incurred: ₹${actualCap.toLocaleString('en-IN')}`}>
                        <div style={{ width: '120px', flexShrink: 0, fontSize: '0.8rem', fontWeight: 500, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '0.5rem' }}>
                          {phase.name}
                        </div>

                        <div style={{ flex: 1, height: '32px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                          <div style={{ position: 'relative', width: '100%', height: '8px', backgroundColor: '#f3f4f6', borderRadius: '2px' }}>
                            <div style={{ position: 'absolute', left: 0, width: `${planPercent}%`, height: '100%', backgroundColor: '#bae6fd', borderRadius: '2px', transition: 'all 0.3s' }} />
                          </div>
                          <div style={{ position: 'relative', width: '100%', height: '8px' }}>
                            <div style={{ position: 'absolute', left: 0, width: `${normalActPercent}%`, height: '100%', backgroundColor: '#0284c7', borderRadius: '2px', transition: 'all 0.3s' }}>
                              {isOverBudget && (
                                <div style={{ position: 'absolute', left: '100%', width: budgetOverrunWidth, height: '100%', backgroundColor: '#ef4444', borderRadius: '0 2px 2px 0' }} title="Budget Allocation Capital Overrun" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6', fontSize: '0.7rem', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '10px', height: '6px', backgroundColor: '#bae6fd', borderRadius: '1px' }} /> Planned Cap</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '10px', height: '6px', backgroundColor: '#0284c7', borderRadius: '1px' }} /> Actual Incurred</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '10px', height: '6px', backgroundColor: '#ef4444', borderRadius: '1px' }} /> Capital Overrun</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OPERATIONAL PROFILE DATAGRID */}
          {activeTab === 'governance' && (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {/* Box A: Location Configuration */}
              <div style={moduleBoxStyle}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📍 Location & Boundary</h4>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Coverage Area</span>
                  <span style={valueStyle}>{loc.coverageArea}</span>
                </div>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Ward Boundary</span>
                  <span style={valueStyle}>{loc.wardBoundary}</span>
                </div>
                <div style={{ ...fieldRowStyle, borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                  <span style={labelStyle}>Site Address</span>
                  <span style={valueStyle} title={loc.siteAddress}>{loc.siteAddress}</span>
                </div>
              </div>

              {/* Box B: Capital Flow Breakdown */}
              <div style={moduleBoxStyle}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📊 Budget Metrics</h4>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Funding Source</span>
                  <span style={valueStyle} title={fin.fundingSource}>{fin.fundingSource}</span>
                </div>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Approved Budget</span>
                  <span style={valueStyle}>₹{totalBudget.toLocaleString('en-IN')}</span>
                </div>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Released Fund</span>
                  <span style={valueStyle}>₹{releasedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Spent Amount</span>
                  <span style={{ ...valueStyle, color: budgetPercentage > 90 ? '#ef4444' : '#111827' }}>₹{usedBudget.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ ...fieldRowStyle, borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                  <span style={labelStyle}>Remaining Ledger</span>
                  <span style={{ ...valueStyle, color: '#10b981' }}>₹{remainingBudget.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Box C: Timelines Schedule */}
              <div style={moduleBoxStyle}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📅 Milestone Dates</h4>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Start Date</span>
                  <span style={valueStyle}>{time.startDate}</span>
                </div>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Expected End</span>
                  <span style={valueStyle}>{time.expectedCompletionDate}</span>
                </div>
                <div style={{ ...fieldRowStyle, borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                  <span style={labelStyle}>Actual Closeout</span>
                  <span style={{ ...valueStyle, color: isComplete ? '#10b981' : '#6b7280' }}>{time.actualCompletionDate}</span>
                </div>
              </div>

              {/* Box D: Corporation Partner Profile */}
              <div style={moduleBoxStyle}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🏗️ Contractor Details</h4>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Company</span>
                  <span style={valueStyle}>{contractor.companyName}</span>
                </div>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Contract Value</span>
                  <span style={valueStyle}>₹{(contractor.contractValue || totalBudget).toLocaleString('en-IN')}</span>
                </div>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Contract Period</span>
                  <span style={valueStyle}>{contractor.contractPeriod}</span>
                </div>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Contact Person</span>
                  <span style={valueStyle}>{contractor.contactPerson}</span>
                </div>
                <div style={fieldRowStyle}>
                  <span style={labelStyle}>Contact Info</span>
                  <span style={valueStyle}>{contractor.contactDetails}</span>
                </div>
                <div style={{ ...fieldRowStyle, borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                  <span style={labelStyle}>Quality Score</span>
                  <span style={{ ...valueStyle, color: (contractor.qualityScore || 8.0) > 8.0 ? '#10b981' : '#e6ae4d', fontWeight: 700 }}>
                    {contractor.qualityScore}/10
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COLLABORATION UPDATES LOGS & LIFE PIPE */}
          {activeTab === 'logs' && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
              
              {/* Activity Comments Module */}
              <div style={moduleBoxStyle}>
                <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Activity Log</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {project.comments.map((c) => (
                    <div key={c.id} style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.35rem' }}>
                        <span style={{ color: '#4b5563', fontWeight: 600 }}>{c.user}</span>
                        <span>{c.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151', lineHeight: '1.5' }}>{c.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type an active mission workflow update..." 
                    style={{ 
                      flex: 1, 
                      padding: '0.5rem 0.75rem', 
                      borderRadius: '6px', 
                      border: '1px solid #e5e7eb', 
                      fontSize: '0.85rem',
                      fontFamily: FONT_STACK,
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit" 
                    style={{ 
                      backgroundColor: '#0f172a', 
                      color: '#fff', 
                      border: 'none', 
                      padding: '0.5rem 1.25rem', 
                      borderRadius: '6px', 
                      fontWeight: 500, 
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Post Log
                  </button>
                </form>
              </div>

              {/* Side Stack inside logs tab containing Lifecycle and Resources */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* PROJECT LIFECYCLE STATUS FEED */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem 1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)' }}>
                  <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Lifecycle Status</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {project.status === 'Cancelled' ? (
                      <div style={{ backgroundColor: '#fef2f2', border: '1px dashed #ef4444', borderRadius: '6px', padding: '1rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                        <h4 style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', fontWeight: 600, color: '#b91c1c' }}>Terminated</h4>
                      </div>
                    ) : (
                      lifecycleStatuses.map((step, idx) => {
                        const currentIdx = lifecycleStatuses.indexOf(project.status);
                        const isStepComplete = currentIdx > idx || project.status === 'Completed';
                        const isStepActive = project.status === step;
                        
                        let stepBg = '#f3f4f6';
                        let stepColor = '#9ca3af';
                        let statusTagText = 'Pending';

                        if (isStepComplete) {
                          stepBg = '#ecfdf5';
                          stepColor = '#10b981';
                          statusTagText = 'Done';
                        } else if (isStepActive) {
                          stepBg = isPlanning ? '#f8f3ff' : '#fffbeb';
                          stepColor = isPlanning ? '#7c3cdc' : '#d97706';
                          statusTagText = 'Active';
                        }

                        return (
                          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ 
                              width: '20px', 
                              height: '20px', 
                              borderRadius: '50%', 
                              backgroundColor: stepBg, 
                              color: stepColor, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              fontSize: '0.7rem', 
                              fontWeight: 700,
                              border: `1px solid ${stepColor}20`
                            }}>
                              {isStepComplete ? '✓' : idx + 1}
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: isStepActive ? 600 : 500, color: isStepActive ? '#111827' : '#6b7280' }}>
                              {step}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Project Resources Vault */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem 1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Resources</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {project.resources.map((res, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          padding: '0.5rem 0.75rem', 
                          borderRadius: '6px', 
                          border: '1px solid #e5e7eb', 
                          backgroundColor: '#f9fafb', 
                          fontSize: '0.8rem', 
                          color: '#374151'
                        }}
                      >
                        {res}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}