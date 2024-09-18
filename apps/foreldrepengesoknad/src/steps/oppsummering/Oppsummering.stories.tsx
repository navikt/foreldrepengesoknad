import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import SøknadRoutes from 'appData/routes';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AndreInntektskilder } from 'types/AndreInntektskilder';
import { AnnenInntektType } from 'types/AnnenInntekt';
import { Næringstype } from 'types/Næring';
import { VedleggDataType } from 'types/VedleggDataType';

import { AnnenForelder, Barn, BarnType, Dekningsgrad, Periode } from '@navikt/fp-common';
import {
    AttachmentMetadataType,
    AttachmentType,
    ISO_DATE_FORMAT,
    InnsendingsType,
    SivilstandType,
    Skjemanummer,
} from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { ArbeidsforholdOgInntektFp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { EgenNæring } from '@navikt/fp-steg-egen-naering';
import { Frilans } from '@navikt/fp-steg-frilans';
import {
    Sivilstand,
    Søker,
    Søkerinfo,
    SøkersituasjonFp,
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
} from '@navikt/fp-types';

import AxiosMock from '../../__mocks__/AxiosMock';
import Oppsummering from './Oppsummering';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultSøkerinfoMor = {
    søker: {
        fnr: '02520489226',
        fornavn: 'MOR',
        etternavn: 'MYGG',
        kjønn: 'K',
        fødselsdato: '1978-04-19',
        barn: [
            {
                fnr: '21091981146',
                fødselsdato: '2021-03-15',
                annenForelder: {
                    fnr: '08099017784',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'KLØKTIG',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
        ],
        sivilstand: {
            type: SivilstandType.GIFT,
        },
    } as Søker,
    arbeidsforhold: [],
};
const defaultSøkerinfoFar = {
    søker: {
        fnr: '08099017784',
        fornavn: 'FAR',
        etternavn: 'MYGG',
        kjønn: 'M',
        fødselsdato: '1978-04-19',
        barn: [
            {
                fnr: '19047815714',
                fødselsdato: '2021-03-15',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'KLØKTIG',
                etternavn: 'MIDTPUNKT',
                kjønn: 'K',
            },
        ],
        sivilstand: {
            type: SivilstandType.UGIFT,
        },
    } as Søker,
    arbeidsforhold: [],
};

const defaultBarn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2021-03-15'],
    antallBarn: 1,
    datoForAleneomsorg: '2021-03-15',
    dokumentasjonAvAleneomsorg: [],
} as Barn;

const defaultSøkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor',
} as SøkersituasjonFp;

const defaultAnnenForelder = {
    kanIkkeOppgis: true,
};

const defaultUtenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: false,
};

const defaultUttaksplan = [
    {
        id: '0',
        type: 'uttak',
        forelder: 'mor',
        konto: 'FORELDREPENGER_FØR_FØDSEL',
        tidsperiode: {
            fom: new Date('2021-11-23T23:00:00.000Z'),
            tom: new Date('2021-12-13T23:00:00.000Z'),
        },
    },
    {
        id: '1',
        type: 'utsettelse',
        årsak: 'INSTITUSJONSOPPHOLD_SØKER',
        tidsperiode: {
            fom: new Date('2021-12-14T23:00:00.000Z'),
            tom: new Date('2022-01-24T23:00:00.000Z'),
        },
    },
    {
        id: '2',
        type: 'periodeUtenUttak',
        tidsperiode: {
            fom: new Date('2022-01-25T23:00:00.000Z'),
            tom: new Date('2022-03-28T23:00:00.000Z'),
        },
    },
    {
        id: '3',
        type: 'uttak',
        forelder: 'mor',
        konto: 'FELLESPERIODE',
        tidsperiode: {
            fom: new Date('2022-03-29T23:00:00.000Z'),
            tom: new Date('2022-06-06T23:00:00.000Z'),
        },
        ønskerSamtidigUttak: false,
        gradert: false,
    },
] as Periode[];

const defaultArbeidsforholdOgInntekt = {
    harHattAndreInntektskilder: false,
    harJobbetSomFrilans: false,
    harJobbetSomSelvstendigNæringsdrivende: false,
} as ArbeidsforholdOgInntektFp;

