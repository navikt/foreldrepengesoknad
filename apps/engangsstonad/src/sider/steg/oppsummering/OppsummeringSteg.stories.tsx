import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IntlProvider from 'intl/IntlProvider';
import { AttachmentType, Skjemanummer, ISO_DATE_FORMAT } from '@navikt/fp-constants';
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
import dayjs from 'dayjs';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

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
    fødselsdato: dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
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
        abortSignal: AbortSignal,
        omBarnet: OmBarnet,
        dokumentasjon?: Dokumentasjon,
        tidligereUtenlandsopphold?: UtenlandsoppholdTidligere,
        senereUtenlandsopphold?: UtenlandsoppholdSenere,
    ) => Promise<void>;
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
    sendSøknad: promiseAction(),
};

export const AdopsjonAvEktefellesBarn = Template.bind({});
AdopsjonAvEktefellesBarn.args = {
    sendSøknad: promiseAction(),
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
    sendSøknad: promiseAction(),
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
    sendSøknad: promiseAction(),
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
    sendSøknad: promiseAction(),
    utenlandsopphold: {
        harBoddUtenforNorgeSiste12Mnd: true,
        skalBoUtenforNorgeNeste12Mnd: true,
    },
    senereUtenlandsopphold: {
        utenlandsoppholdNeste12Mnd: [
            {
                fom: dayjs().format(ISO_DATE_FORMAT),
                tom: dayjs().add(100, 'day').format(ISO_DATE_FORMAT),
                landkode: 'SE',
            },
            {
                fom: dayjs().add(101, 'day').format(ISO_DATE_FORMAT),
                tom: dayjs().add(200, 'day').format(ISO_DATE_FORMAT),
                landkode: 'DK',
            },
        ],
    },
    tidligereUtenlandsopphold: {
        utenlandsoppholdSiste12Mnd: [
            {
                fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
                tom: dayjs().format(ISO_DATE_FORMAT),
                landkode: 'IS',
            },
        ],
    },
};
