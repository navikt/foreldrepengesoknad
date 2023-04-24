import { render, screen } from '@testing-library/react';
import Api from './api/api';
import AppContainer from './AppContainer';

describe('<AppContainer>', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('skal returnere spinner når data blir hentet', () => {
        vi.spyOn(Api, 'useSøkerinfo').mockImplementationOnce(() => ({
            søkerinfoData: undefined,
            søkerinfoError: null,
        }));
        vi.spyOn(Api, 'useGetSaker').mockImplementationOnce(() => ({
            sakerData: undefined,
            sakerError: null,
        }));
        vi.spyOn(Api, 'useStoredAppState').mockImplementationOnce(() => ({
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
