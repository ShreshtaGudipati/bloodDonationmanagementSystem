
import { Heart, UserPlus, Building, Clock } from "lucide-react";

const stats = [
  { id: 1, name: 'Lives Saved', value: '10,000+', icon: Heart, color: 'bg-red-100 text-blood-red' },
  { id: 2, name: 'Registered Donors', value: '5,280', icon: UserPlus, color: 'bg-blue-100 text-blue-600' },
  { id: 3, name: 'Partner Blood Banks', value: '120', icon: Building, color: 'bg-green-100 text-green-600' },
  { id: 4, name: 'Response Time', value: '15 min', icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
];

const StatsSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className={`absolute rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
