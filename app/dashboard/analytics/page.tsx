"use client";

import React, { useState } from "react";
import { Loader } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useYearComparison } from "@/lib/hooks/useYearComparison";
import { UsersComparisonChart } from "@/components/charts-and-graphs/UsersComparisonChart";
import { PostsComparisonChart } from "@/components/charts-and-graphs/PostsComparisonChart";
import { RevenueComparisonChart } from "@/components/charts-and-graphs/RevenueComparisonChart";

const AnalyticsPage = () => {
  const currentYear = new Date().getFullYear();
  const [year1, setYear1] = useState<number>(currentYear - 1);
  const [year2, setYear2] = useState<number>(currentYear);
  const [selectedYear1, setSelectedYear1] = useState<number>(currentYear - 1);
  const [selectedYear2, setSelectedYear2] = useState<number>(currentYear);
  const [validationError, setValidationError] = useState<string>("");

  const { data: comparisonData, isLoading, error } = useYearComparison(selectedYear1, selectedYear2);

  // Generate year options (last 10 years)
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const colorYear1 = "#3b82f6"; // blue-500
  const colorYear2 = "#fb923c"; // orange-400

  // Transform data for charts
  const transformComparisonData = () => {
    if (!comparisonData?.year1?.monthly || !comparisonData?.year2?.monthly) {
      return [];
    }

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month) => ({
      month,
      year1:
        comparisonData.year1.monthly[month.toLowerCase() as keyof typeof comparisonData.year1.monthly]
          ?.users || 0,
      year2:
        comparisonData.year2.monthly[month.toLowerCase() as keyof typeof comparisonData.year2.monthly]
          ?.users || 0,
    }));
  };

  const transformPostsData = () => {
    if (!comparisonData?.year1?.monthly || !comparisonData?.year2?.monthly) {
      return [];
    }

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month) => ({
      month,
      year1:
        comparisonData.year1.monthly[month.toLowerCase() as keyof typeof comparisonData.year1.monthly]
          ?.posts || 0,
      year2:
        comparisonData.year2.monthly[month.toLowerCase() as keyof typeof comparisonData.year2.monthly]
          ?.posts || 0,
    }));
  };

  const transformRevenueData = () => {
    if (!comparisonData?.year1?.monthly || !comparisonData?.year2?.monthly) {
      return [];
    }

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month) => ({
      month,
      year1:
        comparisonData.year1.monthly[month.toLowerCase() as keyof typeof comparisonData.year1.monthly]
          ?.revenue || 0,
      year2:
        comparisonData.year2.monthly[month.toLowerCase() as keyof typeof comparisonData.year2.monthly]
          ?.revenue || 0,
    }));
  };

  const handleApply = () => {
    setValidationError("");

    if (year1 === year2) {
      setValidationError("Please select two different years for comparison.");
      return;
    }

    setSelectedYear1(year1);
    setSelectedYear2(year2);
  };

  

  const usersData = transformComparisonData();
  const postsData = transformPostsData();
  const revenueData = transformRevenueData();
  const isComparisonValid = selectedYear1 !== selectedYear2 && selectedYear1 > 0 && selectedYear2 > 0;

  return (
    <div className="space-y-6">
      {/* Year Selector */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-bold">Year Comparison Analysis</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Year 1 Selector */}
          <div>
            <label className="mb-2 block text-sm font-medium">Select First Year</label>
            <Select value={String(year1)} onValueChange={(v) => setYear1(parseInt(v))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year 2 Selector */}
          <div>
            <label className="mb-2 block text-sm font-medium">Select Second Year</label>
            <Select value={String(year2)} onValueChange={(v) => setYear2(parseInt(v))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Apply Button */}
          <div className="flex items-end gap-2">
            <Button onClick={handleApply} className="w-full">
              Apply Comparison
            </Button>
          </div>

          
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
            {validationError}
          </div>
        )}
      </div>

      {/* Charts Section */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-950 dark:text-red-200">
          <p>Failed to load comparison charts. Please try again.</p>
        </div>
      ) : usersData.length > 0 && isComparisonValid ? (
        <div className="grid grid-cols-1 gap-5">
          <div id="users-chart">
            <UsersComparisonChart
              data={usersData}
              year1={selectedYear1}
              year2={selectedYear2}
              color1={colorYear1}
              color2={colorYear2}
            />
          </div>
          <div id="posts-chart">
            <PostsComparisonChart
              data={postsData}
              year1={selectedYear1}
              year2={selectedYear2}
              color1={colorYear1}
              color2={colorYear2}
            />
          </div>
          <div id="revenue-chart">
            <RevenueComparisonChart
              data={revenueData}
              year1={selectedYear1}
              year2={selectedYear2}
              color1={colorYear1}
              color2={colorYear2}
            />
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-blue-50 p-4 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
          <p>Select two different years and click "Apply Comparison" to view the analytics.</p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
