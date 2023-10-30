import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import FrilansStep from './FrilansStep';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import _context from 'storybook/storydata/soknad/soknad.json';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';

const defaultExport = {
    title: 'steps/FrilansStep',
    component: FrilansStep,
    decorators: [withIntlProvider, withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

interface FrilansStepStoryProps {
    contextWithFrilans: SvangerskapspengerContextState;
}

const context = _context as any;
const contextWithFrilans = {
    ...context,
    søknad: {
        ...context.søknad,
        søker: {
            ...context.søknad.søker,
            harJobbetSomFrilans: true,
        },
    },
} as SvangerskapspengerContextState;

const Template: StoryFn<FrilansStepStoryProps> = ({ contextWithFrilans }) => {
    return (
        <SvangerskapspengerStateMock context={contextWithFrilans}>
            <FrilansStep />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    contextWithFrilans,
};
