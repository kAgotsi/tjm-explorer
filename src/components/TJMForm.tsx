
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
    // Here you would typically send the data to your backend
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
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Select onValueChange={(value) => handleChange("role", value)}>
              <SelectTrigger>
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
            <label className="text-sm font-medium">Experience (years)</label>
            <Select onValueChange={(value) => handleChange("experience", value)}>
              <SelectTrigger>
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
            <label className="text-sm font-medium">Mission Duration</label>
            <Select onValueChange={(value) => handleChange("duration", value)}>
              <SelectTrigger>
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
            <label className="text-sm font-medium">Location</label>
            <Input
              placeholder="City or Remote"
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Select onValueChange={(value) => handleChange("industry", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="banking">Banking</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Size</label>
            <Select onValueChange={(value) => handleChange("companySize", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="sme">SME</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name (Optional)</label>
            <Input
              placeholder="Company name"
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">TJM (€)</label>
            <Input
              type="number"
              placeholder="Daily rate"
              onChange={(e) => handleChange("tjm", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Contract Type</label>
            <Select onValueChange={(value) => handleChange("contractType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select contract type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Direct Freelance</SelectItem>
                <SelectItem value="portage">Portage Salarial</SelectItem>
                <SelectItem value="consulting">Consulting Firm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Terms</label>
            <Select onValueChange={(value) => handleChange("paymentTerms", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="45">45 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full">Submit TJM</Button>
      </form>
    </Card>
  );
}
