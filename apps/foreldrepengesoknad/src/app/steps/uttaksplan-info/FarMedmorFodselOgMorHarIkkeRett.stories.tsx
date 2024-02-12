import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import AxiosMock from 'storybook/utils/AxiosMock';
import FarMedmorFødselOgMorHarIkkeRett from 'app/steps/uttaksplan-info/components/scenarios/far-medmor-fødsel-og-mor-har-ikke-rett/FarMedmorFødselOgMorHarIkkeRett';
import { RequestStatus } from 'app/types/RequestState';
import stønadskonto80MorHarIkkeRett from 'storybook/storyData/stonadskontoer/stønadskonto80MorHarIkkeRett.json';
import stønadskonto100MorHarIkkeRett from 'storybook/storyData/stonadskontoer/stønadskonto100MorHarIkkeRett.json';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import { AnnenForelder, BarnType, Dekningsgrad } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import SøknadRoutes from 'app/routes/routes';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo } from '@navikt/fp-types';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfoFarSøker = {
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
    title: 'steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett',
    component: FarMedmorFødselOgMorHarIkkeRett,
};

const Template: StoryFn<UttaksplanInfoTestData & { dekningsgrad: Dekningsgrad; annenForelder: AnnenForelder }> = (
    args,
) => {
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
                        [ContextDataType.OM_BARNET]: {
                            type: BarnType.FØDT,
                            fødselsdatoer: [dayjs('2021-07-01').toDate()],
                            antallBarn: 1,
                            termindato: dayjs('2021-07-01').toDate(),
                        },
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                        [ContextDataType.SØKER_DATA]: {
                            erAleneOmOmsorg: false,
                            harJobbetSomFrilansSiste10Mnd: false,
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                            harHattAnnenInntektSiste10Mnd: false,
                        },
                        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
                    }}
                >
                    <UttaksplanInfo
                        søker={søkerinfoFarSøker.søker}
                        erEndringssøknad={false}
                        mellomlagreSøknadOgNaviger={() => Promise.resolve()}
                        avbrytSøknad={() => undefined}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100 = Template.bind({});
UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad100.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRett,
    stønadskonto80: stønadskonto80MorHarIkkeRett,
    annenForelder: {
        etternavn: 'dfg',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80 = Template.bind({});
UttaksplanDerMorIkkeHarRettPåForeldrepengerDekningsgrad80.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRett,
    stønadskonto80: stønadskonto80MorHarIkkeRett,
    annenForelder: {
        etternavn: 'dfg',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};

export const UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør = Template.bind({});
UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRett,
    stønadskonto80: stønadskonto80MorHarIkkeRett,
    annenForelder: {
        etternavn: 'dfg',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: true,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
};
