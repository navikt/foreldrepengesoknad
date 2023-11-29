import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { getSaveAttachment } from '@navikt/fp-api';
import { MorsAktivitet, Periode, isUttaksperiode } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, Attachment as AttachmentFPTypes } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import Environment from 'app/Environment';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    attachments: Attachment[];
    updateAttachments: (attachments: AttachmentFPTypes[]) => void;
    periode: Periode;
}

const getAktivitetskravLabel = (aktivitet: MorsAktivitet) => {
    if (aktivitet === MorsAktivitet.Arbeid) {
        return 'Mor er i arbeid';
    }

    return '';
};

const getUploaderLabel = (periode: Periode) => {
    if (isUttaksperiode(periode)) {
        if (periode.morsAktivitetIPerioden) {
            return getAktivitetskravLabel(periode.morsAktivitetIPerioden);
        }
    }

    return '';
};

const PeriodeAttachmentUploader: FunctionComponent<Props> = ({ attachments, updateAttachments, periode }) => {
    return (
        <VStack gap="4">
            <div>
                <Label>{getUploaderLabel(periode)}</Label>
                <BodyLong>Last opp dokumentasjon på at mor er i arbeid</BodyLong>
            </div>
            <BodyLong>
                <FormattedMessage id="manglendeVedlegg.storrelse" />
            </BodyLong>
            <FileUploader
                attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                skjemanummer={Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET}
                existingAttachments={attachments as AttachmentFPTypes[]}
                updateAttachments={updateAttachments}
                saveAttachment={getSaveAttachment(Environment.REST_API_URL)}
            />
        </VStack>
    );
};

export default PeriodeAttachmentUploader;
