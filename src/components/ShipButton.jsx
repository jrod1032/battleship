import React from 'react';
import PropTypes from 'prop-types';

const ShipButton = (props) => {
  const selectionClass = props.selectedPiece && props.selectedPiece === props.name ? 'selected' : 'unselected';

  return ( 
  <button type="button" name={props.name} className={selectionClass} onClick={e => {
    props.onButtonClick(e.target.name)
  }}>{props.displayName}</button>
  ) 
}

ShipButton.PropTypes = {
  selectedPiece: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired
}

export default ShipButton;