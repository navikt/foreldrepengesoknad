import MockAdapter from 'axios-mock-adapter';
import { FunctionComponent, useEffect } from 'react';

import getAxiosInstance from '../apiInterceptor';

// Legg denne her, sjølv om det er ein test-hjelpar. Denne pakka forvinn snart uansett

interface Props {
    children: any;
    mock: (adapter: MockAdapter) => void;
}

const apiMock = new MockAdapter(getAxiosInstance());

const AxiosMock: FunctionComponent<Props> = ({ children, mock }) => {
    useEffect(() => {
        mock(apiMock);
        return () => {
            apiMock.reset();
        };
    });
    return children;
};

export default AxiosMock;
