
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilters } from "@/components/SearchFilters";
import { TJMStats } from "@/components/TJMStats";
import { TJMForm } from "@/components/TJMForm";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [activeFilters, setActiveFilters] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTJMSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
    toast({
      title: "TJM Added Successfully",
      description: "Your contribution has been added to the database. Thank you!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDE1D3] to-white">
      <div className="container py-12 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#F97316] to-[#FEC6A1] text-transparent bg-clip-text">
            TJM Explorer
          </h1>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-xl text-gray-700">
              Découvrez et partagez les tarifs journaliers des freelances dans le secteur tech
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm">
                <p>✨ Explorer les TJM du marché</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm">
                <p>📊 Données anonymisées et fiables</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm">
                <p>🤝 Contribuez à la transparence</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="explore" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="explore" className="text-lg">Explorer les TJM</TabsTrigger>
            <TabsTrigger value="submit" className="text-lg">Ajouter un TJM</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            <SearchFilters onFiltersChange={setActiveFilters} />
            <TJMStats filters={activeFilters} refreshTrigger={refreshTrigger} />
          </TabsContent>

          <TabsContent value="submit">
            <TJMForm onSubmitSuccess={handleTJMSubmitted} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
