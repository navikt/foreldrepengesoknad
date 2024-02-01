import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import AxiosMock from 'storybook/utils/AxiosMock';
import FarMedmorFødselOgMorHarIkkeRett from 'app/steps/uttaksplan-info/components/scenarios/far-medmor-fødsel-og-mor-har-ikke-rett/FarMedmorFødselOgMorHarIkkeRett';
import { RequestStatus } from 'app/types/RequestState';
import _søkerinfoFarSøker from 'storybook/storyData/uttaksplan/far-medmor-fødsel-mor-har-ikke-rett/søkerinfoFarSøker.json';
import stønadskonto80MorHarIkkeRett from 'storybook/storyData/stonadskontoer/stønadskonto80MorHarIkkeRett.json';
import stønadskonto100MorHarIkkeRett from 'storybook/storyData/stonadskontoer/stønadskonto100MorHarIkkeRett.json';
import stønadskonto100MorHarIkkeRettPrematur from 'storybook/storyData/stonadskontoer/stønadskonto100MorHarIkkeRettPrematur.json';
import stønadskonto100MorHarIkkeRettErUfør from 'storybook/storyData/stonadskontoer/stønadskonto100MorHarIkkeRettErUfør.json';
import stønadskonto100MorHarIkkeRettErUførFør1okt2021 from 'storybook/storyData/stonadskontoer/stønadskonto100MorHarIkkeRettErUførFør1okt2021.json';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { AnnenForelder, BarnType, Dekningsgrad } from '@navikt/fp-common';
import { MemoryRouter } from 'react-router-dom';
import SøknadRoutes from 'app/routes/routes';
import { initAmplitude } from '@navikt/fp-metrics';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfoFarSøker = _søkerinfoFarSøker as any;

export default {
    title: 'steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett',
    component: FarMedmorFødselOgMorHarIkkeRett,
};

const Template: StoryFn<UttaksplanInfoTestData & { dekningsgrad: Dekningsgrad; annenForelder: AnnenForelder }> = (
    args,
) => {
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
                            antallBarn: 1,
                            termindato: args.termindato,
                        },
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                        [ContextDataType.SØKER]: {
                            erAleneOmOmsorg: false,
                            harJobbetSomFrilansSiste10Mnd: false,
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                            harHattAnnenInntektSiste10Mnd: false,
                        },
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

export const BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB = Template.bind({});
BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRett,
    stønadskonto80: stønadskonto80MorHarIkkeRett,
    søkerinfo: søkerinfoFarSøker,
    annenForelder: {
        etternavn: 'Hanne',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    fødselsdatoer: [new Date('2022-08-03')],
    termindato: new Date('2022-08-03'),
};

export const BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB = Template.bind({});
BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRett,
    stønadskonto80: stønadskonto80MorHarIkkeRett,
    søkerinfo: søkerinfoFarSøker,
    annenForelder: {
        etternavn: 'Hanne',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    fødselsdatoer: [new Date('2022-08-03')],
    termindato: new Date('2022-08-03'),
};

export const BareFarHarRettOgMorErUførEtterWLB = Template.bind({});
BareFarHarRettOgMorErUførEtterWLB.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRettErUfør,
    stønadskonto80: stønadskonto100MorHarIkkeRettErUfør,
    søkerinfo: søkerinfoFarSøker,
    annenForelder: {
        etternavn: 'Hanne',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: true,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    fødselsdatoer: [new Date('2022-08-03')],
    termindato: new Date('2022-08-03'),
};

export const BareFarHarRettOgMorErUførFør1Okt2021 = Template.bind({});
BareFarHarRettOgMorErUførFør1Okt2021.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRettErUførFør1okt2021,
    stønadskonto80: stønadskonto100MorHarIkkeRettErUførFør1okt2021,
    søkerinfo: søkerinfoFarSøker,
    annenForelder: {
        etternavn: 'Hanne',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: true,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    fødselsdatoer: [new Date('2021-09-29')],
    termindato: new Date('2021-01-29'),
};

export const BareFarHarRettOgPrematurFødsel = Template.bind({});
BareFarHarRettOgPrematurFødsel.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRettPrematur,
    stønadskonto80: stønadskonto100MorHarIkkeRettPrematur,
    søkerinfo: søkerinfoFarSøker,
    annenForelder: {
        etternavn: 'Hanne',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: true,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    fødselsdatoer: [new Date('2023-01-25')],
    termindato: new Date('2023-04-01'),
};
