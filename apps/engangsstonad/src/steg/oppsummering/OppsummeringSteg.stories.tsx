import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Dokumentasjon } from 'types/Dokumentasjon';
import { BarnetErFødt, OmBarnet } from 'types/OmBarnet';

import { AttachmentType, ISO_DATE_FORMAT, Skjemanummer } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { Utenlandsopphold, UtenlandsoppholdPeriode } from '@navikt/fp-types';

import { OppsummeringSteg } from './OppsummeringSteg';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const barnetDefault = {
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

type StoryArgs = {
    omBarnet?: OmBarnet;
    utenlandsopphold?: Utenlandsopphold;
    tidligereUtenlandsopphold?: UtenlandsoppholdPeriode[];
    senereUtenlandsopphold?: UtenlandsoppholdPeriode[];
    dokumentasjon?: Dokumentasjon;
} & ComponentProps<typeof OppsummeringSteg>;

const meta = {
    title: 'steg/OppsummeringSteg',
    component: OppsummeringSteg,
    render: ({
        sendSøknad,
        omBarnet = barnetDefault,
        utenlandsopphold = utenlandsoppholdDefault,
        senereUtenlandsopphold,
        tidligereUtenlandsopphold,
        dokumentasjon = vedleggDefault,
        mellomlagreOgNaviger,
    }) => {
        initAmplitude();
        return (
            <div id="app">
                <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                    <EsDataContext
                        initialState={{
                            [ContextDataType.OM_BARNET]: omBarnet,
                            [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                            [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
                            [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
                            [ContextDataType.DOKUMENTASJON]: dokumentasjon,
                        }}
                    >
                        <OppsummeringSteg sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                    </EsDataContext>
                </MemoryRouter>
            </div>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BarnetErFodt: Story = {
    args: {
        sendSøknad: promiseAction(),
        mellomlagreOgNaviger: promiseAction(),
    },
};

export const AdopsjonAvEktefellesBarn: Story = {
    args: {
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
        mellomlagreOgNaviger: promiseAction(),
    },
};

export const AdopsjonAvEktefellesFlereBarn: Story = {
    args: {
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
        mellomlagreOgNaviger: promiseAction(),
    },
};

export const BarnetErIkkeFodt: Story = {
    args: {
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
        mellomlagreOgNaviger: promiseAction(),
    },
};

export const HarTidligereOgFremtidigeUtenlandsopphold: Story = {
    args: {
        sendSøknad: promiseAction(),
        utenlandsopphold: {
            harBoddUtenforNorgeSiste12Mnd: true,
            skalBoUtenforNorgeNeste12Mnd: true,
        },
        senereUtenlandsopphold: [
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
        tidligereUtenlandsopphold: [
            {
                fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
                tom: dayjs().format(ISO_DATE_FORMAT),
                landkode: 'IS',
            },
        ],
        mellomlagreOgNaviger: promiseAction(),
    },
};
