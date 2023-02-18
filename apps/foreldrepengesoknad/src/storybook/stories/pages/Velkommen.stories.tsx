import React from 'react';
import { Story } from '@storybook/react';

import { SøkerinfoDTO, SøkerinfoDTOBarn } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import Velkommen from 'app/pages/velkommen/Velkommen';
import withIntlProvider from '../../decorators/withIntl';
import ForeldrepengerStateMock from '../../utils/ForeldrepengerStateMock';
import withForeldrepengersøknadContext from '../../decorators/withForeldrepengersøknadContext';
import { BarnFraSak } from 'app/types/BarnFraSak';
import { Sak } from 'app/types/Sak';
import { RettighetType } from 'app/types/RettighetType';
import { BehandlingTilstand } from 'app/types/BehandlingTilstand';
import { DekningsgradDTO } from 'app/types/DekningsgradDTO';
import { SaksperiodeDTO } from 'app/types/SaksperiodeDTO';

export default {
    title: 'pages/Velkommen',
    component: Velkommen,
    decorators: [withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    harGodkjentVilkår: boolean;
    saker: Sak[];
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
    barn: BarnFraSak[];
    gjelderAdopsjon: boolean;
    antallBarn: number;
    sakErAvsluttet: boolean;
    åpenbehandlingTilstand?: BehandlingTilstand;
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelse?: string;
}

const getSak = (sakinfo: SakInfo): Sak => {
    return {
        annenPart: {
            fnr: '123456',
            fornavn: 'Gyldig',
            etternavn: 'Kall',
        },
        barn: sakinfo.barn,
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
const levendeBarn = {
    fnr: '05502251750',
    fornavn: 'Oriental',
    etternavn: 'Bokhylle',
    fødselsdato: '2022-10-21',
    kjønn: 'K',
} as SøkerinfoDTOBarn;
const dødtBarn = {
    ...levendeBarn,
    dødsdato: '2022-10-22',
} as SøkerinfoDTOBarn;
const levendeTvilling = {
    fnr: '05502251751',
    fornavn: 'Vakker',
    etternavn: 'Bokhylle',
    fødselsdato: '2022-10-21',
} as SøkerinfoDTOBarn;

const dødTvilling = { ...levendeTvilling, dødsdato: '2022-10-22' };

const dødfødtBarn = { fødselsdato: '2022-10-21', dødsdato: '2022-10-21' } as SøkerinfoDTOBarn;

const sakErIkkeAvsluttet = false;

const dato = '2022-12-06';

const ettBarn = {
    type: 'person',
    fnr: '11111111111',
    fornavn: 'Evig',
    mellomnavn: 'Lykkelig',
    etternavn: 'Vår',
    fødselsdato: dato,
};

const annetBarnSammeDato = { ...ettBarn, mellomnavn: undefined, fnr: '111111111112', fornavn: 'Grønn' };
const tredjeBarnSammeDato = { ...ettBarn, mellomnavn: undefined, fnr: '111111111113', fornavn: 'Sommerlig' };

const sakOpprettetFødsel = getSak({
    kanSøkeOmEndring: true,
    barn: [ettBarn],
    gjelderAdopsjon: false,
    antallBarn: 1,
    sakErAvsluttet: sakErIkkeAvsluttet,
    fødselsdato: dato,
});

const sakUnderBehandlingTermin = getSak({
    kanSøkeOmEndring: false,
    barn: [],
    gjelderAdopsjon: false,
    antallBarn: 1,
    sakErAvsluttet: sakErIkkeAvsluttet,
    termindato: dato,
    åpenbehandlingTilstand: BehandlingTilstand.UNDER_BEHANDLING,
});
const erEndringssøknadUnderBehandlingAdopsjon = getSak({
    kanSøkeOmEndring: true,
    barn: [ettBarn],
    gjelderAdopsjon: true,
    antallBarn: 1,
    sakErAvsluttet: false,
    omsorgsovertakelse: dato,
    åpenbehandlingTilstand: BehandlingTilstand.UNDER_BEHANDLING,
});
const sakAvsluttet = getSak({
    kanSøkeOmEndring: false,
    barn: [ettBarn],
    gjelderAdopsjon: false,
    antallBarn: 1,
    sakErAvsluttet: true,
    fødselsdato: dato,
});

const sakUtenBarnFødsel = getSak({
    kanSøkeOmEndring: false,
    barn: [],
    gjelderAdopsjon: false,
    antallBarn: 1,
    sakErAvsluttet: false,
    fødselsdato: dato,
});

const sakUtenBarnAdopsjon = getSak({
    kanSøkeOmEndring: false,
    barn: [],
    gjelderAdopsjon: true,
    antallBarn: 1,
    sakErAvsluttet: false,
    omsorgsovertakelse: dato,
});

const sakUtenBarnTermin = getSak({
    kanSøkeOmEndring: false,
    barn: [],
    gjelderAdopsjon: false,
    antallBarn: 1,
    sakErAvsluttet: false,
    termindato: dato,
});

const sakUtenBarnTvillinger = getSak({
    kanSøkeOmEndring: false,
    barn: [],
    gjelderAdopsjon: false,
    antallBarn: 2,
    sakErAvsluttet: false,
    fødselsdato: dato,
});

const sakUtenBarnTrillingerTermin = getSak({
    kanSøkeOmEndring: false,
    barn: [],
    gjelderAdopsjon: false,
    antallBarn: 3,
    sakErAvsluttet: false,
    termindato: dato,
});

const sakMedTvillinger = getSak({
    kanSøkeOmEndring: false,
    barn: [ettBarn, annetBarnSammeDato],
    gjelderAdopsjon: false,
    antallBarn: 2,
    sakErAvsluttet: false,
    fødselsdato: dato,
});

const sakMedTrillinger = getSak({
    kanSøkeOmEndring: false,
    barn: [ettBarn, annetBarnSammeDato, tredjeBarnSammeDato],
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
    søkerinfo: søkerInfo,
};

export const HarAlleredeLestOgForstått = Template.bind({});
HarAlleredeLestOgForstått.args = {
    harGodkjentVilkår: true,
    saker: ingenSaker,
    søkerinfo: søkerInfo,
};

export const HarOpprettetFPSakFødsel = Template.bind({});
HarOpprettetFPSakFødsel.args = {
    saker: [sakOpprettetFødsel],
    søkerinfo: søkerInfo,
};

export const HarFPSakUnderBehandlingTermin = Template.bind({});
HarFPSakUnderBehandlingTermin.args = {
    saker: [sakUnderBehandlingTermin],
    søkerinfo: søkerInfo,
};

export const HarEndringssøknadUnderBehandlingAdopsjon = Template.bind({});
HarEndringssøknadUnderBehandlingAdopsjon.args = {
    saker: [erEndringssøknadUnderBehandlingAdopsjon],
    søkerinfo: søkerInfo,
};

export const HarAvsluttetFPSak = Template.bind({});
HarAvsluttetFPSak.args = {
    saker: [sakAvsluttet],
    søkerinfo: søkerInfo,
};

export const HarFlereSaker = Template.bind({});
HarFlereSaker.args = {
    saker: flereSaker,
    søkerinfo: søkerInfo,
};

export const HarSakFødselUtenBarnSendtFraSak = Template.bind({});
HarSakFødselUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnFødsel],
    søkerinfo: søkerInfo,
};

export const HarSakTerminUtenBarnSendtFraSak = Template.bind({});
HarSakTerminUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnTermin],
    søkerinfo: søkerInfo,
};

