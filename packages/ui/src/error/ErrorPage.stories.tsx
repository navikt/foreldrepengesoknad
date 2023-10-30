import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { RawIntlProvider, createIntl } from 'react-intl';
import ErrorPage from './ErrorPage';

export default {
    title: 'ErrorPage',
    component: ErrorPage,
};

const Template: StoryFn<{
    søkPåNytt: () => void;
}> = ({ søkPåNytt }) => {
    return (
        <RawIntlProvider value={createIntl({ locale: 'nb', messages: {} })}>
            <ErrorPage
                appnavn="Engangsstønad"
                feilmelding="Kall mot url: ‘/hjelpemidler/barnebriller/api/vilkarsgrunnlag’ feilet,  At S.kallFeilet"
                søkPåNytt={søkPåNytt}
            />
        </RawIntlProvider>
    );
};

export const VisFeilmelding = Template.bind({});
VisFeilmelding.args = {
    søkPåNytt: action('button-click'),
};
