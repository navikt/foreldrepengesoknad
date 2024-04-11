import React from 'react';
import { useIntl } from 'react-intl';

import { Barn, Block, andreAugust2022ReglerGjelder, isFarEllerMedmor, isUfødtBarn } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Arbeidsforhold, Attachment, AttachmentMetadataType, Søkerrolle } from '@navikt/fp-types';

import { GyldigeSkjemanummer } from 'app/types/GyldigeSkjemanummer';

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
        <Block padBottom="xl">
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
        </Block>
    );
};

export default TerminbekreftelseDokumentasjon;