export const HarSakTvillingerUtenBarnSendtFraSak = Template.bind({});
HarSakTerminUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnTermin],
    søkerinfo: søkerInfo,
};

export const HarSakAdopsjonUtenBarnSendtFraSak = Template.bind({});
HarSakAdopsjonUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnAdopsjon],
    søkerinfo: søkerInfo,
};

export const HarSakFødselTvillinger = Template.bind({});
HarSakFødselTvillinger.args = {
    saker: [sakMedTvillinger],
    søkerinfo: getSøkerinfoMedBarn([
        { ...ettBarn, kjønn: 'K' } as SøkerinfoDTOBarn,
        { ...annetBarnSammeDato, kjønn: 'K' } as SøkerinfoDTOBarn,
    ]),
};

export const HarSakFødselTrillinger = Template.bind({});
HarSakFødselTrillinger.args = {
    saker: [sakMedTrillinger],
    søkerinfo: søkerInfo,
};
export const HarSakFødselTvillingerUtenBarnSendtFraSak = Template.bind({});
HarSakFødselTvillingerUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnTvillinger],
    søkerinfo: søkerInfo,
};

export const HarSakTerminTrillingerUtenBarnSendtFraSak = Template.bind({});
HarSakTerminTrillingerUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnTrillingerTermin],
    søkerinfo: søkerInfo,
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
