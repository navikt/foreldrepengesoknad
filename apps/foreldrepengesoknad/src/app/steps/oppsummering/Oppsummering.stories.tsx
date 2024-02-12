import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';
import { AnnenForelder, Attachment, Barn, BarnType, Dekningsgrad, ISOStringToDate, Periode } from '@navikt/fp-common';
import AxiosMock from 'storybook/utils/AxiosMock';
import { Næringstype } from 'app/context/types/Næring';
import { AnnenInntektType } from 'app/context/types/AnnenInntekt';
import Oppsummering from './Oppsummering';
import { Action, FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import Søker from 'app/context/types/Søker';
import { Person, Søkerinfo, SøkersituasjonFp } from '@navikt/fp-types';
import { Opphold, SenereOpphold, TidligereOpphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import SøknadRoutes from 'app/routes/routes';
import { MemoryRouter } from 'react-router-dom';
import { initAmplitude } from '@navikt/fp-metrics';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultSøkerinfo = {
    person: {
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
        ],
    } as Person,
    arbeidsforhold: [],
};

const defaultBarn = {
    type: BarnType.FØDT,
    fødselsdatoer: [ISOStringToDate('2021-03-15')],
    antallBarn: 1,
    datoForAleneomsorg: ISOStringToDate('2021-03-15'),
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

const defaultSøker = {} as Søker;

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

export default {
    title: 'steps/Oppsummering',
    component: Oppsummering,
};

interface Props {
    søkerinfo?: Søkerinfo;
    søker?: Søker;
    søkersituasjon?: SøkersituasjonFp;
    annenForelder?: AnnenForelder;
    utenlandsopphold?: Opphold;
    utenlandsoppholdSenere?: SenereOpphold;
    utenlandsoppholdTidligere?: TidligereOpphold;
    barn?: Barn;
    erEndringssøknad?: boolean;
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    avbrytSøknad: () => void;
    sendSøknad: () => Promise<any>;
}

const Template: StoryFn<Props> = ({
    søkerinfo = defaultSøkerinfo,
    søkersituasjon = defaultSøkersituasjon,
    søker = defaultSøker,
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
        apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKER]: søker,
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

export const MedAnnenForelder = Template.bind({});
MedAnnenForelder.args = {
    søker: {
        erAleneOmOmsorg: false,
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
    },
};

export const MedAleneOmsorg = Template.bind({});
MedAleneOmsorg.args = {
    søker: {
        erAleneOmOmsorg: true,
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    annenForelder: {
        fornavn: 'Ingen',
        etternavn: 'Omsorg',
        fnr: '1212121313',
        kanIkkeOppgis: false,
    },
};

export const FarMedUførMor = Template.bind({});
FarMedUførMor.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søker: {
        erAleneOmOmsorg: false,
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    annenForelder: {
        fornavn: 'Eline',
        etternavn: 'Utvikler',
        fnr: '1515151616',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
        kanIkkeOppgis: false,
        erUfør: true,
    },
};

export const FarMedMorSomHarRettIEØS = Template.bind({});
FarMedMorSomHarRettIEØS.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søker: {
        erAleneOmOmsorg: false,
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    annenForelder: {
        fornavn: 'Anne',
        etternavn: 'Forelder',
        fnr: '1515151616',
        harOppholdtSegIEØS: true,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
};

export const FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS = Template.bind({});
FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søker: {
        erAleneOmOmsorg: false,
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    annenForelder: {
        fornavn: 'Anne',
        etternavn: 'Forelder',
        fnr: '1515151616',
        harOppholdtSegIEØS: true,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
        kanIkkeOppgis: false,
    },
};

export const FarMedMorSomHarRettINorge = Template.bind({});
FarMedMorSomHarRettINorge.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søker: {
        erAleneOmOmsorg: false,
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    annenForelder: {
        fornavn: 'Frida',
        etternavn: 'Norsk',
        fnr: '01010012345',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
};

export const MedAdoptertBarn = Template.bind({});
MedAdoptertBarn.args = {
    søkersituasjon: {
        rolle: 'mor',
        situasjon: 'adopsjon',
    },
    barn: {
        type: BarnType.ADOPTERT_STEBARN,
        antallBarn: 1,
        adopsjonsdato: ISOStringToDate('2021-10-01'),
        fødselsdatoer: [ISOStringToDate('2021-01-01')],
        adoptertIUtlandet: false,
        omsorgsovertakelse: [],
    } as Barn,
};

export const MedUtenlandsopphold = Template.bind({});
MedUtenlandsopphold.args = {
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

export const MedArbeidsforholdOgAndreInntekter = Template.bind({});
MedArbeidsforholdOgAndreInntekter.args = {
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: true,
        frilansInformasjon: {
            jobberFremdelesSomFrilans: true,
            oppstart: ISOStringToDate('2019-01-01')!,
        },
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    søkerinfo: {
        person: defaultSøkerinfo.person,
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

export const MedSelvstendigNæringsdrivende = Template.bind({});
MedSelvstendigNæringsdrivende.args = {
    søker: {
        erAleneOmOmsorg: false,
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
};

export const MedSelvstendigNæringsdrivendeUtenDiverse = Template.bind({});
MedSelvstendigNæringsdrivendeUtenDiverse.args = {
    søker: {
        erAleneOmOmsorg: false,
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
};

export const MedAndreInntekterJobbIUtlandet = Template.bind({});
MedAndreInntekterJobbIUtlandet.args = {
    søker: {
        erAleneOmOmsorg: false,
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
                vedlegg: [],
            },
        ],
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
};

export const MedAndreInntekterMilitærtjeneste = Template.bind({});
MedAndreInntekterMilitærtjeneste.args = {
    søker: {
        erAleneOmOmsorg: false,
        harHattAnnenInntektSiste10Mnd: true,
        andreInntekterSiste10Mnd: [
            {
                type: AnnenInntektType.MILITÆRTJENESTE,
                pågående: false,
                tidsperiode: {
                    fom: '2018-01-01',
                    tom: '2021-01-01',
                },
                vedlegg: [
                    {
                        id: '1',
                        url: 'Dette er en url',
                        filename: 'Filnavn',
                    },
                ] as Attachment[],
            },
        ],
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
};

export const ErEndringssøknad = Template.bind({});
ErEndringssøknad.args = {
    erEndringssøknad: true,
    søker: {
        erAleneOmOmsorg: false,
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
    },
};
