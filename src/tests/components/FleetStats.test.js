import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FleetStats from '../../components/FleetStats';

Enzyme.configure({adapter: new Adapter() });

function setup() {
  const props = {
    fleet: 'playerFleet',
    playerFleet: [
      ['ACC', 0, 5], 
      ['BS', 0, 4],
      ['C', 0, 3],
      ['D', 0, 3],
      ['S', 0, 2],
    ],
    enemyFleet: [
      ['ACC', 0, 5], 
      ['BS', 0, 4],
      ['C', 0, 3],
      ['D', 0, 3],
      ['S', 0, 2],
    ],    
  }

  const enzymeWrapper = mount(<FleetStats {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('FleetStats Component', () => {
  it('should render self and proper fleet props', () => {
    const { enzymeWrapper } = setup() ;
    expect(enzymeWrapper.find('.shipStatsHeader').hasClass('shipStatsHeader')).toBe(true)
    expect(enzymeWrapper.find('.shipStatsHeader').text()).toEqual('Ships Remaining')
    expect(enzymeWrapper.props().fleet).toEqual('playerFleet')
  })

  it('should render list of ship statistics', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ul').hasClass('shipList')).toBe(true);
    expect(enzymeWrapper.find('li')).toHaveLength(5);
  })
})
