export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const countyData = {
      overallHealth: {
        economicScore: 87,
        engagementScore: 85,
        businessSatisfaction: 89,
        youthParticipation: 83,
        overallRating: 'Excellent'
      },
      cityBreakdown: [
        { city: 'Forest Park', businesses: 34, revenue: 89400, satisfaction: 4.2, population: 19432, performance: 88 },
        { city: 'Riverdale', businesses: 28, revenue: 76200, satisfaction: 4.5, population: 15199, performance: 92 },
        { city: 'Jonesboro', businesses: 22, revenue: 52800, satisfaction: 4.1, population: 4724, performance: 79 },
        { city: 'Morrow', businesses: 19, revenue: 48600, satisfaction: 4.3, population: 7061, performance: 84 },
        { city: 'Lake City', businesses: 12, revenue: 28400, satisfaction: 4.0, population: 2821, performance: 76 },
        { city: 'Lovejoy', businesses: 16, revenue: 35200, satisfaction: 4.4, population: 6422, performance: 87 },
        { city: 'College Park', businesses: 31, revenue: 82500, satisfaction: 4.2, population: 13942, performance: 86 }
      ],
      keyHighlights: [
        {
          icon: 'trending-up',
          title: 'Economic Growth',
          description: 'Average 31% revenue increase across all participating businesses',
          impact: 'high'
        },
        {
          icon: 'users',
          title: 'Youth Engagement',
          description: '6,080 young people actively learning about local community',
          impact: 'high'
        },
        {
          icon: 'building',
          title: 'Business Network',
          description: '162 local businesses connected through ClayCoin ecosystem',
          impact: 'medium'
        },
        {
          icon: 'award',
          title: 'Innovation Leadership',
          description: 'First county in Georgia to implement gaming-based civic engagement',
          impact: 'high'
        }
      ],
      lastUpdated: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: countyData
    });

  } catch (error) {
    console.error('County metrics API error:', error);
    res.status(500).json({ error: 'Failed to fetch county metrics' });
  }
}
