import { connect } from 'react-redux';
import ShipButton from '../components/ShipButton.jsx';
import { selectShip } from '../actions/index.js'

const mapStateToProps = state => {
  return {
    selectedPiece: state.gameLogic.selectedPiece,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onButtonClick: buttonName => dispatch(selectShip(buttonName))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ShipButton);