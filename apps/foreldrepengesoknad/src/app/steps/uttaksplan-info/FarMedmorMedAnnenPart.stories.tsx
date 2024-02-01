import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';
import _søkerinfo from 'storybook/storyData/uttaksplan/far-medmor-fødsel-begge-har-rett/søkerinfo.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoDeltUttak100Tvillinger from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100Tvillinger.json';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { Barn, BarnType, Dekningsgrad, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import { initAmplitude } from '@navikt/fp-metrics';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfo = _søkerinfo as any;

const uttaksperiodeFedrekvote = {
    fom: '2022-12-07',
    tom: '2022-12-27',
    kontoType: 'FEDREKVOTE',
    resultat: {
        innvilget: true,
        trekkerMinsterett: false,
        trekkerDager: true,
        årsak: 'ANNET',
    },
} as SaksperiodeDTO;

const uttaksperiodeFellesperiode = {
    fom: '2022-12-07',
    tom: '2023-01-07',
    kontoType: 'FELLESPERIODE',
    resultat: {
        innvilget: true,
        trekkerMinsterett: false,
        trekkerDager: true,
        årsak: 'ANNET',
    },
    gradering: {
        arbeidstidprosent: 55,
        aktivitet: {
            type: 'FRILANS',
            arbeidsgiver: {
                id: 'string',
                type: 'PRIVAT',
            },
        },
    },
    samtidigUttak: 50,
    flerbarnsdager: true,
} as SaksperiodeDTO;

export default {
    title: 'steps/uttaksplan-info/FarMedmorMedAnnenPart',
    component: UttaksplanInfo,
};

const Template: StoryFn<UttaksplanInfoTestData & { barn: Barn; dekningsgrad: Dekningsgrad }> = (args) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(
            200,
            {
                perioder: args.uttaksplanAnnenPart,
                dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
            } as AnnenPartVedtakDTO,
            RequestStatus.FINISHED,
        );
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
                            etternavn: 'Pettersen',
                            fornavn: 'Helga',
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

export const FarSøkerEtterMorFør1Okt2021 = Template.bind({});
FarSøkerEtterMorFør1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-06-14').toDate()],
        antallBarn: 1,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    uttaksplanAnnenPart: [uttaksperiodeFellesperiode],
};

export const FarSøkerEtterMorEtter1Okt2021 = Template.bind({});
FarSøkerEtterMorEtter1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-09-14').toDate()],
        antallBarn: 1,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    uttaksplanAnnenPart: [uttaksperiodeFellesperiode],
};

export const FarSøkerEtterMorTrillinger = Template.bind({});
FarSøkerEtterMorTrillinger.args = {
    stønadskonto100: stønadskontoDeltUttak100Tvillinger,
    stønadskonto80: stønadskontoDeltUttak100Tvillinger,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-09-14').toDate()],
        antallBarn: 3,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    uttaksplanAnnenPart: [uttaksperiodeFellesperiode],
};

export const FarSøkerEtterMorDerMorHarTattUtFarsKvote = Template.bind({});
FarSøkerEtterMorDerMorHarTattUtFarsKvote.args = {
    stønadskonto100: stønadskontoDeltUttak100Tvillinger,
    stønadskonto80: stønadskontoDeltUttak100Tvillinger,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-09-14').toDate()],
        antallBarn: 1,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    uttaksplanAnnenPart: [uttaksperiodeFedrekvote],
};
