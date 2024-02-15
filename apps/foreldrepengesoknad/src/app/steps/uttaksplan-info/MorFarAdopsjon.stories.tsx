import { AnnenForelder, BarnType, Dekningsgrad } from '@navikt/fp-common';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';
import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøkerData from 'app/context/types/SøkerData';
import SøknadRoutes from 'app/routes/routes';
import { RequestStatus } from 'app/types/RequestState';
import { MemoryRouter } from 'react-router-dom';
import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import AxiosMock from 'storybook/utils/AxiosMock';
import UttaksplanInfo from './UttaksplanInfo';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo } from '@navikt/fp-types';

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

const søkerinfoMor = {
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
} as Søkerinfo;

export default {
    title: 'steps/uttaksplan-info/MorFarAdopsjon',
    component: UttaksplanInfo,
};

const Template: StoryFn<
    UttaksplanInfoTestData & {
        dekningsgrad: Dekningsgrad;
        annenForelder: AnnenForelder;
        erMor: boolean;
        søkerData: SøkerData;
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
                        [ContextDataType.SØKERSITUASJON]: {
                            situasjon: 'adopsjon',
                            rolle: args.erMor ? 'mor' : 'far',
                        },
                        [ContextDataType.OM_BARNET]: {
                            type: BarnType.ADOPTERT_ANNET_BARN,
                            antallBarn: 1,
                            adopsjonsdato: dayjs('2021-03-15').toDate(),
                            adoptertIUtlandet: false,
                            fødselsdatoer: [],
                        },
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                        [ContextDataType.SØKER_DATA]: args.søkerData,
                        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
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

export const UttaksplanMedAleneomsorgDekningsgrad100 = Template.bind({});
UttaksplanMedAleneomsorgDekningsgrad100.args = {
    stønadskonto100,
    stønadskonto80,
    søkerinfo: søkerinfoMor,
    erMor: true,
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søkerData: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanMedAleneomsorgDekningsgrad80 = Template.bind({});
UttaksplanMedAleneomsorgDekningsgrad80.args = {
    stønadskonto100,
    stønadskonto80,
    søkerinfo: søkerinfoMor,
    erMor: true,
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søkerData: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};

export const UttaksplanMedDeltUttakDerMorSøker = Template.bind({});
UttaksplanMedDeltUttakDerMorSøker.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    erMor: true,
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søkerData: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoMor,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanMedDeltUttakDerFarSøker100 = Template.bind({});
UttaksplanMedDeltUttakDerFarSøker100.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    erMor: false,
    annenForelder: {
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        fnr: '19047815714',
        harRettPåForeldrepengerINorge: true,
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

export const UttaksplanMedDeltUttakDerFarSøker80 = Template.bind({});
UttaksplanMedDeltUttakDerFarSøker80.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    erMor: false,
    annenForelder: {
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        fnr: '19047815714',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søkerData: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFar,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};
