import { useQuery } from '@tanstack/react-query';
import { DokumentereMorsArbeidParams, trengerDokumentereMorsArbeidOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { erIkkeEøsPeriode } from 'utils/uttaksplanInfoUtils';
import { addMetadata, lagAutomatiskDokument } from 'utils/vedleggUtils';

import { Loader } from '@navikt/ds-react';

import {
    NavnPåForeldre,
    Situasjon,
    isAnnenForelderOppgittNorsk,
    isAnnenforelderOppholdtSegIEØS,
} from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import {
    Attachment,
    Barn,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
} from '@navikt/fp-types';
import { getFamiliehendelsedato } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttakUploaderNy } from '../attachment-uploaders/UttakUploaderNy';
import { IngenDokumentasjonPåkrevd } from './IngenDokumentasjonPåkrevd';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
    erFarEllerMedmor: boolean;
}

export const MorJobberDokumentasjonNy = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    erFarEllerMedmor,
    termindato,
}: Props) => {
    const intl = useIntl();

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const annenPartFødselsnummer = isAnnenForelderOppgittNorsk(annenForelder) ? annenForelder.fnr : undefined;
    const updateDokArbeidMorAttachment = updateAttachments(Skjemanummer.DOK_ARBEID_MOR);

    const bareFarHarRett =
        isAnnenForelderOppgittNorsk(annenForelder) &&
        erFarEllerMedmor &&
        annenForelder.harRettPåForeldrepengerINorge === false;

    const dokumentereMorsArbeidParams = getDokumentereMorsArbeidParams(
        perioder,
        barn,
        bareFarHarRett,
        annenPartFødselsnummer || '',
    );

    const trengerDokumentereMorsArbeidQuery = useQuery({
        ...trengerDokumentereMorsArbeidOptions(dokumentereMorsArbeidParams),
        enabled:
            !!annenPartFødselsnummer && !isAnnenforelderOppholdtSegIEØS(annenForelder) && !!dokumentereMorsArbeidParams,
    });

    if (perioder.length === 0) {
        return null;
    }

    if (annenPartFødselsnummer && !isAnnenforelderOppholdtSegIEØS(annenForelder)) {
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
        <UttakUploaderNy
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
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
}) => {
    useEffect(() => {
        const init = lagAutomatiskDokument(AttachmentType.MORS_AKTIVITET_DOKUMENTASJON, Skjemanummer.DOK_ARBEID_MOR);

        const sendAutomatiskVedlegg = addMetadata(init, {
            type: 'UTTAK',
            perioder: perioder.map((p) => ({
                fom: p.fom,
                tom: p.tom,
            })),
        });

        updateDokArbeidMorAttachment([sendAutomatiskVedlegg]);
    }, []);

    return <IngenDokumentasjonPåkrevd />;
};

const getDokumentereMorsArbeidParams = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
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
            fom: p.fom,
            tom: p.tom,
            periodeType: bareFarHarRett && erIkkeEøsPeriode(p) && p.utsettelseÅrsak === 'FRI' ? 'UTSETTELSE' : 'UTTAK',
        })),
    };
};
