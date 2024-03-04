import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak80Adopsjon from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80Adopsjon.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoDeltUttak100Adopsjon from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100Adopsjon.json';
import AxiosMock from 'storybook/utils/AxiosMock';

import { AnnenForelder, Barn, BarnType, Dekningsgrad } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo, SøkersituasjonFp } from '@navikt/fp-types';

import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøkerData from 'app/context/types/SøkerData';
import SøknadRoutes from 'app/routes/routes';
import { RequestStatus } from 'app/types/RequestState';

import UttaksplanInfo from './UttaksplanInfo';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfoFar = {
    søker: {
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
        søkerData: SøkerData;
        dekningsgrad: Dekningsgrad;
    }
> = (args) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.FORDELING]}>
            <AxiosMock mock={restMock}>
                <FpDataContext
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
                        [ContextDataType.OM_BARNET]: args.barn,
                        [ContextDataType.SØKER_DATA]: args.søkerData,
                        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                    }}
                >
                    <UttaksplanInfo
                        søker={args.søkerinfo.søker}
                        erEndringssøknad={false}
                        mellomlagreSøknadOgNaviger={() => Promise.resolve()}
                        avbrytSøknad={() => undefined}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const AdopsjonMorSøkerFarHarRettIEOSFør1Okt2021 = Template.bind({});
AdopsjonMorSøkerFarHarRettIEOSFør1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100Adopsjon,
    stønadskonto80: stønadskontoDeltUttak80Adopsjon,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barn: {
        antallBarn: 1,
        type: BarnType.ADOPTERT_ANNET_BARN,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        fødselsdatoer: [],
    },
    annenForelder: {
        fornavn: 'Eksotisk',
        etternavn: 'EØS',
        fnr: '1111UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søkerData: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: {
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
            ],
        },
        arbeidsforhold: [],
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const AdopsjonFarSøkerMorHarRettIEOSFør1Okt2021 = Template.bind({});
AdopsjonFarSøkerMorHarRettIEOSFør1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100Adopsjon,
    stønadskonto80: stønadskontoDeltUttak80Adopsjon,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'far',
    },
    barn: {
        antallBarn: 1,
        type: BarnType.ADOPTERT_ANNET_BARN,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        fødselsdatoer: [],
    },
    annenForelder: {
        fornavn: 'Palme',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søkerData: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFar,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FødselFarSøkerMorHarRettIEOSTvillingerEtter1Okt2021 = Template.bind({});
FødselFarSøkerMorHarRettIEOSTvillingerEtter1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-06-14').toDate(), dayjs('2022-06-14').toDate()],
        antallBarn: 2,
        // @ts-ignore FIX
        adopsjonsdato: undefined,
        adoptertIUtlandet: undefined,
    },
    annenForelder: {
        fornavn: 'Palme',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søkerData: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFar,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FødselMorSøkerFarHarRettIEOSPrematurEtterWLB = Template.bind({});
FødselMorSøkerFarHarRettIEOSPrematurEtterWLB.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn: {
        fødselsdatoer: [dayjs('2022-08-14').toDate()],
        termindato: dayjs('2022-10-14').toDate(),
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
    søkerData: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFar,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};
