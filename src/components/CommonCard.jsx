import React from 'react'

const CommonCard = ({metrics}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Metrics */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium">{metric.title}</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{metric.value}</p>
                        <p className="text-xs text-gray-500 mt-2">{metric.change}</p>
                      </div>
                      <div className="p-3 bg-gray-100 rounded-lg">
                        {metric.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Actions */}
              
            </div>
            
            {/* Right Column - Recent Activities */}
           
          </div>
  )
}

export default CommonCard
