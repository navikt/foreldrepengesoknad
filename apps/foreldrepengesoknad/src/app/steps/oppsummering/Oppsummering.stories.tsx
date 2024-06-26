import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import AxiosMock from 'storybook/utils/AxiosMock';

import { AnnenForelder, Barn, BarnType, Dekningsgrad, ISOStringToDate, Periode } from '@navikt/fp-common';
import { ISO_DATE_FORMAT, SivilstandType, Skjemanummer } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { Sivilstand, Søker, Søkerinfo, SøkersituasjonFp } from '@navikt/fp-types';

import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import { AnnenInntektType } from 'app/context/types/AnnenInntekt';
import { Opphold, SenereOpphold, TidligereOpphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import { Næringstype } from 'app/context/types/Næring';
import SøkerData from 'app/context/types/SøkerData';
import SøknadRoutes from 'app/routes/routes';

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
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: true,
};

const defaultSøker = {} as SøkerData;

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

export default {
    title: 'steps/Oppsummering',
    component: Oppsummering,
};

interface Props {
    søkerinfo?: Søkerinfo;
    søkerData?: SøkerData;
    søkersituasjon?: SøkersituasjonFp;
    annenForelder?: AnnenForelder;
    utenlandsopphold?: Opphold;
    utenlandsoppholdSenere?: SenereOpphold;
    utenlandsoppholdTidligere?: TidligereOpphold;
    barn?: Barn;
    sivilstand?: Sivilstand;
    erEndringssøknad?: boolean;
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    avbrytSøknad: () => void;
    sendSøknad: () => Promise<any>;
}

const Template: StoryFn<Props> = ({
    søkerinfo = defaultSøkerinfoMor,
    søkersituasjon = defaultSøkersituasjon,
    søkerData = defaultSøker,
    annenForelder = defaultAnnenForelder,
    barn = defaultBarn,
    utenlandsopphold = defaultUtenlandsopphold,
    utenlandsoppholdSenere,
    utenlandsoppholdTidligere,
    erEndringssøknad = false,
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide,
    avbrytSøknad = action('button-click'),
    sendSøknad = () => Promise.resolve(),
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
                        [ContextDataType.SØKER_DATA]: søkerData,
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
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: { dekningsgrad: Dekningsgrad.HUNDRE_PROSENT },
                        [ContextDataType.UTTAKSPLAN]: defaultUttaksplan,
                        [ContextDataType.VEDLEGG]: defaultVedlegg,
                    }}
                >
                    <Oppsummering
                        erEndringssøknad={erEndringssøknad}
                        sendSøknad={sendSøknad}
                        søkerInfo={søkerinfo}
                        avbrytSøknad={avbrytSøknad}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});

export const MorMedAnnenForelderUgift = Template.bind({});
MorMedAnnenForelderUgift.args = {
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
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
    søkerinfo: {
        ...defaultSøkerinfoMor,
        søker: {
            ...defaultSøkerinfoMor.søker,
            sivilstand: {
                type: SivilstandType.UGIFT,
            },
        },
    },
};

export const MorMedAleneOmsorg = Template.bind({});
MorMedAleneOmsorg.args = {
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
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
};
export const FarMedAleneOmsorg = Template.bind({});
FarMedAleneOmsorg.args = {
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    søkerinfo: {
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
};

export const FarMedUførMorUgift = Template.bind({});
FarMedUførMorUgift.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
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
    søkerinfo: {
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
};

export const FarMedMorSomHarRettIEØS = Template.bind({});
FarMedMorSomHarRettIEØS.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
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
    søkerinfo: {
        ...defaultSøkerinfoFar,
    },
};

export const FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS = Template.bind({});
FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
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
    søkerinfo: {
        ...defaultSøkerinfoFar,
    },
};

export const FarMedMorSomHarRettINorge = Template.bind({});
FarMedMorSomHarRettINorge.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    annenForelder: {
        erAleneOmOmsorg: false,
        fornavn: 'Frida',
        etternavn: 'Norsk',
        fnr: '02520489226',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søkerinfo: {
        ...defaultSøkerinfoFar,
    },
};

export const MorMedAdoptertBarn = Template.bind({});
MorMedAdoptertBarn.args = {
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
};

