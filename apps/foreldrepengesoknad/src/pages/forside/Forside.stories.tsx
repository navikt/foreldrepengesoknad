import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import {
    BarnDto_fpoversikt,
    BehandlingTilstand_fpoversikt,
    FpPersonopplysningerDto_fpoversikt,
    FpSak_fpoversikt,
} from '@navikt/fp-types';

import { Forside } from './Forside';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

const defaultPerson = {
    fnr: '1',
    navn: {
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
    },
    kjønn: 'K',
    fødselsdato: '1978-04-19',
    erGift: false,
    barn: [],
    arbeidsforhold: [],
} satisfies FpPersonopplysningerDto_fpoversikt;

interface SakInfo {
    kanSøkeOmEndring: boolean;
    gjelderAdopsjon: boolean;
    antallBarn: number;
    sakErAvsluttet: boolean;
    åpenbehandlingTilstand?: BehandlingTilstand_fpoversikt;
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelse?: string;
}

const getSakMedBarn = (sak: FpSak_fpoversikt, barnFnr: string[]): FpSak_fpoversikt => {
    const barna = barnFnr.map((fnrBarn) => {
        return { fnr: fnrBarn };
    });
    return { ...sak, barn: barna };
};

const getSak = (sakinfo: SakInfo): FpSak_fpoversikt => {
    return {
        dekningsgrad: 'HUNDRE',
        familiehendelse: {
            fødselsdato: sakinfo.fødselsdato,
            omsorgsovertakelse: sakinfo.omsorgsovertakelse,
            antallBarn: sakinfo.antallBarn,
            termindato: sakinfo.termindato,
        },
        forelder: 'MOR',
        gjeldendeVedtak: { perioder: [] },
        harAnnenForelderTilsvarendeRettEØS: false,
        gjelderAdopsjon: sakinfo.gjelderAdopsjon,
        kanSøkeOmEndring: sakinfo.kanSøkeOmEndring,
        morUføretrygd: false,
        rettighetType: 'BEGGE_RETT',
        sakAvsluttet: sakinfo.sakErAvsluttet,
        sakTilhørerMor: true,
        saksnummer: '123456',
        ønskerJustertUttakVedFødsel: false,
        oppdatertTidspunkt: '2022-05-06',
        åpenBehandling:
            sakinfo.åpenbehandlingTilstand !== undefined
                ? {
                      tilstand: sakinfo.åpenbehandlingTilstand,
                      søknadsperioder: [],
                  }
                : undefined,
        annenPart: {
            fnr: '123456789',
        },
    };
};

const getSøkerinfoMedBarn = (barna: BarnDto_fpoversikt[]): FpPersonopplysningerDto_fpoversikt => {
    return { ...defaultPerson, barn: barna };
};

const dato = '2022-12-06';
const datoAdopsjon = '2022-12-08';

const levendeBarn = {
    fnr: '1',
    navn: {
        fornavn: 'Oriental',
        etternavn: 'Bokhylle',
    },
    fødselsdato: dato,
    kjønn: 'K',
} satisfies BarnDto_fpoversikt;

const dødtBarn = {
    ...levendeBarn,
    dødsdato: '2022-12-07',
} satisfies BarnDto_fpoversikt;

const levendeTvilling = {
    fnr: '2',
    navn: {
        fornavn: 'Vakker',
        etternavn: 'Bokhylle',
    },
    fødselsdato: dato,
    kjønn: 'K',
} satisfies BarnDto_fpoversikt;

const dødTvilling = { ...levendeTvilling, dødsdato: '2022-12-07' };

const dødfødtBarn = {
    fødselsdato: dato,
    dødsdato: dato,
    kjønn: 'K',
    fnr: '2',
    navn: {
        fornavn: 'Vakker',
        etternavn: 'Bokhylle',
    },
} satisfies BarnDto_fpoversikt;

const sakErIkkeAvsluttet = false;

const ettBarn = {
    fnr: '3',
    navn: {
        fornavn: 'Evig',
        mellomnavn: 'Lykkelig',
        etternavn: 'Vår',
    },
    fødselsdato: dato,
    kjønn: 'M',
} satisfies BarnDto_fpoversikt;

