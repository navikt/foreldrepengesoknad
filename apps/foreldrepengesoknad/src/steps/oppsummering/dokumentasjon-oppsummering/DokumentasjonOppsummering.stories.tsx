import { StoryFn } from '@storybook/react';
import { VedleggDataType } from 'types/VedleggDataType';

import { NavnPåForeldre } from '@navikt/fp-common';
import { AttachmentType, InnsendingsType, Skjemanummer } from '@navikt/fp-constants';

import { DokumentasjonOppsummering } from './DokumentasjonOppsummering';

export default {
    title: 'steps/oppsummering/DokumentasjonOppsummering',
    component: DokumentasjonOppsummering,
};

const Template: StoryFn<typeof DokumentasjonOppsummering> = (args) => <DokumentasjonOppsummering {...args} />;

const defaultProps = {
    onVilEndreSvar: () => Promise.resolve(),
    erSøkerFarEllerMedmor: false,
    navnPåForeldre: {
        mor: 'Mor',
        farMedmor: 'Far',
    } as NavnPåForeldre,
    uttaksperioderSomManglerVedlegg: [],
};

export const MorJobberUnder80ProsentMedDokumentasjon = Template.bind({});
MorJobberUnder80ProsentMedDokumentasjon.args = {
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

export const MorJobberUnder80ProsentMedStudier = Template.bind({});
MorJobberUnder80ProsentMedStudier.args = {
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
        'mors-studier': [
            {
                id: '2',
                filename: 'studiebevis.pdf',
                url: 'http://example.com/studiebevis.pdf',
                innsendingsType: InnsendingsType.SEND_SENERE,
                type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                skjemanummer: Skjemanummer.DOK_UTDANNING_MOR,
            },
        ],
    } as VedleggDataType,
};
