
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

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

interface TJMStatsProps {
  filters?: {
    role?: string;
    experience?: string;
    industry?: string;
    location?: string;
    companySize?: string;
  };
}

export function TJMStats({ filters = {} }: TJMStatsProps) {
  const [filteredData, setFilteredData] = useState(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    let result = [...mockData];

    // Apply filters
    if (filters.role) {
      result = result.filter(item => 
        item.role.toLowerCase().includes(filters.role!.toLowerCase())
      );
    }
    if (filters.experience) {
      result = result.filter(item => item.experience === filters.experience);
    }
    if (filters.industry) {
      result = result.filter(item => item.industry === filters.industry);
    }
    if (filters.location) {
      result = result.filter(item => 
        item.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    if (filters.companySize) {
      result = result.filter(item => item.companySize === filters.companySize);
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  // Calculate statistics from filtered data
  const avgTJM = Math.round(
    filteredData.reduce((acc, curr) => acc + curr.tjm, 0) / filteredData.length
  );
  const medianTJM = Math.round(
    filteredData[Math.floor(filteredData.length / 2)]?.tjm || 0
  );
  const maxTJM = Math.max(...filteredData.map(item => item.tjm));

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Average TJM" value={`€${avgTJM}`} trend="+5%" />
          <StatCard title="Median TJM" value={`€${medianTJM}`} trend="+3%" />
          <StatCard title="Max TJM" value={`€${maxTJM}`} trend="+8%" />
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
              {paginatedData.map((entry) => (
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

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
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
