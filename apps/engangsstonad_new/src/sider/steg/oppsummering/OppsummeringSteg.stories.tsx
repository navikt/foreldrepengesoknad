import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import OppsummeringSteg from './OppsummeringSteg';
import IntlProvider from '../../../intl/IntlProvider';
import { AttachmentType, Skjemanummer } from 'fpcommon/uploader/typer/Attachment';
import { OmBarnet } from 'types/OmBarnet';
import { Utenlandsopphold, UtenlandsoppholdNeste, UtenlandsoppholdSiste } from 'types/Utenlandsopphold';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';
import { EsDataType } from '../../../EsDataContext';
import { Kjønn } from 'types/Person';
import { Path } from '../../../useEsNavigator';

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
    fødselsdatoer: ['2023-01-01'],
};

const utenlandsoppholdDefault = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: false,
};
const utenlandsoppholdFremtidigDefault = {
    utenlandsoppholdNeste12Mnd: [],
};
const utenlandsoppholdTidligereDefault = {
    utenlandsoppholdSiste12Mnd: [],
};

export default {
    title: 'OppsummeringSteg',
    component: OppsummeringSteg,
    decorators: [withRouterProvider],
    parameters: {
        withRouterDecoratorUrl: Path.OPPSUMMERING,
    },
};

const Template: StoryFn<{
    omBarnet?: OmBarnet;
    utenlandsopphold?: Utenlandsopphold;
    nesteUtenlandsopphold?: UtenlandsoppholdNeste;
    sisteUtenlandsopphold?: UtenlandsoppholdSiste;
}> = ({
    omBarnet = barnet,
    utenlandsopphold = utenlandsoppholdDefault,
    nesteUtenlandsopphold = utenlandsoppholdFremtidigDefault,
    sisteUtenlandsopphold = utenlandsoppholdTidligereDefault,
}) => {
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper
                initialState={{
                    [EsDataType.OM_BARNET]: omBarnet,
                    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                    [EsDataType.UTENLANDSOPPHOLD_NESTE]: nesteUtenlandsopphold,
                    [EsDataType.UTENLANDSOPPHOLD_SISTE]: sisteUtenlandsopphold,
                }}
            >
                <OppsummeringSteg person={person} sendSøknad={action('button-click')} />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const BarnetErFodt = Template.bind({});

export const AdopsjonAvEktefellesBarn = Template.bind({});
AdopsjonAvEktefellesBarn.args = {
    omBarnet: {
        adopsjonAvEktefellesBarn: true,
        antallBarn: 1,
        adopsjonsdato: '2023-01-01',
        fødselsdatoer: ['2023-01-01'],
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
    omBarnet: {
        adopsjonAvEktefellesBarn: true,
        antallBarn: 1,
        adopsjonsdato: '2023-01-01',
        fødselsdatoer: ['2023-01-01', '2020-01-01'],
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
    omBarnet: {
        erBarnetFødt: false,
        antallBarn: 1,
        termindato: '2023-01-02',
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
    utenlandsopphold: {
        harBoddUtenforNorgeSiste12Mnd: true,
        skalBoUtenforNorgeNeste12Mnd: true,
    },
    nesteUtenlandsopphold: {
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
    sisteUtenlandsopphold: {
        utenlandsoppholdSiste12Mnd: [
            {
                fom: '2021-01-01',
                tom: '2022-01-01',
                landkode: 'IS',
            },
        ],
    },
};
