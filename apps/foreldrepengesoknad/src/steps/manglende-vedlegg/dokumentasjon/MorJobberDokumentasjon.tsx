import { useQuery } from '@tanstack/react-query';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { DokumentereMorsArbeidParams, trengerDokumentereMorsArbeidOptions } from 'appData/api';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { addMetadata, lagAutomatiskDokument } from 'utils/vedleggUtils';

import { Loader } from '@navikt/ds-react';

import {
    NavnPåForeldre,
    Periode,
    Situasjon,
    isAnnenForelderOppgittNorsk,
    isAnnenforelderOppholdtSegIEØS,
    isPeriodeUtenUttakUtsettelse,
} from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, Barn, isAdoptertBarn, isFødtBarn } from '@navikt/fp-types';
import { dateToISOString, getFamiliehendelsedato } from '@navikt/fp-utils';
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
    erFarEllerMedmor: boolean;
}

export const MorJobberDokumentasjon = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    erFarEllerMedmor,
    termindato,
}: Props) => {
    if (perioder.length === 0) {
        return null;
    }
    const intl = useIntl();

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenPartFødselsnummer = isAnnenForelderOppgittNorsk(annenForelder) ? annenForelder.fnr : undefined;
    const updateDokArbeidMorAttachment = updateAttachments(Skjemanummer.DOK_ARBEID_MOR);

    if (annenPartFødselsnummer && !isAnnenforelderOppholdtSegIEØS(annenForelder)) {
        const bareFarHarRett =
            isAnnenForelderOppgittNorsk(annenForelder) &&
            erFarEllerMedmor &&
            annenForelder.harRettPåForeldrepengerINorge === false;

        const dokumentereMorsArbeidParams = getDokumentereMorsArbeidParams(
            perioder,
            barn,
            bareFarHarRett,
            annenPartFødselsnummer,
        );

        const trengerDokumentereMorsArbeidQuery = useQuery({
            ...trengerDokumentereMorsArbeidOptions(dokumentereMorsArbeidParams),
            enabled: !!dokumentereMorsArbeidParams,
        });

        if (trengerDokumentereMorsArbeidQuery.isPending) {
            return <Loader className="self-center" size="large" />;
        }
        const trengerDokumentereMorsArbeid = trengerDokumentereMorsArbeidQuery.data ?? true;

        if (!trengerDokumentereMorsArbeid) {
            return (
                <TrengerIkkeMorIArbeidDokumentasjon
                    perioder={perioder}
                    updateDokArbeidMorAttachment={updateDokArbeidMorAttachment}
                />
            );
        }
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
    bareFarHarRett: boolean,
    annenPartFødselsnummer: string,
): DokumentereMorsArbeidParams => {
    const barnFødselsnummer =
        (isFødtBarn(barn) || isAdoptertBarn(barn)) && barn.fnr !== undefined && barn.fnr.length > 0
            ? barn.fnr[0]
            : undefined;

    return {
        annenPartFødselsnummer,
        barnFødselsnummer,
        familiehendelse: getFamiliehendelsedato(barn),
        perioder: uttaksplan.map((p) => ({
            fom: p.tidsperiode.fom.toISOString(),
            tom: p.tidsperiode.tom.toISOString(),
            periodeType: bareFarHarRett && isPeriodeUtenUttakUtsettelse(p) ? 'UTSETTELSE' : 'UTTAK',
        })),
    };
};
