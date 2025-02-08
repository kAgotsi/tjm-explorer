
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "../hooks/use-toast";
import { ArrowRight } from "lucide-react";

interface TJMFormProps {
  onSubmitSuccess: () => void;
}

export function TJMForm({ onSubmitSuccess }: TJMFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    year: new Date().getFullYear(),
    duration: "",
    location: "",
    industry: "",
    companySize: "",
    companyName: "",
    tjm: "",
    contractType: "",
    paymentTerms: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Success!",
      description: "Your TJM has been submitted for review.",
    });
    onSubmitSuccess();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#FEC6A1] opacity-10 rounded-2xl"></div>
        <img
          src="photo-1581091226825-a6a2a5aee158"
          alt="Developer working"
          className="w-full h-[600px] object-cover rounded-2xl"
        />
        <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-sm rounded-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Partagez votre expérience
          </h3>
          <p className="text-gray-600">
            Contribuez à la transparence du marché en partageant votre TJM
          </p>
        </div>
      </div>

      <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <Select onValueChange={(value) => handleChange("role", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backend">Backend Developer</SelectItem>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="fullstack">Fullstack Developer</SelectItem>
                  <SelectItem value="ux">UX Designer</SelectItem>
                  <SelectItem value="pm">Project Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Experience (years)</label>
              <Select onValueChange={(value) => handleChange("experience", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mission Duration</label>
              <Select onValueChange={(value) => handleChange("duration", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<3">Less than 3 months</SelectItem>
                  <SelectItem value="3-6">3-6 months</SelectItem>
                  <SelectItem value="6-12">6-12 months</SelectItem>
                  <SelectItem value=">12">More than 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <Input
                placeholder="City or Remote"
                className="bg-white"
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">TJM (€)</label>
              <Input
                type="number"
                placeholder="Daily rate"
                className="bg-white"
                onChange={(e) => handleChange("tjm", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contract Type</label>
              <Select onValueChange={(value) => handleChange("contractType", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Direct Freelance</SelectItem>
                  <SelectItem value="portage">Portage Salarial</SelectItem>
                  <SelectItem value="consulting">Consulting Firm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#F97316] to-[#FEC6A1] hover:opacity-90 transition-opacity"
          >
            Submit TJM
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