const defaultVedlegg = {
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: [],
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: [],
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: [],
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: [],
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: [],
    [Skjemanummer.DOK_SYKDOM_MOR]: [],
    [Skjemanummer.DOK_SYKDOM_FAR]: [],
    [Skjemanummer.DOK_ARBEID_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: [],
    [Skjemanummer.OMSORGSOVERTAKELSE]: [],
    [Skjemanummer.DOK_AV_ALENEOMSORG]: [],
    [Skjemanummer.TERMINBEKREFTELSE]: [],
    [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: [],
    [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: [],
};

type StoryArgs = {
    søkerinfo?: Søkerinfo;
    søkersituasjon?: SøkersituasjonFp;
    annenForelder?: AnnenForelder;
    utenlandsopphold?: Utenlandsopphold;
    utenlandsoppholdSenere?: UtenlandsoppholdPeriode[];
    utenlandsoppholdTidligere?: UtenlandsoppholdPeriode[];
    barn?: Barn;
    sivilstand?: Sivilstand;
    arbeidsforholdOgInntekt?: ArbeidsforholdOgInntektFp;
    frilans?: Frilans;
    egenNæring?: EgenNæring;
    andreInntekter?: AndreInntektskilder[];
    vedlegg?: VedleggDataType;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof Oppsummering>;

const meta = {
    title: 'steps/Oppsummering',
    component: Oppsummering,
    render: ({
        søkersituasjon = defaultSøkersituasjon,
        annenForelder = defaultAnnenForelder,
        barn = defaultBarn,
        utenlandsopphold = defaultUtenlandsopphold,
        utenlandsoppholdSenere,
        utenlandsoppholdTidligere,
        arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
        frilans,
        egenNæring,
        andreInntekter,
        gåTilNesteSide,
        vedlegg = defaultVedlegg,
        ...rest
    }) => {
        initAmplitude();
        const restMock = (apiMock: MockAdapter) => {
            apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
        };
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
                <AxiosMock mock={restMock}>
                    <FpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
                            [ContextDataType.FRILANS]: frilans,
                            [ContextDataType.EGEN_NÆRING]: egenNæring,
                            [ContextDataType.ANDRE_INNTEKTSKILDER]: andreInntekter,
                            [ContextDataType.ANNEN_FORELDER]: annenForelder,
                            [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                            [ContextDataType.UTTAKSPLAN_METADATA]: {
                                ønskerJustertUttakVedFødsel: false,
                                harUttaksplanBlittSlettet: false,
                                antallUkerIUttaksplan: 1,
                            },
                            [ContextDataType.OM_BARNET]: barn,
                            [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                            [ContextDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
                            [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
                            [ContextDataType.PERIODE_MED_FORELDREPENGER]: Dekningsgrad.HUNDRE_PROSENT,
                            [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
                            [ContextDataType.VEDLEGG]: vedlegg,
                        }}
                    >
                        <Oppsummering {...rest} />
                    </FpDataContext>
                </AxiosMock>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        erEndringssøknad: false,
        sendSøknad: () => Promise.resolve(),
        søkerInfo: defaultSøkerinfoMor,
        avbrytSøknad: action('button-click'),
        mellomlagreSøknadOgNaviger: promiseAction(),
    },
};

export const MorMedAnnenForelderUgift: Story = {
    args: {
        ...Default.args,
        annenForelder: {
            erAleneOmOmsorg: false,
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '08099017784',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        barn: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2025-10-01',
        },
        søkerInfo: {
            ...defaultSøkerinfoMor,
            søker: {
                ...defaultSøkerinfoMor.søker,
                sivilstand: {
                    type: SivilstandType.UGIFT,
                },
            },
        },
    },
};

export const MorMedAleneOmsorg: Story = {
    args: {
        ...Default.args,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        annenForelder: {
            erAleneOmOmsorg: true,
            fornavn: 'Ingen',
            etternavn: 'Omsorg',
            fnr: '08099017784',
            kanIkkeOppgis: false,
        },
    },
};

export const FarMedAleneOmsorg: Story = {
    args: {
        ...Default.args,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        søkerInfo: {
            ...defaultSøkerinfoFar,
        },
        annenForelder: {
            erAleneOmOmsorg: true,
            fornavn: 'Ingen',
            etternavn: 'Omsorg',
            fnr: '02520489226',
            kanIkkeOppgis: false,
        },
        barn: {
            type: BarnType.UFØDT,
            antallBarn: 2,
            termindato: '2025-10-01',
        },
    },
};

export const FarMedUførMorUgift: Story = {
    args: {
        ...Default.args,
        søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
        annenForelder: {
            erAleneOmOmsorg: false,
            fornavn: 'Eline',
            etternavn: 'Utvikler',
            fnr: '02520489226',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
            kanIkkeOppgis: false,
            erMorUfør: true,
        },
        søkerInfo: {
            ...defaultSøkerinfoFar,
            søker: {
                ...defaultSøkerinfoFar.søker,
                sivilstand: {
                    type: SivilstandType.UGIFT,
                },
            },
        },
        barn: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2025-10-01',
        },
    },
};

export const FarMedMorSomHarRettIEØS: Story = {
    args: {
        ...Default.args,
        søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
        annenForelder: {
            erAleneOmOmsorg: false,
            fornavn: 'Anne',
            etternavn: 'Forelder',
            fnr: '02520489226',
            harOppholdtSegIEØS: true,
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: true,
            kanIkkeOppgis: false,
        },
        søkerInfo: {
            ...defaultSøkerinfoFar,
        },
    },
};

export const FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS: Story = {
    args: {
        ...Default.args,
        søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
        annenForelder: {
            erAleneOmOmsorg: false,
            fornavn: 'Anne',
            etternavn: 'Forelder',
            fnr: '02520489226',
            harOppholdtSegIEØS: true,
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
            kanIkkeOppgis: false,
        },
        søkerInfo: {
            ...defaultSøkerinfoFar,
        },
    },
};

export const FarMedMorSomHarRettINorge: Story = {
    args: {
        ...Default.args,
        søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
        annenForelder: {
            erAleneOmOmsorg: false,
            fornavn: 'Frida',
            etternavn: 'Norsk',
            fnr: '02520489226',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        søkerInfo: {
            ...defaultSøkerinfoFar,
        },
    },
};

export const MorMedAdoptertBarn: Story = {
    args: {
        ...Default.args,
        søkersituasjon: {
            rolle: 'mor',
            situasjon: 'adopsjon',
        },
        barn: {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 1,
            adopsjonsdato: '2021-10-01',
            fødselsdatoer: ['2021-01-01'],
            adoptertIUtlandet: false,
            omsorgsovertakelse: [],
        } as Barn,
    },
};

export const MorMedUtenlandsopphold: Story = {
    args: {
        ...Default.args,
        utenlandsopphold: {
            skalBoUtenforNorgeNeste12Mnd: true,
            harBoddUtenforNorgeSiste12Mnd: true,
        },
        utenlandsoppholdSenere: [
            {
                landkode: 'SE',
                fom: dayjs().format(ISO_DATE_FORMAT),
                tom: dayjs().add(100, 'days').format(ISO_DATE_FORMAT),
            },
        ],

        utenlandsoppholdTidligere: [
            {
                landkode: 'SE',
                fom: dayjs().subtract(10, 'months').format(ISO_DATE_FORMAT),
                tom: dayjs().subtract(1, 'days').format(ISO_DATE_FORMAT),
            },
        ],
    },
};

export const MorMedArbeidsforholdOgAndreInntekter: Story = {
    args: {
        ...Default.args,
        arbeidsforholdOgInntekt: {
            harJobbetSomFrilans: true,
            harHattAndreInntektskilder: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
        frilans: {
            jobberFremdelesSomFrilans: true,
            oppstart: '2019-01-01',
        },
        annenForelder: {
            ...defaultAnnenForelder,
            erAleneOmOmsorg: false,
        },
        søkerInfo: {
            søker: defaultSøkerinfoMor.søker,
            arbeidsforhold: [
                {
                    arbeidsgiverId: '1',
                    arbeidsgiverIdType: 'orgnr',
                    arbeidsgiverNavn: 'Auto Joachim Bilpleie',
                    stillingsprosent: 80,
                    fom: '2015-01-01',
                },
                {
                    arbeidsgiverId: '2',
                    arbeidsgiverIdType: 'orgnr',
                    arbeidsgiverNavn: 'Taco Express',
                    stillingsprosent: 20,
                    fom: '2019-01-01',
                    tom: '2021-01-01',
                },
            ],
        },
    },
};

export const MorMedSelvstendigNæringsdrivende: Story = {
    args: {
        ...Default.args,
        arbeidsforholdOgInntekt: {
            harJobbetSomFrilans: false,
            harHattAndreInntektskilder: false,
            harJobbetSomSelvstendigNæringsdrivende: true,
        },
        egenNæring: {
            navnPåNæringen: 'Fiske',
            pågående: false,
            fomDato: '2018-01-01',
            tomDato: '2021-01-01',
            næringstype: Næringstype.FISKER,
            organisasjonsnummer: '123',
            næringsinntekt: 1000000,
            registrertINorge: true,
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true,
            hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
        },
        annenForelder: {
            ...defaultAnnenForelder,
            erAleneOmOmsorg: false,
        },
        søkerInfo: defaultSøkerinfoMor,
    },
};

export const MorMedSelvstendigNæringsdrivendeUtenDiverse: Story = {
    args: {
        ...Default.args,
        arbeidsforholdOgInntekt: {
            harJobbetSomFrilans: false,
            harHattAndreInntektskilder: false,
            harJobbetSomSelvstendigNæringsdrivende: true,
        },
        egenNæring: {
            navnPåNæringen: 'Fiske',
            pågående: false,
            fomDato: '2018-01-01',
            tomDato: '2021-01-01',
            næringstype: Næringstype.FISKER,
            registrertILand: 'SE',
            registrertINorge: false,
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
            hattVarigEndringAvNæringsinntektSiste4Kalenderår: false,
        },
        annenForelder: {
            ...defaultAnnenForelder,
            erAleneOmOmsorg: false,
        },
        søkerInfo: defaultSøkerinfoMor,
    },
};

export const MorMedAndreInntekterJobbIUtlandet: Story = {
    args: {
        ...Default.args,
        arbeidsforholdOgInntekt: {
            harJobbetSomFrilans: false,
            harHattAndreInntektskilder: true,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
        andreInntekter: [
            {
                type: AnnenInntektType.JOBB_I_UTLANDET,
                pågående: false,
                fom: '2018-01-01',
                tom: '2021-01-01',
                arbeidsgiverNavn: 'Statoil',
                land: 'SE',
            },
            {
                type: AnnenInntektType.MILITÆRTJENESTE,
                pågående: true,
                fom: '2022-01-01',
            },
            {
                type: AnnenInntektType.SLUTTPAKKE,
                fom: '2022-01-01',
                tom: '2023-01-01',
            },
        ],
        annenForelder: {
            ...defaultAnnenForelder,
            erAleneOmOmsorg: false,
        },
        søkerInfo: defaultSøkerinfoMor,
    },
};

export const MorMedAndreInntekterMilitærtjeneste: Story = {
    args: {
        ...Default.args,
        arbeidsforholdOgInntekt: {
            harJobbetSomFrilans: false,
            harHattAndreInntektskilder: true,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
        andreInntekter: [
            {
                type: AnnenInntektType.MILITÆRTJENESTE,
                pågående: false,
                fom: '2018-01-01',
                tom: '2021-01-01',
            },
        ],
        annenForelder: {
            ...defaultAnnenForelder,
            erAleneOmOmsorg: false,
        },
        søkerInfo: defaultSøkerinfoMor,
    },
};

const FIL_INFO = {
    filesize: 1234,
    url: 'test',
    id: '1',
    file: new File(['abc'.repeat(100000)], 'Filnavn1.jpg'),
    pending: false,
    uploaded: true,
};

const FIL_INFO_UTTAK_MED_PERIODE = {
    ...FIL_INFO,
    dokumenterer: {
        type: AttachmentMetadataType.UTTAK,
        perioder: [
            {
                fom: '2024-01-01',
                tom: '2024-10-01',
            },
        ],
    },
};

export const VisAlleVedlegg: Story = {
    args: {
        ...Default.args,
        vedlegg: {
            ...defaultVedlegg,
            [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: [
                {
                    ...FIL_INFO,
                    filename: 'etterlønn.pdf',
                    type: AttachmentType.ANNEN_INNTEKT,
                    skjemanummer: Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG,
                    dokumenterer: {
                        type: AttachmentMetadataType.OPPTJENING,
                        perioder: [
                            {
                                fom: '2024-01-01',
                                tom: '2024-10-01',
                            },
                        ],
                    },
                },
                {
                    ...FIL_INFO,
                    filename: 'etterlønn2.pdf',
                    type: AttachmentType.ANNEN_INNTEKT,
                    skjemanummer: Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG,
                },
            ],
            [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: [
                {
                    ...FIL_INFO,
                    filename: 'siviltjeneste.pdf',
                    type: AttachmentType.ANNEN_INNTEKT,
                    skjemanummer: Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE,
                    dokumenterer: {
                        type: AttachmentMetadataType.OPPTJENING,
                        perioder: [
                            {
                                fom: '2024-01-01',
                                tom: '2024-10-01',
                            },
                        ],
                    },
                },
            ],
            [Skjemanummer.OMSORGSOVERTAKELSE]: [
                {
                    ...FIL_INFO,
                    filename: 'omsorgsovertakelse.pdf',
                    type: AttachmentType.OMSORGSOVERTAKELSE,
                    skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
                },
            ],
            [Skjemanummer.DOK_AV_ALENEOMSORG]: [
                {
                    ...FIL_INFO,
                    filename: 'aleneomsorg.pdf',
                    type: AttachmentType.ALENEOMSORG,
                    skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
                },
            ],
            [Skjemanummer.TERMINBEKREFTELSE]: [
                {
                    ...FIL_INFO,
                    filename: 'terminbekreftelse.pdf',
                    type: AttachmentType.TERMINBEKREFTELSE,
                    skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                },
            ],
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: [
                {
                    ...FIL_INFO_UTTAK_MED_PERIODE,
                    filename: 'dok-deltakelse.pdf',
                    type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    skjemanummer: Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET,
                },
            ],
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: [
                {
                    ...FIL_INFO_UTTAK_MED_PERIODE,
                    filename: 'kvalifiseringsprogram.pdf',
                    type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    skjemanummer: Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM,
                },
            ],
            [Skjemanummer.DOK_INNLEGGELSE_MOR]: [
                {
                    ...FIL_INFO_UTTAK_MED_PERIODE,
                    filename: 'innleggelse-mor.pdf',
                    type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    skjemanummer: Skjemanummer.DOK_INNLEGGELSE_MOR,
                },
            ],
            [Skjemanummer.DOK_INNLEGGELSE_BARN]: [
                {
                    ...FIL_INFO_UTTAK_MED_PERIODE,
                    filename: 'innleggelse-barn.pdf',
                    type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    skjemanummer: Skjemanummer.DOK_INNLEGGELSE_BARN,
                },
            ],
            [Skjemanummer.DOK_INNLEGGELSE_FAR]: [
                {
                    ...FIL_INFO_UTTAK_MED_PERIODE,
                    filename: 'innleggelse-far.pdf',
                    type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    skjemanummer: Skjemanummer.DOK_INNLEGGELSE_FAR,
                },
            ],
            [Skjemanummer.DOK_SYKDOM_MOR]: [
                {
                    ...FIL_INFO_UTTAK_MED_PERIODE,
                    filename: 'sykdom-mor.pdf',
                    type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    skjemanummer: Skjemanummer.DOK_SYKDOM_MOR,
                },
            ],
            [Skjemanummer.DOK_ARBEID_MOR]: [
                {
                    ...FIL_INFO_UTTAK_MED_PERIODE,
                    filename: 'dok-arbeid-mor.pdf',
                    type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
                },
            ],
            [Skjemanummer.DOK_UTDANNING_MOR]: [
                {
                    ...FIL_INFO_UTTAK_MED_PERIODE,
                    filename: 'dok-utdanning-mor.pdf',
                    type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    skjemanummer: Skjemanummer.DOK_UTDANNING_MOR,
                },
            ],
            [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: [
                {
                    ...FIL_INFO_UTTAK_MED_PERIODE,
                    filename: 'dok-utdanning-og-arbeid-mor.pdf',
                    type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    skjemanummer: Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR,
                },
            ],
        },
    },
};

export const VisSendInnSenereVedlegg: Story = {
    args: {
        ...Default.args,
        vedlegg: {
            ...(VisAlleVedlegg.args?.vedlegg
                ? Object.entries(VisAlleVedlegg.args.vedlegg).reduce(
                      (result, entry) => ({
                          ...result,
                          [entry[0]]: entry[1].map((value) => ({
                              ...value,
                              innsendingsType: InnsendingsType.SEND_SENERE,
                          })),
                      }),
                      {},
                  )
                : {}),
        },
    },
};

export const ErEndringssøknad: Story = {
    args: {
        ...Default.args,
        erEndringssøknad: true,
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
    },
};
