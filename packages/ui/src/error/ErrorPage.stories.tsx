import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ErrorPage from './ErrorPage';

export default {
    title: 'ErrorPage',
    component: ErrorPage,
};

const Template: StoryFn<{
    søkPåNytt: () => void;
}> = ({ søkPåNytt }) => {
    return (
        <ErrorPage
            appName="Engangsstønad"
            errorMessage="Kall mot url: ‘/hjelpemidler/barnebriller/api/vilkarsgrunnlag’ feilet,  At S.kallFeilet"
            tryAgainCallback={søkPåNytt}
        />
    );
};

export const VisFeilmelding = Template.bind({});
VisFeilmelding.args = {
    søkPåNytt: action('button-click'),
};
