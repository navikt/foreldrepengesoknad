import { Meta, StoryObj } from '@storybook/react';
import { Action, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { BarnFrontend, FpSak, FpÅpenBehandling, PersonFrontend, Søkerinfo } from '@navikt/fp-types';

import { Forside } from './Forside';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultPerson = {
    fnr: '19047815714',
    fornavn: 'TALENTFULL',
    etternavn: 'MYGG',
    kjønn: 'K',
    fødselsdato: '1978-04-19',
    barn: [],
} satisfies PersonFrontend;

interface SakInfo {
    kanSøkeOmEndring: boolean;
    gjelderAdopsjon: boolean;
    antallBarn: number;
    sakErAvsluttet: boolean;
    åpenbehandlingTilstand?: FpÅpenBehandling['tilstand'];
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelse?: string;
}

const getSakMedBarn = (sak: FpSak, barnFnr: string[]): FpSak => {
    const barna = barnFnr.map((fnrBarn) => {
        return { fnr: fnrBarn };
    });
    return { ...sak, barn: barna };
};

const getSak = (sakinfo: SakInfo): FpSak => {
    return {
        dekningsgrad: 'HUNDRE',
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

const getSøkerinfoMedBarn = (barna: BarnFrontend[]): Søkerinfo['søker'] => {
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
} satisfies BarnFrontend;

const dødtBarn = {
    ...levendeBarn,
    dødsdato: '2022-12-07',
} satisfies BarnFrontend;

const levendeTvilling = {
    fnr: '2',
    fornavn: 'Vakker',
    etternavn: 'Bokhylle',
    fødselsdato: dato,
    kjønn: 'K',
} satisfies BarnFrontend;

const dødTvilling = { ...levendeTvilling, dødsdato: '2022-12-07' };

const dødfødtBarn = {
    fødselsdato: dato,
    dødsdato: dato,
    kjønn: 'K',
    fnr: '2',
    fornavn: 'Vakker',
    etternavn: 'Bokhylle',
} satisfies BarnFrontend;

const sakErIkkeAvsluttet = false;

const ettBarn = {
    fnr: '3',
    fornavn: 'Evig',
    mellomnavn: 'Lykkelig',
    etternavn: 'Vår',
    fødselsdato: dato,
    kjønn: 'M',
} satisfies BarnFrontend;

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
        søkerInfo: { søker: defaultPerson, arbeidsforhold: [] },
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
        søkerInfo: { søker: getSøkerinfoMedBarn([ettBarn]), arbeidsforhold: [] },
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
        søkerInfo: { søker: getSøkerinfoMedBarn([ettBarn]), arbeidsforhold: [] },
    },
};

export const HarAvsluttetFPSak: Story = {
    args: {
        ...Default.args,
        saker: [sakAvsluttet],
        søkerInfo: { søker: getSøkerinfoMedBarn([ettBarn]), arbeidsforhold: [] },
    },
};

export const HarFlereSaker: Story = {
    args: {
        ...Default.args,
        saker: [sakOpprettetFødsel, { ...sakUnderBehandlingTermin, saksnummer: '555555' }],
        søkerInfo: { søker: getSøkerinfoMedBarn([ettBarn]), arbeidsforhold: [] },
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
        søkerInfo: { søker: getSøkerinfoMedBarn([ettBarn]), arbeidsforhold: [] },
    },
};

export const HarSakFødselTvillinger: Story = {
    args: {
        ...Default.args,
        saker: [sakMedTvillinger],
        søkerInfo: { søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato]), arbeidsforhold: [] },
    },
};

export const HarSakFødselTrillinger: Story = {
    args: {
        ...Default.args,
        saker: [sakMedTrillinger],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, tredjeBarnSammeDato]),
            arbeidsforhold: [],
        },
    },
};

export const HarIngenSakerOgEttBarn: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([levendeBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarIngenSakerOgTvillinger: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
            arbeidsforhold: [],
        },
    },
};

export const HarIngenSakerOgEttDødtBarn: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([dødtBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarIngenSakerOgToDødeTvillinger: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([dødtBarn, dødTvilling]),
            arbeidsforhold: [],
        },
    },
};

export const HarIngenSakerOgEtDødfødtBarn: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([dødfødtBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarIngenSakerOgToDødfødteBarn: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([dødfødtBarn, dødfødtBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarIngenSakerMedEnLevendeOgEnDødfødtTvilling: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarIngenSakerMedEnLevendeOgEnDødTvilling: Story = {
    args: {
        ...Default.args,
        saker: [],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([levendeBarn, dødTvilling]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakMedEnLevendeOgEnDødfødtTvilling: Story = {
    args: {
        ...Default.args,
        saker: [sakMedTvillinger],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakMedEtDødtBarn: Story = {
    args: {
        ...Default.args,
        saker: [sakOpprettetFødsel],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([dødtBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakAdopsjonMedEtDødtBarn: Story = {
    args: {
        ...Default.args,
        saker: [sakEttBarnAdopsjon],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([dødtBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakMedOppgittBarnTvillingerAlleLever: Story = {
    args: {
        ...Default.args,
        saker: [getSakMedBarn(sakMedTvillinger, ['1', '2'])],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([levendeBarn, levendeTvilling]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling: Story = {
    args: {
        ...Default.args,
        saker: [getSakMedBarn(sakMedTvillinger, ['1'])],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([levendeBarn, dødfødtBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakMedTrillingerEnErDød: Story = {
    args: {
        ...Default.args,
        saker: [sakMedTrillinger],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([ettBarn, annetBarnSammeDato, dødfødtBarn]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminMinus17uker: Story = {
    args: {
        ...Default.args,
        saker: [sakUnderBehandlingTermin],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([
                {
                    fnr: '1',
                    fornavn: 'Hanne',
                    etternavn: 'Brokkoli',
                    fødselsdato: '2024-03-01',
                    kjønn: 'K',
                },
            ]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakPåTerminSomSkalKoblesMedFødtPDLBarnFødtInnenTerminPlus6uker: Story = {
    args: {
        ...Default.args,
        saker: [sakUnderBehandlingTermin],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([
                {
                    fnr: '1',
                    fornavn: 'Hanne',
                    etternavn: 'Brokkoli',
                    fødselsdato: '2024-08-09',
                    kjønn: 'K',
                },
            ]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakPåTerminSomIkkeSkalKoblesMedPDLBarnFødtForTidlig: Story = {
    args: {
        ...Default.args,
        saker: [sakUnderBehandlingTermin],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([
                {
                    fnr: '1',
                    fornavn: 'Hanne',
                    etternavn: 'Brokkoli',
                    fødselsdato: '2024-02-29',
                    kjønn: 'K',
                },
            ]),
            arbeidsforhold: [],
        },
    },
};

export const HarSakPåTerminSomIkkeSkalKoblesMedMedPDLBarnFødtForSent: Story = {
    args: {
        ...Default.args,
        saker: [sakUnderBehandlingTermin],
        søkerInfo: {
            søker: getSøkerinfoMedBarn([
                {
                    fnr: '1',
                    fornavn: 'Hanne',
                    etternavn: 'Brokkoli',
                    fødselsdato: '2024-08-10',
                    kjønn: 'K',
                },
            ]),
            arbeidsforhold: [],
        },
    },
};
