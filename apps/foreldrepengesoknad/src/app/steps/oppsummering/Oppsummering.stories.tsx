import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MockAdapter from 'axios-mock-adapter/types';
import {
    AnnenForelder,
    Attachment,
    Barn,
    BarnType,
    Dekningsgrad,
    ISOStringToDate,
    Periode,
    Tilleggsopplysninger,
} from '@navikt/fp-common';
import AxiosMock from 'storybook/utils/AxiosMock';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import withRouter from 'storybook/decorators/withRouter';
import { Næringstype } from 'app/context/types/Næring';
import { AnnenInntektType } from 'app/context/types/AnnenInntekt';
import _søkerinfo from 'storybook/storyData/sokerinfo/søkerinfoKvinneMedEttBarn.json';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import Oppsummering from './Oppsummering';
import { Action, FpDataContext, FpDataType } from 'app/context/FpDataContext';
import Søker from 'app/context/types/Søker';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { Opphold, SenereOpphold, TidligereOpphold } from 'app/context/types/InformasjonOmUtenlandsopphold';

export default {
    title: 'steps/Oppsummering',
    component: Oppsummering,
    decorators: [withRouter],
};

const søkerinfo = _søkerinfo as SøkerinfoDTO;

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

const defaultSøker = {
    språkkode: 'nb',
} as Søker;

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

interface Props {
    søkerinfo: SøkerinfoDTO;
    søker?: Søker;
    søkersituasjon?: SøkersituasjonFp;
    annenForelder?: AnnenForelder;
    tilleggsopplysninger: Tilleggsopplysninger;
    utenlandsopphold?: Opphold;
    utenlandsoppholdSenere?: SenereOpphold;
    utenlandsoppholdTidligere?: TidligereOpphold;
    barn?: Barn;
    erEndringssøknad?: boolean;
    mellomlagreSøknadOgNaviger?: () => void;
    gåTilNesteSide: (action: Action) => void;
    avbrytSøknad: () => void;
    sendSøknad: () => Promise<any>;
}

const Template: StoryFn<Props> = ({
    søkerinfo,
    søkersituasjon = defaultSøkersituasjon,
    søker = defaultSøker,
    annenForelder = defaultAnnenForelder,
    tilleggsopplysninger,
    barn = defaultBarn,
    utenlandsopphold = defaultUtenlandsopphold,
    utenlandsoppholdSenere,
    utenlandsoppholdTidligere,
    erEndringssøknad = false,
    mellomlagreSøknadOgNaviger = action('button-click'),
    gåTilNesteSide,
    avbrytSøknad = action('button-click'),
    sendSøknad = () => Promise.resolve(),
}) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage').reply(200, undefined);
    };
    return (
        <AxiosMock mock={restMock}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [FpDataType.SØKER]: søker,
                    [FpDataType.ANNEN_FORELDER]: annenForelder,
                    [FpDataType.SØKERSITUASJON]: søkersituasjon,
                    [FpDataType.UTTAKSPLAN_METADATA]: {
                        tilleggsopplysninger,
                        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
                        ønskerJustertUttakVedFødsel: false,
                        harUttaksplanBlittSlettet: false,
                        antallUkerIUttaksplan: 1,
                    },
                    [FpDataType.OM_BARNET]: barn,
                    [FpDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                    [FpDataType.UTENLANDSOPPHOLD_SENERE]: utenlandsoppholdSenere,
                    [FpDataType.UTENLANDSOPPHOLD_TIDLIGERE]: utenlandsoppholdTidligere,
                    [FpDataType.UTTAKSPLAN]: defaultUttaksplan,
                }}
            >
                <Oppsummering
                    erEndringssøknad={erEndringssøknad}
                    sendSøknad={sendSøknad}
                    søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)}
                    avbrytSøknad={avbrytSøknad}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />
            </FpDataContext>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    søkerinfo,
};

export const MedAnnenForelder = Template.bind({});
MedAnnenForelder.args = {
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
};

export const MedAleneOmsorg = Template.bind({});
MedAleneOmsorg.args = {
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
};

export const FarMedUførMor = Template.bind({});
FarMedUførMor.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søker: {
        språkkode: 'nb',
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
    tilleggsopplysninger: {
        begrunnelseForSenEndring: {
            tekst: 'Utsettelsesgrunn',
        },
    },
    søkerinfo,
};

export const FarMedMorSomHarRettIEØS = Template.bind({});
FarMedMorSomHarRettIEØS.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
};

export const FarMedMorSomHaroppholdsSegIEØSMenIkkeHarRettIEØS = Template.bind({});
FarMedMorSomHarRettIEØS.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
};

export const FarMedMorSomHarRettINorge = Template.bind({});
FarMedMorSomHarRettINorge.args = {
    søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
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
    søkerinfo,
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
                    fom: '2021-01-01',
                    tom: '2021-12-31',
                },
            },
        ],
    },
    utenlandsoppholdTidligere: {
        tidligereOpphold: [
            {
                land: 'SE',
                tidsperiode: {
                    fom: '2020-01-01',
                    tom: '2020-12-31',
                },
            },
        ],
    },
    søkerinfo,
};

export const MedArbeidsforholdOgAndreInntekter = Template.bind({});
MedArbeidsforholdOgAndreInntekter.args = {
    søker: {
        språkkode: 'nb',
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
        søker: {
            ...søkerinfo.søker,
        },
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
    } as SøkerinfoDTO,
};

export const MedSelvstendigNæringsdrivende = Template.bind({});
MedSelvstendigNæringsdrivende.args = {
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
};

export const MedSelvstendigNæringsdrivendeUtenDiverse = Template.bind({});
MedSelvstendigNæringsdrivendeUtenDiverse.args = {
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
};

export const MedAndreInntekterJobbIUtlandet = Template.bind({});
MedAndreInntekterJobbIUtlandet.args = {
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
};

export const MedAndreInntekterMilitærtjeneste = Template.bind({});
MedAndreInntekterMilitærtjeneste.args = {
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
};

export const ErEndringssøknad = Template.bind({});
ErEndringssøknad.args = {
    erEndringssøknad: true,
    søker: {
        språkkode: 'nb',
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
    søkerinfo,
};
