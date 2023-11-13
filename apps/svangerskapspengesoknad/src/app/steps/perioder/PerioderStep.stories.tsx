import { StoryFn } from '@storybook/react';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import _context from 'storybook/storydata/soknad/soknad.json';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import PerioderStep from './PerioderStep';

import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import Tilrettelegging, { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import { DelivisTilretteleggingPeriodeType } from '../tilrettelegging/tilretteleggingStepFormConfig';

const defaultExport = {
    title: 'steps/PerioderStep',
    component: PerioderStep,
    decorators: [withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

interface PerioderStepStoryProps {
    context: SvangerskapspengerContextState;
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
                    stillinger: [{ fom: '2019-01-01', stillingsprosent: 100 }],
                },
                type: TilretteleggingstypeOptions.DELVIS,
                delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
            } as Tilrettelegging,
        ],
    },
} as SvangerskapspengerContextState;

const Template: StoryFn<PerioderStepStoryProps> = ({ context }) => {
    return (
        <SvangerskapspengerStateMock context={context}>
            <PerioderStep id={'263929546-6215-9868-5127-161910165730101'} navn={'Omsorgspartner Vestfold AS'} />
        </SvangerskapspengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context: contextWithArbeidsforhold,
};

export const FlereStillinger = Template.bind({});
FlereStillinger.args = {
    context: {
        ...contextWithArbeidsforhold,
        søknad: {
            ...contextWithArbeidsforhold.søknad,
            tilrettelegging: [
                {
                    id: '263929546-6215-9868-5127-161910165730101',
                    behovForTilretteleggingFom: '2023-09-01',
                    arbeidsforhold: {
                        navn: 'Omsorgspartner Vestfold AS',
                        type: Arbeidsforholdstype.VIRKSOMHET,
                        startdato: '2023-09-01',
                        stillinger: [
                            { fom: '2023-09-01', stillingsprosent: 10 },
                            { fom: '2023-10-01', stillingsprosent: 20 },
                            { fom: '2023-11-01', stillingsprosent: 0 },
                        ],
                    },
                    type: TilretteleggingstypeOptions.DELVIS,
                    delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
                } as Tilrettelegging,
            ],
        },
    },
};
