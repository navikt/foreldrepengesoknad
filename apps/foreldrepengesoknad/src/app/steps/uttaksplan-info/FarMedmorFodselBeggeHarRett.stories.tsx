import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import { Barn, BarnType, Dekningsgrad } from '@navikt/fp-common';
import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { RequestStatus } from 'app/types/RequestState';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import _søkerinfo from 'storybook/storyData/uttaksplan/far-medmor-fødsel-begge-har-rett/søkerinfo.json';
import AxiosMock from 'storybook/utils/AxiosMock';
import UttaksplanInfo from './UttaksplanInfo';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import { initAmplitude } from '@navikt/fp-metrics';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfo = _søkerinfo as any;

export default {
    title: 'steps/uttaksplan-info/FarMedmorFødselBeggeHarRett',
    component: UttaksplanInfo,
};

const Template: StoryFn<UttaksplanInfoTestData & { barn: Barn; dekningsgrad: Dekningsgrad }> = (args) => {
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
                            rolle: 'far',
                        },
                        [ContextDataType.OM_BARNET]: args.barn,
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                        [ContextDataType.SØKER]: {
                            erAleneOmOmsorg: false,
                            harJobbetSomFrilansSiste10Mnd: false,
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                            harHattAnnenInntektSiste10Mnd: false,
                        },
                        [ContextDataType.ANNEN_FORELDER]: {
                            etternavn: 'dfg',
                            fornavn: 'dfg',
                            fnr: '02068629902',
                            utenlandskFnr: false,
                            kanIkkeOppgis: false,
                            harRettPåForeldrepengerINorge: true,
                            erInformertOmSøknaden: true,
                        },
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

export const UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad100 = Template.bind({});
UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad100.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-06-14').toDate()],
        antallBarn: 1,
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad80 = Template.bind({});
UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad80.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-06-14').toDate()],
        antallBarn: 1,
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};

export const UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB = Template.bind({});
UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-08-02').toDate()],
        antallBarn: 1,
    },
    søkerinfo,
};
