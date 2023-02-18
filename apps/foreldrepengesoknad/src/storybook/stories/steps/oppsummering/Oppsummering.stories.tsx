import React from 'react';
import { Story } from '@storybook/react';

import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import withIntlProvider from '../../../decorators/withIntl';
import withRouter from '../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';
import { Næringstype } from 'app/context/types/Næring';
import { AnnenInntektType } from 'app/context/types/AnnenInntekt';
import AxiosMock from '../../../utils/AxiosMock';
import MockAdapter from 'axios-mock-adapter/types';

export default {
    title: 'steps/Oppsummering',
    component: Oppsummering,
    decorators: [withRouter, withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    context: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
}

const Template: Story<Props> = ({ context, søkerinfo }) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage').reply(200, undefined);
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Oppsummering />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context,
    søkerinfo,
};

export const MedAnnenForelder = Template.bind({});
MedAnnenForelder.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                erAleneOmOmsorg: false,
            },
            annenForelder: {
                fornavn: 'Espen',
                etternavn: 'Utvikler',
                fnr: '1212121313',
                harRettPåForeldrepengerINorge: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedAleneOmsorg = Template.bind({});
MedAleneOmsorg.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                erAleneOmOmsorg: true,
            },
            annenForelder: {
                fornavn: 'Ingen',
                etternavn: 'Omsorg',
                fnr: '1212121313',
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const FarMedUførMor = Template.bind({});
FarMedUførMor.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
            søker: {
                ...context.søknad.søker,
                erAleneOmOmsorg: false,
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
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const FarMedMorSomHarRettIEØS = Template.bind({});
FarMedMorSomHarRettIEØS.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
            søker: {
                ...context.søknad.søker,
                erAleneOmOmsorg: false,
            },
            annenForelder: {
                fornavn: 'Anne',
                etternavn: 'Forelder',
                fnr: '1515151616',
                harRettPåForeldrepengerINorge: false,
                harRettPåForeldrepengerIEØS: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const FarMedMorSomHarRettINorge = Template.bind({});
FarMedMorSomHarRettINorge.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: { situasjon: 'fødsel', rolle: 'far' },
            søker: {
                ...context.søknad.søker,
                erAleneOmOmsorg: false,
            },
            annenForelder: {
                fornavn: 'Frida',
                etternavn: 'Norsk',
                fnr: '01010012345',
                harRettPåForeldrepengerINorge: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedAdoptertBarn = Template.bind({});
MedAdoptertBarn.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                ...context.søknad.søkersituasjon,
                situasjon: 'adopsjon',
            },
            barn: {
                type: 'adoptertStebarn',
                antallBarn: 1,
                adopsjonsdato: '2021-10-01',
                fødselsdatoer: '2021-01-01',
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedUtenlandsopphold = Template.bind({});
MedUtenlandsopphold.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            informasjonOmUtenlandsopphold: {
                iNorgeNeste12Mnd: false,
                iNorgeSiste12Mnd: false,
                senereOpphold: [
                    {
                        land: 'SE',
                        tidsperiode: {
                            fom: '2021-01-01',
                            tom: '2021-12-31',
                        },
                    },
                ],
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
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedArbeidsforholdOgAndreInntekter = Template.bind({});
MedArbeidsforholdOgAndreInntekter.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                harJobbetSomFrilansSiste10Mnd: true,
                frilansInformasjon: {
                    jobberFremdelesSomFrilans: true,
                    oppstart: '2019-01-01',
                    harJobbetForNærVennEllerFamilieSiste10Mnd: false,
                    oppdragForNæreVennerEllerFamilieSiste10Mnd: [],
                },
            },
        },
    } as ForeldrepengesøknadContextState,
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

export const MedArbeidsforholdOgAndreInntekterJobbetForNærFamilie = Template.bind({});
MedArbeidsforholdOgAndreInntekterJobbetForNærFamilie.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                harJobbetSomFrilansSiste10Mnd: true,
                frilansInformasjon: {
                    jobberFremdelesSomFrilans: true,
                    oppstart: '2019-01-01',
                    harJobbetForNærVennEllerFamilieSiste10Mnd: true,
                    oppdragForNæreVennerEllerFamilieSiste10Mnd: [
                        {
                            navnPåArbeidsgiver: 'Auto Joachim Bilpleie',
                            pågående: true,
                            tidsperiode: {
                                fom: '2019-01-01',
                            },
                        },
                        {
                            navnPåArbeidsgiver: 'Taco Express',
                            pågående: false,
                            tidsperiode: {
                                fom: '2018-01-01',
                                tom: '2021-01-01',
                            },
                        },
                    ],
                },
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedSelvstendigNæringsdrivende = Template.bind({});
MedSelvstendigNæringsdrivende.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: true,
                selvstendigNæringsdrivendeInformasjon: [
                    {
                        navnPåNæringen: 'Fiske',
                        pågående: false,
                        tidsperiode: {
                            fom: '2018-01-01',
                            tom: '2021-01-01',
                        },
                        næringstyper: [Næringstype.FISKER],
                        organisasjonsnummer: '123',
                        næringsinntekt: 1000000,
                        registrertINorge: true,
                        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true,
                        hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
                        endringAvNæringsinntektInformasjon: {
                            dato: '2019-01-01',
                            næringsinntektEtterEndring: 1000000,
                            forklaring: 'Jobbar beinhardt!',
                        },
                        harRegnskapsfører: true,
                        regnskapsfører: {
                            navn: 'Espen Utvikler',
                            telefonnummer: 555904233,
                            erNærVennEllerFamilie: true,
                        },
                    },
                ],
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedSelvstendigNæringsdrivendeUtenDiverse = Template.bind({});
MedSelvstendigNæringsdrivendeUtenDiverse.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: true,
                selvstendigNæringsdrivendeInformasjon: [
                    {
                        navnPåNæringen: 'Fiske',
                        pågående: false,
                        tidsperiode: {
                            fom: '2018-01-01',
                            tom: '2021-01-01',
                        },
                        næringstyper: [Næringstype.FISKER],
                        registrertILand: 'SE',
                        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
                        hattVarigEndringAvNæringsinntektSiste4Kalenderår: false,
                        harRegnskapsfører: false,
                    },
                ],
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedAndreInntekterJobbIUtlandet = Template.bind({});
MedAndreInntekterJobbIUtlandet.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
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
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedAndreInntekterMilitærtjeneste = Template.bind({});
MedAndreInntekterMilitærtjeneste.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
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
                        ],
                    },
                ],
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};
