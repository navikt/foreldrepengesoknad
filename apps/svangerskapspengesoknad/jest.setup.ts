import '@testing-library/jest-dom';
import { enableFetchMocks } from 'jest-fetch-mock';

(window as any).appSettings = {
    REST_API_URL: '',
    LOGIN_URL: '',
    LOG_VALIDATION: 'off',
};

enableFetchMocks();
