import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';
import _søkerinfo from 'storybook/storyData/uttaksplan/far-medmor-fødsel-begge-har-rett/søkerinfo.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoDeltUttak100PrematurWLB from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100PrematurWLB.json';
import stønadskontoDeltUttak80WLB from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80WLB.json';
import stønadskontoDeltUttak100WLB from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100WLB.json';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { Barn, BarnType, Dekningsgrad } from '@navikt/fp-common';
import dayjs from 'dayjs';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfo = _søkerinfo as any;

export default {
    title: 'steps/uttaksplan-info/FarMedmorFødselBeggeHarRett',
    component: UttaksplanInfo,
    decorators: [withRouter],
};

const Template: StoryFn<UttaksplanInfoTestData & { barn: Barn; dekningsgrad: Dekningsgrad }> = (args) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    };
    return (
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
                        etternavn: 'Hanson',
                        fornavn: 'Hanne',
                        fnr: '02468629902',
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
    );
};

export const FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB = Template.bind({});
FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-08-01').toDate()],
        antallBarn: 1,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB = Template.bind({});
FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB.args = {
    stønadskonto100: stønadskontoDeltUttak100WLB,
    stønadskonto80: stønadskontoDeltUttak80WLB,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-08-03').toDate()],
        antallBarn: 1,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin = Template.bind({});
FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin.args = {
    stønadskonto100: stønadskontoDeltUttak100WLB,
    stønadskonto80: stønadskontoDeltUttak80WLB,
    barn: {
        type: BarnType.UFØDT,
        termindato: new Date('2022-08-31'),
        antallBarn: 1,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};

export const FarMedmorFødselBeggeHarRettFødselFør1Okt2021 = Template.bind({});
FarMedmorFødselBeggeHarRettFødselFør1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-09-02').toDate()],
        antallBarn: 1,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorFødselBeggeHarRettTvillinger = Template.bind({});
FarMedmorFødselBeggeHarRettTvillinger.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-09-02').toDate()],
        antallBarn: 2,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorPrematurFødselBeggeHarRettPrematur = Template.bind({});
FarMedmorPrematurFødselBeggeHarRettPrematur.args = {
    stønadskonto100: stønadskontoDeltUttak100PrematurWLB,
    stønadskonto80: stønadskontoDeltUttak100PrematurWLB,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2023-01-25').toDate()],
        termindato: dayjs('2023-04-01').toDate(),
        antallBarn: 1,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};
