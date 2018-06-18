import React from 'react';

const PlayerName = (props) => (
  <div id={props.nameId} className={props.glowingState}>{props.name}</div>
  )

export default PlayerName