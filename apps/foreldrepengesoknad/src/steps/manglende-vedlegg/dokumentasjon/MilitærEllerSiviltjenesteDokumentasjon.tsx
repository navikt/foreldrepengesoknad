import { useIntl } from 'react-intl';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { ArbeidsforholdOgInntektFp, Attachment } from '@navikt/fp-types';

import { VedleggUploader, formaterPerioderForVisning } from '../attachment-uploaders/VedleggUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp | undefined;
    andreInntektskilder?: AndreInntektskilder[];
}

export const MilitærEllerSiviltjenesteDokumentasjon = ({
    attachments,
    updateAttachments,
    arbeidsforholdOgInntekt,
    andreInntektskilder,
}: Props) => {
    const intl = useIntl();

    if (
        !arbeidsforholdOgInntekt ||
        (arbeidsforholdOgInntekt && !arbeidsforholdOgInntekt.harHattAndreInntektskilder) ||
        !andreInntektskilder ||
        !andreInntektskilder.some((i) => i.type === AnnenInntektType.MILITÆRTJENESTE)
    ) {
        return null;
    }

    const perioder = andreInntektskilder.filter((i) => i.type === AnnenInntektType.MILITÆRTJENESTE);

    return (
        <VedleggUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE)}
            skjemanummer={Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE}
            labelText={intl.formatMessage(
                { id: 'manglendeVedlegg.militær.tittel' },
                {
                    perioder: formaterPerioderForVisning(perioder, intl),
                    antallPerioder: perioder.length,
                },
            )}
            description={intl.formatMessage({ id: 'manglendeVedlegg.militær.description' })}
            attachmentType={AttachmentType.ANNEN_INNTEKT}
            metadataType="OPPTJENING"
            perioder={perioder}
        />
    );
};
