import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import FrilansStep from './FrilansStep';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import _context from 'storybook/storydata/soknad/soknad.json';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import { TilretteleggingPeriode } from 'app/types/Tilrettelegging';

const defaultExport = {
    title: 'steps/FrilansStep',
    component: FrilansStep,
    decorators: [withIntlProvider, withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

interface FrilansStepStoryProps {
    context: SvangerskapspengerContextState;
}

const context = _context as any;

const Template: StoryFn<FrilansStepStoryProps> = ({ context }) => {
    return (
        <SvangerskapspengerStateMock context={context}>
            <FrilansStep />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    context,
};
