import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Api from './api/api';
import AppContainer from './AppContainer';

describe('<AppContainer>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('skal returnere spinner når data blir hentet', () => {
        jest.spyOn(Api, 'useSøkerinfo').mockImplementationOnce(() => ({
            søkerinfoData: undefined,
            søkerinfoError: null,
        }));
        jest.spyOn(Api, 'useStoredAppState').mockImplementationOnce(() => ({
            storageData: undefined,
            storageError: null,
        }));

        act(() => {
            render(<AppContainer />);
        });

        expect(screen.queryByText('Venter...')).toBeInTheDocument();
    });
});
