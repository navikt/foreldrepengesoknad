import { useQuery } from '@tanstack/react-query';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { DokumentereMorsArbeidParams, trengerDokumentereMorsArbeidOptions } from 'appData/api';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { dateToISOString } from 'utils/dateUtils';
import { addMetadata, lagAutomatiskDokument } from 'utils/vedleggUtils';

import { NavnPåForeldre, Periode, Situasjon, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, Barn, isFødtBarn, isUttaksperiode } from '@navikt/fp-types';
import { getFamiliehendelsedato } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttakUploader } from '../attachment-uploaders/UttakUploader';
import { IngenDokumentasjonPåkrevd } from './IngenDokumentasjonPåkrevd';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
}

export const MorJobberDokumentasjon = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}: Props) => {
    const intl = useIntl();

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const annenPartFødselsnummer = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fnr : undefined;
    const dokumentereMorsArbeidParams = getDokumentereMorsArbeidParams(uttaksplan, barn, annenPartFødselsnummer);
    const trengerDokumentereMorsArbeid =
        useQuery({
            // NOTE: fordi vi sjekker at "dokumentereMorsArbeidParams" finnes med enabled, så tillater vi oss en !-assertion
            ...trengerDokumentereMorsArbeidOptions(dokumentereMorsArbeidParams!),
            enabled: !!dokumentereMorsArbeidParams,
        }).data ?? true;

    const updateDokArbeidMorAttachment = updateAttachments(Skjemanummer.DOK_ARBEID_MOR);

    if (perioder.length === 0) {
        return null;
    }

    if (!trengerDokumentereMorsArbeid) {
        return (
            <TrengerIkkeMorIArbeidDokumentasjon
                perioder={perioder}
                updateDokArbeidMorAttachment={updateDokArbeidMorAttachment}
            />
        );
    }

    return (
        <UttakUploader
            attachments={attachments}
            updateAttachments={updateDokArbeidMorAttachment}
            perioder={perioder}
            navnPåForeldre={navnPåForeldre}
            familiehendelsesdato={familiehendelsesdato}
            termindato={termindato}
            situasjon={situasjon}
            skjemanummer={Skjemanummer.DOK_ARBEID_MOR}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.morJobber.label' })}
            description={intl.formatMessage(
                { id: 'manglendeVedlegg.morJobber.description' },
                { navn: navnPåForeldre.mor },
            )}
            attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
        />
    );
};

const TrengerIkkeMorIArbeidDokumentasjon = ({
    updateDokArbeidMorAttachment,
    perioder,
}: {
    updateDokArbeidMorAttachment: (attachments: Attachment[]) => void;
    perioder: Periode[];
}) => {
    useEffect(() => {
        const init = lagAutomatiskDokument(AttachmentType.MORS_AKTIVITET_DOKUMENTASJON, Skjemanummer.DOK_ARBEID_MOR);

        const sendAutomatiskVedlegg = addMetadata(init, {
            type: AttachmentMetadataType.UTTAK,
            perioder: perioder.map((p) => ({
                fom: dateToISOString(p.tidsperiode.fom),
                tom: dateToISOString(p.tidsperiode.tom),
            })),
        });

        updateDokArbeidMorAttachment([sendAutomatiskVedlegg]);
    }, []);

    return <IngenDokumentasjonPåkrevd />;
};

const getDokumentereMorsArbeidParams = (
    uttaksplan: Periode[],
    barn: Barn,
    annenPartFødselsnummer?: string,
): DokumentereMorsArbeidParams | undefined => {
    if (!annenPartFødselsnummer) {
        return undefined;
    }

    const perioderMedAktivitetskrav = uttaksplan
        .filter((p) => isUttaksperiode(p))
        .filter((p) => p.morsAktivitetIPerioden !== undefined);

    const barnFødselsnummer =
        isFødtBarn(barn) && barn.fnr !== undefined && barn.fnr.length > 0 ? barn.fnr[0] : undefined;

    return {
        annenPartFødselsnummer,
        barnFødselsnummer,
        familiehendelse: getFamiliehendelsedato(barn),
        perioder: perioderMedAktivitetskrav.map((p) => ({
            fom: p.tidsperiode.fom.toISOString(),
            tom: p.tidsperiode.tom.toISOString(),
        })),
    };
};
