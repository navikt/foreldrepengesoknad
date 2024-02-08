import dayjs from 'dayjs';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AttachmentType, Skjemanummer, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { BarnetErFødt, OmBarnet } from 'types/OmBarnet';
import { EsDataContext, ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import Dokumentasjon from 'types/Dokumentasjon';
import OppsummeringSteg from './OppsummeringSteg';
import { Person, Utenlandsopphold, UtenlandsoppholdSenere, UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { MemoryRouter } from 'react-router-dom';

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
    kjønn: 'K',
    fødselsdato: '1979-01-28',
    adresse: 'Testadresse',
    bankkonto: {
        kontonummer: '49875234987',
        banknavn: 'Storebank',
    },
} as Person;

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
};

const Template: StoryFn<{
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    omBarnet?: OmBarnet;
    utenlandsopphold?: Utenlandsopphold;
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere;
    senereUtenlandsopphold?: UtenlandsoppholdSenere;
    dokumentasjon?: Dokumentasjon;
    mellomlagreOgNaviger?: () => Promise<void>;
}> = ({
    sendSøknad,
    omBarnet = barnet,
    utenlandsopphold = utenlandsoppholdDefault,
    senereUtenlandsopphold,
    tidligereUtenlandsopphold,
    dokumentasjon = vedleggDefault,
    mellomlagreOgNaviger = promiseAction(),
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
                    <OppsummeringSteg
                        person={person}
                        sendSøknad={sendSøknad}
                        mellomlagreOgNaviger={mellomlagreOgNaviger}
                    />
                </EsDataContext>
            </MemoryRouter>
        </div>
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
