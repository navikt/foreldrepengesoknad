import dayjs from 'dayjs';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { BarnType, Dekningsgrad } from '@navikt/fp-common';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';
import stønadskonto80AleneomsorgFar from 'storybook/storyData/stonadskontoer/stønadskonto80AleneomsorgFar.json';
import stønadskonto100AleneomsorgFar from 'storybook/storyData/stonadskontoer/stønadskonto100AleneomsorgFar.json';
import stønadskonto100AleneomsorgFarTrillinger from 'storybook/storyData/stonadskontoer/stønadskonto100AleneomsorgFarTrillinger.json';
import stønadskonto100AleneomsorgFarPrematur from 'storybook/storyData/stonadskontoer/stønadskonto100AleneomsorgFarPrematur.json';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import UttaksplanInfo from './UttaksplanInfo';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import SøknadRoutes from 'app/routes/routes';
import { MemoryRouter } from 'react-router-dom';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo } from '@navikt/fp-types';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = 'test/konto';

const søkerinfo = {
    søker: {
        fnr: '19047815714',
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        kjønn: 'M',
        fødselsdato: '1978-04-19',
        barn: [],
    },
    arbeidsforhold: [],
} as Søkerinfo;

export default {
    title: 'steps/uttaksplan-info/FarMedmorFødselAleneomsorg',
    component: UttaksplanInfo,
};

const Template: StoryFn<UttaksplanInfoTestData & { dekningsgrad: Dekningsgrad }> = (args) => {
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
                            situasjon: 'fødsel',
                            rolle: 'far',
                        },
                        [ContextDataType.OM_BARNET]: {
                            type: BarnType.FØDT,
                            fødselsdatoer: args.fødselsdatoer,
                            termindato: args.termindato,
                            antallBarn: args.antallBarn,
                            datoForAleneomsorg: dayjs('2022-03-24').toDate(),
                            dokumentasjonAvAleneomsorg: [],
                        },
                        [ContextDataType.SØKER_DATA]: {
                            erAleneOmOmsorg: true,
                            harJobbetSomFrilansSiste10Mnd: false,
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                            harHattAnnenInntektSiste10Mnd: false,
                        },
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                        [ContextDataType.ANNEN_FORELDER]: {
                            etternavn: 'Hanne',
                            fornavn: 'Hanson',
                            fnr: '02068629902',
                            utenlandskFnr: false,
                            kanIkkeOppgis: false,
                            harRettPåForeldrepengerINorge: true,
                            erInformertOmSøknaden: true,
                        },
                    }}
                >
                    <UttaksplanInfo
                        søker={søkerinfo.søker}
                        erEndringssøknad={false}
                        mellomlagreSøknadOgNaviger={() => Promise.resolve()}
                        avbrytSøknad={() => undefined}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const FarMedmorFødselAleneomsorgDekningsgrad100 = Template.bind({});
FarMedmorFødselAleneomsorgDekningsgrad100.args = {
    stønadskonto100: stønadskonto100AleneomsorgFar,
    stønadskonto80: stønadskonto80AleneomsorgFar,
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    antallBarn: 1,
    fødselsdatoer: [dayjs('2022-03-01').toDate()],
};

export const FarMedmorFødselAleneomsorgDekningsgrad80 = Template.bind({});
FarMedmorFødselAleneomsorgDekningsgrad80.args = {
    stønadskonto100: stønadskonto100AleneomsorgFar,
    stønadskonto80: stønadskonto80AleneomsorgFar,
    søkerinfo,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    antallBarn: 1,
    fødselsdatoer: [dayjs('2022-03-01').toDate()],
};

export const FarMedmorFødselAleneomsorgFør1Okt2021 = Template.bind({});
FarMedmorFødselAleneomsorgFør1Okt2021.args = {
    stønadskonto100: stønadskonto100AleneomsorgFar,
    stønadskonto80: stønadskonto80AleneomsorgFar,
    søkerinfo,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    antallBarn: 1,
    fødselsdatoer: [dayjs('2021-09-30').toDate()],
};

export const FarMedmorFødselAleneomsorgEtter1Okt2021Trillinger = Template.bind({});
FarMedmorFødselAleneomsorgEtter1Okt2021Trillinger.args = {
    stønadskonto100: stønadskonto100AleneomsorgFarTrillinger,
    stønadskonto80: stønadskonto100AleneomsorgFarTrillinger,
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    antallBarn: 3,
    fødselsdatoer: [dayjs('2023-01-04').toDate()],
};

export const FarMedmorFødselAleneomsorgPrematureUker = Template.bind({});
FarMedmorFødselAleneomsorgPrematureUker.args = {
    stønadskonto100: stønadskonto100AleneomsorgFarPrematur,
    stønadskonto80: stønadskonto100AleneomsorgFarPrematur,
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    antallBarn: 1,
    fødselsdatoer: [dayjs('2023-01-25').toDate()],
    termindato: dayjs('2023-04-01').toDate(),
};
