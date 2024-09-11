import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { FunctionComponent, useEffect } from 'react';

// Legg denne her, sjølv om det er ein test-hjelpar. Denne pakka forvinn snart uansett

interface Props {
    children: any;
    mock: (adapter: MockAdapter) => void;
}

const axiosInstance = axios.create({ withCredentials: true });
const apiMock = new MockAdapter(axiosInstance);

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
