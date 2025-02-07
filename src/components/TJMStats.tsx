
import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", tjm: 550 },
  { month: "Feb", tjm: 580 },
  { month: "Mar", tjm: 600 },
  { month: "Apr", tjm: 590 },
  { month: "May", tjm: 620 },
  { month: "Jun", tjm: 650 },
];

export function TJMStats() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Average TJM" value="€580" trend="+5%" />
          <StatCard title="Median TJM" value="€550" trend="+3%" />
          <StatCard title="Max TJM" value="€750" trend="+8%" />
        </div>
        
        <div className="h-[300px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tjm"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

function StatCard({ title, value, trend }: { title: string; value: string; trend: string }) {
  return (
    <div className="p-4 rounded-lg bg-gray-50">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        <span className="text-sm font-medium text-primary-600">{trend}</span>
      </div>
    </div>
  );
}
