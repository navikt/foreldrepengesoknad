import React from 'react';
import { render, screen } from '@testing-library/react';
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
        jest.spyOn(Api, 'useGetSaker').mockImplementationOnce(() => ({
            sakerData: undefined,
            sakerError: null,
        }));
        jest.spyOn(Api, 'useStoredAppState').mockImplementationOnce(() => ({
            storageData: undefined,
            storageError: null,
        }));

        render(
            <div id="app">
                <AppContainer />
            </div>
        );

        expect(screen.getByText('venter...')).toBeInTheDocument();
    });
});
