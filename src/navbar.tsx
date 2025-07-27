import React, { useEffect, useState } from 'react';
import {
  IconBellRinging,
  IconFileAnalytics,
  IconFingerprint,
  IconKey,
  IconLicense,
  IconLogout,
  IconMessage2,
  IconMessages,
  IconReceipt2,
  IconReceiptRefund,
  IconShoppingCart,
  IconSwitchHorizontal,
  IconUsers,
  IconSettings,
  IconBrandDatabricks,
  IconStepInto
} from '@tabler/icons-react';
import { Text } from '@mantine/core';
import homemapperLogo from './images/hopemapper-logo.png'; // Adjust the path as necessary

const tabs = {
  apps: [
    { link: '', label: 'Placement Tools', icon: IconStepInto  },
    { link: '', label: 'Data Dashboard', icon: IconBrandDatabricks },
    { link: '', label: 'Admin', icon: IconSettings }
  ],

};

export default function SideNavbar({ section, setSection, activeTab, setActiveTab }) {
  // Update activeTab when section changes
  useEffect(() => {
    setActiveTab(tabs[section][0].label);
  }, [section, setActiveTab]);

  const links = tabs[section].map((item) => (
    <a
      key={item.label}
      href={item.link}
      onClick={e => {
        e.preventDefault();
        setActiveTab(item.label);
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 16px',
        borderRadius: 6,
        color: activeTab === item.label ? '#fff' : '#222',
        background: activeTab === item.label ? '#759a96' : 'transparent',
        textDecoration: 'none',
        fontWeight: 500,
        marginBottom: 4,
        transition: 'background 0.15s'
      }}
    >
      <item.icon size={20} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav
      style={{
        width: 260,
        minWidth: 200,
        height: '100vh',
        background: '#e6ecea',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 0'
      }}
    >
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <img
            src={homemapperLogo}
            alt="Hopemapper logo"
            style={{ width: 36, height: 36, marginRight: 10 }}
          />
          <Text fw={600} style={{ fontSize: 24 }}>
            HopeMapper
          </Text>
        </div>
        <div>{links}</div>
      </div>
      <div style={{ padding: '0 20px 12px 20px' }}>
        <a
          href="#"
          onClick={e => e.preventDefault()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 16px',
            borderRadius: 6,
            color: '#222',
            textDecoration: 'none',
            fontWeight: 500,
            marginBottom: 20
          }}
        >
          <IconLogout size={20} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

function Dashboard() {
  const [section, setSection] = useState('apps');
  const [activeTab, setActiveTab] = useState('Placement Tools'); // default to first tab

  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar
        section={section}
        setSection={setSection}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* You can now use activeTab anywhere in Dashboard */}
      <div>
        <h2>Current Tab: {activeTab}</h2>
        {/* ...rest of your dashboard... */}
      </div>
    </div>
  );
}
