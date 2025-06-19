import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { ArbeidIUtlandetType } from 'types/ArbeidIUtlandet';
import { DelivisTilretteleggingPeriodeType, TilOgMedDatoType, Tilretteleggingstype } from 'types/Tilrettelegging';

import { AttachmentType, ISO_DATE_FORMAT, Skjemanummer } from '@navikt/fp-constants';
import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import { FRILANS_ID, Søkerinfo } from '@navikt/fp-types';

import { OppsummeringSteg } from './OppsummeringSteg';

const ARBEIDSFORHOLD_ID = '990322244';
const ANNEN_ARBEIDSFORHOLD_ID = '975326209';
const TREDJE_ARBEIDSFORHOLD_ID = '995090910';

const DEFAULT_SØKERINFO = {
    arbeidsforhold: [
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2014-05-22T00:00:00.000Z',
            stillingsprosent: 32.63,
            tom: '2019-05-31T00:00:00.000Z',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2018-04-09T00:00:00.000Z',
            stillingsprosent: 0,
            tom: '2018-09-09T00:00:00.000Z',
        },
        {
            arbeidsgiverId: '975326209',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2018-06-25T00:00:00.000Z',
            stillingsprosent: 80,
            tom: '2018-08-05T00:00:00.000Z',
        },
        {
            arbeidsgiverId: ANNEN_ARBEIDSFORHOLD_ID,
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2019-06-01T00:00:00.000Z',
            stillingsprosent: 85.09,
        },
        {
            arbeidsgiverId: ARBEIDSFORHOLD_ID,
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
            fom: '2017-04-05T00:00:00.000Z',
            stillingsprosent: 100,
        },
        {
            arbeidsgiverId: TREDJE_ARBEIDSFORHOLD_ID,
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Re Kommune',
            fom: '2018-06-01T00:00:00.000Z',
            stillingsprosent: 0,
        },
    ],
    søker: {
        etternavn: 'Oravakangas',
        fornavn: 'Erlinga-Mask',
        fnr: '30088930610',
        fødselsdato: '1989-08-30',
        kjønn: 'K',
        barn: [],
    },
} satisfies Søkerinfo;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof OppsummeringSteg>;

const meta = {
    title: 'steps/OppsummeringSteg',
    component: OppsummeringSteg,
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoute.OPPSUMMERING]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.TILRETTELEGGINGER]: {
                            [ARBEIDSFORHOLD_ID]: {
                                type: Tilretteleggingstype.INGEN,
                                behovForTilretteleggingFom: '2024-0101',
                                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                                enPeriodeMedTilretteleggingFom: '2024-0101',
                            },
                            [ANNEN_ARBEIDSFORHOLD_ID]: {
                                type: Tilretteleggingstype.DELVIS,
                                enPeriodeMedTilretteleggingStillingsprosent: '50',
                                behovForTilretteleggingFom: '2024-0101',
                                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                                enPeriodeMedTilretteleggingFom: '2024-0101',
                                delvisTilretteleggingPeriodeType:
                                    DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
                            },
                            [TREDJE_ARBEIDSFORHOLD_ID]: {
                                type: Tilretteleggingstype.DELVIS,
                                behovForTilretteleggingFom: '2024-0101',
                                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                                delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
                            },
                            [EGEN_NÆRING_ID]: {
                                type: Tilretteleggingstype.DELVIS,
                                behovForTilretteleggingFom: '2024-0101',
                                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                                enPeriodeMedTilretteleggingFom: '2024-0101',
                                delvisTilretteleggingPeriodeType:
                                    DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
                            },
                            [FRILANS_ID]: {
                                type: Tilretteleggingstype.DELVIS,
                                behovForTilretteleggingFom: '2024-0101',
                                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                                enPeriodeMedTilretteleggingFom: '2024-0101',
                                delvisTilretteleggingPeriodeType:
                                    DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN,
                            },
                        },
                        [ContextDataType.TILRETTELEGGINGER_VEDLEGG]: {
                            [ARBEIDSFORHOLD_ID]: [
                                {
                                    id: 'V134300149934973076055420920289127108',
                                    file: {} as any,
                                    filename: 'vedlegg – Kopi (7).png',
                                    filesize: 7477,
                                    uploaded: true,
                                    pending: false,
                                    type: AttachmentType.TILRETTELEGGING,
                                    skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                                    url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                                    uuid: 'Created',
                                },
                            ],
                        },
                        [ContextDataType.TILRETTELEGGINGER_PERIODER]: {
                            [TREDJE_ARBEIDSFORHOLD_ID]: [
                                {
                                    fom: '2024-01-01',
                                    tom: '2024-02-28',
                                    stillingsprosent: '50',
                                    tomType: TilOgMedDatoType.VALGFRI_DATO,
                                },
                                {
                                    fom: '2024-03-01',
                                    tom: '2024-03-31',
                                    stillingsprosent: '100',
                                    tomType: TilOgMedDatoType.VALGFRI_DATO,
                                },
                                {
                                    fom: '2024-04-01',
                                    tom: '2024-04-30',
                                    stillingsprosent: '0',
                                    tomType: TilOgMedDatoType.VALGFRI_DATO,
                                },
                                {
                                    fom: '2024-05-01',
                                    tom: '2024-06-30',
                                    stillingsprosent: '20',
                                    tomType: TilOgMedDatoType.VALGFRI_DATO,
                                },
                                {
                                    fom: '2024-07-01',
                                    stillingsprosent: '0',
                                    tomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                                },
                            ],
                        },
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harHattArbeidIUtlandet: true,
                            harJobbetSomFrilans: true,
                            harJobbetSomSelvstendigNæringsdrivende: true,
                        },
                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: '2024-10-18',
                            fødselsdato: '2024-10-18',
                        },
                        [ContextDataType.UTENLANDSOPPHOLD]: {
                            skalBoUtenforNorgeNeste12Mnd: false,
                            harBoddUtenforNorgeSiste12Mnd: false,
                        },
                        [ContextDataType.ARBEID_I_UTLANDET]: {
                            arbeidIUtlandet: [
                                {
                                    type: ArbeidIUtlandetType.JOBB_I_UTLANDET,
                                    arbeidsgiverNavn: 'MUFC',
                                    fom: '2024-01-01',
                                    land: 'SE',
                                    pågående: true,
                                    tom: '',
                                },
                            ],
                        },
                        [ContextDataType.FRILANS]: {
                            jobberFremdelesSomFrilans: false,
                            oppstart: '2023-01-01',
                        },
                        [ContextDataType.EGEN_NÆRING]: {
                            navnPåNæringen: 'Skitt fiske',
                            fom: dayjs().subtract(5, 'years').format(ISO_DATE_FORMAT),
                            tom: '',
                            næringstype: 'FISKE',
                            pågående: true,
                            registrertINorge: true,
                            næringsinntekt: 700000,
                            organisasjonsnummer: '12132323',
                            hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
                            varigEndringDato: '2024-01-01',
                            varigEndringInntektEtterEndring: 500000,
                        },
                    }}
                >
                    <OppsummeringSteg {...rest} />
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        sendSøknad: () => Promise.resolve(),
        søkerInfo: DEFAULT_SØKERINFO,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: promiseAction(),
    },
};
