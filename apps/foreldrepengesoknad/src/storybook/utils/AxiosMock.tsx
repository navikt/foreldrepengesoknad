import MockAdapter from 'axios-mock-adapter';
import { FunctionComponent, useEffect } from 'react';

import { getAxiosInstance } from '@navikt/fp-api';

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
