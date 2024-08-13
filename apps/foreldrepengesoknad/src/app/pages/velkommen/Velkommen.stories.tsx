import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { BehandlingTilstand, DekningsgradDTO, Sak, SaksperiodeDTO } from '@navikt/fp-common';
import { RettighetType } from '@navikt/fp-common/src/common/types/RettighetType';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søker, SøkerBarn } from '@navikt/fp-types';

import { Action, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import Velkommen from './Velkommen';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'pages/Velkommen',
    component: Velkommen,
};

const defaultPerson = {
    fnr: '19047815714',
    fornavn: 'TALENTFULL',
    etternavn: 'MYGG',
    kjønn: 'K',
    fødselsdato: '1978-04-19',
    barn: [],
} as Søker;

interface Props {
    harGodkjentVilkår: boolean;
    saker: Sak[];
    søker?: Søker;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    onDispatch?: (action: Action) => void;
}

const Template: StoryFn<Props> = ({
    harGodkjentVilkår,
    saker,
    søker = defaultPerson,
    mellomlagreSøknadOgNaviger = promiseAction(),
    onDispatch,
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
            <FpDataContext onDispatch={onDispatch}>
                <Velkommen
                    fornavn="Espen"
                    onChangeLocale={() => undefined}
                    locale="nb"
                    saker={saker}
                    fnr={'123'}
                    harGodkjentVilkår={harGodkjentVilkår}
                    søkerInfo={{ søker, arbeidsforhold: [] }}
                    setErEndringssøknad={action('button-click')}
                    setHarGodkjentVilkår={action('button-click')}
                    setSøknadGjelderNyttBarn={action('button-click')}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />
            </FpDataContext>
        </MemoryRouter>
    );
};

interface SakInfo {
    kanSøkeOmEndring: boolean;
    gjelderAdopsjon: boolean;
    antallBarn: number;
    sakErAvsluttet: boolean;
    åpenbehandlingTilstand?: BehandlingTilstand;
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelse?: string;
}

const getSakMedBarn = (sak: Sak, barnFnr: string[]): Sak => {
    const barna = barnFnr.map((fnrBarn) => {
        return { fnr: fnrBarn };
    });
    return { ...sak, barn: barna };
};

const getSak = (sakinfo: SakInfo): Sak => {
    return {
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
        familiehendelse: {
            fødselsdato: sakinfo.fødselsdato,
            omsorgsovertakelse: sakinfo.omsorgsovertakelse,
            antallBarn: sakinfo.antallBarn,
            termindato: sakinfo.termindato,
        },
        gjeldendeVedtak: { perioder: [] },
        harAnnenForelderTilsvarendeRettEØS: false,
        gjelderAdopsjon: sakinfo.gjelderAdopsjon,
        kanSøkeOmEndring: sakinfo.kanSøkeOmEndring,
        morUføretrygd: false,
        rettighetType: RettighetType.BEGGE_RETT,
        sakAvsluttet: sakinfo.sakErAvsluttet,
        sakTilhørerMor: true,
        saksnummer: '123456',
        ønskerJustertUttakVedFødsel: false,
        sisteSøknadMottattDato: '2022-05-06',
        åpenBehandling:
            sakinfo.åpenbehandlingTilstand !== undefined
                ? {
                      tilstand: sakinfo.åpenbehandlingTilstand,
                      søknadsperioder: [] as SaksperiodeDTO[],
                  }
                : undefined,
        annenPart: {
            fnr: '123456789',
        },
    };
};

const getSøkerinfoMedBarn = (barna: SøkerBarn[]): Søker => {
    return { ...defaultPerson, barn: barna };
};

const dato = '2022-12-06';
const datoAdopsjon = '2022-12-08';

const levendeBarn = {
    fnr: '1',
    fornavn: 'Oriental',
    etternavn: 'Bokhylle',
    fødselsdato: dato,
    kjønn: 'K',
} as SøkerBarn;