export const MorMedUtenlandsopphold = Template.bind({});
MorMedUtenlandsopphold.args = {
    utenlandsopphold: {
        iNorgeNeste12Mnd: false,
        iNorgeSiste12Mnd: false,
    },
    utenlandsoppholdSenere: {
        senereOpphold: [
            {
                land: 'SE',
                tidsperiode: {
                    fom: dayjs().format(ISO_DATE_FORMAT),
                    tom: dayjs().add(100, 'days').format(ISO_DATE_FORMAT),
                },
            },
        ],
    },
    utenlandsoppholdTidligere: {
        tidligereOpphold: [
            {
                land: 'SE',
                tidsperiode: {
                    fom: dayjs().subtract(10, 'months').format(ISO_DATE_FORMAT),
                    tom: dayjs().subtract(1, 'days').format(ISO_DATE_FORMAT),
                },
            },
        ],
    },
};

export const MorMedArbeidsforholdOgAndreInntekter = Template.bind({});
MorMedArbeidsforholdOgAndreInntekter.args = {
    søkerData: {
        harJobbetSomFrilansSiste10Mnd: true,
        frilansInformasjon: {
            jobberFremdelesSomFrilans: true,
            oppstart: ISOStringToDate('2019-01-01')!,
        },
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    annenForelder: {
        ...defaultAnnenForelder,
        erAleneOmOmsorg: false,
    },
    søkerinfo: {
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
};

export const MorMedSelvstendigNæringsdrivende = Template.bind({});
MorMedSelvstendigNæringsdrivende.args = {
    søkerData: {
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: true,
        selvstendigNæringsdrivendeInformasjon: [
            {
                navnPåNæringen: 'Fiske',
                pågående: false,
                tidsperiode: {
                    fom: ISOStringToDate('2018-01-01')!,
                    tom: ISOStringToDate('2021-01-01'),
                },
                næringstyper: [Næringstype.FISKER],
                organisasjonsnummer: '123',
                næringsinntekt: 1000000,
                registrertINorge: true,
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true,
                hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
                endringAvNæringsinntektInformasjon: {
                    dato: ISOStringToDate('2019-01-01')!,
                    næringsinntektEtterEndring: 1000000,
                    forklaring: 'Jobbar beinhardt!',
                },
            },
        ],
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
    },
    annenForelder: {
        ...defaultAnnenForelder,
        erAleneOmOmsorg: false,
    },
    søkerinfo: defaultSøkerinfoMor,
};

export const MorMedSelvstendigNæringsdrivendeUtenDiverse = Template.bind({});
MorMedSelvstendigNæringsdrivendeUtenDiverse.args = {
    søkerData: {
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: true,
        selvstendigNæringsdrivendeInformasjon: [
            {
                navnPåNæringen: 'Fiske',
                pågående: false,
                tidsperiode: {
                    fom: ISOStringToDate('2018-01-01')!,
                    tom: ISOStringToDate('2021-01-01'),
                },
                næringstyper: [Næringstype.FISKER],
                registrertILand: 'SE',
                registrertINorge: false,
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
                hattVarigEndringAvNæringsinntektSiste4Kalenderår: false,
            },
        ],
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
    },
    annenForelder: {
        ...defaultAnnenForelder,
        erAleneOmOmsorg: false,
    },
    søkerinfo: defaultSøkerinfoMor,
};

export const MorMedAndreInntekterJobbIUtlandet = Template.bind({});
MorMedAndreInntekterJobbIUtlandet.args = {
    søkerData: {
        harHattAnnenInntektSiste10Mnd: true,
        andreInntekterSiste10Mnd: [
            {
                type: AnnenInntektType.JOBB_I_UTLANDET,
                pågående: false,
                tidsperiode: {
                    fom: '2018-01-01',
                    tom: '2021-01-01',
                },
                arbeidsgiverNavn: 'Statoil',
                land: 'SE',
            },
        ],
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    annenForelder: {
        ...defaultAnnenForelder,
        erAleneOmOmsorg: false,
    },
    søkerinfo: defaultSøkerinfoMor,
};

export const MorMedAndreInntekterMilitærtjeneste = Template.bind({});
MorMedAndreInntekterMilitærtjeneste.args = {
    søkerData: {
        harHattAnnenInntektSiste10Mnd: true,
        andreInntekterSiste10Mnd: [
            {
                type: AnnenInntektType.MILITÆRTJENESTE,
                pågående: false,
                tidsperiode: {
                    fom: '2018-01-01',
                    tom: '2021-01-01',
                },
            },
        ],
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    annenForelder: {
        ...defaultAnnenForelder,
        erAleneOmOmsorg: false,
    },
    søkerinfo: defaultSøkerinfoMor,
};

export const ErEndringssøknad = Template.bind({});
ErEndringssøknad.args = {
    erEndringssøknad: true,
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },
};
