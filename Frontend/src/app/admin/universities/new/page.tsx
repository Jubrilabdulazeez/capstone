"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  MapPin,
  Globe,
  Users,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const africanCountries = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon",
  "Cape Verde", "Central African Republic", "Chad", "Comoros", "Congo", "DR Congo",
  "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia",
  "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya",
  "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania",
  "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
  "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia",
  "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda",
  "Zambia", "Zimbabwe"
];

const universityTypes = ["Public", "Private", "Research", "Technical", "Medical", "Agricultural"];
const rankings = ["A+", "A", "B+", "B", "C+", "C", "Not Ranked"];
const languages = ["English", "French", "Arabic", "Portuguese", "Swahili", "Afrikaans"];

interface Program {
  id: string;
  name: string;
  degreeType: string;
  duration: number;
  tuition: number;
  language: string;
  hasScholarship: boolean;
  entryRequirements: string;
}

interface Facility {
  id: string;
  name: string;
  description: string;
}

export default function NewUniversityPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    foundedYear: new Date().getFullYear(),
    type: "",
    ranking: "",
    description: "",
    website: "",
    studentsCount: 0,
    nigerianStudentsCount: 0,
    acceptanceRate: 0,
    averageTuition: 0,
    contactEmail: "",
    contactPhone: "",
    languagesOfInstruction: [] as string[],
    hasScholarships: false,
    hasAccommodation: false,
    isPartnerUniversity: false,
  });

  const [programs, setPrograms] = useState<Program[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languagesOfInstruction: prev.languagesOfInstruction.includes(language)
        ? prev.languagesOfInstruction.filter(l => l !== language)
        : [...prev.languagesOfInstruction, language]
    }));
  };

  const addProgram = () => {
    const newProgram: Program = {
      id: `prog-${Date.now()}`,
      name: "",
      degreeType: "Bachelor",
      duration: 4,
      tuition: 0,
      language: "English",
      hasScholarship: false,
      entryRequirements: ""
    };
    setPrograms([...programs, newProgram]);
  };

  const updateProgram = (index: number, field: string, value: string | number | boolean) => {
    setPrograms(programs.map((prog, i) =>
      i === index ? { ...prog, [field]: value } : prog
    ));
  };

  const removeProgram = (index: number) => {
    setPrograms(programs.filter((_, i) => i !== index));
  };

  const addFacility = () => {
    const newFacility: Facility = {
      id: `fac-${Date.now()}`,
      name: "",
      description: ""
    };
    setFacilities([...facilities, newFacility]);
  };

  const updateFacility = (index: number, field: string, value: string) => {
    setFacilities(facilities.map((fac, i) =>
      i === index ? { ...fac, [field]: value } : fac
    ));
  };

  const removeFacility = (index: number) => {
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.country || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const universityData = {
      ...formData,
      id: `uni-${Date.now()}`,
      programs,
      facilities,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log("Creating university:", universityData);
    toast.success("University created successfully!");

    setIsLoading(false);
    router.push("/admin/universities");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/universities">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Universities
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Add New University</h1>
              <p className="text-muted-foreground">
                Create a new university listing with programs and facilities
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Essential details about the university
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">University Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., University of Ghana"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://university.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {africanCountries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="e.g., Accra"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input
                    id="foundedYear"
                    type="number"
                    min="1800"
                    max={new Date().getFullYear()}
                    value={formData.foundedYear}
                    onChange={(e) => handleInputChange("foundedYear", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">University Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {universityTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ranking">Ranking</Label>
                  <Select value={formData.ranking} onValueChange={(value) => handleInputChange("ranking", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ranking" />
                    </SelectTrigger>
                    <SelectContent>
                      {rankings.map(ranking => (
                        <SelectItem key={ranking} value={ranking}>{ranking}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of the university..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics & Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentsCount">Total Students</Label>
                  <Input
                    id="studentsCount"
                    type="number"
                    min="0"
                    value={formData.studentsCount}
                    onChange={(e) => handleInputChange("studentsCount", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nigerianStudentsCount">Nigerian Students</Label>
                  <Input
                    id="nigerianStudentsCount"
                    type="number"
                    min="0"
                    value={formData.nigerianStudentsCount}
                    onChange={(e) => handleInputChange("nigerianStudentsCount", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acceptanceRate">Acceptance Rate (%)</Label>
                  <Input
                    id="acceptanceRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.acceptanceRate}
                    onChange={(e) => handleInputChange("acceptanceRate", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="averageTuition">Average Annual Tuition (USD)</Label>
                  <Input
                    id="averageTuition"
                    type="number"
                    min="0"
                    value={formData.averageTuition}
                    onChange={(e) => handleInputChange("averageTuition", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="admissions@university.edu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    placeholder="+233 xxx xxx xxxx"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Languages of Instruction</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map(language => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={`lang-${language}`}
                          checked={formData.languagesOfInstruction.includes(language)}
                          onCheckedChange={() => handleLanguageToggle(language)}
                        />
                        <Label htmlFor={`lang-${language}`} className="text-sm">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasScholarships"
                      checked={formData.hasScholarships}
                      onCheckedChange={(checked) => handleInputChange("hasScholarships", checked)}
                    />
                    <Label htmlFor="hasScholarships">Offers Scholarships</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAccommodation"
                      checked={formData.hasAccommodation}
                      onCheckedChange={(checked) => handleInputChange("hasAccommodation", checked)}
                    />
                    <Label htmlFor="hasAccommodation">Provides Accommodation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPartnerUniversity"
                      checked={formData.isPartnerUniversity}
                      onCheckedChange={(checked) => handleInputChange("isPartnerUniversity", checked)}
                    />
                    <Label htmlFor="isPartnerUniversity">Partner University</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Programs Section */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Academic Programs
                  </CardTitle>
                  <CardDescription>
                    Add programs offered by the university
                  </CardDescription>
                </div>
                <Button type="button" onClick={addProgram} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Program
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {programs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No programs added yet. Click "Add Program" to start.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {programs.map((program, index) => (
                    <Card key={program.id} className="border border-border/60">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Program {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProgram(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Program Name</Label>
                            <Input
                              value={program.name}
                              onChange={(e) => updateProgram(index, "name", e.target.value)}
                              placeholder="e.g., Computer Science"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Degree Type</Label>
                            <Select
                              value={program.degreeType}
                              onValueChange={(value) => updateProgram(index, "degreeType", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Certificate">Certificate</SelectItem>
                                <SelectItem value="Diploma">Diploma</SelectItem>
                                <SelectItem value="Bachelor">Bachelor</SelectItem>
                                <SelectItem value="Master">Master</SelectItem>
                                <SelectItem value="PhD">PhD</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Duration (years)</Label>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              value={program.duration}
                              onChange={(e) => updateProgram(index, "duration", Number.parseInt(e.target.value))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Annual Tuition (USD)</Label>
                            <Input
                              type="number"
                              min="0"
                              value={program.tuition}
                              onChange={(e) => updateProgram(index, "tuition", Number.parseInt(e.target.value))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Language</Label>
                            <Select
                              value={program.language}
                              onValueChange={(value) => updateProgram(index, "language", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {languages.map(lang => (
                                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2 pt-6">
                            <Checkbox
                              checked={program.hasScholarship}
                              onCheckedChange={(checked) => updateProgram(index, "hasScholarship", checked)}
                            />
                            <Label>Has Scholarship</Label>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Label>Entry Requirements</Label>
                          <Textarea
                            value={program.entryRequirements}
                            onChange={(e) => updateProgram(index, "entryRequirements", e.target.value)}
                            placeholder="List the entry requirements for this program..."
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/universities">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create University
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
