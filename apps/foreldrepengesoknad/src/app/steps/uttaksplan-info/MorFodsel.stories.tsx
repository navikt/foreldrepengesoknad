import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';

import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';
import stønadskontoPrematurUker100 from 'storybook/storyData/stonadskontoer/stønadskontoPrematurUker100.json';
import stønadskontoPrematurUker80 from 'storybook/storyData/stonadskontoer/stønadskontoPrematurUker80.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoFlerbarnsuker80 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker80.json';
import stønadskontoFlerbarnsuker100 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker100.json';

import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import { AnnenForelder, Barn, BarnType, Dekningsgrad } from '@navikt/fp-common';
import SøkerData from 'app/context/types/SøkerData';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import SøknadRoutes from 'app/routes/routes';
import { initAmplitude } from '@navikt/fp-metrics';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

export default {
    title: 'steps/uttaksplan-info/MorFødsel',
    component: UttaksplanInfo,
};

const Template: StoryFn<
    UttaksplanInfoTestData & {
        dekningsgrad: Dekningsgrad;
        annenForelder: AnnenForelder;
        barn: Barn;
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
                            situasjon: 'fødsel',
                            rolle: 'mor',
                        },
                        [ContextDataType.OM_BARNET]: args.barn,
                        [ContextDataType.SØKER_DATA]: args.søkerData,
                        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                    }}
                >
                    <UttaksplanInfo
                        søker={{
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
                        }}
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
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
    },
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
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søkerData: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};

export const UttaksplanMedPrematurFødselDekningsgrad100 = Template.bind({});
UttaksplanMedPrematurFødselDekningsgrad100.args = {
    stønadskonto100: stønadskontoPrematurUker100,
    stønadskonto80: stønadskontoPrematurUker80,
    barn: {
        type: BarnType.FØDT,
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        fødselsdatoer: [dayjs('2021-01-11').toDate()],
        termindato: dayjs('2021-03-11').toDate(),
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søkerData: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanMedDeltUttakDekningsgrad100 = Template.bind({});
UttaksplanMedDeltUttakDekningsgrad100.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
    },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanMedFlerbarnsukerTvillingerDekningsgrad100 = Template.bind({});
UttaksplanMedFlerbarnsukerTvillingerDekningsgrad100.args = {
    stønadskonto100: stønadskontoFlerbarnsuker100,
    stønadskonto80: stønadskontoFlerbarnsuker80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 2,
        datoForAleneomsorg: new Date(),
    },
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};
