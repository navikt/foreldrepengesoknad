import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';

import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';

import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import { AnnenForelder, Barn, BarnType, Dekningsgrad } from '@navikt/fp-common';
import Søker from 'app/context/types/Søker';
import dayjs from 'dayjs';
import { Søkerinfo, SøkersituasjonFp } from '@navikt/fp-types';
import { MemoryRouter } from 'react-router-dom';
import SøknadRoutes from 'app/routes/routes';
import { initAmplitude } from '@navikt/fp-metrics';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfoFar = {
    person: {
        fnr: '1212121313',
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        kjønn: 'M',
        fødselsdato: '1978-04-12',
        barn: [
            {
                fnr: '19047815714',
                fødselsdato: '2021-03-15',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'TALENTFULL',
                    etternavn: 'MYGG',
                },
                fornavn: 'KLØKTIG',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
        ],
    },
} as Søkerinfo;

export default {
    title: 'steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS',
    component: UttaksplanInfo,
};

const Template: StoryFn<
    UttaksplanInfoTestData & {
        søkersituasjon: SøkersituasjonFp;
        annenForelder: AnnenForelder;
        barn: Barn;
        søker: Søker;
        dekningsgrad: Dekningsgrad;
    }
> = (args) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
                        [ContextDataType.OM_BARNET]: args.barn,
                        [ContextDataType.SØKER]: args.søker,
                        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                    }}
                >
                    <UttaksplanInfo
                        person={args.søkerinfo.person}
                        erEndringssøknad={false}
                        mellomlagreSøknadOgNaviger={() => Promise.resolve()}
                        avbrytSøknad={() => undefined}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const UttaksplanAdopsjonMorSøkerFarHarRettIEOS = Template.bind({});
UttaksplanAdopsjonMorSøkerFarHarRettIEOS.args = {
    stønadskonto100,
    stønadskonto80,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barn: {
        antallBarn: 1,
        type: BarnType.ADOPTERT_ANNET_BARN,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: [],
    },
    annenForelder: {
        fornavn: 'Far',
        etternavn: 'EØS',
        fnr: '1111UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: {
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
        },
        arbeidsforhold: [],
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanAdopsjonFarSøkerMorHarRettIEOS = Template.bind({});
UttaksplanAdopsjonFarSøkerMorHarRettIEOS.args = {
    stønadskonto100,
    stønadskonto80,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'far',
    },
    barn: {
        antallBarn: 1,
        type: BarnType.ADOPTERT_ANNET_BARN,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: [],
    },
    annenForelder: {
        fornavn: 'Mor',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFar,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger = Template.bind({});
UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger.args = {
    stønadskonto100,
    stønadskonto80,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barn: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [dayjs('2022-06-14').toDate(), dayjs('2022-06-14').toDate()],
        antallBarn: 2,
        // @ts-ignore FIX
        adopsjonsdato: undefined,
        adoptertIUtlandet: undefined,
    },
    annenForelder: {
        fornavn: 'Mor',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFar,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanFødselMorSøkerFarHarRettIEOSPrematur = Template.bind({});
UttaksplanFødselMorSøkerFarHarRettIEOSPrematur.args = {
    stønadskonto100,
    stønadskonto80,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn: {
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [dayjs('2022-06-14').toDate()],
        termindato: dayjs('2022-08-14').toDate(),
        antallBarn: 1,
        // @ts-ignore FIX
        adopsjonsdato: undefined,
        adoptertIUtlandet: undefined,
        type: BarnType.FØDT,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFar,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};
