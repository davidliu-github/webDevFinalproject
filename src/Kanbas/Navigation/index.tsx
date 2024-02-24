import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox, FaHistory, FaTv, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle style={{ color: "gray" }} className="fs-2" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2 wd-color-red" /> },
    { label: "Courses", icon: <FaBook className="fs-2 wd-color-red" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2 wd-color-red" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2 wd-color-red" /> },
    { label: "History", icon: <FaHistory className="fs-2 wd-color-red" /> },
    { label: "Studio", icon: <FaTv className="fs-2 wd-color-red" /> },
    { label: "Commons", icon: <FaArrowRight className="fs-2 wd-color-red" /> },
    { label: "Help", icon: <FaQuestionCircle className="fs-2 wd-color-red" /> },
  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;