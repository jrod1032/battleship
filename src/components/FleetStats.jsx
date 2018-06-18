import React from 'react';
import PropTypes from 'prop-types';

const shipNameMap = {
  ACC: 'AirCraft Carrier',
  BS: 'Battleship',
  C: 'Cruiser', 
  D: 'Destroyer',
  S: 'Sub'
}

const FleetStats = (props) => {
  const fleet = props.fleet === 'playerFleet' ? props.playerFleet : props.enemyFleet
  return (
  <div id={props.fleet}>
    <div className="shipStatsHeader">Ships Remaining</div>
    <ul className="shipList">
      {fleet.map( (ship, index) => <li key={index} className="shipListItem">{shipNameMap[ship[0]]}</li>)}
    </ul>
  </div>
)}

FleetStats.PropTypes = {
  enemyFleet: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  playerFleet: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  fleet: PropTypes.string.isRequired
}
export default FleetStats;