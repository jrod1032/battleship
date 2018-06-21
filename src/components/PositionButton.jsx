import React from 'react';
import PropTypes from 'prop-types';

const PositionButton = (props) => {
  const selectionClass = props.selectedPosition && props.selectedPosition === props.name ? 'selected' : 'unselected';

  return (
  <button type="button" name={props.name} className={selectionClass} onClick={e => {
    props.onButtonClick(e.target.name)
  }}>{props.name}</button>
  ) 
}


PositionButton.propTypes = {
  name: PropTypes.string.isRequired,
  selectedPosition: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired
}
export default PositionButton;