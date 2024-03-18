import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import AxiosMock from 'storybook/utils/AxiosMock';

import { AnnenForelder, Barn, BarnType, Dekningsgrad, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søker, SøkersituasjonFp } from '@navikt/fp-types';

import Environment from 'app/Environment';
import { FpApiDataContext } from 'app/api/context/FpApiDataContext';
import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';

import FordelingSteg from './FordelingSteg';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = `${Environment.REST_API_URL}/konto`;

const vedtakFar = {
    dekningsgrad: 'HUNDRE' as DekningsgradDTO,
    perioder: [
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
    ] as SaksperiodeDTO[],
};

const vedtakMor = {
    dekningsgrad: 'HUNDRE' as DekningsgradDTO,
    perioder: [
        {
            fom: '2024-07-07',
            tom: '2024-07-27',
            kontoType: 'FEDREKVOTE',
            overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
        {
            fom: '2024-08-11',
            tom: '2024-08-30',
            kontoType: 'FELLESPERIODE',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
    ] as SaksperiodeDTO[],
};

const søkerInfoKvinne = {
    fnr: '19047815714',
    fornavn: 'Hanne',
    etternavn: 'Mygg',
    kjønn: 'K',
    fødselsdato: '1978-04-19',
} as Søker;

const søkerInfoMann = {
    fnr: '19047815715',
    fornavn: 'Hans',
    etternavn: 'Mygg',
    kjønn: 'M',
    fødselsdato: '1972-06-07',
} as Søker;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const STØNADSKONTO_100 = {
    kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 80,
        FORELDREPENGER_FØR_FØDSEL: 15,
    },
    minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0,
    },
};

const STØNADSKONTO_80 = {
    kontoer: {
        MØDREKVOTE: 95,
        FEDREKVOTE: 95,
        FELLESPERIODE: 90,
        FORELDREPENGER_FØR_FØDSEL: 15,
    },
    minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0,
    },
};

export default {
    title: 'steps/FordelingSteg',
    component: FordelingSteg,
};

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    avbrytSøknad: () => void;
    gåTilNesteSide: (action: Action) => void;
    søkersituasjon: SøkersituasjonFp;
    annenForelder: AnnenForelder;
    barnet: Barn;
    stønadskonto100: TilgjengeligeStønadskontoerDTO;
    stønadskonto80: TilgjengeligeStønadskontoerDTO;
    erAleneOmOmsorg?: boolean;
    annenPartVedtak?: AnnenPartVedtakDTO;
    søkerInfo: Søker;
    dekningsgrad: Dekningsgrad;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    avbrytSøknad = action('button-click'),
    gåTilNesteSide,
    søkerInfo,
    søkersituasjon,
    annenForelder,
    barnet,
    stønadskonto100,
    stønadskonto80,
    annenPartVedtak,
    dekningsgrad,
}) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                            [ContextDataType.OM_BARNET]: barnet,
                            [ContextDataType.SØKER_DATA]: {
                                harJobbetSomFrilansSiste10Mnd: false,
                                harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                                harHattAnnenInntektSiste10Mnd: false,
                            },
                            [ContextDataType.ANNEN_FORELDER]: annenForelder,
                            [ContextDataType.PERIODE_MED_FORELDREPENGER]: { dekningsgrad },
                        }}
                    >
                        <FordelingSteg
                            arbeidsforhold={[]}
                            søker={søkerInfo}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={avbrytSøknad}
                        />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

//ALENEOMSORG

