import withRouter from 'storybook/decorators/withRouter';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { RettighetType } from '@navikt/fp-common/src/common/types/RettighetType';
import { BehandlingTilstand, DekningsgradDTO, Sak, SaksperiodeDTO } from '@navikt/fp-common';
import { SøkerinfoDTO, SøkerinfoDTOBarn } from 'app/types/SøkerinfoDTO';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { Action, FpDataContext } from 'app/context/FpDataContext';
import Velkommen from './Velkommen';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'pages/Velkommen',
    component: Velkommen,
    decorators: [withRouter],
};

interface Props {
    harGodkjentVilkår: boolean;
    saker: Sak[];
    søkerinfo: SøkerinfoDTO;
    mellomlagreSøknad: () => Promise<any>;
    gåTilNesteSide?: (action: Action) => void;
}

const søkerInfo = {
    søker: {
        fnr: '19047815714',
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        kjønn: 'K',
        fødselsdato: '1978-04-19',
        barn: [],
    },
} as SøkerinfoDTO;

const Template: StoryFn<Props> = ({ harGodkjentVilkår, saker, søkerinfo, mellomlagreSøknad, gåTilNesteSide }) => {
    return (
        <FpDataContext onDispatch={gåTilNesteSide}>
            <Velkommen
                fornavn="Espen"
                onChangeLocale={() => undefined}
                locale="nb"
                saker={saker}
                fnr={'123'}
                harGodkjentVilkår={harGodkjentVilkår}
                søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)}
                setDataOgMellomlagreSøknad={mellomlagreSøknad}
            />
        </FpDataContext>
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

const getSøkerinfoMedBarn = (barna: SøkerinfoDTOBarn[]): SøkerinfoDTO => {
    return { ...søkerInfo, søker: { ...søkerInfo.søker, barn: barna } };
};

const dato = '2022-12-06';
const datoAdopsjon = '2022-12-08';

const levendeBarn = {
    fnr: '1',
    fornavn: 'Oriental',
    etternavn: 'Bokhylle',
    fødselsdato: dato,
    kjønn: 'K',
} as SøkerinfoDTOBarn;

const dødtBarn = {
    ...levendeBarn,
    dødsdato: '2022-12-07',
} as SøkerinfoDTOBarn;

const levendeTvilling = {
    fnr: '2',
    fornavn: 'Vakker',
    etternavn: 'Bokhylle',
    fødselsdato: dato,
} as SøkerinfoDTOBarn;

const dødTvilling = { ...levendeTvilling, dødsdato: '2022-12-07' };

const dødfødtBarn = { fødselsdato: dato, dødsdato: dato } as SøkerinfoDTOBarn;

const sakErIkkeAvsluttet = false;

const ettBarn = {
    type: 'person',
    fnr: '3',
    fornavn: 'Evig',
    mellomnavn: 'Lykkelig',
    etternavn: 'Vår',
    fødselsdato: dato,
    kjønn: 'M',
} as SøkerinfoDTOBarn;

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
    termindato: dato,
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
    mellomlagreSøknad: promiseAction(),
    harGodkjentVilkår: false,
    saker: ingenSaker,
    søkerinfo: søkerInfo,
};

export const HarAlleredeLestOgForstått = Template.bind({});
HarAlleredeLestOgForstått.args = {
    mellomlagreSøknad: promiseAction(),
    harGodkjentVilkår: true,
    saker: ingenSaker,
    søkerinfo: søkerInfo,
};

export const HarOpprettetFPSakFødselMedBarnetIPDL = Template.bind({});
HarOpprettetFPSakFødselMedBarnetIPDL.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakOpprettetFødsel],
    søkerinfo: getSøkerinfoMedBarn([ettBarn]),
};

export const HarFPSakUnderBehandlingTermin = Template.bind({});
HarFPSakUnderBehandlingTermin.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakUnderBehandlingTermin],
    søkerinfo: søkerInfo,
};

export const HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL = Template.bind({});
HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [erEndringssøknadUnderBehandlingAdopsjon],
    søkerinfo: getSøkerinfoMedBarn([ettBarn]),
};

export const HarAvsluttetFPSak = Template.bind({});
HarAvsluttetFPSak.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakAvsluttet],
    søkerinfo: getSøkerinfoMedBarn([ettBarn]),
};

