export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { city, category } = req.query;

    const businessData = {
      summary: {
        totalRevenue: 412000,
        averageGrowth: 31,
        customerRetention: 45,
        networkEffect: 28
      },
      categories: [
        { category: 'Restaurants', count: 45, revenue: 125000, growth: 32, participation: 89 },
        { category: 'Retail', count: 38, revenue: 98000, growth: 28, participation: 76 },
        { category: 'Services', count: 32, revenue: 87000, growth: 35, participation: 82 },
        { category: 'Entertainment', count: 18, revenue: 54000, growth: 41, participation: 94 },
        { category: 'Health', count: 25, revenue: 76000, growth: 22, participation: 68 }
      ],
      topPerformers: [
        { name: 'Main Street Diner', category: 'Restaurant', city: 'Forest Park', growth: 48, revenue: 15600, claycoins: 2840 },
        { name: 'Clayton Tech Repair', category: 'Services', city: 'Riverdale', growth: 42, revenue: 12800, claycoins: 2156 },
        { name: 'Forest Park Pharmacy', category: 'Health', city: 'Forest Park', growth: 38, revenue: 11200, claycoins: 1967 },
        { name: 'Riverdale Comics', category: 'Entertainment', city: 'Riverdale', growth: 52, revenue: 9400, claycoins: 3201 },
        { name: 'Jonesboro Auto Care', category: 'Automotive', city: 'Jonesboro', growth: 35, revenue: 8900, claycoins: 1843 }
      ],
      trends: {
        monthlyGrowth: [
          { month: 'Jan', revenue: 89000, businesses: 89 },
          { month: 'Feb', revenue: 102000, businesses: 102 },
          { month: 'Mar', revenue: 115000, businesses: 115 },
          { month: 'Apr', revenue: 128000, businesses: 128 },
          { month: 'May', revenue: 134000, businesses: 134 },
          { month: 'Jun', revenue: 142000, businesses: 142 }
        ]
      },
      lastUpdated: new Date().toISOString()
    };

    // Filter by city and category if provided
    let filteredData = { ...businessData };
    if (city && city !== 'all') {
      filteredData.topPerformers = businessData.topPerformers.filter(
        b => b.city.toLowerCase().replace(' ', '-') === city
      );
    }
    if (category && category !== 'all') {
      filteredData.categories = businessData.categories.filter(
        c => c.category.toLowerCase() === category.toLowerCase()
      );
    }

    res.status(200).json({
      success: true,
      data: filteredData
    });

  } catch (error) {
    console.error('Business metrics API error:', error);
    res.status(500).json({ error: 'Failed to fetch business metrics' });
  }
}
