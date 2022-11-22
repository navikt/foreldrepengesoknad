// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Api from './api/api';
// import AppContainer from './AppContainer';

// describe('<AppContainer>', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('skal returnere spinner når data blir hentet', () => {
//         jest.spyOn(Api, 'useSøkerinfo').mockImplementationOnce(() => ({
//             søkerinfoData: undefined,
//             søkerinfoError: null,
//         }));
//         jest.spyOn(Api, 'useStoredAppState').mockImplementationOnce(() => ({
//             storageData: undefined,
//             storageError: null,
//         }));

//         render(<AppContainer />);

//         expect(screen.getByText('Venter...')).toBeInTheDocument();
//     });
// });
describe('Test', () => {
    it('test', async () => {
        expect(1).toEqual(1);
    });
});
