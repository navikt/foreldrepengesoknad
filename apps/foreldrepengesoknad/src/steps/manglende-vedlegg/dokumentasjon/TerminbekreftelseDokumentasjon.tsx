import React from 'react';
import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { andreAugust2022ReglerGjelder } from 'utils/dateUtils';
import isFarEllerMedmor from 'utils/isFarEllerMedmor';

import { Barn, isUfødtBarn } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Arbeidsforhold, Attachment, Søkerrolle } from '@navikt/fp-types';

import VedleggUploader from '../attachment-uploaders/VedleggUploader';

const getKanSøkePåTermin = (rolle: Søkerrolle, termindato: string): boolean => {
    if (!isFarEllerMedmor(rolle)) {
        return true;
    }
    return termindato ? andreAugust2022ReglerGjelder(termindato) : false;
};

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    barn: Barn;
    arbeidsforhold: Arbeidsforhold[];
    rolle: Søkerrolle;
    erFarEllerMedmor: boolean;
}

const TerminbekreftelseDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    barn,
    rolle,
    arbeidsforhold,
    erFarEllerMedmor,
}) => {
    const intl = useIntl();

    if (
        !isUfødtBarn(barn) ||
        (arbeidsforhold.length > 0 && !erFarEllerMedmor) ||
        !getKanSøkePåTermin(rolle, barn.termindato)
    ) {
        return null;
    }

    return (
        <VedleggUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.TERMINBEKREFTELSE)}
            skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.terminbekreftelse.tittel' })}
            description={intl.formatMessage({
                id: !erFarEllerMedmor
                    ? 'manglendeVedlegg.terminbekreftelse.description'
                    : 'manglendeVedlegg.terminbekreftelse.description.farMedmor',
            })}
            attachmentType={AttachmentType.TERMINBEKREFTELSE}
            metadataType={AttachmentMetadataType.BARN}
        />
    );
};

export default TerminbekreftelseDokumentasjon;
