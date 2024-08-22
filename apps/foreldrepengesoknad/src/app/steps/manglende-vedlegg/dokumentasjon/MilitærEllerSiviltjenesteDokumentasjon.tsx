import React from 'react';
import { useIntl } from 'react-intl';

import { Block } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { ArbeidsforholdOgInntektFp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { Attachment } from '@navikt/fp-types';

import { AndreInntektskilder, AnnenInntektType } from 'app/types/AndreInntektskilder';
import { GyldigeSkjemanummer } from 'app/types/GyldigeSkjemanummer';

import VedleggMedPeriodeUploader from '../attachment-uploaders/VedleggMedPeriodeUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp;
    andreInntektskilder?: AndreInntektskilder[];
}

const MilitærEllerSiviltjenesteDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    arbeidsforholdOgInntekt,
    andreInntektskilder,
}) => {
    const intl = useIntl();

    if (
        !arbeidsforholdOgInntekt.harHattAndreInntektskilder ||
        !andreInntektskilder ||
        !andreInntektskilder.some((i) => i.type === AnnenInntektType.MILITÆRTJENESTE)
    ) {
        return null;
    }

    const perioder = andreInntektskilder
        .filter((i) => i.type === AnnenInntektType.MILITÆRTJENESTE)
        .map((i) => ({
            fom: i.fom,
            tom: i.tom,
        }));

    return (
        <Block padBottom="xl">
            <VedleggMedPeriodeUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE)}
                skjemanummer={Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE}
                labelText={intl.formatMessage({ id: 'manglendeVedlegg.militær.tittel' })}
                description={intl.formatMessage({
                    id: 'manglendeVedlegg.militær.description',
                })}
                attachmentType={AttachmentType.ANNEN_INNTEKT}
                metadataType={AttachmentMetadataType.OPPTJENING}
                perioder={perioder}
            />
        </Block>
    );
};

export default MilitærEllerSiviltjenesteDokumentasjon;
