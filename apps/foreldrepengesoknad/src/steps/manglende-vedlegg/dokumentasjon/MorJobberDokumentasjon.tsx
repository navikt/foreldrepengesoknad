import { useQuery } from '@tanstack/react-query';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { DokumentereMorsArbeidParams, trengerDokumentereMorsArbeidOptions } from 'appData/api';
import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { NavnPåForeldre, Periode, Situasjon, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
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

    if (perioder.length === 0) {
        return null;
    }

    if (!trengerDokumentereMorsArbeid) {
        return <IngenDokumentasjonPåkrevd />;
    }

    return (
        <UttakUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_ARBEID_MOR)}
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
