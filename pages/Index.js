import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Building2, Gamepad2, MapPin, Calendar, Download, RefreshCw, AlertCircle, Award, Eye } from 'lucide-react';

const ClayCoImpactDashboard = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data representing what your real system will track
  const economicData = [
    { month: 'Jan 2025', localSpend: 245000, clayCoins: 18500, businesses: 89, retention: 67 },
    { month: 'Feb 2025', localSpend: 278000, clayCoins: 22400, businesses: 102, retention: 71 },
    { month: 'Mar 2025', localSpend: 312000, clayCoins: 28900, businesses: 115, retention: 74 },
    { month: 'Apr 2025', localSpend: 289000, clayCoins: 31200, businesses: 128, retention: 72 },
    { month: 'May 2025', localSpend: 334000, clayCoins: 35800, businesses: 134, retention: 78 },
    { month: 'Jun 2025', localSpend: 367000, clayCoins: 42100, businesses: 142, retention: 81 }
  ];

  const youthEngagement = [
    { ageGroup: '13-15', activePlayers: 2340, avgSession: 45, civicScore: 78, careerInterest: 65 },
    { ageGroup: '16-18', activePlayers: 1890, avgSession: 52, civicScore: 85, careerInterest: 72 },
    { ageGroup: '19-21', activePlayers: 1200, avgSession: 38, civicScore: 72, careerInterest: 69 },
    { ageGroup: '22-25', activePlayers: 650, avgSession: 41, civicScore: 68, careerInterest: 58 }
  ];

  const cityData = [
    { city: 'Forest Park', businesses: 34, revenue: 89400, satisfaction: 4.2, population: 19432 },
    { city: 'Riverdale', businesses: 28, revenue: 76200, satisfaction: 4.5, population: 15199 },
    { city: 'Jonesboro', businesses: 22, revenue: 52800, satisfaction: 4.1, population: 4724 },
    { city: 'Morrow', businesses: 19, revenue: 48600, satisfaction: 4.3, population: 7061 },
    { city: 'Lake City', businesses: 12, revenue: 28400, satisfaction: 4.0, population: 2821 },
    { city: 'Lovejoy', businesses: 16, revenue: 35200, satisfaction: 4.4, population: 6422 },
    { city: 'College Park', businesses: 31, revenue: 82500, satisfaction: 4.2, population: 13942 }
  ];

  const businessCategories = [
    { category: 'Restaurants', count: 45, revenue: 125000, growth: 32, participation: 89 },
    { category: 'Retail', count: 38, revenue: 98000, growth: 28, participation: 76 },
    { category: 'Services', count: 32, revenue: 87000, growth: 35, participation: 82 },
    { category: 'Entertainment', count: 18, revenue: 54000, growth: 41, participation: 94 },
    { category: 'Health', count: 25, revenue: 76000, growth: 22, participation: 68 }
  ];

  const kpis = [
    {
      title: 'Local Economic Impact',
      value: '$2.1M',
      change: 23.4,
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      description: 'Revenue retained in Clayton County'
    },
    {
      title: 'Active Youth Engaged',
      value: '6,080',
      change: 15.8,
      icon: Gamepad2,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      description: 'Young people actively participating'
    },
    {
      title: 'Business Partners',
      value: '162',
      change: 28.6,
      icon: Building2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      description: 'Local businesses in the network'
    },
    {
      title: 'Community Engagement',
      value: '87%',
      change: 12.3,
      icon: Users,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      description: 'Overall community participation rate'
    }
  ];

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  const KPICard = ({ title, value, change, icon: Icon, color, bgColor, description }) => {
    const isPositive = change > 0;
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    );
  };

  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Economic Impact Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Economic Impact Trends</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Last 6 months</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={economicData}>
            <defs>
              <linearGradient id="localSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="clayCoins" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e1b4b', 
                border: 'none', 
                borderRadius: '8px', 
                color: 'white' 
              }}
              formatter={(value, name) => [
                name === 'localSpend' ? `$${(value / 1000).toFixed(0)}K` : value.toLocaleString(),
                name === 'localSpend' ? 'Local Spending' : 'ClayCoin Transactions'
              ]} 
            />
            <Area type="monotone" dataKey="localSpend" stroke="#8b5cf6" strokeWidth={2} fill="url(#localSpend)" />
            <Area type="monotone" dataKey="clayCoins" stroke="#06b6d4" strokeWidth={2} fill="url(#clayCoins)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Youth Engagement */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Youth Engagement by Age Group</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={youthEngagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="ageGroup" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1b4b', 
                  border: 'none', 
                  borderRadius: '8px', 
                  color: 'white' 
                }}
              />
              <Bar dataKey="activePlayers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Business Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Category Performance</h3>
          <div className="space-y-4">
            {businessCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{category.category}</span>
                    <span className="text-sm text-gray-500">{category.count} businesses</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${category.participation}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{category.participation}% participation</span>
                    <span className="text-xs text-green-600 font-medium">+{category.growth}% revenue</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CityAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Clayton County City Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-600">City</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Population</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Businesses</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Revenue Impact</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Satisfaction</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Performance</th>
              </tr>
            </thead>
            <tbody>
              {cityData.map((city, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="font-medium text-gray-900">{city.city}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">{city.population.toLocaleString()}</td>
                  <td className="py-4 text-gray-600">{city.businesses}</td>
                  <td className="py-4">
                    <span className="text-green-600 font-medium">${(city.revenue / 1000).toFixed(0)}K</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="ml-1 text-gray-600">{city.satisfaction}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" 
                        style={{ width: `${(city.revenue / 90000) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Distribution by City</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={cityData}
                dataKey="revenue"
                nameKey="city"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8b5cf6"
              >
                {cityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${240 + index * 30}, 70%, ${60 + index * 5}%)`} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${(value / 1000).toFixed(0)}K`, 'Revenue']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Key County Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <div className="font-medium text-sm text-gray-900">Economic Growth</div>
                <div className="text-xs text-gray-600">Average 31% revenue increase across all participating businesses</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <div className="font-medium text-sm text-gray-900">Youth Engagement</div>
                <div className="text-xs text-gray-600">6,080 young people actively learning about local community</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Building2 className="h-5 w-5 text-purple-500 mt-1" />
              <div>
                <div className="font-medium text-sm text-gray-900">Business Network</div>
                <div className="text-xs text-gray-600">162 local businesses connected through ClayCoin ecosystem</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Award className="h-5 w-5 text-orange-500 mt-1" />
              <div>
                <div className="font-medium text-sm text-gray-900">Innovation Leadership</div>
                <div className="text-xs text-gray-600">First county in Georgia to implement gaming-based civic engagement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BusinessImpact = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="h-6 w-6 text-green-500 mr-3" />
            <h3 className="font-semibold text-gray-900">Revenue Growth</h3>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">+31%</div>
          <div className="text-sm text-gray-600">Average increase across participating businesses</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-blue-500 mr-3" />
            <h3 className="font-semibold text-gray-900">Customer Retention</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">+45%</div>
          <div className="text-sm text-gray-600">Improved through ClayCoin loyalty rewards</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-purple-500 mr-3" />
            <h3 className="font-semibold text-gray-900">Network Effect</h3>
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">+28%</div>
          <div className="text-sm text-gray-600">Cross-business referrals and traffic</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Category Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={businessCategories}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="category" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e1b4b', 
                border: 'none', 
                borderRadius: '8px', 
                color: 'white' 
              }}
              formatter={(value, name) => [
                `${value}%`,
                'Revenue Growth'
              ]} 
            />
            <Bar dataKey="growth" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Businesses</h3>
        <div className="space-y-4">
          {[
            { name: 'Main Street Diner', category: 'Restaurant', growth: 48, revenue: 15600 },
            { name: 'Clayton Tech Repair', category: 'Services', growth: 42, revenue: 12800 },
            { name: 'Forest Park Pharmacy', category: 'Health', growth: 38, revenue: 11200 },
            { name: 'Riverdale Comics', category: 'Entertainment', growth: 52, revenue: 9400 },
            { name: 'Jonesboro Auto Care', category: 'Automotive', growth: 35, revenue: 8900 }
          ].map((business, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{business.name}</div>
                <div className="text-sm text-gray-600">{business.category}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">+{business.growth}%</div>
                <div className="text-sm text-gray-600">${business.revenue.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">ClayCo Synergy Impact Dashboard</h1>
              <p className="text-purple-200 mt-1">Clayton County Digital Economy & Community Engagement</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-purple-200 text-sm">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>County Officials View</span>
                </div>
                <div className="text-xs mt-1">Last updated: {lastUpdated.toLocaleTimeString()}</div>
              </div>
              <div className="flex space-x-2">
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="30days">Last 30 Days</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </select>
                <button 
                  onClick={refreshData}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button className="px-4 py-2 bg-white text-purple-600 border border-purple-200 rounded-lg text-sm font-medium hover:bg-purple-50 flex items-center space-x-2 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Economic Overview', icon: TrendingUp },
              { id: 'cities', label: 'City Analytics', icon: MapPin },
              { id: 'business', label: 'Business Impact', icon: Building2 },
              { id: 'youth', label: 'Youth Engagement', icon: Gamepad2 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedView === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedView === 'overview' && <OverviewDashboard />}
        {selectedView === 'cities' && <CityAnalytics />}
        {selectedView === 'business' && <BusinessImpact />}
        {selectedView === 'youth' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <Gamepad2 className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Youth Engagement Analytics</h3>
            <p className="text-gray-600 mb-4">
              Detailed gaming analytics and civic education metrics will appear here once your Roblox game integration is ready.
            </p>
            <div className="bg-purple-50 rounded-lg p-4 max-w-md mx-auto">
              <div className="text-sm text-purple-800">
                <strong>Coming Soon:</strong> Real-time player engagement, mission completion rates, civic knowledge scoring, and local career interest tracking.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">ClayCo Synergy</h3>
              <p className="text-gray-400 text-sm">Connecting Clayton County's Digital & Physical Economies</p>
            </div>
            <div className="text-sm text-gray-400">
              <p>Ready for ClayCoin backend integration</p>
              <p>Ready for Roblox analytics integration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClayCoImpactDashboard;
