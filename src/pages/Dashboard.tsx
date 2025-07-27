import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SideNavbar from '../components/navigation/Navbar';
import TilePieChart from '../ArcGISChart';

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

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.initialActiveTab) {
      setActiveTab(location.state.initialActiveTab);
    }
  }, [location.state]);
  

  console.log(location)

  // State for navbar section and active tab
  const [section, setSection] = useState('apps');
  const [activeTab, setActiveTab] = useState(location.state?.initialActiveTab || 'Placement Tools');
  const [hovered, setHovered] = useState<string | null>(null);

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
          <TilePieChart />
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

      label: 'Upload Foster Child',
      onClick: () => navigate('/map-dashboard'), // <-- Navigates to /map

      hovered: hovered === 'homes',
      onMouseEnter: () => setHovered('homes'),
      onMouseLeave: () => setHovered(null),
    },
    {
      key: 'matching',
      label: 'Home Matching',

      onClick: () => navigate('/map-dashboard'), // <-- Navigates to /map

      hovered: hovered === 'matching',
      onMouseEnter: () => setHovered('matching'),
      onMouseLeave: () => setHovered(null),
    }
  ];

  // If Data Dashboard tab is selected, show the dashboard iframe
  const showDashboardIframe = activeTab === 'Data Dashboard';

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        background: '#f5f6fa',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Sidebar */}
      <SideNavbar
        section={section}
        setSection={setSection}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main content (tiles or iframe) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: showDashboardIframe ? 'flex-start' : 'center',
          gap: '40px',
          height: '100%',
          position: 'relative'
        }}
      >
        {showDashboardIframe ? (
          <iframe
            title="ArcGIS Data Dashboard"
            frameBorder="0"
            style={{
              height: '100%',
              width: '100%',
              border: 'none',
              borderRadius: '12px',
              boxShadow: "0 4px 20px 0 #0003",
              background: '#fff'
            }}
            src="https://www.arcgis.com/apps/dashboards/bec5cfde60ad41fb9d2f4ca0b16e3355"
            allowFullScreen
          />
        ) : (
          tiles.map(tile => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;