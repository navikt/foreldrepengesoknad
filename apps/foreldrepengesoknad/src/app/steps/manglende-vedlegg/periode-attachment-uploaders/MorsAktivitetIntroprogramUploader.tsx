import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { getSaveAttachment } from '@navikt/fp-api';
import { NavnPåForeldre, Periode, Situasjon, bemUtils } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import PeriodelisteItemHeader from '@navikt/uttaksplan/src/components/periodeliste-item-header/PeriodelisteItemHeader';
import Environment from 'app/Environment';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import './fellesperiode-attachment-uploader.css';
import { addMetadata } from '../util';
import { AttachmentMetadataType } from '@navikt/fp-types/src/AttachmentMetadata';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

interface Props {
    attachments: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const MorsAktivitetIntroprogramUploader: FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    termindato,
    situasjon,
}) => {
    const bem = bemUtils('fellesperiode-attachment-uploader');

    return (
        <VStack gap="4">
            <div>
                <Label>Dokumentasjon av mor introprogram</Label>
                <BodyLong>Du må laste opp dokumentasjon på at mor er i aktivitet i de følgende periodene</BodyLong>
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
                attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                skjemanummer={Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET}
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
                saveAttachment={getSaveAttachment(Environment.REST_API_URL)}
            />
        </VStack>
    );
};

export default MorsAktivitetIntroprogramUploader;
