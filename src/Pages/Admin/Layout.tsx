import SideNavBar from "../../Components/Sidebar/Sidebar";

const AdminLayout = ({ children, active, isClosed }: any) => {
  return (
    <div>
      <SideNavBar children={children} active={active} isClosed={isClosed} />
    </div>
  );
};

export default AdminLayout;