const annetBarnSammeDato = { ...ettBarn, navn: { ...ettBarn.navn, mellomnavn: undefined, fornavn: 'Grønn' }, fnr: '4' };
const tredjeBarnSammeDato = {
    ...ettBarn,
    navn: { ...ettBarn.navn, mellomnavn: undefined, fornavn: 'Sommerlig' },
    fnr: '5',
};

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
    åpenbehandlingTilstand: 'UNDER_BEHANDLING',
});
const erEndringssøknadUnderBehandlingAdopsjon = getSak({
    kanSøkeOmEndring: true,
    gjelderAdopsjon: true,
    antallBarn: 1,
    sakErAvsluttet: false,
    omsorgsovertakelse: datoAdopsjon,
    fødselsdato: dato,
    åpenbehandlingTilstand: 'UNDER_BEHANDLING',
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
    åpenbehandlingTilstand: 'UNDER_BEHANDLING',
});

const sakMedTrillinger = getSak({
    kanSøkeOmEndring: true,
    gjelderAdopsjon: false,
    antallBarn: 3,
    sakErAvsluttet: false,
    fødselsdato: dato,
});

type StoryArgs = {
    onDispatch?: (action: Action) => void;
} & ComponentProps<typeof Forside>;

const meta = {
    title: 'pages/Forside',
    component: Forside,
    render: ({ onDispatch, ...rest }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.VELKOMMEN]}>
                <FpDataContext onDispatch={onDispatch}>
                    <Forside {...rest} />
                </FpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        harGodkjentVilkår: false,
        saker: [],
        søkerInfo: defaultPerson,
        setErEndringssøknad: action('button-click'),
        setHarGodkjentVilkår: action('button-click'),
        setSøknadGjelderNyttBarn: action('button-click'),
        mellomlagreSøknadOgNaviger: promiseAction(),
    },
};

export const HarAlleredeLestOgForstått: Story = {
    args: {
        ...Default.args,
        harGodkjentVilkår: true,
    },
};

export const HarOpprettetFPSakFødselMedBarnetIPDL: Story = {
    args: {
        ...Default.args,
        saker: [sakOpprettetFødsel],
        søkerInfo: getSøkerinfoMedBarn([ettBarn]),
    },
};

export const HarFPSakUnderBehandlingTermin: Story = {
    args: {
        ...Default.args,
        saker: [sakUnderBehandlingTermin],
    },
};

export const HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL: Story = {
    args: {
        ...Default.args,
        saker: [erEndringssøknadUnderBehandlingAdopsjon],
        søkerInfo: getSøkerinfoMedBarn([ettBarn]),
    },
};

export const HarAvsluttetFPSak: Story = {
    args: {
        ...Default.args,
        saker: [sakAvsluttet],
        søkerInfo: getSøkerinfoMedBarn([ettBarn]),
    },
};

export const HarFlereSaker: Story = {
    args: {
        ...Default.args,
        saker: [sakOpprettetFødsel, { ...sakUnderBehandlingTermin, saksnummer: '555555' }],
        søkerInfo: getSøkerinfoMedBarn([ettBarn]),
    },
};

export const HarSakFødselUtenBarnIPDL: Story = {
    args: {
        ...Default.args,
        saker: [sakUtenBarnFødsel],
    },
};

export const HarSakAdopsjonUtenBarnIPDL: Story = {
    args: {
        ...Default.args,
        saker: [sakEttBarnAdopsjon],
    },
};

export const HarSakAdopsjonMedBarnIPDL: Story = {
    args: {
        ...Default.args,
        saker: [sakEttBarnAdopsjon],
        søkerInfo: getSøkerinfoMedBarn([ettBarn]),
    },
};

export const HarSakFødselTvillinger: Story = {
    args: {
        ...Default.args,
        saker: [sakMedTvillinger],
        søkerInfo: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato]),
    },
};

