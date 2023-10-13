import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IntlProvider from 'intl/IntlProvider';
import { AttachmentType, Skjemanummer } from '@navikt/fp-types';
import { BarnetErFødt, OmBarnet } from 'types/OmBarnet';
import { Utenlandsopphold, UtenlandsoppholdPerioder } from 'types/Utenlandsopphold';
import withRouter from 'storybookHelpers/withRouter';
import EsContextStorybookHelper from 'storybookHelpers/EsContextStorybookHelper';
import { EsDataType } from 'appData/EsDataContext';
import { Kjønn } from 'types/Person';
import { Path } from 'appData/paths';
import Dokumentasjon from 'types/Dokumentasjon';

import OppsummeringSteg from './OppsummeringSteg';
import { initAmplitude } from '@navikt/fp-metrics';

const person = {
    fnr: '11111111111',
    fornavn: 'Henrikke',
    etternavn: 'Ibsen',
    kjønn: Kjønn.KVINNE,
    fødselsdato: '1979-01-28',
    adresse: 'Testadresse',
    bankkonto: {
        kontonummer: '49875234987',
        banknavn: 'Storebank',
    },
};

const barnet = {
    erBarnetFødt: true,
    antallBarn: 1,
    fødselsdatoer: [{ dato: '2023-01-01' }],
} as BarnetErFødt;

const utenlandsoppholdDefault = {
    harKunBoddINorge: true,
};

const vedleggDefault = {
    vedlegg: [],
};

export default {
    title: 'OppsummeringSteg',
    component: OppsummeringSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.OPPSUMMERING,
    },
};

const Template: StoryFn<{
    sendSøknad: (
        omBarnet: OmBarnet,
        utenlandsopphold: Utenlandsopphold,
        dokumentasjon?: Dokumentasjon,
        utenlandsoppholdPerioder?: UtenlandsoppholdPerioder,
    ) => void;
    omBarnet?: OmBarnet;
    utenlandsopphold?: Utenlandsopphold;
    utenlandsoppholdPerioder?: UtenlandsoppholdPerioder;
    dokumentasjon?: Dokumentasjon;
}> = ({
    sendSøknad,
    omBarnet = barnet,
    utenlandsopphold = utenlandsoppholdDefault,
    utenlandsoppholdPerioder,
    dokumentasjon = vedleggDefault,
}) => {
    initAmplitude();
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper
                initialState={{
                    [EsDataType.OM_BARNET]: omBarnet,
                    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                    [EsDataType.UTENLANDSOPPHOLD_PERIODER]: utenlandsoppholdPerioder,
                    [EsDataType.DOKUMENTASJON]: dokumentasjon,
                }}
            >
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const BarnetErFodt = Template.bind({});
BarnetErFodt.args = {
    sendSøknad: action('button-click'),
};

export const AdopsjonAvEktefellesBarn = Template.bind({});
AdopsjonAvEktefellesBarn.args = {
    sendSøknad: action('button-click'),
    omBarnet: {
        adopsjonAvEktefellesBarn: true,
        antallBarn: 1,
        adopsjonsdato: '2023-01-01',
        fødselsdatoer: [{ dato: '2023-01-01' }],
    },
    dokumentasjon: {
        vedlegg: [
            {
                id: '1',
                filename: 'filnavn.pdf',
                filesize: 2323,
                file: {} as any,
                pending: false,
                uploaded: true,
                type: AttachmentType.OMSORGSOVERTAKELSE,
                skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
            },
        ],
    },
};

export const AdopsjonAvEktefellesFlereBarn = Template.bind({});
AdopsjonAvEktefellesFlereBarn.args = {
    sendSøknad: action('button-click'),
    omBarnet: {
        adopsjonAvEktefellesBarn: true,
        antallBarn: 1,
        adopsjonsdato: '2023-01-01',
        fødselsdatoer: [{ dato: '2023-01-01' }, { dato: '2020-01-01' }],
    },
    dokumentasjon: {
        vedlegg: [
            {
                id: '1',
                filename: 'filnavn.pdf',
                filesize: 2323,
                file: {} as any,
                pending: false,
                uploaded: true,
                type: AttachmentType.OMSORGSOVERTAKELSE,
                skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
            },
        ],
    },
};

export const BarnetErIkkeFodt = Template.bind({});
BarnetErIkkeFodt.args = {
    sendSøknad: action('button-click'),
    omBarnet: {
        erBarnetFødt: false,
        antallBarn: 1,
        termindato: '2023-01-02',
    },
    dokumentasjon: {
        terminbekreftelsedato: '2023-01-01',
        vedlegg: [
            {
                id: '1',
                filename: 'filnavn.pdf',
                filesize: 2323,
                file: {} as any,
                pending: false,
                uploaded: true,
                type: AttachmentType.TERMINBEKREFTELSE,
                skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
            },
        ],
    },
};

export const HarTidligereOgFremtidigeUtenlandsopphold = Template.bind({});
HarTidligereOgFremtidigeUtenlandsopphold.args = {
    sendSøknad: action('button-click'),
    utenlandsopphold: {
        harKunBoddINorge: false,
    },
    utenlandsoppholdPerioder: {
        perioder: [
            {
                harFlyttetUtForMerEnn12MånderSiden: false,
                skalBoIUtlandetMerEnEttÅrFremover: false,
                fom: '2023-12-22',
                tom: '2024-01-21',
                landkode: 'SE',
            },
            {
                harFlyttetUtForMerEnn12MånderSiden: false,
                skalBoIUtlandetMerEnEttÅrFremover: false,
                fom: '2023-05-27',
                tom: '2023-07-05',
                landkode: 'DK',
            },
            {
                harFlyttetUtForMerEnn12MånderSiden: false,
                skalBoIUtlandetMerEnEttÅrFremover: false,
                fom: '2023-03-27',
                tom: '2023-04-05',
                landkode: 'IS',
            },
        ],
    },
};
