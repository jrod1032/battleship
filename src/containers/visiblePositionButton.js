import { connect } from 'react-redux';
import PositionButton from '../components/PositionButton.jsx';
import { selectPosition } from '../actions/index';

const mapStateToProps = state => {
  return {
    selectedPosition: state.gameLogic.selectedPosition
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onButtonClick: buttonPosition => dispatch(selectPosition(buttonPosition))
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
  )(PositionButton)