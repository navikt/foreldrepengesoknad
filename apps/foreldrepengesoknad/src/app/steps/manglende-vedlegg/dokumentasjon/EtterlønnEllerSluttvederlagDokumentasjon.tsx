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

    const perioder = andreInntektskilder
        .filter((i) => i.type === AnnenInntektType.SLUTTPAKKE)
        .map((i) => ({
            fom: i.fom,
            tom: i.tom,
        }));

    return (
        <Block padBottom="xl">
            <VedleggMedPeriodeUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG)}
                skjemanummer={Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG}
                labelText={intl.formatMessage({ id: 'manglendeVedlegg.etterlønn.tittel' })}
                description={intl.formatMessage({
                    id: 'manglendeVedlegg.etterlønn.description',
                })}
                attachmentType={AttachmentType.ANNEN_INNTEKT}
                metadataType={AttachmentMetadataType.OPPTJENING}
                perioder={perioder}
            />
        </Block>
    );
};

export default EtterlønnEllerSluttvederlagDokumentasjon;
