import React from 'react';
import { Story } from '@storybook/react';

import { SøkerinfoDTO, SøkerinfoDTOBarn } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import Velkommen from 'app/pages/velkommen/Velkommen';
import withIntlProvider from '../../decorators/withIntl';
import ForeldrepengerStateMock from '../../utils/ForeldrepengerStateMock';
import withForeldrepengersøknadContext from '../../decorators/withForeldrepengersøknadContext';
import { RettighetType } from 'app/types/RettighetType';
import { BehandlingTilstand } from 'app/types/BehandlingTilstand';
import { DekningsgradDTO } from 'app/types/DekningsgradDTO';
import { SaksperiodeDTO } from 'app/types/SaksperiodeDTO';
import { SakDTO } from 'app/types/SakDTO';
import withRouter from '../../decorators/withRouter';

export default {
    title: 'pages/Velkommen',
    component: Velkommen,
    decorators: [withIntlProvider, withForeldrepengersøknadContext, withRouter],
};

interface Props {
    harGodkjentVilkår: boolean;
    saker: SakDTO[];
    søkerinfo: SøkerinfoDTO;
}

const søkerInfo = {
    søker: {
        fnr: '19047815714',
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        kjønn: 'K',
        fødselsdato: '1978-04-19',
        ikkeNordiskEøsLand: false,
        barn: [],
    },
} as SøkerinfoDTO;

const Template: Story<Props> = ({ harGodkjentVilkår, saker, søkerinfo }) => {
    return (
        <ForeldrepengerStateMock
            søknad={{ søknad: { harGodkjentVilkår, søker: { språkkode: 'nb' } } } as ForeldrepengesøknadContextState}
            søkerinfo={søkerinfo}
        >
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>
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

const getSak = (sakinfo: SakInfo): SakDTO => {
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
    };
};

const getSøkerinfoMedBarn = (barna: SøkerinfoDTOBarn[]): SøkerinfoDTO => {
    return { ...søkerInfo, søker: { ...søkerInfo.søker, barn: barna } };
};

const dato = '2022-12-06';
const datoAdopsjon = '2022-12-08';

const levendeBarn = {
    fnr: '05502251750',
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
    fnr: '05502251751',
    fornavn: 'Vakker',
    etternavn: 'Bokhylle',
    fødselsdato: dato,
} as SøkerinfoDTOBarn;

const dødTvilling = { ...levendeTvilling, dødsdato: '2022-12-07' };

const dødfødtBarn = { fødselsdato: dato, dødsdato: dato } as SøkerinfoDTOBarn;

const sakErIkkeAvsluttet = false;

const ettBarn = {
    type: 'person',
    fnr: '11111111111',
    fornavn: 'Evig',
    mellomnavn: 'Lykkelig',
    etternavn: 'Vår',
    fødselsdato: dato,
    kjønn: 'M',
} as SøkerinfoDTOBarn;

const annetBarnSammeDato = { ...ettBarn, mellomnavn: undefined, fnr: '111111111112', fornavn: 'Grønn' };
const tredjeBarnSammeDato = { ...ettBarn, mellomnavn: undefined, fnr: '111111111113', fornavn: 'Sommerlig' };

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

const sakUtenBarnAdopsjon = getSak({
    kanSøkeOmEndring: true,
    gjelderAdopsjon: true,
    antallBarn: 1,
    sakErAvsluttet: false,
    omsorgsovertakelse: dato,
});

const sakMedTvillinger = getSak({
    kanSøkeOmEndring: false,
    gjelderAdopsjon: false,
    antallBarn: 2,
    sakErAvsluttet: false,
    fødselsdato: dato,
    åpenbehandlingTilstand: BehandlingTilstand.UNDER_BEHANDLING,
});

const sakMedTrillinger = getSak({
    kanSøkeOmEndring: true,
    gjelderAdopsjon: false,
    antallBarn: 3,
    sakErAvsluttet: false,
    fødselsdato: dato,
});

const flereSaker = [sakOpprettetFødsel, { ...sakUnderBehandlingTermin, saksnummer: '555555' }];
const ingenSaker: SakDTO[] = [];

export const Default = Template.bind({});
Default.args = {
    harGodkjentVilkår: false,
    saker: ingenSaker,
    søkerinfo: søkerInfo,
};

export const HarAlleredeLestOgForstått = Template.bind({});
HarAlleredeLestOgForstått.args = {
    harGodkjentVilkår: true,
    saker: ingenSaker,
    søkerinfo: søkerInfo,
};

export const HarOpprettetFPSakFødselMedBarnetIPDL = Template.bind({});
HarOpprettetFPSakFødselMedBarnetIPDL.args = {
    saker: [sakOpprettetFødsel],
    søkerinfo: getSøkerinfoMedBarn([ettBarn]),
};

export const HarFPSakUnderBehandlingTermin = Template.bind({});
HarFPSakUnderBehandlingTermin.args = {
    saker: [sakUnderBehandlingTermin],
    søkerinfo: søkerInfo,
};

export const HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL = Template.bind({});
HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL.args = {
    saker: [erEndringssøknadUnderBehandlingAdopsjon],
    søkerinfo: getSøkerinfoMedBarn([ettBarn]),
};

export const HarAvsluttetFPSak = Template.bind({});
HarAvsluttetFPSak.args = {
    saker: [sakAvsluttet],
    søkerinfo: getSøkerinfoMedBarn([ettBarn]),
};

export const HarFlereSaker = Template.bind({});
HarFlereSaker.args = {
    saker: flereSaker,
    søkerinfo: getSøkerinfoMedBarn([ettBarn]),
};

export const HarSakFødselUtenBarnIPDL = Template.bind({});
HarSakFødselUtenBarnIPDL.args = {
    saker: [sakUtenBarnFødsel],
    søkerinfo: søkerInfo,
};

export const HarSakAdopsjonUtenBarnIPDL = Template.bind({});
HarSakAdopsjonUtenBarnIPDL.args = {
    saker: [sakUtenBarnAdopsjon],
    søkerinfo: søkerInfo,
};

export const HarSakFødselTvillinger = Template.bind({});
HarSakFødselTvillinger.args = {
    saker: [sakMedTvillinger],
    søkerinfo: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato]),
};

