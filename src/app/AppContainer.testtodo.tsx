import React from 'react';
//import axios from 'axios';
import { render, screen } from '@testing-library/react';
import AppContainer from './AppContainer';

//jest.mock('axios');

describe('<AppContainer>', () => {
    it('skal returnere fødselsdato når barn er født', () => {
        //axios.get = jest.fn().mockImplementationOnce(() => Promise.resolve({ data: { hits: {} } }));
        //axios.create = jest.fn().mockImplementationOnce(() => axios);

        render(<AppContainer />);

        screen.debug();
    });
});