export const MorAleneomsorgDekning100EttBarnFør1Okt2021 = Template.bind({});
MorAleneomsorgDekning100EttBarnFør1Okt2021.args = {
    søkerInfo: søkerInfoKvinne,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2021-09-21'],
        antallBarn: 1,
        termindato: '2021-09-24',
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        kanIkkeOppgis: false,
        datoForAleneomsorg: '2021-09-21',
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorAleneomsorgDekning80EttBarnFør1Okt2021 = Template.bind({});
MorAleneomsorgDekning80EttBarnFør1Okt2021.args = {
    søkerInfo: søkerInfoKvinne,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2021-09-21'],
        antallBarn: 1,
        termindato: '2021-09-24',
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        kanIkkeOppgis: false,
        datoForAleneomsorg: '2021-09-21',
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};

export const MorAleneomsorgEttBarnPrematurFødsel = Template.bind({});
MorAleneomsorgEttBarnPrematurFødsel.args = {
    søkerInfo: søkerInfoKvinne,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2023-09-21'],
        antallBarn: 1,
        termindato: '2023-12-21',
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        datoForAleneomsorg: '2023-09-21',
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorAleneomsorgAdopsjonToBarn = Template.bind({});
MorAleneomsorgAdopsjonToBarn.args = {
    søkerInfo: søkerInfoKvinne,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.ADOPTERT_STEBARN,
        fødselsdatoer: ['2024-02-21'],
        antallBarn: 2,
        adopsjonsdato: '2024-02-21',
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorAleneomsorgFødtTvillinger = Template.bind({});
FarMedmorAleneomsorgFødtTvillinger.args = {
    søkerInfo: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2023-09-21'],
        antallBarn: 2,
        termindato: '2023-09-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        datoForAleneomsorg: '20213-09-21',
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorAleneomsorgFødtFireBarnFør1Okt2021 = Template.bind({});
FarMedmorAleneomsorgFødtFireBarnFør1Okt2021.args = {
    søkerInfo: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2021-09-21'],
        antallBarn: 4,
        termindato: '2021-09-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        datoForAleneomsorg: '2021-09-21',
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorAleneomsorgFødtTreBarnFørWLB = Template.bind({});
FarMedmorAleneomsorgFødtTreBarnFørWLB.args = {
    søkerInfo: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2022-07-21'],
        antallBarn: 3,
        termindato: '2022-07-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        datoForAleneomsorg: '2022-09-21',
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorAleneomsorgEttBarnTerminEtterWLB = Template.bind({});
FarMedmorAleneomsorgEttBarnTerminEtterWLB.args = {
    søkerInfo: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.UFØDT,
        antallBarn: 3,
        termindato: '2024-07-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        datoForAleneomsorg: '2024-09-21',
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorAleneomsorgPrematursFødtBarn = Template.bind({});
FarMedmorAleneomsorgPrematursFødtBarn.args = {
    søkerInfo: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 1,
        fødselsdatoer: ['2024-01-21'],
        termindato: '2024-04-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        datoForAleneomsorg: '2024-01-21',
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorAleneomsorgAdopsjonFireBarn = Template.bind({});
FarMedmorAleneomsorgAdopsjonFireBarn.args = {
    søkerInfo: søkerInfoMann,
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        fødselsdatoer: ['2022-08-21'],
        antallBarn: 4,
        adopsjonsdato: '2021-08-21',
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

//DELT UTTAK
export const MorDeltUttakEttBarnPrematurFødsel = Template.bind({});
MorDeltUttakEttBarnPrematurFødsel.args = {
    søkerInfo: søkerInfoKvinne,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2023-09-21'],
        antallBarn: 1,
        termindato: '2023-12-21',
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorDeltUttakEttBarnTermin = Template.bind({});
MorDeltUttakEttBarnTermin.args = {
    søkerInfo: søkerInfoKvinne,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: '2024-06-21',
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorDeltUttakTvillingerFødtFørWLB = Template.bind({});
MorDeltUttakTvillingerFødtFørWLB.args = {
    søkerInfo: søkerInfoKvinne,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 2,
        fødselsdatoer: ['2022-07-21'],
        termindato: '2022-07-21',
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorDeltUttakFarSøkteMorsKvoteOgFellesperiode = Template.bind({});
MorDeltUttakFarSøkteMorsKvoteOgFellesperiode.args = {
    søkerInfo: søkerInfoKvinne,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: '2024-07-21',
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    annenPartVedtak: vedtakFar,
};

export const FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021 = Template.bind({});
FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 1,
        fødselsdatoer: ['2021-07-21'],
        termindato: '2021-07-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorSøkerDeltUttakTrillingerFødtFørWLB = Template.bind({});
FarMedmorSøkerDeltUttakTrillingerFødtFørWLB.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 3,
        fødselsdatoer: ['2022-07-21'],
        termindato: '2022-07-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB = Template.bind({});
FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.UFØDT,
        antallBarn: 4,
        termindato: '2024-07-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorSøkerDeltUttakEttBarnFødtPrematurt = Template.bind({});
FarMedmorSøkerDeltUttakEttBarnFødtPrematurt.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 4,
        fødselsdatoer: ['2024-02-21'],
        termindato: '2024-05-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode = Template.bind({});
FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 1,
        fødselsdatoer: ['2024-02-21'],
        termindato: '2024-02-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    annenPartVedtak: vedtakMor,
};

export const FarSøkerAdopsjonToBarn = Template.bind({});
FarSøkerAdopsjonToBarn.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.ADOPTERT_STEBARN,
        antallBarn: 2,
        fødselsdatoer: ['2024-02-21'],
        adopsjonsdato: '2024-02-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021 = Template.bind({});
MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 3,
        fødselsdatoer: ['2021-02-21'],
        adopsjonsdato: '2021-02-21',
        ankomstdato: '2021-02-21',
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

//DELT UTTAK EØS

export const MorSøkerFarHarRettIEØSTermin = Template.bind({});
MorSøkerFarHarRettIEØSTermin.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: '2024-07-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        harOppholdtSegIEØS: true,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const FarMedmorSøkerMorHarRettIEØSAdopsjon = Template.bind({});
FarMedmorSøkerMorHarRettIEØSAdopsjon.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.ADOPTERT_STEBARN,
        antallBarn: 1,
        adopsjonsdato: '2024-02-21',
        fødselsdatoer: ['2024-02-21'],
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        harOppholdtSegIEØS: true,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

//KUN EN HAR RETT

export const BareMorHarRettTermin = Template.bind({});
BareMorHarRettTermin.args = {
    søkerInfo: søkerInfoKvinne,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: '2024-07-21',
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const BareMorHarRettAdopsjon = Template.bind({});
BareMorHarRettAdopsjon.args = {
    søkerInfo: søkerInfoKvinne,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: '2022-08-21',
        fødselsdatoer: ['2022-01-01'],
    },
    annenForelder: {
        fornavn: 'Hans',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const BareFarHarRettOgMorErUførTermin4Barn = Template.bind({});
BareFarHarRettOgMorErUførTermin4Barn.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.UFØDT,
        antallBarn: 4,
        termindato: '2024-07-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        kanIkkeOppgis: false,
        erMorUfør: true,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const BareFarHarRettOgMorErIkkeUførFødtBarn = Template.bind({});
BareFarHarRettOgMorErIkkeUførFødtBarn.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 1,
        fødselsdatoer: ['2024-01-21'],
        termindato: '2024-01-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        kanIkkeOppgis: false,
        erMorUfør: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const BareFarHarRettTvillingerFødtFør1Okt2021 = Template.bind({});
BareFarHarRettTvillingerFødtFør1Okt2021.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 2,
        fødselsdatoer: ['2021-07-21'],
        termindato: '2021-07-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        kanIkkeOppgis: false,
        erMorUfør: true,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const BareFarHarRettTrillingerFødtFørWLB = Template.bind({});
BareFarHarRettTrillingerFødtFørWLB.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 3,
        fødselsdatoer: ['2022-07-21'],
        termindato: '2022-07-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        kanIkkeOppgis: false,
        erMorUfør: true,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const BareFarHarRettPrematurFødselFireBarn = Template.bind({});
BareFarHarRettPrematurFødselFireBarn.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 4,
        fødselsdatoer: ['2024-01-21'],
        termindato: '2024-04-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        kanIkkeOppgis: false,
        erMorUfør: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const BareFarHarRettAdopsjonMorErUfør = Template.bind({});
BareFarHarRettAdopsjonMorErUfør.args = {
    søkerInfo: søkerInfoMann,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.ADOPTERT_STEBARN,
        antallBarn: 1,
        fødselsdatoer: ['2024-02-21'],
        adopsjonsdato: '2024-02-21',
    },
    annenForelder: {
        fornavn: 'Hanne',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        erMorUfør: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

//TODO: Angi riktige stønadskontoer.
