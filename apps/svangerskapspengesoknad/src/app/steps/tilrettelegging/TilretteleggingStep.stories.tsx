import { StoryFn } from '@storybook/react';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import TilretteleggingStep from './TilretteleggingStep';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import _context from 'storybook/storydata/soknad/soknad.json';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';

const defaultExport = {
    title: 'steps/TilretteleggingStep',
    component: TilretteleggingStep,
    decorators: [withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

interface TilretteleggingStepStoryProps {
    søkerinfo: SøkerinfoDTO;
    context: SvangerskapspengerContextState;
}

const context = _context as any;

const Template: StoryFn<TilretteleggingStepStoryProps> = () => {
    return (
        <SvangerskapspengerStateMock context={context}>
            <TilretteleggingStep
                id={'263929546-6215-9868-5127-161910165730101'}
                typeArbeid={Arbeidsforholdstype.VIRKSOMHET}
                navn={'Omsorgspartner Vestfold AS'}
            />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    context,
};
