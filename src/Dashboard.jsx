import React, { useState } from 'react';
import SideNavbar from './navbar';
import Pie from './Pie'; // <-- Import the Pie chart

const baseTileStyle = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 12px 0 #0002",
  padding: "24px",
  margin: "24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "400px",
  minHeight: "250px",
  cursor: "pointer",
  transition: "background 0.2s, box-shadow 0.2s"
};

// Example data for the Pie chart
const pieData = [
  { id: "Available", label: "Available", value: 40, color: "#759a96" },
  { id: "Occupied", label: "Occupied", value: 60, color: "#e6ecea" }
];

function Dashboard() {
  // State for navbar section and active tab
  const [section, setSection] = useState('apps');
  const [activeTab, setActiveTab] = useState('Placement Tools');
  const [hovered, setHovered] = useState(null);

  // Analytics tiles
  const analyticsTiles = [
    {
      key: 'total',
      label: 'Total Available Homes',
      onClick: () => alert('Total Available Homes clicked!'),
      hovered: hovered === 'total',
      onMouseEnter: () => setHovered('total'),
      onMouseLeave: () => setHovered(null),
      content: (
        <div style={{ width: 150, height: 150, marginTop: 16 }}>
          <Pie data={pieData} />
        </div>
      )
    },
    {
      key: 'time',
      label: 'Time in Agency',
      onClick: () => alert('Time in Agency clicked!'),
      hovered: hovered === 'time',
      onMouseEnter: () => setHovered('time'),
      onMouseLeave: () => setHovered(null),
    },
    {
      key: 'dashboard',
      label: 'Data Dashboard',
      onClick: () => {},
      hovered: hovered === 'dashboard',
      onMouseEnter: () => setHovered('dashboard'),
      onMouseLeave: () => setHovered(null),
    }
  ];

  // Main tiles
  let tiles = [
    {
      key: 'homes',
      label: 'Available Homes',
      onClick: () => alert('Available Homes clicked!'),
      hovered: hovered === 'homes',
      onMouseEnter: () => setHovered('homes'),
      onMouseLeave: () => setHovered(null),
    },
    {
      key: 'matching',
      label: 'Home Matching',
      onClick: () => alert('Home Matching clicked!'),
      hovered: hovered === 'matching',
      onMouseEnter: () => setHovered('matching'),
      onMouseLeave: () => setHovered(null),
    }
  ];

  // If Data Analysis is clicked, show analytics tiles in a pyramid layout
  if (activeTab === 'Data Dashboard' || activeTab === 'Data Analysis') {
    return (
      <div
        style={{
          display: 'flex',
          height: '100dvh',
          width: '100vw',
          background: '#f5f6fa',
          overflow: 'hidden'
        }}
      >
        <SideNavbar
          section={section}
          setSection={setSection}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          {/* Top tile */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div
              style={{
                ...baseTileStyle,
                background: analyticsTiles[0].hovered ? '#e6ecea' : baseTileStyle.background,
                boxShadow: analyticsTiles[0].hovered ? "0 4px 20px 0 #0003" : baseTileStyle.boxShadow,
                minWidth: "28vw",
                margin: "24px 12px"
              }}
              onMouseEnter={analyticsTiles[0].onMouseEnter}
              onMouseLeave={analyticsTiles[0].onMouseLeave}
              onClick={analyticsTiles[0].onClick}
              tabIndex={0}
              role="button"
            >
              <h2 style={{ fontSize: '2rem', color: '#222', margin: 0 }}>{analyticsTiles[0].label}</h2>
              {/* Pie Chart goes here */}
              {analyticsTiles[0].content}
            </div>
          </div>
          {/* Bottom two tiles */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {[analyticsTiles[1], analyticsTiles[2]].map(tile => (
              <div
                key={tile.key}
                style={{
                  ...baseTileStyle,
                  background: tile.hovered ? '#e6ecea' : baseTileStyle.background,
                  boxShadow: tile.hovered ? "0 4px 20px 0 #0003" : baseTileStyle.boxShadow,
                  minWidth: "28vw",
                  margin: "24px 12px"
                }}
                onMouseEnter={tile.onMouseEnter}
                onMouseLeave={tile.onMouseLeave}
                onClick={tile.onClick}
                tabIndex={0}
                role="button"
              >
                <h2 style={{ fontSize: '2rem', color: '#222', margin: 0 }}>{tile.label}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default: show main tiles
  return (
    <div
      style={{
        display: 'flex',
        height: '100dvh',
        width: '100vw',
        background: '#f5f6fa',
        overflow: 'hidden'
      }}
    >
      {/* Sidebar */}
      <SideNavbar
        section={section}
        setSection={setSection}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* Main content: tiles centered */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          height: '100%'
        }}
      >
        {tiles.map(tile => (
          <div
            key={tile.key}
            style={{
              ...baseTileStyle,
              background: tile.hovered ? '#e6ecea' : baseTileStyle.background,
              boxShadow: tile.hovered ? "0 4px 20px 0 #0003" : baseTileStyle.boxShadow
            }}
            onMouseEnter={tile.onMouseEnter}
            onMouseLeave={tile.onMouseLeave}
            onClick={tile.onClick}
            tabIndex={0}
            role="button"
          >
            <h2 style={{ fontSize: '2rem', color: '#222', margin: 0 }}>{tile.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;