import { StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { HttpResponse, http } from 'msw';
import { VedleggDataType } from 'types/VedleggDataType';

import { AnnenForelderOppgitt, BarnType, MorsAktivitet, NavnPåForeldre, Periode, UfødtBarn } from '@navikt/fp-common';
import { AttachmentType, InnsendingsType, Skjemanummer } from '@navikt/fp-constants';

import { DokumentasjonOppsummering } from './DokumentasjonOppsummering';

export default {
    title: 'steps/oppsummering/DokumentasjonOppsummering',
    component: DokumentasjonOppsummering,
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const Template: StoryFn<typeof DokumentasjonOppsummering> = (args) => {
    const mockBarn: UfødtBarn = {
        type: BarnType.UFØDT,
        termindato: '2024-01-01',
        antallBarn: 1,
    };

    const mockUttaksplan: Periode[] = [
        {
            type: 'UTTAK',
            tidsperiode: {
                fom: new Date('2024-01-01'),
                tom: new Date('2024-01-31'),
            },
            morsAktivitetIPerioden: {
                type: 'arbeid',
                prosent: 50,
            } as unknown as MorsAktivitet,
            årsak: 'UTTAK',
            erArbeidstaker: true,
            forelder: 'mor',
            id: '1',
        } as unknown as Periode,
    ];

    const mockAnnenForelder: AnnenForelderOppgitt = {
        fnr: '09876543210',
        fornavn: 'Ola',
        etternavn: 'Nordmann',
        erAleneOmOmsorg: false,
        kanIkkeOppgis: false,
    };

    return (
        <QueryClientProvider client={queryClient}>
            <FpDataContext
                initialState={{
                    [ContextDataType.OM_BARNET]: mockBarn,
                    [ContextDataType.UTTAKSPLAN]: mockUttaksplan,
                    [ContextDataType.ANNEN_FORELDER]: mockAnnenForelder,
                }}
            >
                <DokumentasjonOppsummering {...args} />
            </FpDataContext>
        </QueryClientProvider>
    );
};

const defaultProps = {
    onVilEndreSvar: () => Promise.resolve(),
    erSøkerFarEllerMedmor: false,
    navnPåForeldre: {
        mor: 'Kari Nordmann',
        farMedmor: 'Ola Nordmann',
    } as NavnPåForeldre,
    uttaksperioderSomManglerVedlegg: [],
};

const MORS_STILLINGSPROSENT = 79; // Endret til under 80 for testing

export const VisMorTrengerDokumentereArbeid = Template.bind({});
VisMorTrengerDokumentereArbeid.args = {
    ...defaultProps,
    alleVedlegg: {
        'mors-arbeid': [
            {
                id: '1',
                filename: 'arbeidsavtale.pdf',
                url: 'http://example.com/arbeidsavtale.pdf',
                innsendingsType: InnsendingsType.SEND_SENERE,
                type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
            },
        ],
    } as VedleggDataType,
};

VisMorTrengerDokumentereArbeid.parameters = {
    msw: {
        handlers: [
            http.post('/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid', async () => {
                const needsDocumentation = MORS_STILLINGSPROSENT <= 80;
                console.log('Returning needsDocumentation:', needsDocumentation);
                return HttpResponse.json(needsDocumentation);
            }),
        ],
    },
};

export const VisMorTrengerIkkeDokumentereArbeid = Template.bind({});
VisMorTrengerIkkeDokumentereArbeid.args = {
    ...defaultProps,
    alleVedlegg: {
        'mors-arbeid': [
            {
                id: '1',
                filename: 'arbeidsavtale.pdf',
                url: 'http://example.com/arbeidsavtale.pdf',
                innsendingsType: InnsendingsType.SEND_SENERE,
                type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
            },
        ],
    } as VedleggDataType,
};

VisMorTrengerIkkeDokumentereArbeid.parameters = {
    msw: {
        handlers: [
            http.post('/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid', async () => {
                return HttpResponse.json(false);
            }),
        ],
    },
};

export const VisMorTrengerIkkeDokumentereArbeidMåDokumenterUtdanning = Template.bind({});
VisMorTrengerIkkeDokumentereArbeidMåDokumenterUtdanning.args = {
    ...defaultProps,
    alleVedlegg: {
        'mors-arbeid': [
            {
                id: '1',
                filename: 'arbeidsavtale.pdf',
                url: 'http://example.com/arbeidsavtale.pdf',
                innsendingsType: InnsendingsType.SEND_SENERE,
                type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
            },
        ],
        'mors-utdanning': [
            {
                id: '2',
                filename: 'utdanning.pdf',
                url: 'http://example.com/utdanning.pdf',
                innsendingsType: InnsendingsType.SEND_SENERE,
                type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                skjemanummer: Skjemanummer.DOK_UTDANNING_MOR,
            },
        ],
    } as VedleggDataType,
};

VisMorTrengerIkkeDokumentereArbeidMåDokumenterUtdanning.parameters = {
    msw: {
        handlers: [
            http.post('/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid', async () => {
                return HttpResponse.json(false);
            }),
        ],
    },
};
