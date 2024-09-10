import React from 'react';
import { useIntl } from 'react-intl';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { AttachmentMetadataType, AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { ArbeidsforholdOgInntektFp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { Attachment } from '@navikt/fp-types';

import VedleggUploader, { formaterPerioderForVisning } from '../attachment-uploaders/VedleggUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp;
    andreInntektskilder?: AndreInntektskilder[];
}

const EtterlønnEllerSluttvederlagDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    arbeidsforholdOgInntekt,
    andreInntektskilder,
}) => {
    const intl = useIntl();

    if (
        arbeidsforholdOgInntekt.harHattAndreInntektskilder === false ||
        !andreInntektskilder ||
        !andreInntektskilder.some((i) => i.type === AnnenInntektType.SLUTTPAKKE)
    ) {
        return null;
    }

    const perioder = andreInntektskilder.filter((i) => i.type === AnnenInntektType.SLUTTPAKKE);

    return (
        <VedleggUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG)}
            skjemanummer={Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG}
            labelText={intl.formatMessage(
                { id: 'manglendeVedlegg.etterlønn.tittel' },
                {
                    perioder: formaterPerioderForVisning(perioder, intl),
                    antallPerioder: perioder.length,
                },
            )}
            description={intl.formatMessage({
                id: 'manglendeVedlegg.etterlønn.description',
            })}
            attachmentType={AttachmentType.ANNEN_INNTEKT}
            metadataType={AttachmentMetadataType.OPPTJENING}
            perioder={perioder}
        />
    );
};

export default EtterlønnEllerSluttvederlagDokumentasjon;
