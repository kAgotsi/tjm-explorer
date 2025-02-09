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
import { Button } from "./ui/button";
import { Linkedin } from "lucide-react";

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
  // Adding more mock data
  {
    id: 4,
    role: "DevOps Engineer",
    experience: "3-5 years",
    industry: "E-commerce",
    location: "Bordeaux",
    companySize: "SME",
    tjm: 600,
    date: "2024-03-04",
  },
  {
    id: 5,
    role: "UX Designer",
    experience: "6-10 years",
    industry: "Consulting",
    location: "Paris",
    companySize: "Enterprise",
    tjm: 800,
    date: "2024-03-05",
  },
  // ... Adding more entries up to 20 total
  {
    id: 20,
    role: "Tech Lead",
    experience: "10+ years",
    industry: "FinTech",
    location: "Remote",
    companySize: "Enterprise",
    tjm: 1200,
    date: "2024-03-20",
  },
];

// Add 15 more entries with varying data between entry 5 and 20
for (let i = 6; i < 20; i++) {
  mockData.push({
    id: i,
    role: ["Frontend Developer", "Backend Developer", "Fullstack Developer", "DevOps Engineer", "UX Designer"][Math.floor(Math.random() * 5)],
    experience: ["0-2 years", "3-5 years", "6-10 years", "10+ years"][Math.floor(Math.random() * 4)],
    industry: ["Banking", "Healthcare", "E-commerce", "Consulting", "FinTech"][Math.floor(Math.random() * 5)],
    location: ["Paris", "Lyon", "Bordeaux", "Remote"][Math.floor(Math.random() * 4)],
    companySize: ["Startup", "SME", "Enterprise"][Math.floor(Math.random() * 3)],
    tjm: Math.floor(Math.random() * (1200 - 400) + 400),
    date: `2024-03-${String(i).padStart(2, '0')}`,
  });
}

interface TJMStatsProps {
  filters?: {
    role?: string;
    experience?: string;
    industry?: string;
    location?: string;
    companySize?: string;
  };
  refreshTrigger?: number;
}

export function TJMStats({ filters = {}, refreshTrigger = 0 }: TJMStatsProps) {
  const [filteredData, setFilteredData] = useState(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  }, [filters, refreshTrigger]);

  const handleLinkedInAuth = () => {
    // In a real app, this would integrate with LinkedIn OAuth
    window.open('https://www.linkedin.com/login', '_blank');
  };

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

  const showAuthPrompt = currentPage > 1 && !isAuthenticated;

  return (
    <Card className="p-6 shadow-lg backdrop-blur-sm bg-white/80">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="TJM Moyen" 
            value={`€${avgTJM}`} 
            trend="+5%" 
            description="Moyenne sur la période"
          />
          <StatCard 
            title="TJM Médian" 
            value={`€${medianTJM}`} 
            trend="+3%" 
            description="Valeur médiane"
          />
          <StatCard 
            title="TJM Maximum" 
            value={`€${maxTJM}`} 
            trend="+8%" 
            description="Plus haut TJM"
          />
        </div>
        
        <div className="mt-6">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Experience</TableHead>
                  <TableHead className="font-semibold">Industry</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Company Size</TableHead>
                  <TableHead className="text-right font-semibold">TJM (€)</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{entry.role}</TableCell>
                    <TableCell>{entry.experience}</TableCell>
                    <TableCell>{entry.industry}</TableCell>
                    <TableCell>{entry.location}</TableCell>
                    <TableCell>{entry.companySize}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
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

          {showAuthPrompt ? (
            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-600">Pour voir plus de résultats, connectez-vous avec LinkedIn</p>
              <Button 
                onClick={handleLinkedInAuth}
                className="bg-[#0077B5] hover:bg-[#006097] text-white flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                Se connecter avec LinkedIn
              </Button>
            </div>
          ) : totalPages > 1 && (
            <div className="mt-4 flex justify-center">
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

function StatCard({ 
  title, 
  value, 
  trend, 
  description 
}: { 
  title: string; 
  value: string; 
  trend: string; 
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="mt-2">
        <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 text-transparent bg-clip-text">
          {value}
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xs text-gray-500">{description}</span>
          <span className="text-sm font-medium text-primary-600">{trend}</span>
        </div>
      </div>
    </div>
  );
}