export const HarSakFødselTrillinger = Template.bind({});
HarSakFødselTrillinger.args = {
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
    saker: [],
    søkerinfo: søkerinfoMedEtLevendeBarn,
};

export const HarIngenSakerOgTvillinger = Template.bind({});
HarIngenSakerOgTvillinger.args = {
    saker: [],
    søkerinfo: søkerinfoMedLevendeTvillinger,
};

export const HarIngenSakerOgEttDødtBarn = Template.bind({});
HarIngenSakerOgEttDødtBarn.args = {
    saker: [],
    søkerinfo: søkerinfoMedEtDødtBarn,
};

export const HarIngenSakerOgToDødeTvillinger = Template.bind({});
HarIngenSakerOgToDødeTvillinger.args = {
    saker: [],
    søkerinfo: søkerinfoMedToDødeTvillinger,
};
export const HarIngenSakerOgEtDødfødtBarn = Template.bind({});
HarIngenSakerOgEtDødfødtBarn.args = {
    saker: [],
    søkerinfo: søkerinfoMedEtDødfødtBarn,
};

export const HarIngenSakerOgToDødfødteBarn = Template.bind({});
HarIngenSakerOgToDødfødteBarn.args = {
    saker: [],
    søkerinfo: søkerinfoMedToDødfødteBarn,
};

export const HarIngenSakerMedEnLevendeOgEnDødfødtTvilling = Template.bind({});
HarIngenSakerMedEnLevendeOgEnDødfødtTvilling.args = {
    saker: [],
    søkerinfo: søkerinfoMedEnLevendeOgEnDødfødtTvilling,
};

export const HarIngenSakerMedEnLevendeOgEnDødTvilling = Template.bind({});
HarIngenSakerMedEnLevendeOgEnDødTvilling.args = {
    saker: [],
    søkerinfo: søkerinfoMedEnLevendeOgEnDødTvilling,
};

export const HarSakerMedEnLevendeOgEnDødfødtTvilling = Template.bind({});
HarSakerMedEnLevendeOgEnDødfødtTvilling.args = {
    saker: [sakMedTvillinger],
    søkerinfo: søkerinfoMedEnLevendeOgEnDødfødtTvilling,
};
