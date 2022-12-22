import React from 'react';
import { Story } from '@storybook/react';

import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
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
// import withRouter from '../../decorators/withRouter';

export default {
    title: 'pages/Velkommen',
    component: Velkommen,
    decorators: [withIntlProvider, withForeldrepengersøknadContext],
    // decorators: [withRouter, withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    harGodkjentVilkår: boolean;
    saker: Sak[];
}

const Template: Story<Props> = ({ harGodkjentVilkår, saker }) => {
    return (
        <ForeldrepengerStateMock
            søknad={{ søknad: { harGodkjentVilkår, søker: { språkkode: 'nb' } } } as ForeldrepengesøknadContextState}
            søkerinfo={
                {
                    søker: {
                        fnr: '1233434',
                        // barn: [{ fornavn: 'Glad', mellomnavn: 'Rød', etternavn: 'Sykkel', fødselsdato: '2021-05-05' }],
                    },
                } as SøkerinfoDTO
            }
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
};

export const HarAlleredeLestOgForstått = Template.bind({});
HarAlleredeLestOgForstått.args = {
    harGodkjentVilkår: true,
    saker: ingenSaker,
};

export const HarOpprettetFPSakFødsel = Template.bind({});
HarOpprettetFPSakFødsel.args = {
    saker: [sakOpprettetFødsel],
};

export const HarFPSakUnderBehandlingTermin = Template.bind({});
HarFPSakUnderBehandlingTermin.args = {
    saker: [sakUnderBehandlingTermin],
};

export const HarEndringssøknadUnderBehandlingAdopsjon = Template.bind({});
HarEndringssøknadUnderBehandlingAdopsjon.args = {
    saker: [erEndringssøknadUnderBehandlingAdopsjon],
};

export const HarAvsluttetFPSak = Template.bind({});
HarAvsluttetFPSak.args = {
    saker: [sakAvsluttet],
};

export const HarFlereSaker = Template.bind({});
HarFlereSaker.args = {
    saker: flereSaker,
};

export const HarSakFødselUtenBarnSendtFraSak = Template.bind({});
HarSakFødselUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnFødsel],
};

export const HarSakTerminUtenBarnSendtFraSak = Template.bind({});
HarSakTerminUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnTermin],
};

export const HarSakTvillingerUtenBarnSendtFraSak = Template.bind({});
HarSakTerminUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnTermin],
};

export const HarSakAdopsjonUtenBarnSendtFraSak = Template.bind({});
HarSakAdopsjonUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnAdopsjon],
};

export const HarSakFødselTvillinger = Template.bind({});
HarSakFødselTvillinger.args = {
    saker: [sakMedTvillinger],
};

export const HarSakFødselTrillinger = Template.bind({});
HarSakFødselTrillinger.args = {
    saker: [sakMedTrillinger],
};
export const HarSakFødselTvillingerUtenBarnSendtFraSak = Template.bind({});
HarSakFødselTvillingerUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnTvillinger],
};

export const HarSakTerminTrillingerUtenBarnSendtFraSak = Template.bind({});
HarSakTerminTrillingerUtenBarnSendtFraSak.args = {
    saker: [sakUtenBarnTrillingerTermin],
};
