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
  Upload
} from "lucide-react";
import Link from "next/link";
import { sampleUniversities } from "@/lib/data/universities";

export default function AdminUniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  // Get unique countries for filter
  const countries = Array.from(new Set(sampleUniversities.map(uni => uni.country))).sort();

  const filteredUniversities = sampleUniversities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === "all" || university.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRankingColor = (ranking: string) => {
    switch (ranking) {
      case 'A+':
        return 'bg-green-100 text-green-800';
      case 'A':
        return 'bg-green-100 text-green-700';
      case 'B+':
        return 'bg-yellow-100 text-yellow-800';
      case 'B':
        return 'bg-yellow-100 text-yellow-700';
      case 'C+':
        return 'bg-orange-100 text-orange-800';
      case 'C':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteUniversity = (universityId: string) => {
    // In a real app, this would call an API to delete the university
    console.log("Delete university:", universityId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Universities</h1>
            <p className="text-muted-foreground">
              Manage university listings and information
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Link href="/admin/universities/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add University
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{sampleUniversities.length}</div>
              <p className="text-sm text-muted-foreground">Total Universities</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{countries.length}</div>
              <p className="text-sm text-muted-foreground">Countries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {sampleUniversities.filter(u => u.ranking === 'A+' || u.ranking === 'A').length}
              </div>
              <p className="text-sm text-muted-foreground">Top Ranked</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {Math.round(sampleUniversities.reduce((sum, u) => sum + u.acceptanceRate, 0) / sampleUniversities.length * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Avg. Acceptance Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>University Management</CardTitle>
            <CardDescription>
              Search, filter, and manage university listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search universities..."
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
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Universities Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>University</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Ranking</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Tuition</TableHead>
                    <TableHead>Acceptance Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUniversities.map((university) => (
                    <TableRow key={university.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            {university.logo ? (
                              <img
                                src={university.logo}
                                alt={university.name}
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <span className="text-xs font-medium">
                                {university.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{university.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Founded {university.foundedYear}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{university.city}</div>
                          <div className="text-sm text-muted-foreground">{university.country}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRankingColor(university.ranking)}>
                          {university.ranking}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{university.studentsCount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {university.nigerianStudentsCount} Nigerian
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {formatCurrency(university.averageTuition)}
                        </div>
                        <div className="text-sm text-muted-foreground">per year</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {Math.round(university.acceptanceRate * 100)}%
                        </div>
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
                            <Link href={`/admin/universities/${university.id}/edit`}>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteUniversity(university.id)}
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

            {filteredUniversities.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No universities found matching your criteria.</p>
              </div>
            )}

            {/* Pagination placeholder */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredUniversities.length} of {sampleUniversities.length} universities
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
