import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouterProvider from 'storybook/decorators/withRouter';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';
import _context from 'storybook/storydata/soknad/soknad.json';
import Tilrettelegging, { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import PerioderStep from './PerioderStep';
import { DelivisTilretteleggingPeriodeType } from '../tilrettelegging/tilretteleggingStepFormConfig';

const defaultExport = {
    title: 'steps/PerioderStep',
    component: PerioderStep,
    decorators: [withRouterProvider],
};

export default defaultExport;

const context = _context as any;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide?: (action: Action) => void;
    tilrettelegging: Tilrettelegging[];
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide,
    tilrettelegging,
}) => {
    return (
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.TILRETTELEGGING]: tilrettelegging,
                [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
                [ContextDataType.OM_BARNET]: {
                    erBarnetFødt: false,
                    termindato: '2024-02-18',
                    fødselsdato: '2024-02-18',
                },
            }}
        >
            <PerioderStep
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={context.søkerinfo}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
Default.args = {
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
};

export const FlereStillinger = Template.bind({});
FlereStillinger.args = {
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
};
