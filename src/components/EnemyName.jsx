import React from 'react';

const EnemyName = (props) => (
  <div id={props.nameId} className={props.glowingState}>{props.name}</div>
  )

export default EnemyName;