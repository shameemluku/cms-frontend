import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import shineBg from "../../assets/bgShine.png";
import compLogo from "../../assets/compLogo.png";
import "./SideNavBar.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom/user";
import useAuth from "../../hook/useAuth";
import { errorFormatter } from "../../Utils/formatter";
import { toast } from "react-toastify";

const SideNavBar = ({ children, active, isClosed }: any) => {
  const [user] = useRecoilState(userState);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  //   const { logoutUser } = useAuth();

  const { logoutUser } = useAuth();
  const handleLogoutClick = async () => {
    try {
      // setLoading("LOGOUT");
      await logoutUser();
    } catch (error) {
      toast.error(errorFormatter(error));
    }
    // setLoading(null);
  };

  useEffect(() => {
    if (isClosed) {
      setOpen(false);
    }
  }, [isClosed]);

  return (
    <>
      <div
        className={`sidebar-home ${open && "open"}`}
        style={{ backgroundImage: `url(${shineBg})` }}
      >
        <div className="logo-details">
          <i className="icon me-3 flex items-center">
            <img
              src={compLogo}
              alt="logo"
              style={{
                width: open ? "110px" : 0,
                transition: "width 0.3s ease",
              }}
            />
          </i>

          <i
            id="btn"
            onClick={() => {
              setOpen(!open);
            }}
            style={{ cursor: "pointer", marginTop: "7px" }}
          >
            <Hamburger toggled={open} toggle={setOpen} size={20} />
          </i>
        </div>
        <ul className="nav-list">
          <li>
            <a
              onClick={() => {
                navigate("/admin");
              }}
              className={`${active === "customization" && "sidebar-active"}`}
            >
              <i className="">
                <BuildOutlinedIcon sx={{ fontSize: "20px" }} />
              </i>
              <span className="links_name">Customization</span>
            </a>
            <span className="tooltip">Customization</span>
          </li>

          <li>
            <a
              onClick={() => {
                navigate("/admin/users");
              }}
              className={`${active === "users" && "sidebar-active"}`}
            >
              <i className="">
                <PeopleAltOutlinedIcon sx={{ fontSize: "20px" }} />
              </i>
              <span className="links_name">Users</span>
            </a>
            <span className="tooltip">Users</span>
          </li>

          <li className="profile">
            <div className="profile-details">
              {/* <!--<img src="profile.jpg" alt="profileImg">--> */}
              <div className="name_job">
                <div className="name">{user?.email?.split("@")?.[0]}</div>
                <div className="job" style={{ color: "#444167" }}>
                  {user?.email}
                </div>
              </div>
            </div>
            <i
              className="bx bx-log-out cursor-pointer"
              id="log_out"
                onClick={() => handleLogoutClick()}
            >
              <LogoutOutlinedIcon sx={{ fontSize: "20px" }} />
            </i>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div>{children}</div>
      </section>
    </>
  );
};

export default SideNavBar;
