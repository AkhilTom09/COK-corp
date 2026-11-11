"use client";

import React, { useState } from 'react';
import ProjectDetailTemplate from '../components/ProjectDetailTemplate';

// 1. Structural Database Template Matrix
const MOCK_DB_PROJECTS = [
  {
    id: 'KMRL/PH2/2024/06',
    title: 'Kochi Metro Phase II, JLN Stadium to Infopark (Kakkanad)',
    status: 'Work Progressing',
    progress: 58,
    admin: 'Er. Sreeja Menon, GM (Civil)',
    priority: 'High Priority',
    updated: '25 mins ago',
    description: 'Elevated metro viaduct and stations from Jawaharlal Nehru Stadium to Infopark, Kakkanad, including the Palarivattom, Kakkanad and Infopark stations. Utility shifting of KSEB and KWA is in progress along the Seaport–Airport Road median. Work is under Kochi Metro Rail Ltd.',
    comments: [
      { id: 101, user: 'Er. Sreeja Menon', text: 'Pier caps cast up to Palarivattom. Segment launching starts after the KSEB shutdown on 16 Nov 2026.', time: '11 Nov 2026' },
      { id: 102, user: 'AE, Kakkanad', text: 'Traffic diversion at CSEZ Junction approved by the City Traffic Police for night launching.', time: '10 Nov 2026' }
    ],
    resources: ['📄 DPR_KMRL_PhaseII.pdf', '📄 GAD_Viaduct_Kakkanad.pdf', '🔗 KMRL Progress Sheet'],
    budgetTotal: 25770000000,
    budgetUsed: 14120000000,
    locationDetails: {
      coverageArea: 'JLN Stadium to Infopark, Kochi',
      wardBoundary: 'KMRL Phase II corridor, Kakkanad',
      siteAddress: 'Seaport–Airport Road median, Kakkanad'
    },
    financialBreakdown: {
      fundingSource: 'KMRL, State and Central equity',
      approvedBudget: 25770000000,
      releasedAmount: 16800000000,
      spentAmount: 14120000000
    },
    executionTimeline: {
      startDate: '06 Jun 2024',
      expectedCompletionDate: '31 Dec 2027',
      actualCompletionDate: 'Pending Execution'
    },
    contractorProfile: {
      companyName: 'Ernakulam Infra Consortium, Kaloor',
      contractValue: 24840000000,
      contractPeriod: '42 months',
      contactPerson: 'Er. Vivek Shenoy',
      contactDetails: '+91 484 230 4410',
      qualityScore: 8.4
    }
  },
  {
    id: 'PWD/EKM/SA/2025/028',
    title: 'Sahodaran Ayyappan Road Widening, Kadavanthra to Vyttila',
    status: 'Tender Stage',
    progress: 18,
    admin: 'Er. Rajeev P. Nair, EE',
    priority: 'High Priority',
    updated: '2 hours ago',
    description: 'Widening of Sahodaran Ayyappan Road from Kadavanthra Junction to Vyttila to a four-lane carriageway with covered drains, footpath and a bus bay at Elamkulam. Land for the Vyttila end is in award stage under the RFCTLARR Act. Tender is live on the Kerala e-tender portal.',
    comments: [
      { id: 201, user: 'Er. Rajeev P. Nair', text: 'Technical sanction issued by the Chief Engineer, Roads. NIT published. Pre-bid meeting fixed for 18 Nov 2026 at the PWD Rest House, Ernakulam.', time: '10 Nov 2026' },
      { id: 202, user: 'Section Clerk, Kadavanthra', text: 'Three bids downloaded. LA award for the Vyttila reach still to be gazetted.', time: '12 Nov 2026' }
    ],
    resources: ['📄 TS_Order_SA_Road.pdf', '📄 LA_Award_Vyttila.pdf', '🔗 Kerala e-Tender'],
    budgetTotal: 1860000000,
    budgetUsed: 24000000,
    locationDetails: {
      coverageArea: 'Kadavanthra to Vyttila, Kochi',
      wardBoundary: 'PWD Roads Division, Ernakulam',
      siteAddress: 'SA Road, Kadavanthra Junction'
    },
    financialBreakdown: {
      fundingSource: 'KRFB through KIIFB',
      approvedBudget: 1860000000,
      releasedAmount: 60000000,
      spentAmount: 24000000
    },
    executionTimeline: {
      startDate: 'Pending work order',
      expectedCompletionDate: '24 months from award',
      actualCompletionDate: 'Pending Execution'
    },
    contractorProfile: {
      companyName: 'Bid under evaluation',
      contractValue: 1860000000,
      contractPeriod: '24 months',
      contactPerson: 'Not awarded',
      contactDetails: 'PWD Roads Division, Ernakulam',
      qualityScore: 0
    }
  },
  {
    id: 'SR/ERS/ROB/2025/12',
    title: 'Kalamassery ROB in lieu of LC No. 12, Ernakulam–Shoranur Section',
    status: 'Administrative Sanction Stage',
    progress: 11,
    admin: 'Er. Fathima Basheer, EE (Bridges)',
    priority: 'High Priority',
    updated: 'Yesterday',
    description: 'Road overbridge to close level crossing No. 12 at Kalamassery on the Ernakulam–Shoranur section, with approaches towards Premier Junction and the University side. General arrangement drawing cleared by Ernakulam Division. Cost shared between the State and Southern Railway.',
    comments: [
      { id: 301, user: 'Er. Fathima Basheer', text: 'GAD approved by Southern Railway, Ernakulam Division. AS note sent to Government in PWD.', time: '08 Nov 2026' },
      { id: 302, user: 'Overseer, Kalamassery', text: 'Joint inspection with the Railway section engineer completed. Span agreed at 1x36 m over the main lines.', time: '28 Oct 2026' }
    ],
    resources: ['📄 GAD_LC12_Kalamassery.pdf', '📄 Railway_Cost_Share_Note.pdf'],
    budgetTotal: 964000000,
    budgetUsed: 14800000,
    locationDetails: {
      coverageArea: 'Kalamassery, Kochi',
      wardBoundary: 'PWD Bridges Division / Ernakulam Division',
      siteAddress: 'LC No. 12, Kalamassery Railway Station end'
    },
    financialBreakdown: {
      fundingSource: 'State PWD and Southern Railway, equal share',
      approvedBudget: 964000000,
      releasedAmount: 25000000,
      spentAmount: 14800000
    },
    executionTimeline: {
      startDate: 'Pending administrative sanction',
      expectedCompletionDate: '30 months from work order',
      actualCompletionDate: 'Pending Execution'
    },
    contractorProfile: {
      companyName: 'Not awarded',
      contractValue: 964000000,
      contractPeriod: '30 months',
      contactPerson: 'Not awarded',
      contactDetails: 'EE Bridges, Ernakulam',
      qualityScore: 0
    }
  },
  {
    id: 'PWD/EKM/ICTT/2024/009',
    title: 'ICTT Connectivity Road Strengthening, Mulavukad to Vallarpadam',
    status: 'Delayed',
    progress: 51,
    admin: 'Er. Anil Kumar K., EE',
    priority: 'High Priority',
    updated: '4 hours ago',
    description: 'Strengthening and widening of the International Container Transshipment Terminal connectivity road from Mulavukad to Vallarpadam, with paved shoulders and replacement of two culverts over tidal creeks. Work slipped after the monsoon and a delayed KSEB shifting at the Vallarpadam end. Revised programme is with the Superintending Engineer, Ernakulam.',
    comments: [
      { id: 401, user: 'Er. Anil Kumar K.', text: 'Culvert at the Vallarpadam creek recast. KSEB feeder shifting still pending at Ch. 4.200.', time: '09 Nov 2026' },
      { id: 402, user: 'AE, Mulavukad Section', text: 'Monsoon suspension was in force from 01 June. Carriageway work restarted on 20 September only up to Ch. 3.100.', time: '22 Sep 2026' }
    ],
    resources: ['📄 Revised_Programme_ICTT.pdf', '📄 KHRI_Soil_Report.pdf'],
    budgetTotal: 412000000,
    budgetUsed: 268000000,
    locationDetails: {
      coverageArea: 'Mulavukad to Vallarpadam, Kochi',
      wardBoundary: 'PWD Roads Division, Ernakulam',
      siteAddress: 'ICTT Road, Ch. 4.200, Vallarpadam'
    },
    financialBreakdown: {
      fundingSource: 'State Plan and Sagarmala support',
      approvedBudget: 412000000,
      releasedAmount: 320000000,
      spentAmount: 268000000
    },
    executionTimeline: {
      startDate: '12 Nov 2024',
      expectedCompletionDate: '31 May 2026',
      actualCompletionDate: 'Overdue — revised date 31 Mar 2027'
    },
    contractorProfile: {
      companyName: 'Island Constructions, Willingdon Island',
      contractValue: 398000000,
      contractPeriod: '18 months',
      contactPerson: 'Er. Mathew George',
      contactDetails: '+91 484 266 9044',
      qualityScore: 6.9
    }
  },
  {
    id: 'PWD/BR/EKM/2026/004',
    title: 'Venduruthy Bridge Approach Improvement, Thevara',
    status: 'Estimate Stage',
    progress: 7,
    admin: 'Er. Meera Krishnan, AE',
    priority: 'Medium Priority',
    updated: '3 days ago',
    description: 'Improvement of the Thevara and Willingdon Island approaches to Venduruthy Bridge, including junction widening, footpath and replacement of the distressed wearing course. Hydraulic particulars for the side drain outfall and a PRICE estimate are with the Design Wing, Ernakulam.',
    comments: [
      { id: 501, user: 'Er. Meera Krishnan', text: 'PRICE estimate v3 uploaded. Design Wing returned the drawing with remarks on the Thevara junction radius.', time: '09 Nov 2026' },
      { id: 502, user: 'Overseer, Thevara', text: 'Trial pits on the Willingdon Island approach taken. Subgrade weaker than the 2004 as-built.', time: '02 Nov 2026' }
    ],
    resources: ['📄 PRICE_Estimate_v3.pdf', '📄 Junction_Plan_Thevara.pdf'],
    budgetTotal: 186000000,
    budgetUsed: 2800000,
    locationDetails: {
      coverageArea: 'Thevara and Willingdon Island, Kochi',
      wardBoundary: 'PWD Bridges Section, Ernakulam',
      siteAddress: 'Venduruthy Bridge, Thevara end'
    },
    financialBreakdown: {
      fundingSource: 'State Plan, Bridges',
      approvedBudget: 186000000,
      releasedAmount: 4000000,
      spentAmount: 2800000
    },
    executionTimeline: {
      startDate: 'Pending technical sanction',
      expectedCompletionDate: '12 months from work order',
      actualCompletionDate: 'Pending Execution'
    },
    contractorProfile: {
      companyName: 'Not awarded',
      contractValue: 186000000,
      contractPeriod: '12 months',
      contactPerson: 'Not awarded',
      contactDetails: 'AE Bridges, Ernakulam',
      qualityScore: 0
    }
  },
  {
    id: 'KRFB/EKM/2025/017',
    title: 'Seaport–Airport Road, HMT Junction to Infopark Gate',
    status: 'Work Order Stage',
    progress: 22,
    admin: 'Er. Joseph Varghese, EE',
    priority: 'Medium Priority',
    updated: '6 hours ago',
    description: 'Balance improvement of the Seaport–Airport Road from HMT Junction, Kalamassery, to the Infopark gate at Kakkanad: strengthening, service-road completion, and junction improvement at CSEZ. Work order issued. Site handed over except the HMT Junction stretch, where a KWA line is still to be shifted.',
    comments: [
      { id: 601, user: 'Er. Joseph Varghese', text: 'Work order issued to Nila Engineering Consortium, Aluva. Agreement executed on 04 Nov 2026.', time: '04 Nov 2026' },
      { id: 602, user: 'AE, Kalamassery', text: 'Site handed over from Infopark Gate to CSEZ. HMT Junction held back until the KWA shifting.', time: '11 Nov 2026' }
    ],
    resources: ['📄 Work_Order_SPAR_017.pdf', '📄 Agreement.pdf', '🔗 KRFB Progress Sheet'],
    budgetTotal: 740000000,
    budgetUsed: 32000000,
    locationDetails: {
      coverageArea: 'Kalamassery to Kakkanad, Kochi',
      wardBoundary: 'KRFB Project Unit, Ernakulam',
      siteAddress: 'HMT Junction, Kalamassery'
    },
    financialBreakdown: {
      fundingSource: 'KRFB through KIIFB',
      approvedBudget: 740000000,
      releasedAmount: 110000000,
      spentAmount: 32000000
    },
    executionTimeline: {
      startDate: '04 Nov 2026',
      expectedCompletionDate: '03 May 2028',
      actualCompletionDate: 'Pending Execution'
    },
    contractorProfile: {
      companyName: 'Nila Engineering Consortium, Aluva',
      contractValue: 708000000,
      contractPeriod: '18 months',
      contactPerson: 'Er. Priya Ramachandran',
      contactDetails: '+91 484 262 7710',
      qualityScore: 8.1
    }
  },
  {
    id: 'RVNL/ERS/DL/2025/04',
    title: 'Ernakulam Town–Tripunithura Doubling and Tripunithura Yard',
    status: 'Technical Sanction Stage',
    progress: 14,
    admin: 'Er. Lakshmi Priya, Dy. CE',
    priority: 'Medium Priority',
    updated: '1 day ago',
    description: 'Doubling between Ernakulam Town and Tripunithura under RVNL, with yard remodelling at Tripunithura and a road-under-bridge opening near the Pettah level crossing. CRS observations on the signalling plan are under reply. Technical sanction of the civil estimate is with the Chief Engineer.',
    comments: [
      { id: 701, user: 'Er. Lakshmi Priya', text: 'Civil estimate for the Pettah RUB recast after CRS remarks on vertical clearance. TS file with Chief Engineer.', time: '11 Nov 2026' },
      { id: 702, user: 'RVNL Site Office, Ernakulam', text: 'Utility duct locations marked with KWA along the Tripunithura yard. No shifting on the track bed until TS.', time: '05 Nov 2026' }
    ],
    resources: ['📄 CRS_Observations.pdf', '📄 Yard_Plan_Tripunithura.pdf'],
    budgetTotal: 1680000000,
    budgetUsed: 36000000,
    locationDetails: {
      coverageArea: 'Ernakulam Town to Tripunithura',
      wardBoundary: 'RVNL / Ernakulam Division',
      siteAddress: 'Tripunithura yard, Southern Railway'
    },
    financialBreakdown: {
      fundingSource: 'RVNL, extra-budgetary (IRFC)',
      approvedBudget: 1680000000,
      releasedAmount: 70000000,
      spentAmount: 36000000
    },
    executionTimeline: {
      startDate: 'Pending technical sanction',
      expectedCompletionDate: '30 months from award',
      actualCompletionDate: 'Pending Execution'
    },
    contractorProfile: {
      companyName: 'Not awarded',
      contractValue: 1680000000,
      contractPeriod: '30 months',
      contactPerson: 'Not awarded',
      contactDetails: 'Dy. CE, RVNL, Ernakulam',
      qualityScore: 0
    }
  },
  {
    id: 'PWD/BR/EKM/2026/011',
    title: 'Cheranalloor–Varapuzha Bridge across the Periyar Arm',
    status: 'File Initiated',
    progress: 3,
    admin: 'Er. Abdul Rahman, AE',
    priority: 'Medium Priority',
    updated: '5 hours ago',
    description: 'New bridge linking Cheranalloor and Varapuzha across the Periyar arm in north Kochi, with short approach roads on either bank. File opened for alignment, CRZ remarks and a preliminary estimate. No sanction yet.',
    comments: [
      { id: 801, user: 'Er. Abdul Rahman', text: 'File initiated. Alignment sketch sent to the District Collector, Ernakulam, and the KCZMA for CRZ remarks.', time: '07 Nov 2026' },
      { id: 802, user: 'Section Clerk, Cheranalloor', text: 'Survey stones fixed on the Cheranalloor bank. Two riverside objections recorded at Varapuzha.', time: '12 Nov 2026' }
    ],
    resources: ['📄 Alignment_Sketch.pdf', '📄 File_Initiation_Note.pdf'],
    budgetTotal: 640000000,
    budgetUsed: 0,
    locationDetails: {
      coverageArea: 'Cheranalloor to Varapuzha, Kochi',
      wardBoundary: 'PWD Bridges Section, Ernakulam',
      siteAddress: 'Varapuzha ferry, Cheranalloor bank'
    },
    financialBreakdown: {
      fundingSource: 'Proposed under State Plan, Bridges',
      approvedBudget: 640000000,
      releasedAmount: 0,
      spentAmount: 0
    },
    executionTimeline: {
      startDate: 'File initiated 07 Nov 2026',
      expectedCompletionDate: 'Not sanctioned',
      actualCompletionDate: 'Pending Execution'
    },
    contractorProfile: {
      companyName: 'Not awarded',
      contractValue: 640000000,
      contractPeriod: 'Not fixed',
      contactPerson: 'Not awarded',
      contactDetails: 'AE Bridges, Ernakulam',
      qualityScore: 0
    }
  },
  {
    id: 'KC/LSGD/2026/088',
    title: 'Fort Kochi–Mattancherry Road Relaying, Phase III (9.2 km)',
    status: 'Not Started',
    progress: 0,
    admin: 'Er. Deepa Thomas, AE (LSGD)',
    priority: 'Low Priority',
    updated: '1 week ago',
    description: 'Third phase of road concreting and drain cover slabs in Fort Kochi and Mattancherry, covering 11 links totalling 9.2 km under Kochi Corporation. Included in the 2026–27 annual plan from CFC grant and corporation own fund. PRICE file not yet opened.',
    comments: [
      { id: 901, user: 'Er. Deepa Thomas', text: 'Works listed in the corporation annual plan. Ward-wise chainage to be frozen after the council meeting on 20 Nov 2026.', time: '05 Nov 2026' }
    ],
    resources: ['📄 Annual_Plan_2026_27.pdf'],
    budgetTotal: 92000000,
    budgetUsed: 0,
    locationDetails: {
      coverageArea: 'Fort Kochi and Mattancherry, Kochi Corporation',
      wardBoundary: '11 corporation links, Phase III',
      siteAddress: 'Kochi Corporation Engineering Wing, Fort Kochi'
    },
    financialBreakdown: {
      fundingSource: 'CFC grant and Kochi Corporation own fund',
      approvedBudget: 92000000,
      releasedAmount: 0,
      spentAmount: 0
    },
    executionTimeline: {
      startDate: 'Not started',
      expectedCompletionDate: '31 Mar 2027',
      actualCompletionDate: 'Pending Execution'
    },
    contractorProfile: {
      companyName: 'Not awarded',
      contractValue: 92000000,
      contractPeriod: '9 months',
      contactPerson: 'Not awarded',
      contactDetails: 'LSGD Section, Kochi Corporation',
      qualityScore: 0
    }
  },
  {
    id: 'KRFB/EKM/2022/006',
    title: 'Kundannoor Flyover, NH 66 Junction, Kochi',
    status: 'Completed',
    progress: 100,
    admin: 'Er. Suresh Babu, EE',
    priority: 'Low Priority',
    updated: '2 days ago',
    description: 'Four-lane flyover at the Kundannoor junction on NH 66, with service-road tie-ins towards Vyttila, Maradu and the Aroor side. Opened to traffic. Final bill is with the Accountant General for audit.',
    comments: [
      { id: 1001, user: 'Er. Suresh Babu', text: 'Flyover opened to traffic on 18 Mar 2026. Completion certificate issued. Final bill under AG audit.', time: '18 Mar 2026' },
      { id: 1002, user: 'AE, Maradu', text: 'Defect-liability inspection done. Two expansion-joint seals instructed to the contractor before the monsoon.', time: '10 Nov 2026' }
    ],
    resources: ['📄 Completion_Certificate.pdf', '📄 Final_Bill.pdf', '🔗 KRFB Asset Register'],
    budgetTotal: 2840000000,
    budgetUsed: 2765000000,
    locationDetails: {
      coverageArea: 'Kundannoor, Maradu, Kochi',
      wardBoundary: 'KRFB Project Unit, Ernakulam',
      siteAddress: 'Kundannoor Junction, NH 66'
    },
    financialBreakdown: {
      fundingSource: 'KRFB through KIIFB',
      approvedBudget: 2840000000,
      releasedAmount: 2840000000,
      spentAmount: 2765000000
    },
    executionTimeline: {
      startDate: '15 Jan 2023',
      expectedCompletionDate: '31 Dec 2025',
      actualCompletionDate: '18 Mar 2026'
    },
    contractorProfile: {
      companyName: 'Kerala State Construction Corporation Ltd.',
      contractValue: 2710000000,
      contractPeriod: '30 months',
      contactPerson: 'Er. Rajan Pillai',
      contactDetails: '+91 484 245 3308',
      qualityScore: 9.1
    }
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