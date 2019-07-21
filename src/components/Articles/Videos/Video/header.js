import React from "react";
import TeamInfo from "../../Elements/teamInfo";

const Header = (props) => {
  const renderTeamInfo = team => {
    return team ? <TeamInfo team={team} /> : null;
  };
  return <div>{renderTeamInfo(props.teamData)}</div>;
};

export default Header;
