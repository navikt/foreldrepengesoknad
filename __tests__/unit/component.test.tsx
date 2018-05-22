import React from 'react';
import Spørsmål from './../../src/app/components/spørsmål/Spørsmål';
import { shallow } from 'enzyme';

jest.mock('classnames', () => {});

describe('Spørsmål component', () => {
    it('should be defined', () => {
        expect(Spørsmål).toBeDefined();
    });

    it('renders something', () => {
        const wrapper = shallow(
            <Spørsmål synlig={true} render={() => <p>Testspørsmål</p>} />
        );
        expect(wrapper.find('div').contains('Testspørsmål')).toEqual(true);
    });
});
