export default function Home() {
  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        ClayCo Synergy Impact Dashboard
      </h1>
      <p style={{ fontSize: '1.2rem' }}>
        Clayton County Digital Economy Analytics - Successfully Deployed! 🎉
      </p>
      
      <div style={{ 
        marginTop: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>💰 Economic Impact</h3>
          <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>$2.1M</p>
          <p>Local revenue retained</p>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>🎮 Youth Engaged</h3>
          <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>6,080</p>
          <p>Active participants</p>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>🏢 Business Partners</h3>
          <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>162</p>
          <p>Connected businesses</p>
        </div>
      </div>
    </div>
  );
}