const dødtBarn = {
    ...levendeBarn,
    dødsdato: '2022-12-07',
} as SøkerBarn;

const levendeTvilling = {
    fnr: '2',
    fornavn: 'Vakker',
    etternavn: 'Bokhylle',
    fødselsdato: dato,
} as SøkerBarn;

const dødTvilling = { ...levendeTvilling, dødsdato: '2022-12-07' };

const dødfødtBarn = { fødselsdato: dato, dødsdato: dato } as SøkerBarn;

const sakErIkkeAvsluttet = false;

const ettBarn = {
    type: 'person',
    fnr: '3',
    fornavn: 'Evig',
    mellomnavn: 'Lykkelig',
    etternavn: 'Vår',
    fødselsdato: dato,
    kjønn: 'M',
} as SøkerBarn;

const annetBarnSammeDato = { ...ettBarn, mellomnavn: undefined, fnr: '4', fornavn: 'Grønn' };
const tredjeBarnSammeDato = { ...ettBarn, mellomnavn: undefined, fnr: '5', fornavn: 'Sommerlig' };

const sakOpprettetFødsel = getSak({
    kanSøkeOmEndring: true,
    gjelderAdopsjon: false,
    antallBarn: 1,
    sakErAvsluttet: sakErIkkeAvsluttet,
    fødselsdato: dato,
});

const sakUnderBehandlingTermin = getSak({
    kanSøkeOmEndring: false,
    gjelderAdopsjon: false,
    antallBarn: 1,
    sakErAvsluttet: sakErIkkeAvsluttet,
    termindato: '2024-06-28',
    åpenbehandlingTilstand: BehandlingTilstand.UNDER_BEHANDLING,
});
const erEndringssøknadUnderBehandlingAdopsjon = getSak({
    kanSøkeOmEndring: true,
    gjelderAdopsjon: true,
    antallBarn: 1,
    sakErAvsluttet: false,
    omsorgsovertakelse: datoAdopsjon,
    fødselsdato: dato,
    åpenbehandlingTilstand: BehandlingTilstand.UNDER_BEHANDLING,
});
const sakAvsluttet = getSak({
    kanSøkeOmEndring: false,
    gjelderAdopsjon: false,
    antallBarn: 1,
    sakErAvsluttet: true,
    fødselsdato: dato,
});

const sakUtenBarnFødsel = getSak({
    kanSøkeOmEndring: true,
    gjelderAdopsjon: false,
    antallBarn: 1,
    sakErAvsluttet: false,
    fødselsdato: dato,
});

const sakEttBarnAdopsjon = getSak({
    kanSøkeOmEndring: true,
    gjelderAdopsjon: true,
    antallBarn: 1,
    sakErAvsluttet: false,
    omsorgsovertakelse: dato,
    fødselsdato: dato,
});

const sakMedTvillinger = getSak({
    kanSøkeOmEndring: false,
    gjelderAdopsjon: false,
    antallBarn: 2,
    sakErAvsluttet: false,
    fødselsdato: dato,
    åpenbehandlingTilstand: BehandlingTilstand.UNDER_BEHANDLING,
});

const sakMedTvillingerMedFnrPåSaken = getSakMedBarn(sakMedTvillinger, ['1', '2']);

const sakMedTvillingerMedEnDødfødt = getSakMedBarn(sakMedTvillinger, ['1']);

const sakMedTrillinger = getSak({
    kanSøkeOmEndring: true,
    gjelderAdopsjon: false,
    antallBarn: 3,
    sakErAvsluttet: false,
    fødselsdato: dato,
});

const flereSaker = [sakOpprettetFødsel, { ...sakUnderBehandlingTermin, saksnummer: '555555' }];
const ingenSaker: Sak[] = [];

export const Default = Template.bind({});
Default.args = {
    harGodkjentVilkår: false,
    saker: ingenSaker,
};

