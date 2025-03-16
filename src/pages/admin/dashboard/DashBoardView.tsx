import { Box } from "@mui/material";
import Payment from "./Payment";
import User from "./User";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Overview from "./Overview";

const DashBoardView = ({ user, payment }: any) => {
  const [active, setActive] = useState({
    overview: true,
    payment: false,
    user: false,
  });
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("tab");
  useEffect(() => {
    if (activeTab && activeTab == "overview") {
      setActive({ payment: false, user: false, overview: true });
    }
    if (activeTab && activeTab == "user") {
      setActive({ payment: false, user: true, overview: false });
    }
    if (activeTab && activeTab == "payment") {
      setActive({ payment: true, user: false, overview: false });
    }
  }, [activeTab]);
  return (
    <Box>
      {active.user && (
        <Box style={{ height: 400, width: "100%" }}>
          <User user={user} />
        </Box>
      )}
      {active.payment && (
        <Box style={{ height: 400, width: "100%" }}>
          <Payment payment={payment} />
        </Box>
      )}
      {active.overview && (
        <Box sx={{ height: 400, width: "100%", mb: "20px" }}>
          <Overview user={user} payment={payment} />
        </Box>
      )}
    </Box>
  );
};

export default DashBoardView;
