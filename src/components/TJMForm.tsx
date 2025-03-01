import { useState, useEffect } from "react";
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
import { ArrowRight, Linkedin } from "lucide-react";

interface TJMFormProps {
  onSubmitSuccess: () => void;
}

export function TJMForm({ onSubmitSuccess }: TJMFormProps) {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFreelance, setIsFreelance] = useState<boolean | null>(null); // null = not checked yet
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

  const handleLinkedInAuth = async () => {
    try {
      const clientId = "774ckgbyn2k9kq";
      const redirectUri = "https://tjm-explorer.vercel.app/callback"; // Must match LinkedIn app settings
      const scope = "r_liteprofile"; // Scope for basic profile data (includes positions)
      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

      window.location.href = authUrl; // Redirect to LinkedIn
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter à LinkedIn.",
        variant: "destructive",
      });
    }
  };

  // Handle callback and fetch profile data
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      toast({
        title: "Erreur",
        description: urlParams.get("error_description") || "Échec de l'authentification.",
        variant: "destructive",
      });
      window.history.replaceState({}, document.title, "/"); // Clean URL
      return;
    }

    if (code && !isAuthenticated) {
      const fetchTokenAndProfile = async () => {
        try {
          const clientId = "774ckgbyn2k9kq";
          const clientSecret = "YWPL_AP1.MtmJrrtsCjup55Ac.xeQTKw=="; // WARNING: Should not be client-side in prod
          const redirectUri = "https://tjm-explorer.vercel.app/callback";

          // Step 1: Exchange code for access token
          const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              code,
              redirect_uri: redirectUri,
              client_id: clientId,
              client_secret: clientSecret,
            }),
          });

          const tokenData = await tokenResponse.json();
          if (!tokenData.access_token) {
            throw new Error("Failed to get access token");
          }
          const accessToken = tokenData.access_token;

          // Step 2: Fetch profile data (positions)
          const profileResponse = await fetch("https://api.linkedin.com/v2/me?projection=(id,positions)", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "cache-control": "no-cache",
              "X-Restli-Protocol-Version": "2.0.0",
            },
          });

          const profileData = await profileResponse.json();
          const positions = profileData.positions?.elements || [];
          const lastPosition = positions.length > 0 ? positions[0] : null;

          // Step 3: Determine if freelance or CDI
          let isFreelancePosition = false;
          if (lastPosition) {
            const title = lastPosition.title?.toLowerCase() || "";
            const companyName = lastPosition.company?.name?.toLowerCase() || "";
            // Heuristic: Check for freelance indicators
            isFreelancePosition =
              title.includes("freelance") ||
              title.includes("self-employed") ||
              title.includes("consultant") ||
              companyName === "self-employed";
            // Assume CDI if full-time and no freelance indicators
            if (lastPosition.employmentType === "Full-time" && !isFreelancePosition) {
              isFreelancePosition = false;
            }
          }

          setIsAuthenticated(true);
          setIsFreelance(isFreelancePosition);
          toast({
            title: "Connecté avec succès!",
            description: isFreelancePosition
              ? "Vous êtes freelance, veuillez remplir le formulaire TJM."
              : "Vous êtes en CDI, pas besoin de remplir le formulaire TJM.",
          });

          // Clean URL after processing
          window.history.replaceState({}, document.title, "/");
        } catch (error) {
          console.error("Auth error:", error);
          toast({
            title: "Erreur",
            description: "Échec lors de la récupération des données LinkedIn.",
            variant: "destructive",
          });
          window.history.replaceState({}, document.title, "/");
        }
      };

      fetchTokenAndProfile();
    }
  }, [isAuthenticated, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Authentication requise",
        description: "Veuillez vous connecter avec LinkedIn d'abord.",
        variant: "destructive",
      });
      return;
    }
    if (!isFreelance) {
      toast({
        title: "Non applicable",
        description: "Le formulaire TJM est réservé aux freelances.",
        variant: "destructive",
      });
      return;
    }
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

  const renderForm = () => (
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

      <div className="relative">
        <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          {!isAuthenticated && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-center p-8 max-w-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Authentification requise
                </h3>
                <p className="text-gray-600 mb-6">
                  Connectez-vous avec LinkedIn pour partager votre TJM
                </p>
                <Button 
                  onClick={handleLinkedInAuth}
                  className="bg-[#0077B5] hover:bg-[#006097] transition-colors"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  Se connecter avec LinkedIn
                </Button>
              </div>
            </div>
          )}
          {isAuthenticated && isFreelance === false && (
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Pas de formulaire TJM requis
              </h3>
              <p className="text-gray-600">
                Votre dernière position est un CDI. Ce formulaire est réservé aux freelances.
              </p>
            </div>
          )}
          {isAuthenticated && isFreelance === true && (
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
                {/* Add other fields as needed */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">TJM (€)</label>
                  <Input
                    type="number"
                    placeholder="Daily rate"
                    className="bg-white"
                    onChange={(e) => handleChange("tjm", e.target.value)}
                  />
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
          )}
        </Card>
      </div>
    </div>
  );

  return renderForm();
}