export const HarAlleredeLestOgForstått = Template.bind({});
HarAlleredeLestOgForstått.args = {
    harGodkjentVilkår: true,
    saker: ingenSaker,
};

export const HarOpprettetFPSakFødselMedBarnetIPDL = Template.bind({});
HarOpprettetFPSakFødselMedBarnetIPDL.args = {
    saker: [sakOpprettetFødsel],
    søker: getSøkerinfoMedBarn([ettBarn]),
};

export const HarFPSakUnderBehandlingTermin = Template.bind({});
HarFPSakUnderBehandlingTermin.args = {
    saker: [sakUnderBehandlingTermin],
};

export const HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL = Template.bind({});
HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL.args = {
    saker: [erEndringssøknadUnderBehandlingAdopsjon],
    søker: getSøkerinfoMedBarn([ettBarn]),
};

export const HarAvsluttetFPSak = Template.bind({});
HarAvsluttetFPSak.args = {
    saker: [sakAvsluttet],
    søker: getSøkerinfoMedBarn([ettBarn]),
};

export const HarFlereSaker = Template.bind({});
HarFlereSaker.args = {
    saker: flereSaker,
    søker: getSøkerinfoMedBarn([ettBarn]),
};

export const HarSakFødselUtenBarnIPDL = Template.bind({});
HarSakFødselUtenBarnIPDL.args = {
    saker: [sakUtenBarnFødsel],
};

export const HarSakAdopsjonUtenBarnIPDL = Template.bind({});
HarSakAdopsjonUtenBarnIPDL.args = {
    saker: [sakEttBarnAdopsjon],
    søker: defaultPerson,
};

export const HarSakAdopsjonMedBarnIPDL = Template.bind({});
HarSakAdopsjonMedBarnIPDL.args = {
    saker: [sakEttBarnAdopsjon],
    søker: getSøkerinfoMedBarn([ettBarn]),
};

export const HarSakFødselTvillinger = Template.bind({});
HarSakFødselTvillinger.args = {
    saker: [sakMedTvillinger],
    søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato]),
};

export const HarSakFødselTrillinger = Template.bind({});
HarSakFødselTrillinger.args = {
    saker: [sakMedTrillinger],
    søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, tredjeBarnSammeDato]),
};

const søkerinfoMedEtLevendeBarn = getSøkerinfoMedBarn([levendeBarn]);
const søkerinfoMedLevendeTvillinger = getSøkerinfoMedBarn([levendeBarn, levendeTvilling]);
const søkerinfoMedEtDødtBarn = getSøkerinfoMedBarn([dødtBarn]);
const søkerinfoMedToDødeTvillinger = getSøkerinfoMedBarn([dødtBarn, dødTvilling]);
const søkerinfoMedEtDødfødtBarn = getSøkerinfoMedBarn([dødfødtBarn]);
const søkerinfoMedToDødfødteBarn = getSøkerinfoMedBarn([dødfødtBarn, dødfødtBarn]);
const søkerinfoMedEnLevendeOgEnDødfødtTvilling = getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]);
const søkerinfoMedEnLevendeOgEnDødTvilling = getSøkerinfoMedBarn([levendeBarn, dødTvilling]);

export const HarIngenSakerOgEttBarn = Template.bind({});
HarIngenSakerOgEttBarn.args = {
    saker: [],
    søker: søkerinfoMedEtLevendeBarn,
};

export const HarIngenSakerOgTvillinger = Template.bind({});
HarIngenSakerOgTvillinger.args = {
    saker: [],
    søker: søkerinfoMedLevendeTvillinger,
};

export const HarIngenSakerOgEttDødtBarn = Template.bind({});
HarIngenSakerOgEttDødtBarn.args = {
    saker: [],
    søker: søkerinfoMedEtDødtBarn,
};

