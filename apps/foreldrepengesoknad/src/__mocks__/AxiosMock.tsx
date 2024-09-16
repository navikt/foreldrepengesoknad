import { AxiosInstanceAPI } from 'api/AxiosInstance';
import MockAdapter from 'axios-mock-adapter';
import { FunctionComponent, useEffect } from 'react';

// Denne utgår når me endrar til Tanstack

interface Props {
    children: any;
    mock: (adapter: MockAdapter) => void;
}

const apiMock = new MockAdapter(AxiosInstanceAPI());

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
