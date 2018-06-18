import React from 'react';
import VisibleBoard from '../containers/visibleBoard';
import Footer from './Footer.jsx';
import FleetStats from '../containers/fleetStats';
import GamePhaseContainer from '../containers/GamePhaseContainer';
import VisiblePlayerName from '../containers/VisiblePlayerName';
import VisibleEnemyName from '../containers/VisibleEnemyName';

const BattleshipGame = () => (
    <div className="container">
      <FleetStats fleet="playerFleet"/>
      <GamePhaseContainer /> 
      <FleetStats fleet="enemyFleet"/>
      <VisiblePlayerName nameId="playerName" />
      <VisibleEnemyName nameId="enemyName" />
      <VisibleBoard className="playerBoard" boardType="playerBoard"/>
      <VisibleBoard className="enemyBoard" boardType="enemyBoard"/>
      <Footer className="footer" />   
    </div>
  )

export default BattleshipGame;