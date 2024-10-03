import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LogOut } from 'lucide-react'
import Footer from './Footer'

const performanceData = {
  'Q1 2024': [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 59 },
    { name: 'Mar', value: 80 },
  ],
  'Q2 2024': [
    { name: 'Apr', value: 81 },
    { name: 'May', value: 56 },
    { name: 'Jun', value: 55 },
  ],
  'Q3 2024': [
    { name: 'Jul', value: 70 },
    { name: 'Aug', value: 68 },
    { name: 'Sep', value: 72 },
  ],
  'Q4 2024': [
    { name: 'Oct', value: 76 },
    { name: 'Nov', value: 79 },
    { name: 'Dec', value: 82 },
  ],
}

const productivityData = [
  { name: 'Team A', value: 400 },
  { name: 'Team B', value: 300 },
  { name: 'Team C', value: 300 },
  { name: 'Team D', value: 200 },
]

const colorSchemes = {
  default: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
  pastel: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA'],
  neon: ['#FF00FF', '#00FFFF', '#FF00FF', '#FFFF00'],
}

const upcomingDeadlines = [
  { project: 'Project Alpha', deadline: '2024-10-15' },
  { project: 'Project Beta', deadline: '2024-10-20' },
  { project: 'Project Gamma', deadline: '2024-10-25' },
]

export default function Dashboard() {
  const [user, setUser] = useState({
    name: 'John Doe',
    role: 'Manager',
    team: 'Engineering',
    avatar: '/placeholder-user.jpg'
  })
  const [selectedQuarter, setSelectedQuarter] = useState('Q2 2024')
  const [productivityChartType, setProductivityChartType] = useState('pie')
  const [colorScheme, setColorScheme] = useState('default')
  const [drillDownMonth, setDrillDownMonth] = useState(null)
  const [visibleSections, setVisibleSections] = useState({
    performance: true,
    productivity: true,
    deadlines: true,
  })

  const monthlyPerformanceData = {
    Jan: [
      { name: 'Week 1', value: 62 },
      { name: 'Week 2', value: 64 },
      { name: 'Week 3', value: 67 },
      { name: 'Week 4', value: 65 },
    ],
    Feb: [
      { name: 'Week 1', value: 57 },
      { name: 'Week 2', value: 58 },
      { name: 'Week 3', value: 60 },
      { name: 'Week 4', value: 59 },
    ],
   
  }

  const handleBarClick = (data) => {
    setDrillDownMonth(data.name)
  }

  const toggleSection = (section) => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const PerformanceChart = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {drillDownMonth ? `${drillDownMonth} Performance` : 'Employee Performance'}
        </CardTitle>
        {!drillDownMonth && (
          <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select quarter" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(performanceData).map((quarter) => (
                <SelectItem key={quarter} value={quarter}>
                  {quarter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {drillDownMonth && (
          <Button variant="outline" onClick={() => setDrillDownMonth(null)}>
            Back to Quarterly View
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={drillDownMonth ? monthlyPerformanceData[drillDownMonth] : performanceData[selectedQuarter]}
              onClick={drillDownMonth ? null : handleBarClick}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={colorSchemes[colorScheme][0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )

  const ProductivityChart = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Team Productivity</CardTitle>
        <Select value={productivityChartType} onValueChange={setProductivityChartType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">Pie Chart</SelectItem>
            <SelectItem value="bar">Bar Chart</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            {productivityChartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={productivityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorSchemes[colorScheme][index % colorSchemes[colorScheme].length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={colorSchemes[colorScheme][0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col min-h-screen">
 

      <main className="flex-grow bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name}</h1>
          
          <div className="mb-4">
            <Select value={colorScheme} onValueChange={setColorScheme}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select color scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="pastel">Pastel</SelectItem>
                <SelectItem value="neon">Neon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleSections.performance && <PerformanceChart />}

            {visibleSections.productivity && <ProductivityChart />}

            {visibleSections.deadlines && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{deadline.project}</span>
                        <span className="text-sm text-muted-foreground">{deadline.deadline}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Customize Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant={visibleSections.performance ? "default" : "outline"}
                  onClick={() => toggleSection('performance')}
                >
                  Employee Performance
                </Button>
                <Button
                  variant={visibleSections.productivity ? "default" : "outline"}
                  onClick={() => toggleSection('productivity')}
                >
                  Team Productivity
                </Button>
                <Button
                  variant={visibleSections.deadlines ? "default" : "outline"}
                  onClick={() => toggleSection('deadlines')}
                >
                  Upcoming Deadlines
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}