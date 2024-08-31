import React from "react";
import "./SideBar.css";
import links from "../../data.json";
import HomeIcon from "../../assets/icons/HomeIcon";
import FeedIcon from "../../assets/icons/FeedIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import QuestionIcon from "../../assets/icons/QuestionIcon";
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
                  <HomeIcon fillColor={"white"} size="20" />
                </div>
                <span className="left-menu-item-label">{links[0].label}</span>
              </Link>

              <Link className="left-menu-item-a" to={links[1].link}>
                <div className="left-menu-item-icon">
                  <FeedIcon fillColor={"white"} size="20" />
                </div>
                <span className="left-menu-item-label">{links[1].label}</span>
              </Link>

              <Link className="left-menu-item-a" to={links[2].link}>
                <div className="left-menu-item-icon">
                  <ProfileIcon fillColor={"white"} size="20" />
                </div>
                <span className="left-menu-item-label">{links[2].label}</span>
              </Link>

              <Link className="left-menu-item-a" to={links[3].link}>
                <div className="left-menu-item-icon">
                  <SettingsIcon fillColor={"white"} size="20" />
                </div>
                <span className="left-menu-item-label">{links[3].label}</span>
              </Link>

              <Link className="left-menu-item-a" to={links[4].link}>
                <div className="left-menu-item-icon">
                  <QuestionIcon fillColor={"white"} size="20" />
                </div>
                <span className="left-menu-item-label">{links[4].label}</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
