import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';
import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskontoDeltUttak80WLB from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80WLB.json';
import stønadskontoDeltUttak100PrematurWLB from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100PrematurWLB.json';
import stønadskontoDeltUttak100WLB from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100WLB.json';
import stønadskontoFlerbarnsuker80 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker80.json';
import stønadskontoFlerbarnsuker100 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker100.json';
import AxiosMock from 'storybook/utils/AxiosMock';

import { AnnenForelder, Barn, BarnType, Dekningsgrad, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';

import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøkerData from 'app/context/types/SøkerData';
import SøknadRoutes from 'app/routes/routes';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { RequestStatus } from 'app/types/RequestState';

import UttaksplanInfo from './UttaksplanInfo';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const uttaksplanFar = [
    {
        fom: '2024-02-07',
        tom: '2024-02-27',
        kontoType: 'MØDREKVOTE',
        overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
        resultat: {
            innvilget: true,
            trekkerMinsterett: false,
            trekkerDager: true,
            årsak: 'ANNET',
        },
    },
    {
        fom: '2024-06-11',
        tom: '2024-06-30',
        kontoType: 'FELLESPERIODE',
        resultat: {
            innvilget: true,
            trekkerMinsterett: false,
            trekkerDager: true,
            årsak: 'ANNET',
        },
    },
] as SaksperiodeDTO[];

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
        if (args.uttaksplanAnnenPart) {
            apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(
                200,
                {
                    perioder: args.uttaksplanAnnenPart,
                    dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
                } as AnnenPartVedtakDTO,
                RequestStatus.FINISHED,
            );
        } else {
            apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        }
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

export const MorAleneomsorgDekningsgrad100Før1Okt2021 = Template.bind({});
MorAleneomsorgDekningsgrad100Før1Okt2021.args = {
    stønadskonto100,
    stønadskonto80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2021-03-15'],
        antallBarn: 1,
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søkerData: {
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorAleneomsorgDekningsgrad80Før1Okt2021 = Template.bind({});
MorAleneomsorgDekningsgrad80Før1Okt2021.args = {
    stønadskonto100,
    stønadskonto80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2021-03-15'],
        antallBarn: 1,
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søkerData: {
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};

export const MorAleneomsorgPrematurFødsel = Template.bind({});
MorAleneomsorgPrematurFødsel.args = {
    stønadskonto100,
    stønadskonto80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2023-01-25').toDate()],
        termindato: dayjs('2023-04-01').toDate(),
        antallBarn: 1,
        fødselsdatoer: ['2021-01-11'],
        termindato: '2021-03-11',
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søkerData: {
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};
export const MorDeltUttakPrematurFødselDekningsgrad100 = Template.bind({});
MorDeltUttakPrematurFødselDekningsgrad100.args = {
    stønadskonto100: stønadskontoDeltUttak100PrematurWLB,
    stønadskonto80: stønadskontoDeltUttak100PrematurWLB,
    barn: {
        type: BarnType.FØDT,
        antallBarn: 1,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        datoForAleneomsorg: dayjs().format(ISO_DATE_FORMAT),
        erAleneOmOmsorg: false,
    },
    søkerData: {
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorDeltUttakDekningsgrad100EtterWLB = Template.bind({});
MorDeltUttakDekningsgrad100EtterWLB.args = {
    stønadskonto100: stønadskontoDeltUttak100WLB,
    stønadskonto80: stønadskontoDeltUttak80WLB,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-12-15').toDate()],
        antallBarn: 1,
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

export const MorDeltUttakTvillingerDekningsgrad100FørWLB = Template.bind({});
MorDeltUttakTvillingerDekningsgrad100FørWLB.args = {
    stønadskonto100: stønadskontoFlerbarnsuker100,
    stønadskonto80: stønadskontoFlerbarnsuker80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-07-15').toDate()],
        antallBarn: 2,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        datoForAleneomsorg: dayjs().format(ISO_DATE_FORMAT),
        erAleneOmOmsorg: false,
    },
    søkerData: {
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorDeltUttakFarSøkteMorsKvoteOgFellesperiode = Template.bind({});
MorDeltUttakFarSøkteMorsKvoteOgFellesperiode.args = {
    stønadskonto100: stønadskontoDeltUttak100WLB,
    stønadskonto80: stønadskontoDeltUttak80WLB,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2024-01-15').toDate()],
        antallBarn: 1,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        utenlandskFnr: false,
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erInformertOmSøknaden: true,
    },
    søkerData: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    uttaksplanAnnenPart: uttaksplanFar,
};

export const MorSøkerOgFarHarIkkeRett = Template.bind({});
MorSøkerOgFarHarIkkeRett.args = {
    stønadskonto100: stønadskonto100,
    stønadskonto80: stønadskonto80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2024-01-15').toDate()],
        antallBarn: 1,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        utenlandskFnr: false,
        harRettPåForeldrepengerINorge: false,
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
