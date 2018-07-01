import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayerName from '../../components/PlayerName';

Enzyme.configure({adapter: new Adapter()} );

function setup() {
  const props = {
    glowingState: 'glowing',
    name: 'Jarrod',
    nameId: 'playerName'
  }

  const enzymeWrapper = mount(<PlayerName {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('PlayerName Component', () => {
  it('should render self and correct text', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('div').hasClass('glowing')).toBe(true);
    expect(enzymeWrapper.find('div').text()).toEqual('Jarrod');

  })
})