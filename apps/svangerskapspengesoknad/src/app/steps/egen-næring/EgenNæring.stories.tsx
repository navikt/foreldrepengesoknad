import { StoryFn } from '@storybook/react';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import EgenNæringStep from './EgenNæringStep';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import _context from 'storybook/storydata/soknad/soknad.json';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';

const defaultExport = {
    title: 'steps/EgenNæringStep',
    component: EgenNæringStep,
    decorators: [withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

interface EgenNæringStepStoryProps {
    contextWithEgenNæring: SvangerskapspengerContextState;
}

const context = _context as any;
const contextWithEgenNæring = {
    ...context,
    søknad: {
        ...context.søknad,
        søker: {
            ...context.søknad.søker,
            harJobbetSomSelvstendigNæringsdrivende: true,
        },
    },
} as SvangerskapspengerContextState;

const Template: StoryFn<EgenNæringStepStoryProps> = ({ contextWithEgenNæring }) => {
    return (
        <SvangerskapspengerStateMock context={contextWithEgenNæring}>
            <EgenNæringStep />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    contextWithEgenNæring,
};
