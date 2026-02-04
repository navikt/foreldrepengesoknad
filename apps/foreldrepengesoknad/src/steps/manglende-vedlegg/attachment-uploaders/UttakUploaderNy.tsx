import { API_URLS } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { getTermindato } from 'utils/barnUtils';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';
import { addMetadata, lagSendSenereDokument } from 'utils/vedleggUtils';

import { BodyLong } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { AttachmentType } from '@navikt/fp-constants';
import { FileUploader } from '@navikt/fp-filopplaster';
import { Attachment, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { getFamiliehendelsedato } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ManglendeVedleggFormData } from '../ManglendeVedleggFormData';
import { PeriodeVisning } from './periodevisning/PeriodeVisning';

interface Props {
    attachments: Attachment[];
    updateAttachments: (attachments: Attachment[]) => void;
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    navnPåForeldre: NavnPåForeldre;
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
    skjemanummer,
    labelText,
    description,
    attachmentType,
}: Props) => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const termindato = getTermindato(barn);

    const erFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const erAleneomsorg = !annenForelder.kanIkkeOppgis && !!annenForelder.erAleneOmOmsorg;

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

    const renderedDescription = typeof description === 'string' ? <BodyLong>{description}</BodyLong> : description;

    return (
        <FileUploader
            label={labelText}
            description={
                <>
                    {renderedDescription}
                    {perioder.map((p) => {
                        return (
                            <div key={p.fom + p.tom + p.kontoType} className="my-4">
                                <PeriodeVisning
                                    periode={p}
                                    erAleneOmOmsorg={erAleneomsorg}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    navnPåForeldre={navnPåForeldre}
                                    familiehendelsesdato={familiehendelsesdato}
                                    termindato={termindato}
                                    situasjon={søkersituasjon.situasjon}
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
