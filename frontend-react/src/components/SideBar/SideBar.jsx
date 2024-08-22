import "./SideBar.css";
import { links } from "../../data.js";
import homeIcon from "../../assets/icons/home.svg";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <div className="side-bar">
        <nav id="left-menu">
          <div className="left-menu-items">
            <div className="left-menu-item">
              <Link className="left-menu-item-a" to={links[0].link}>
                <div className="left-menu-item-icon">
                  <embed
                    src={homeIcon}
                    width="24"
                    height="24"
                    type="image/svg+xml"
                    alt="Home Icon"
                  />
                </div>
                <span className="left-menu-item-label">{links[0].label}</span>
              </Link>

              <Link className="left-menu-item-a" to={links[1].link}>
                <div className="left-menu-item-icon">
                  <embed
                    src={homeIcon}
                    width="24"
                    height="24"
                    type="image/svg+xml"
                    alt="Home Icon"
                  />
                </div>
                <span className="left-menu-item-label">{links[1].label}</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
