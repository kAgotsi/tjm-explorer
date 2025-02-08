
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilters } from "@/components/SearchFilters";
import { TJMStats } from "@/components/TJMStats";
import { TJMForm } from "@/components/TJMForm";

const Index = () => {
  const [activeFilters, setActiveFilters] = useState({});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container py-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">TJM Explorer</h1>
          <p className="mt-3 text-lg text-gray-600">
            Discover and share freelance daily rates across the tech industry
          </p>
        </div>

        <Tabs defaultValue="explore" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="explore">Explore TJM</TabsTrigger>
            <TabsTrigger value="submit">Submit TJM</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            <SearchFilters onFiltersChange={setActiveFilters} />
            <TJMStats filters={activeFilters} />
          </TabsContent>

          <TabsContent value="submit">
            <TJMForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
