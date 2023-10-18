import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IntlProvider from 'intl/IntlProvider';
import { AttachmentType, Skjemanummer } from '@navikt/fp-types';
import { BarnetErFødt, OmBarnet } from 'types/OmBarnet';
import { Utenlandsopphold, UtenlandsoppholdSenere, UtenlandsoppholdTidligere } from 'types/Utenlandsopphold';
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
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: false,
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
        tidligereUtenlandsopphold?: UtenlandsoppholdTidligere,
        senereUtenlandsopphold?: UtenlandsoppholdSenere,
    ) => void;
    omBarnet?: OmBarnet;
    utenlandsopphold?: Utenlandsopphold;
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere;
    senereUtenlandsopphold?: UtenlandsoppholdSenere;
    dokumentasjon?: Dokumentasjon;
}> = ({
    sendSøknad,
    omBarnet = barnet,
    utenlandsopphold = utenlandsoppholdDefault,
    senereUtenlandsopphold,
    tidligereUtenlandsopphold,
    dokumentasjon = vedleggDefault,
}) => {
    initAmplitude();
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper
                initialState={{
                    [EsDataType.OM_BARNET]: omBarnet,
                    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
                    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
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
        harBoddUtenforNorgeSiste12Mnd: true,
        skalBoUtenforNorgeNeste12Mnd: true,
    },
    senereUtenlandsopphold: {
        utenlandsoppholdNeste12Mnd: [
            {
                fom: '2025-01-01',
                tom: '2026-01-01',
                landkode: 'SE',
            },
            {
                fom: '2027-01-01',
                tom: '2028-01-01',
                landkode: 'DK',
            },
        ],
    },
    tidligereUtenlandsopphold: {
        utenlandsoppholdSiste12Mnd: [
            {
                fom: '2021-01-01',
                tom: '2022-01-01',
                landkode: 'IS',
            },
        ],
    },
};