export const HarFlereSaker = Template.bind({});
HarFlereSaker.args = {
    mellomlagreSøknad: promiseAction(),
    saker: flereSaker,
    søkerinfo: getSøkerinfoMedBarn([ettBarn]),
};

export const HarSakFødselUtenBarnIPDL = Template.bind({});
HarSakFødselUtenBarnIPDL.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakUtenBarnFødsel],
    søkerinfo: søkerInfo,
};

export const HarSakAdopsjonUtenBarnIPDL = Template.bind({});
HarSakAdopsjonUtenBarnIPDL.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakEttBarnAdopsjon],
    søkerinfo: søkerInfo,
};

export const HarSakAdopsjonMedBarnIPDL = Template.bind({});
HarSakAdopsjonMedBarnIPDL.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakEttBarnAdopsjon],
    søkerinfo: getSøkerinfoMedBarn([ettBarn]),
};

export const HarSakFødselTvillinger = Template.bind({});
HarSakFødselTvillinger.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakMedTvillinger],
    søkerinfo: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato]),
};

export const HarSakFødselTrillinger = Template.bind({});
HarSakFødselTrillinger.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakMedTrillinger],
    søkerinfo: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, tredjeBarnSammeDato]),
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
    mellomlagreSøknad: promiseAction(),
    saker: [],
    søkerinfo: søkerinfoMedEtLevendeBarn,
};

export const HarIngenSakerOgTvillinger = Template.bind({});
HarIngenSakerOgTvillinger.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [],
    søkerinfo: søkerinfoMedLevendeTvillinger,
};

export const HarIngenSakerOgEttDødtBarn = Template.bind({});
HarIngenSakerOgEttDødtBarn.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [],
    søkerinfo: søkerinfoMedEtDødtBarn,
};

export const HarIngenSakerOgToDødeTvillinger = Template.bind({});
HarIngenSakerOgToDødeTvillinger.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [],
    søkerinfo: søkerinfoMedToDødeTvillinger,
};
export const HarIngenSakerOgEtDødfødtBarn = Template.bind({});
HarIngenSakerOgEtDødfødtBarn.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [],
    søkerinfo: søkerinfoMedEtDødfødtBarn,
};

export const HarIngenSakerOgToDødfødteBarn = Template.bind({});
HarIngenSakerOgToDødfødteBarn.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [],
    søkerinfo: søkerinfoMedToDødfødteBarn,
};

export const HarIngenSakerMedEnLevendeOgEnDødfødtTvilling = Template.bind({});
HarIngenSakerMedEnLevendeOgEnDødfødtTvilling.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [],
    søkerinfo: søkerinfoMedEnLevendeOgEnDødfødtTvilling,
};

export const HarIngenSakerMedEnLevendeOgEnDødTvilling = Template.bind({});
HarIngenSakerMedEnLevendeOgEnDødTvilling.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [],
    søkerinfo: søkerinfoMedEnLevendeOgEnDødTvilling,
};

export const HarSakMedEnLevendeOgEnDødfødtTvilling = Template.bind({});
HarSakMedEnLevendeOgEnDødfødtTvilling.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakMedTvillinger],
    søkerinfo: søkerinfoMedEnLevendeOgEnDødfødtTvilling,
};

export const HarSakMedEtDødtBarn = Template.bind({});
HarSakMedEtDødtBarn.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakOpprettetFødsel],
    søkerinfo: søkerinfoMedEtDødtBarn,
};

export const HarSakAdopsjonMedEtDødtBarn = Template.bind({});
HarSakAdopsjonMedEtDødtBarn.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakEttBarnAdopsjon],
    søkerinfo: søkerinfoMedEtDødtBarn,
};

export const HarSakMedOppgittBarnTvillingerAlleLever = Template.bind({});
HarSakMedOppgittBarnTvillingerAlleLever.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakMedTvillingerMedFnrPåSaken],
    søkerinfo: søkerinfoMedLevendeTvillinger,
};

export const HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling = Template.bind({});
HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakMedTvillingerMedEnDødfødt],
    søkerinfo: søkerinfoMedEnLevendeOgEnDødfødtTvilling,
};

export const HarSakMedTrillingerEnErDød = Template.bind({});
HarSakMedTrillingerEnErDød.args = {
    mellomlagreSøknad: promiseAction(),
    saker: [sakMedTrillinger],
    søkerinfo: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, dødfødtBarn]),
};
