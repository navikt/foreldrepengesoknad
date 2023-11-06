import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import _context from 'storybook/storydata/soknad/soknad.json';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import PerioderStep from './PerioderStep';

import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import { Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { DelivisTilretteleggingPeriodeType } from '../tilrettelegging/tilretteleggingStepFormConfig';

const defaultExport = {
    title: 'steps/PerioderStep',
    component: PerioderStep,
    decorators: [withIntlProvider, withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

interface PerioderStepStoryProps {
    contextWithArbeidsforhold: SvangerskapspengerContextState;
}

const context = _context as any;

const contextWithArbeidsforhold = {
    ...context,
    søknad: {
        ...context.søknad,
        tilrettelegging: [
            {
                id: '263929546-6215-9868-5127-161910165730101',
                arbeidsforhold: {
                    navn: 'Omsorgspartner Vestfold AS',
                },
                type: Tilretteleggingstype.DELVIS,
                delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
            },
        ],
    },
} as SvangerskapspengerContextState;

const Template: StoryFn<PerioderStepStoryProps> = ({ contextWithArbeidsforhold }) => {
    return (
        <SvangerskapspengerStateMock context={contextWithArbeidsforhold}>
            <PerioderStep id={'263929546-6215-9868-5127-161910165730101'} navn={'Omsorgspartner Vestfold AS'} />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    contextWithArbeidsforhold,
};
