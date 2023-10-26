import { StoryFn } from '@storybook/react';
import { RawIntlProvider, createIntl } from 'react-intl';
import ErrorPage from './ErrorPage';

export default {
    title: 'ErrorPage',
    component: ErrorPage,
};

const Template: StoryFn = () => {
    return (
        <RawIntlProvider value={createIntl({ locale: 'nb', messages: {} })}>
            <ErrorPage
                appnavn="Engangsstønad"
                feilmelding="Kall mot url: ‘/hjelpemidler/barnebriller/api/vilkarsgrunnlag’ feilet,  At S.kallFeilet"
            />
        </RawIntlProvider>
    );
};

export const VisFeilmelding = Template.bind({});
