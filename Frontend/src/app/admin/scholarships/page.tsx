"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  ExternalLink,
  Calendar,
  DollarSign
} from "lucide-react";
import Link from "next/link";

// Mock scholarship data
const mockScholarships = [
  {
    id: "scholarship-001",
    name: "MASTERCARD Foundation Scholarship",
    provider: "University of Cape Town",
    coverageType: "Full Scholarship",
    coverageAmount: 25000,
    description: "Full tuition, accommodation, and living allowances for African students",
    eligibility: "African students with excellent academic record",
    applicationDeadline: "2025-03-15",
    link: "https://www.uct.ac.za/scholarships",
    isActive: true,
    applicants: 145,
    awarded: 25,
    country: "South Africa",
    degreeTypes: ["Bachelor", "Master"],
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "scholarship-002",
    name: "Ghana Government Scholarship",
    provider: "Government of Ghana",
    coverageType: "Partial Scholarship",
    coverageAmount: 8000,
    description: "Partial tuition support for international students",
    eligibility: "Non-Ghanaian citizens with good academic standing",
    applicationDeadline: "2025-02-28",
    link: "https://www.ghana.gov.gh/scholarships",
    isActive: true,
    applicants: 89,
    awarded: 40,
    country: "Ghana",
    degreeTypes: ["Bachelor", "Master", "PhD"],
    createdAt: "2024-02-01T00:00:00Z"
  },
  {
    id: "scholarship-003",
    name: "Kenya Education Trust Fund",
    provider: "University of Nairobi",
    coverageType: "Merit-based",
    coverageAmount: 12000,
    description: "Merit-based scholarship for outstanding students",
    eligibility: "Students with CGPA above 3.5",
    applicationDeadline: "2025-01-30",
    link: "https://www.uonbi.ac.ke/scholarships",
    isActive: false,
    applicants: 67,
    awarded: 15,
    country: "Kenya",
    degreeTypes: ["Bachelor"],
    createdAt: "2024-01-20T00:00:00Z"
  }
];

export default function AdminScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get unique countries for filter
  const countries = Array.from(new Set(mockScholarships.map(scholarship => scholarship.country))).sort();

  const filteredScholarships = mockScholarships.filter(scholarship => {
    const matchesSearch =
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.coverageType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === "all" || scholarship.country === selectedCountry;
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && scholarship.isActive) ||
      (statusFilter === "inactive" && !scholarship.isActive);
    return matchesSearch && matchesCountry && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getCoverageColor = (type: string) => {
    switch (type) {
      case "Full Scholarship":
        return "bg-blue-100 text-blue-800";
      case "Partial Scholarship":
        return "bg-yellow-100 text-yellow-800";
      case "Merit-based":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteScholarship = (scholarshipId: string) => {
    console.log("Delete scholarship:", scholarshipId);
  };

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilDeadline <= 30 && daysUntilDeadline > 0;
  };

  const isExpired = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate < today;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Scholarships</h1>
            <p className="text-muted-foreground">
              Manage scholarship opportunities and programs
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Link href="/admin/scholarships/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Scholarship
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockScholarships.length}</div>
              <p className="text-sm text-muted-foreground">Total Scholarships</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {mockScholarships.filter(s => s.isActive).length}
              </div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {mockScholarships.reduce((sum, s) => sum + s.applicants, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Applicants</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {formatCurrency(mockScholarships.reduce((sum, s) => sum + s.coverageAmount, 0))}
              </div>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </CardContent>
          </Card>
        </div>

        {/* Scholarship Management */}
        <Card>
          <CardHeader>
            <CardTitle>Scholarship Management</CardTitle>
            <CardDescription>
              Manage scholarship programs and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search scholarships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-48">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full h-10 px-3 border border-input bg-background text-sm rounded-md"
                >
                  <option value="all">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="w-32">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-10 px-3 border border-input bg-background text-sm rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Scholarships Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scholarship</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScholarships.map((scholarship) => (
                    <TableRow key={scholarship.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{scholarship.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {scholarship.description}
                          </div>
                          <div className="flex gap-1 mt-1">
                            {scholarship.degreeTypes.map(type => (
                              <Badge key={type} variant="outline" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{scholarship.provider}</div>
                          <div className="text-sm text-muted-foreground">{scholarship.country}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getCoverageColor(scholarship.coverageType)}>
                            {scholarship.coverageType}
                          </Badge>
                          <div className="text-sm font-medium">
                            {formatCurrency(scholarship.coverageAmount)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className={`text-sm font-medium ${
                            isExpired(scholarship.applicationDeadline)
                              ? "text-red-600"
                              : isDeadlineNear(scholarship.applicationDeadline)
                              ? "text-orange-600"
                              : "text-green-600"
                          }`}>
                            {formatDate(scholarship.applicationDeadline)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {isExpired(scholarship.applicationDeadline)
                              ? "Expired"
                              : isDeadlineNear(scholarship.applicationDeadline)
                              ? "Deadline Soon"
                              : "Open"
                            }
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{scholarship.applicants}</div>
                          <div className="text-sm text-muted-foreground">
                            {scholarship.awarded} awarded
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(scholarship.isActive)}>
                          {scholarship.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Visit Website
                            </DropdownMenuItem>
                            <Link href={`/admin/scholarships/${scholarship.id}/edit`}>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteScholarship(scholarship.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredScholarships.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No scholarships found matching your criteria.</p>
              </div>
            )}

            {/* Pagination placeholder */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredScholarships.length} of {mockScholarships.length} scholarships
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