export const HarSakFødselTrillinger: Story = {
    args: {
        ...Default.args,
        saker: [sakMedTrillinger],
        søkerInfo: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, tredjeBarnSammeDato]),
    },
};

export const HarIngenSakerOgEttBarn: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: getSøkerinfoMedBarn([levendeBarn]),
    },
};

export const HarIngenSakerOgTvillinger: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
    },
};

export const HarIngenSakerOgEttDødtBarn: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: getSøkerinfoMedBarn([dødtBarn]),
    },
};

export const HarIngenSakerOgToDødeTvillinger: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: getSøkerinfoMedBarn([dødtBarn, dødTvilling]),
    },
};

export const HarIngenSakerOgEtDødfødtBarn: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: getSøkerinfoMedBarn([dødfødtBarn]),
    },
};

export const HarIngenSakerOgToDødfødteBarn: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: getSøkerinfoMedBarn([dødfødtBarn, dødfødtBarn]),
    },
};

export const HarIngenSakerMedEnLevendeOgEnDødfødtTvilling: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
    },
};

export const HarIngenSakerMedEnLevendeOgEnDødTvilling: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: getSøkerinfoMedBarn([levendeBarn, dødTvilling]),
    },
};

export const HarSakMedEnLevendeOgEnDødfødtTvilling: Story = {
    args: {
        ...Default.args,
        saker: [sakMedTvillinger],
        søkerInfo: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
    },
};

export const HarSakMedEtDødtBarn: Story = {
    args: {
        ...Default.args,
        saker: [sakOpprettetFødsel],
        søkerInfo: getSøkerinfoMedBarn([dødtBarn]),
    },
};

export const HarSakAdopsjonMedEtDødtBarn: Story = {
    args: {
        ...Default.args,
        saker: [sakEttBarnAdopsjon],
        søkerInfo: getSøkerinfoMedBarn([dødtBarn]),
    },
};

export const HarSakMedOppgittBarnTvillingerAlleLever: Story = {
    args: {
        ...Default.args,
        saker: [getSakMedBarn(sakMedTvillinger, ['1', '2'])],
        søkerInfo: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
    },
};

export const HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling: Story = {
    args: {
        ...Default.args,
        saker: [getSakMedBarn(sakMedTvillinger, ['1'])],
        søkerInfo: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
    },
};

export const HarSakMedTrillingerEnErDød: Story = {
    args: {
        ...Default.args,
        saker: [sakMedTrillinger],
        søkerInfo: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, dødfødtBarn]),
    },
};

export const HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker: Story = {
    args: {
        ...Default.args,
        saker: [sakUnderBehandlingTermin],
        søkerInfo: getSøkerinfoMedBarn([
            {
                fnr: '1',
                navn: {
                    fornavn: 'Hanne',
                    etternavn: 'Brokkoli',
                },
                fødselsdato: '2024-03-01',
                kjønn: 'K',
            },
        ]),
    },
};

export const HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker: Story = {
    args: {
        ...Default.args,
        saker: [sakUnderBehandlingTermin],
        søkerInfo: getSøkerinfoMedBarn([
            {
                fnr: '1',
                navn: {
                    fornavn: 'Hanne',
                    etternavn: 'Brokkoli',
                },
                fødselsdato: '2024-08-09',
                kjønn: 'K',
            },
        ]),
    },
};

export const HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig: Story = {
    args: {
        ...Default.args,
        saker: [sakUnderBehandlingTermin],
        søkerInfo: getSøkerinfoMedBarn([
            {
                fnr: '1',
                navn: {
                    fornavn: 'Hanne',
                    etternavn: 'Brokkoli',
                },
                fødselsdato: '2024-02-29',
                kjønn: 'K',
            },
        ]),
    },
};

export const HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent: Story = {
    args: {
        ...Default.args,
        saker: [sakUnderBehandlingTermin],
        søkerInfo: getSøkerinfoMedBarn([
            {
                fnr: '1',
                navn: {
                    fornavn: 'Hanne',
                    etternavn: 'Brokkoli',
                },
                fødselsdato: '2024-08-10',
                kjønn: 'K',
            },
        ]),
    },
};
