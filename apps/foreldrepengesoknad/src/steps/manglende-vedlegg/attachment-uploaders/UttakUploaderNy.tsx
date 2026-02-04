import { API_URLS } from 'api/queries';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { addMetadata, lagSendSenereDokument } from 'utils/vedleggUtils';

import { BodyLong } from '@navikt/ds-react';

import { NavnPåForeldre, Situasjon } from '@navikt/fp-common';
import { AttachmentType } from '@navikt/fp-constants';
import { FileUploader } from '@navikt/fp-filopplaster';
import { Attachment, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { ManglendeVedleggFormData } from '../ManglendeVedleggFormData';
import { PeriodeVisning } from './periodevisning/PeriodeVisning';

interface Props {
    attachments: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
    skjemanummer: GyldigeSkjemanummer;
    labelText: string;
    description: string | React.ReactNode;
    attachmentType: AttachmentType;
}

export const UttakUploaderNy = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    termindato,
    situasjon,
    skjemanummer,
    labelText,
    description,
    attachmentType,
}: Props) => {
    const { watch } = useFormContext<ManglendeVedleggFormData>();
    const formAttachments = watch(skjemanummer);

    useEffect(() => {
        if (formAttachments.length === 0) {
            const init = lagSendSenereDokument(attachmentType, skjemanummer);
            const sendSenereVedlegg = addMetadata(init, {
                type: 'UTTAK',
                perioder: perioder.map((p) => ({
                    fom: p.fom,
                    tom: p.tom,
                })),
            });

            updateAttachments([sendSenereVedlegg]);
        }
    }, [updateAttachments, perioder, formAttachments, attachmentType, skjemanummer]);

    return (
        <FileUploader
            label={labelText}
            description={
                <>
                    <BodyLong>{description}</BodyLong>
                    {perioder.map((p) => {
                        return (
                            <div key={p.fom + p.tom + p.kontoType} className="my-4">
                                <PeriodeVisning
                                    periode={p}
                                    erAleneOmOmsorg={false}
                                    erFarEllerMedmor={true}
                                    navnPåForeldre={navnPåForeldre}
                                    familiehendelsesdato={familiehendelsesdato}
                                    termindato={termindato}
                                    situasjon={situasjon}
                                />
                            </div>
                        );
                    })}
                </>
            }
            attachmentType={attachmentType}
            skjemanummer={skjemanummer}
            existingAttachments={attachments}
            updateAttachments={(vedlegg) => {
                const attachmentsMedMetadata = vedlegg.map((a) =>
                    addMetadata(a, {
                        type: 'UTTAK',
                        perioder: perioder.map((p) => ({
                            fom: p.fom,
                            tom: p.tom,
                        })),
                    }),
                );

                return updateAttachments(attachmentsMedMetadata);
            }}
            uploadPath={API_URLS.sendVedlegg}
        />
    );
};
