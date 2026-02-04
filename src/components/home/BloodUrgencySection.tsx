
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const bloodGroups = [
  { group: "A+", level: 25, status: "low" },
  { group: "A-", level: 65, status: "normal" },
  { group: "B+", level: 45, status: "normal" },
  { group: "B-", level: 15, status: "critical" },
  { group: "AB+", level: 70, status: "normal" },
  { group: "AB-", level: 35, status: "low" },
  { group: "O+", level: 55, status: "normal" },
  { group: "O-", level: 10, status: "critical" }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-red-600";
    case "low":
      return "bg-yellow-500";
    case "normal":
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
};

const BloodUrgencySection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Blood Urgency Levels</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Current blood stock levels at our associated blood banks
          </p>
        </div>

        <div className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Blood Group Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bloodGroups.map((blood) => (
                  <div key={blood.group} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-blood-red">{blood.group}</span>
                        <span className={`ml-2 inline-block h-3 w-3 rounded-full ${getStatusColor(blood.status)}`}></span>
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        {blood.status === "critical" ? (
                          <span className="text-red-600 font-semibold animate-pulse-slow">URGENT</span>
                        ) : blood.status === "low" ? (
                          <span className="text-yellow-500 font-medium">LOW</span>
                        ) : (
                          "Normal"
                        )}
                      </span>
                    </div>
                    <Progress value={blood.level} className={`h-2 ${
                      blood.status === "critical" ? "bg-red-100" : 
                      blood.status === "low" ? "bg-yellow-100" : 
                      "bg-green-100"
                    }`} />
                    <div className="mt-1 text-xs text-gray-500 flex justify-between">
                      <span>Stock level</span>
                      <span>{blood.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Urgent need for O- and B- blood types</h3>
                    <p className="text-sm text-gray-500 mt-1">These blood types are universal donors and in critical demand</p>
                  </div>
                  <button className="mt-3 sm:mt-0 bg-blood-red hover:bg-blood-redDark text-white py-2 px-4 rounded">
                    Donate Now
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BloodUrgencySection;
