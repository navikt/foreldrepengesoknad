import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import SøknadRoutes from 'appData/routes';
import MockAdapter from 'axios-mock-adapter';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';

import { AnnenForelder, Barn, BarnType } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { ArbeidsforholdOgInntektFp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt/src/types/ArbeidsforholdOgInntekt';
import { Situasjon, Søkerinfo } from '@navikt/fp-types';

import { AxiosInstanceAPI } from 'app/api/AxiosInstance';
import { Action, ContextDataType, FpDataContext } from 'app/appData/FpDataContext';
import SøknadRoutes from 'app/appData/routes';
import { AndreInntektskilder, AnnenInntektType } from 'app/types/AndreInntektskilder';

import ManglendeVedlegg from './ManglendeVedlegg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultSøkerinfo = {
    søker: {
        fnr: '19047815714',
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        kjønn: 'K',
        fødselsdato: '1978-04-19',
        barn: [
            {
                fnr: '21091981146',
                fødselsdato: '2021-03-15',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'KLØKTIG',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
            {
                fnr: '31091981146',
                fødselsdato: '2022-08-02',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'SNILT',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
            {
                fnr: '31091981147',
                fødselsdato: '2022-08-02',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'LYST',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
        ],
    },
    arbeidsforhold: [],
} as Søkerinfo;

const defaultAnnenForelder = {
    fornavn: 'Eline',
    etternavn: 'Hagen',
    kanIkkeOppgis: false,
} as AnnenForelder;

const defaultBarn = {
    antallBarn: 1,
    type: BarnType.FØDT,
    fødselsdatoer: ['2024-01-01'],
} as Barn;

const defaultArbeidsforholdOgInntekt = {
    harHattAndreInntektskilder: false,
    harJobbetSomFrilans: false,
    harJobbetSomSelvstendigNæringsdrivende: false,
};

type StoryArgs = {
    situasjon?: Situasjon;
    annenForelder?: AnnenForelder;
    barn?: Barn;
    arbeidsforholdOgInntekt?: ArbeidsforholdOgInntektFp;
    annenInntekt?: AndreInntektskilder[];
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof ManglendeVedlegg>;

const meta = {
    title: 'steps/ManglendeVedlegg',
    component: ManglendeVedlegg,
    render: ({
        situasjon = 'fødsel',
        annenForelder = defaultAnnenForelder,
        barn = defaultBarn,
        arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
        annenInntekt,
        gåTilNesteSide = action('button-click'),
        ...rest
    }) => {
        initAmplitude();

        const apiMock = new MockAdapter(AxiosInstanceAPI());
        apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
        apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

        return (
            <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.UTTAKSPLAN]: [],
                        [ContextDataType.ANNEN_FORELDER]: annenForelder,
                        [ContextDataType.OM_BARNET]: barn,
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
                        [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
                        [ContextDataType.SØKERSITUASJON]: {
                            rolle: 'mor',
                            situasjon: situasjon,
                        },
                    }}
                >
                    <ManglendeVedlegg {...rest} />
                </FpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Termindatodokumentasjon: Story = {
    args: {
        søkerInfo: defaultSøkerinfo,
        barn: {
            antallBarn: 1,
            type: BarnType.UFØDT,
            termindato: '2024-01-01',
        },
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const Omsorgsovertakelsedokumentasjon: Story = {
    args: {
        ...Termindatodokumentasjon.args,
        situasjon: 'adopsjon',
        barn: {
            antallBarn: 1,
            type: BarnType.ADOPTERT_ANNET_BARN,
            adopsjonsdato: '2023-01-01',
            adoptertIUtlandet: false,
            fødselsdatoer: ['2022-01-01'],
        },
    },
};

export const Aleneomsorgdokumentasjon: Story = {
    args: {
        søkerInfo: defaultSøkerinfo,
        annenForelder: {
            ...defaultAnnenForelder,
            datoForAleneomsorg: '2024-01-01',
        },
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const HarAndreInntektskilderMilitærtjeneste: Story = {
    args: {
        søkerInfo: defaultSøkerinfo,
        arbeidsforholdOgInntekt: {
            harHattAndreInntektskilder: true,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
        annenInntekt: [
            {
                fom: '2024-01-01',
                tom: '2024-04-01',
                pågående: false,
                type: AnnenInntektType.MILITÆRTJENESTE,
            },
            {
                fom: '2024-05-01',
                pågående: true,
                type: AnnenInntektType.MILITÆRTJENESTE,
            },
        ],
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const HarAndreInntektskilderEtterlønn: Story = {
    args: {
        søkerInfo: defaultSøkerinfo,
        arbeidsforholdOgInntekt: {
            harHattAndreInntektskilder: true,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
        annenInntekt: [
            {
                fom: '2024-01-01',
                tom: '2024-04-01',
                type: AnnenInntektType.SLUTTPAKKE,
            },
            {
                fom: '2024-05-01',
                tom: '2024-07-01',
                type: AnnenInntektType.SLUTTPAKKE,
            },
        ],
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};
