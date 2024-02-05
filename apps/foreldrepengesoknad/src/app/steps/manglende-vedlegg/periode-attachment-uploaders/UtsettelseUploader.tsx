import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { getSaveAttachment } from '@navikt/fp-api';
import { NavnPåForeldre, Periode, Situasjon, addMetadata, bemUtils } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import PeriodelisteItemHeader from '@navikt/uttaksplan/src/components/periodeliste-item-header/PeriodelisteItemHeader';
import Environment from 'app/Environment';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { AttachmentMetadataType } from '@navikt/fp-types/src/AttachmentMetadata';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

import './periode-attachment-uploader.css';

interface Props {
    attachments: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const UtsettelseUploader: FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    termindato,
    situasjon,
}) => {
    const bem = bemUtils('periode-attachment-uploader');

    return (
        <VStack gap="4">
            <div>
                <Label>
                    <FormattedMessage id="manglendeVedlegg.utsettelseMorForSyk.label" />
                </Label>
                <BodyLong>
                    <FormattedMessage id="manglendeVedlegg.utsettelseMorForSyk.beskrivelse" />
                </BodyLong>
                {perioder.map((p) => {
                    return (
                        <div key={p.id} className={bem.block}>
                            <PeriodelisteItemHeader
                                egenPeriode={true}
                                periode={p}
                                erAleneOmOmsorg={false}
                                erFarEllerMedmor={true}
                                navnPåForeldre={navnPåForeldre}
                                familiehendelsesdato={familiehendelsesdato}
                                termindato={termindato}
                                situasjon={situasjon}
                                melding={undefined}
                            />
                        </div>
                    );
                })}
            </div>
            <BodyLong>
                <FormattedMessage id="manglendeVedlegg.storrelse" />
            </BodyLong>
            <FileUploader
                attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
                skjemanummer={Skjemanummer.DOK_INNLEGGELSE}
                existingAttachments={attachments}
                updateAttachments={(attachments) => {
                    const attachmentsMedMetadata = attachments.map((a) =>
                        addMetadata(a, {
                            type: AttachmentMetadataType.UTTAK,
                            perioder: perioder.map((p) => ({
                                fom: dateToISOString(p.tidsperiode.fom),
                                tom: dateToISOString(p.tidsperiode.tom),
                            })),
                        }),
                    );

                    return updateAttachments(attachmentsMedMetadata);
                }}
                saveAttachment={getSaveAttachment(Environment.REST_API_URL, 'foreldrepenger')}
            />
        </VStack>
    );
};

export default UtsettelseUploader;
