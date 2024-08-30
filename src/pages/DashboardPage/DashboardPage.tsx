import React from "react";
import DashboardService from "../../services/DashboardService";
import DashboardTableComponent from "../../components/DashboardTableComponent/DashboardTableComponent";

function DashboardPage() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <DashboardTableComponent dashboardService={new DashboardService()} />
    </div>
  );
}

export default DashboardPage;