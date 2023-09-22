import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Oppsummering from './Oppsummering';
import IntlProvider from '../../../intl/IntlProvider';
import { FormValues as OmBarnetFormValues } from '../omBarnet/OmBarnetForm';
import { FormValues as UtenlandsoppholdFormFormValus } from '../utenlandsopphold/UtenlandsoppholdForm';
import { FormValues as UtenlandsoppholdFremtidigFormFormValus } from '../utlandsoppholdFremtidig/FremtidigUtlandsopphold';
import { FormValues as UtenlandsoppholdTidligereFormFormValus } from '../utlandsoppholdTidligere/TidligereUtlandsopphold';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';
import { AttachmentType, Skjemanummer } from 'fpcommon/uploader/typer/Attachment';

const person = {
    fnr: '11111111111',
    fornavn: 'Henrikke',
    etternavn: 'Ibsen',
    kjønn: 'K',
    fødselsdato: '1979-01-28',
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
    title: 'Oppsummering',
    component: Oppsummering,
};

const Template: StoryFn<{
    omBarnet?: OmBarnetFormValues;
    utenlandsopphold?: UtenlandsoppholdFormFormValus;
    utenlandsoppholdFremtidig?: UtenlandsoppholdFremtidigFormFormValus;
    utenlandsoppholdTidligere?: UtenlandsoppholdTidligereFormFormValus;
}> = ({
    omBarnet = barnet,
    utenlandsopphold = utenlandsoppholdDefault,
    utenlandsoppholdFremtidig = utenlandsoppholdFremtidigDefault,
    utenlandsoppholdTidligere = utenlandsoppholdTidligereDefault,
}) => {
    return (
        <IntlProvider språkkode="nb">
            <Oppsummering
                person={person}
                omBarnet={omBarnet}
                utenlandsopphold={utenlandsopphold}
                utenlandsoppholdFremtidig={utenlandsoppholdFremtidig}
                utenlandsoppholdTidligere={utenlandsoppholdTidligere}
                avbrytSøknad={action('button-click')}
            />
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
    utenlandsoppholdFremtidig: {
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
    utenlandsoppholdTidligere: {
        utenlandsoppholdSiste12Mnd: [
            {
                fom: '2021-01-01',
                tom: '2022-01-01',
                landkode: 'IS',
            },
        ],
    },
};
