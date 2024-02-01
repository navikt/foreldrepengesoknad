import { AnnenForelder, BarnType, Dekningsgrad } from '@navikt/fp-common';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';

import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import Søker from 'app/context/types/Søker';
import SøknadRoutes from 'app/routes/routes';
import { RequestStatus } from 'app/types/RequestState';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { MemoryRouter } from 'react-router-dom';
import _søkerinfoMorSøker from 'storybook/storyData/sokerinfo/søkerinfoMorSøker.json';
import _søkerinfoFarSøker from 'storybook/storyData/sokerinfo/søkerinfoFarSøker.json';
import stønadskonto100Adopsjon from 'storybook/storyData/stonadskontoer/stønadskonto100Adopsjon.json';
import stønadskonto80Adopsjon from 'storybook/storyData/stonadskontoer/stønadskonto80Adopsjon.json';
import stønadskontoDeltUttak80Adopsjon from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80Adopsjon.json';
import stønadskontoDeltUttak100Adopsjon from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100Adopsjon.json';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import AxiosMock from 'storybook/utils/AxiosMock';
import UttaksplanInfo from './UttaksplanInfo';
import { initAmplitude } from '@navikt/fp-metrics';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfoFarSøker = _søkerinfoFarSøker as any;
const søkerinfoMorSøker = _søkerinfoMorSøker as any;

export default {
    title: 'steps/uttaksplan-info/MorFarAdopsjon',
    component: UttaksplanInfo,
};

const Template: StoryFn<
    UttaksplanInfoTestData & { dekningsgrad: Dekningsgrad; annenForelder: AnnenForelder; erMor: boolean; søker: Søker }
> = (args) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
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
                            antallBarn: args.antallBarn,
                            adopsjonsdato: args.adopsjonsdato,
                            adoptertIUtlandet: false,
                            dokumentasjonAvAleneomsorg: [],
                            fødselsdatoer: [],
                            omsorgsovertakelse: [],
                        },
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                        [ContextDataType.SØKER]: args.søker,
                        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
                    }}
                >
                    <UttaksplanInfo
                        søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)}
                        erEndringssøknad={false}
                        mellomlagreSøknadOgNaviger={() => Promise.resolve()}
                        avbrytSøknad={() => undefined}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const AdopsjonMorMedAleneomsorgDekningsgrad100Før1Okt2021 = Template.bind({});
AdopsjonMorMedAleneomsorgDekningsgrad100Før1Okt2021.args = {
    stønadskonto100: stønadskonto100Adopsjon,
    stønadskonto80: stønadskonto80Adopsjon,
    søkerinfo: søkerinfoMorSøker,
    erMor: true,
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søker: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    adopsjonsdato: dayjs('2021-03-15').toDate(),
    antallBarn: 1,
};

export const AdopsjonFarMedAleneomsorgDekningsgrad80TvillingerFør1Okt2021 = Template.bind({});
AdopsjonFarMedAleneomsorgDekningsgrad80TvillingerFør1Okt2021.args = {
    stønadskonto100: stønadskonto100Adopsjon,
    stønadskonto80: stønadskonto80Adopsjon,
    søkerinfo: søkerinfoFarSøker,
    erMor: false,
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søker: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    adopsjonsdato: dayjs('2021-03-15').toDate(),
    antallBarn: 2,
};

export const AdopsjonMorMedAleneomsorgDekningsgrad80Etter1Okt2021 = Template.bind({});
AdopsjonMorMedAleneomsorgDekningsgrad80Etter1Okt2021.args = {
    stønadskonto100: stønadskonto100Adopsjon,
    stønadskonto80: stønadskonto80Adopsjon,
    søkerinfo: søkerinfoMorSøker,
    erMor: true,
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søker: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    adopsjonsdato: dayjs('2021-11-15').toDate(),
    antallBarn: 1,
};

export const AdopsjonFarMedAleneomsorgDekningsgrad100Etter1Okt2021 = Template.bind({});
AdopsjonFarMedAleneomsorgDekningsgrad100Etter1Okt2021.args = {
    stønadskonto100: stønadskonto100Adopsjon,
    stønadskonto80: stønadskonto80Adopsjon,
    søkerinfo: søkerinfoFarSøker,
    erMor: false,
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søker: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    adopsjonsdato: dayjs('2022-09-15').toDate(),
    antallBarn: 1,
};

export const AdopsjonDeltUttakDerMorSøker = Template.bind({});
AdopsjonDeltUttakDerMorSøker.args = {
    stønadskonto100: stønadskontoDeltUttak100Adopsjon,
    stønadskonto80: stønadskontoDeltUttak80Adopsjon,
    erMor: true,
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoMorSøker,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    antallBarn: 1,
};

export const AdopsjonDeltUttakDerFarSøker100 = Template.bind({});
AdopsjonDeltUttakDerFarSøker100.args = {
    stønadskonto100: stønadskontoDeltUttak100Adopsjon,
    stønadskonto80: stønadskontoDeltUttak80Adopsjon,
    erMor: false,
    annenForelder: {
        fornavn: 'Talentfull',
        etternavn: 'Mygg',
        fnr: '19047815714',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFarSøker,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    antallBarn: 1,
};

export const AdopsjonMedDeltUttakDerFarSøker80 = Template.bind({});
AdopsjonMedDeltUttakDerFarSøker80.args = {
    stønadskonto100: stønadskontoDeltUttak100Adopsjon,
    stønadskonto80: stønadskontoDeltUttak80Adopsjon,
    erMor: false,
    annenForelder: {
        fornavn: 'Talentfull',
        etternavn: 'Mygg',
        fnr: '19047815714',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFarSøker,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    antallBarn: 1,
};

export const AdopsjonMedDeltUttakDerFarSøker80Tvillinger = Template.bind({});
AdopsjonMedDeltUttakDerFarSøker80Tvillinger.args = {
    stønadskonto100: stønadskontoDeltUttak100Adopsjon,
    stønadskonto80: stønadskontoDeltUttak80Adopsjon,
    erMor: false,
    annenForelder: {
        fornavn: 'Talentfull',
        etternavn: 'Mygg',
        fnr: '19047815714',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFarSøker,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    antallBarn: 2,
};
