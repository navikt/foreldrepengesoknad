import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { getSaveAttachment } from '@navikt/fp-api';
import { NavnPåForeldre, Periode, Situasjon, addMetadata, bemUtils, lagSendSenereDokument } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import PeriodelisteItemHeader from '@navikt/uttaksplan/src/components/periodeliste-item-header/PeriodelisteItemHeader';
import Environment from 'app/Environment';
import { FunctionComponent, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import './periode-attachment-uploader.css';
import { AttachmentMetadataType } from '@navikt/fp-types/src/AttachmentMetadata';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { useFormContext } from 'react-hook-form';
import { ManglendeVedleggFormData } from '../manglendeVedleggFormConfig';

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
    const bem = bemUtils('periode-attachment-uploader');

    const { watch } = useFormContext<ManglendeVedleggFormData>();
    const formAttachments = watch(Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET);

    useEffect(() => {
        if (formAttachments.length === 0) {
            const init = lagSendSenereDokument(
                AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET,
            );
            const sendSenereVedlegg = addMetadata(init, {
                type: AttachmentMetadataType.UTTAK,
                perioder: perioder.map((p) => ({
                    fom: dateToISOString(p.tidsperiode.fom),
                    tom: dateToISOString(p.tidsperiode.tom),
                })),
            });

            updateAttachments([sendSenereVedlegg]);
        }
    }, [updateAttachments, perioder, formAttachments]);

    return (
        <VStack gap="4">
            <div>
                <Label>
                    <FormattedMessage id="manglendeVedlegg.morsAktivitetIntroprogram.label" />
                </Label>
                <BodyLong>
                    <FormattedMessage id="manglendeVedlegg.morsAktivitetIntroprogram.beskrivelse" />
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
                <FormattedMessage id="manglendeVedlegg.størrelse" />
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
                saveAttachment={getSaveAttachment(Environment.REST_API_URL, 'foreldrepenger')}
            />
        </VStack>
    );
};

export default MorsAktivitetIntroprogramUploader;
