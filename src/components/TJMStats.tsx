
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const mockData = [
  {
    id: 1,
    role: "Backend Developer",
    experience: "3-5 years",
    industry: "Banking",
    location: "Paris",
    companySize: "Enterprise",
    tjm: 650,
    date: "2024-03-01",
  },
  {
    id: 2,
    role: "Frontend Developer",
    experience: "0-2 years",
    industry: "Startup",
    location: "Remote",
    companySize: "Startup",
    tjm: 450,
    date: "2024-03-02",
  },
  {
    id: 3,
    role: "Fullstack Developer",
    experience: "6-10 years",
    industry: "Healthcare",
    location: "Lyon",
    companySize: "SME",
    tjm: 700,
    date: "2024-03-03",
  },
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
        
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Company Size</TableHead>
                <TableHead className="text-right">TJM (€)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.role}</TableCell>
                  <TableCell>{entry.experience}</TableCell>
                  <TableCell>{entry.industry}</TableCell>
                  <TableCell>{entry.location}</TableCell>
                  <TableCell>{entry.companySize}</TableCell>
                  <TableCell className="text-right font-medium">
                    €{entry.tjm}
                  </TableCell>
                  <TableCell>
                    {new Date(entry.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
