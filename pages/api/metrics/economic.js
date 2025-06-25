export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { timeRange = '6months' } = req.query;
    
    // TODO: Replace with actual ClayCoin API call when ready
    // const claycoindData = await fetch(`${process.env.CLAYCOIN_API_URL}/metrics/economic`, {
    //   headers: { 'Authorization': `Bearer ${process.env.CLAYCOIN_API_KEY}` }
    // });
    
    // Mock data that matches your future ClayCoin structure
    const economicData = {
      kpis: {
        totalCirculation: 421000,
        circulationChange: 23.4,
        participatingBusinesses: 162,
        businessGrowth: 28.6,
        localSpendRetention: 2100000,
        retentionChange: 15.8
      },
      timeSeries: [
        { month: 'Jan 2025', localSpend: 245000, clayCoins: 18500, businesses: 89, retention: 67 },
        { month: 'Feb 2025', localSpend: 278000, clayCoins: 22400, businesses: 102, retention: 71 },
        { month: 'Mar 2025', localSpend: 312000, clayCoins: 28900, businesses: 115, retention: 74 },
        { month: 'Apr 2025', localSpend: 289000, clayCoins: 31200, businesses: 128, retention: 72 },
        { month: 'May 2025', localSpend: 334000, clayCoins: 35800, businesses: 134, retention: 78 },
        { month: 'Jun 2025', localSpend: 367000, clayCoins: 42100, businesses: 142, retention: 81 }
      ].filter(item => {
        const months = timeRange === '30days' ? 1 : timeRange === '3months' ? 3 : 6;
        return item.month.includes('2025'); // Filter by timeRange when you have real data
      }),
      lastUpdated: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: economicData
    });

  } catch (error) {
    console.error('Economic metrics API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch economic metrics',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
