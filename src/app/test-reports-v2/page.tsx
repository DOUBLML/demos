"use client";

import React from "react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts";

// -----------------------------------------------------------------------------
// Mock data — replace with API calls when wiring to your backend
// -----------------------------------------------------------------------------
const orders = [
  { date: "2025-06-01", sku: "BRA001", orders: 42, returns: 0, sales: 4200 },
  { date: "2025-06-08", sku: "BRA002", orders: 65, returns: 0, sales: 6500 },
  { date: "2025-06-15", sku: "BRA003", orders: 57, returns: 1, sales: 5700 },
  { date: "2025-06-22", sku: "BRA001", orders: 71, returns: 0, sales: 7100 },
  { date: "2025-06-29", sku: "BRA004", orders: 88, returns: 0, sales: 8800 },
  { date: "2025-07-06", sku: "BRA002", orders: 93, returns: 0, sales: 9300 },
  { date: "2025-07-13", sku: "BRA005", orders: 104, returns: 0, sales: 10400 },
];

// New vs existing by week
const customersCohorts = [
  { week: "Jun 1", new: 28, existing: 14 },
  { week: "Jun 8", new: 36, existing: 29 },
  { week: "Jun 15", new: 30, existing: 27 },
  { week: "Jun 22", new: 40, existing: 31 },
  { week: "Jun 29", new: 45, existing: 43 },
  { week: "Jul 6", new: 48, existing: 45 },
  { week: "Jul 13", new: 52, existing: 52 },
];

// Body measurements (extended bust/underbust range)
const bodyMeasurements = Array.from({ length: 200 }).map((_, i) => {
  const under = 60 + Math.random() * 40; // cm, 60—100 range
  const bust = under + 4 + Math.random() * 25; // cm, extended bust values
  return {
    id: i + 1,
    underbust: Number(under.toFixed(1)),
    bust: Number(bust.toFixed(1)),
  };
});

// Baseline return rate assumption for partner brand
const BASELINE_RETURN_RATE = 0.3; // 30% typical apparel e-comm

// -----------------------------------------------------------------------------
// Utility hooks
// -----------------------------------------------------------------------------
function useReturnsAvoided() {
  return useMemo(() => {
    const totalOrders = orders.reduce((a, b) => a + b.orders, 0);
    const baselineReturns = totalOrders * BASELINE_RETURN_RATE;
    const actualReturns = orders.reduce((a, b) => a + b.returns, 0);
    const avoided = Math.max(baselineReturns - actualReturns, 0);
    const avoidedPct =
      baselineReturns === 0 ? 0 : (avoided / baselineReturns) * 100;
    return { totalOrders, baselineReturns, actualReturns, avoided, avoidedPct };
  }, []);
}

// Simple CSV export
function downloadCSV(rows: any[], filename: string) {
  const headers = Object.keys(rows[0] || {});
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => r[h]).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Color palette
const COLORS = ["#0f766e", "#334155", "#7c3aed", "#f59e0b"];

export default function ReportsV2() {
  const [tab, setTab] = useState("skus");
  const returnsMeta = useReturnsAvoided();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Reports Version 2
              </h1>
              <div className="flex space-x-2">
                <a
                  href="/reports-v1"
                  className="text-sm px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                >
                  V1
                </a>
                <a
                  href="/reports-v2"
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded"
                >
                  V2
                </a>
                <a
                  href="/partner-portal"
                  className="text-sm px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                >
                  Current Portal
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            DOUBL B2B Portal
          </h1>
          <div className="text-sm text-muted-foreground">
            Industry 4.0 · Size-Free · On-Demand
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-4">
            <TabsTrigger value="skus">SKUs</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Placeholder content for existing tabs */}
          <TabsContent value="skus">
            <Card>
              <CardHeader>
                <CardTitle>SKUs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your SKU management view lives here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your customer list and CRM integrations live here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your order management and production statuses live here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports tab tailored for Made-to-Measure */}
          <TabsContent value="reports" className="space-y-6">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Returns Avoided</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-semibold">
                    {returnsMeta.avoided.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    vs. baseline {Math.round(BASELINE_RETURN_RATE * 100)}%
                    (actual {returnsMeta.actualReturns})
                  </div>
                  <div className="text-sm">
                    {returnsMeta.avoidedPct.toFixed(1)}% fewer returns
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => downloadCSV(orders, "returns_report.csv")}
                  >
                    <Download className="h-4 w-4 mr-1" /> Export
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    New vs Existing Customers
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={customersCohorts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="new"
                        stackId="a"
                        fill={COLORS[0]}
                        name="New"
                      />
                      <Bar
                        dataKey="existing"
                        stackId="a"
                        fill={COLORS[1]}
                        name="Existing"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Sales by SKU</CardTitle>
                </CardHeader>
                <CardContent className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={orders}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sku" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill={COLORS[2]} name="Sales ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Body Measurement Plot */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Customer Body Measurements (Bust vs Underbust)
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="underbust"
                      name="Underbust (cm)"
                    />
                    <YAxis type="number" dataKey="bust" name="Bust (cm)" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={bodyMeasurements} name="Customers" />
                  </ScatterChart>
                </ResponsiveContainer>
                <p className="mt-3 text-sm text-muted-foreground">
                  This wider distribution highlights fit opportunities across
                  bust/underbust ranges beyond current retail sizing. Export to
                  share with factories and QA.
                </p>
                <div className="mt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      downloadCSV(bodyMeasurements, "body_measurements.csv")
                    }
                  >
                    <Download className="h-4 w-4 mr-1" /> Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Returns Avoided Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Returns Avoided — Assumptions & Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm leading-relaxed">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Baseline return rate is configurable per partner (default{" "}
                    {Math.round(BASELINE_RETURN_RATE * 100)}%).
                  </li>
                  <li>
                    Returns avoided = (Orders × Baseline) − Actual returns.
                  </li>
                  <li>
                    For made-to-measure, we expect near-zero returns; use this
                    metric to quantify the margin impact versus size-based
                    workflows.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