export const HarIngenSakerOgToDødeTvillinger = Template.bind({});
HarIngenSakerOgToDødeTvillinger.args = {
    saker: [],
    søker: søkerinfoMedToDødeTvillinger,
};
export const HarIngenSakerOgEtDødfødtBarn = Template.bind({});
HarIngenSakerOgEtDødfødtBarn.args = {
    saker: [],
    søker: søkerinfoMedEtDødfødtBarn,
};

export const HarIngenSakerOgToDødfødteBarn = Template.bind({});
HarIngenSakerOgToDødfødteBarn.args = {
    saker: [],
    søker: søkerinfoMedToDødfødteBarn,
};

export const HarIngenSakerMedEnLevendeOgEnDødfødtTvilling = Template.bind({});
HarIngenSakerMedEnLevendeOgEnDødfødtTvilling.args = {
    saker: [],
    søker: søkerinfoMedEnLevendeOgEnDødfødtTvilling,
};

export const HarIngenSakerMedEnLevendeOgEnDødTvilling = Template.bind({});
HarIngenSakerMedEnLevendeOgEnDødTvilling.args = {
    saker: [],
    søker: søkerinfoMedEnLevendeOgEnDødTvilling,
};

export const HarSakMedEnLevendeOgEnDødfødtTvilling = Template.bind({});
HarSakMedEnLevendeOgEnDødfødtTvilling.args = {
    saker: [sakMedTvillinger],
    søker: søkerinfoMedEnLevendeOgEnDødfødtTvilling,
};

export const HarSakMedEtDødtBarn = Template.bind({});
HarSakMedEtDødtBarn.args = {
    saker: [sakOpprettetFødsel],
    søker: søkerinfoMedEtDødtBarn,
};

export const HarSakAdopsjonMedEtDødtBarn = Template.bind({});
HarSakAdopsjonMedEtDødtBarn.args = {
    saker: [sakEttBarnAdopsjon],
    søker: søkerinfoMedEtDødtBarn,
};

export const HarSakMedOppgittBarnTvillingerAlleLever = Template.bind({});
HarSakMedOppgittBarnTvillingerAlleLever.args = {
    saker: [sakMedTvillingerMedFnrPåSaken],
    søker: søkerinfoMedLevendeTvillinger,
};

export const HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling = Template.bind({});
HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling.args = {
    saker: [sakMedTvillingerMedEnDødfødt],
    søker: søkerinfoMedEnLevendeOgEnDødfødtTvilling,
};

export const HarSakMedTrillingerEnErDød = Template.bind({});
HarSakMedTrillingerEnErDød.args = {
    saker: [sakMedTrillinger],
    søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, dødfødtBarn]),
};

export const HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker = Template.bind({});
HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker.args = {
    saker: [sakUnderBehandlingTermin],
    søker: getSøkerinfoMedBarn([
        {
            fnr: '1',
            fornavn: 'Hanne',
            etternavn: 'Brokkoli',
            fødselsdato: '2024-03-01',
            kjønn: 'K',
        },
    ]),
};

export const HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker = Template.bind({});
HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker.args = {
    saker: [sakUnderBehandlingTermin],
    søker: getSøkerinfoMedBarn([
        {
            fnr: '1',
            fornavn: 'Hanne',
            etternavn: 'Brokkoli',
            fødselsdato: '2024-08-09',
            kjønn: 'K',
        },
    ]),
};

export const HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig = Template.bind({});
HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig.args = {
    saker: [sakUnderBehandlingTermin],
    søker: getSøkerinfoMedBarn([
        {
            fnr: '1',
            fornavn: 'Hanne',
            etternavn: 'Brokkoli',
            fødselsdato: '2024-02-29',
            kjønn: 'K',
        },
    ]),
};

export const HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent = Template.bind({});
HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent.args = {
    saker: [sakUnderBehandlingTermin],
    søker: getSøkerinfoMedBarn([
        {
            fnr: '1',
            fornavn: 'Hanne',
            etternavn: 'Brokkoli',
            fødselsdato: '2024-08-10',
            kjønn: 'K',
        },
    ]),
};
