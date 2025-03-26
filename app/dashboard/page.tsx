"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Wallet, TrendingUp, Users, Briefcase, Settings } from "lucide-react";

const userTypes = ["Investor", "Institution", "Company", "Regulator"];

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data = [
  { name: "Stock A", value: 40 },
  { name: "Stock B", value: 30 },
  { name: "Stock C", value: 20 },
  { name: "Stock D", value: 10 },
];

export default function DashboardPage() {
  const [userType, setUserType] = useState("Investor");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 flex flex-col space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Nairobi Block Exchange</h2>
        {userTypes.map((type) => (
          <Button
            key={type}
            variant={userType === type ? "default" : "outline"}
            onClick={() => setUserType(type)}
          >
            {type}
          </Button>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-4">
        <motion.h1 
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome, {userType}
        </motion.h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <Wallet size={24} />
              <div>
                <p className="text-gray-600">Wallet Balance</p>
                <h3 className="text-xl font-bold">$5,250</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <TrendingUp size={24} />
              <div>
                <p className="text-gray-600">Portfolio Growth</p>
                <h3 className="text-xl font-bold">+12%</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <Users size={24} />
              <div>
                <p className="text-gray-600">Investors</p>
                <h3 className="text-xl font-bold">1,240</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="flex justify-center mt-6">
          <PieChart width={300} height={300}>
            <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
