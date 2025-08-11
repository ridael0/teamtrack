import AppSidebar from "@/components/appSidebar";
import EmployeeTable from "@/components/employeeTable";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { AuthState } from "@/state/authSlice/authSlice";
import { type RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const {status} = useSelector((state: RootState): AuthState => state.auth);

  if(status !== 'login') return <Navigate to={'/'} />;
  return <SidebarProvider>
    <AppSidebar/>
    <EmployeeTable>
      <SidebarTrigger/>
    </EmployeeTable>
  </SidebarProvider>;
};

export default Dashboard;