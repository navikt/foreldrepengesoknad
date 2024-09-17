import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DelivisTilretteleggingPeriodeType } from 'types/DelivisTilretteleggingPeriodeType';
import Tilrettelegging, { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'types/Tilrettelegging';

import { initAmplitude } from '../../../../../packages/metrics';
import { FerieStep } from './FerieStep';

const arbeidsforhold = [
    {
        id: '1669400414-9409-3313-0700-3334116100409',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
];

const meta = {
    title: 'steps/FerieStep',
    component: FerieStep,
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.FERIE]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
                        [ContextDataType.TILRETTELEGGINGER]: [
                            {
                                id: '263929546-6215-9868-5127-161910165730101',
                                arbeidsforhold: {
                                    navn: 'Omsorgspartner Vestfold AS',
                                    stillinger: [{ fom: '2019-01-01', stillingsprosent: 100 }],
                                    type: Arbeidsforholdstype.VIRKSOMHET,
                                },
                                type: TilretteleggingstypeOptions.DELVIS,
                                delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
                            } as Tilrettelegging,
                        ],
                    }}
                >
                    <FerieStep {...rest} />
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof FerieStep>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        arbeidsforhold,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: promiseAction(),
    },
};
