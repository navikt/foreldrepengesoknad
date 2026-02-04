import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { erIkkeEøsPeriode, erUttaksperiode } from 'utils/uttaksplanInfoUtils';

import { NavnPåForeldre } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { UttakUploaderNy } from '../attachment-uploaders/UttakUploaderNy';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

export const MorInnlagtDokumentasjonNy = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    erFarEllerMedmor,
}: Props) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    const morErForSykEllerInnlagtFørsteSeksUker = perioder.some((p) => {
        // FIXME (TOR) erMorForSyk må inn som eige felt
        if (erIkkeEøsPeriode(p) && erUttaksperiode(p) /*&& p.erMorForSyk === true*/ && p.kontoType === 'FEDREKVOTE') {
            return true;
        }

        return false;
    });

    return (
        <UttakUploaderNy
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_INNLEGGELSE_MOR)}
            perioder={perioder}
            navnPåForeldre={navnPåForeldre}
            skjemanummer={Skjemanummer.DOK_INNLEGGELSE_MOR}
            labelText={
                morErForSykEllerInnlagtFørsteSeksUker
                    ? intl.formatMessage(
                          { id: 'manglendeVedlegg.morInnlagtEllerSyk.label' },
                          {
                              navn: navnPåForeldre.mor,
                              erFarEllerMedmor,
                          },
                      )
                    : intl.formatMessage(
                          { id: 'manglendeVedlegg.morInnlagt.label' },
                          {
                              navn: navnPåForeldre.mor,
                              erFarEllerMedmor,
                          },
                      )
            }
            description={
                morErForSykEllerInnlagtFørsteSeksUker
                    ? intl.formatMessage(
                          { id: 'manglendeVedlegg.morInnlagtEllerSyk.description' },
                          {
                              navn: navnPåForeldre.mor,
                              erFarEllerMedmor,
                          },
                      )
                    : intl.formatMessage(
                          { id: 'manglendeVedlegg.morInnlagt.description' },
                          {
                              navn: navnPåForeldre.mor,
                              erFarEllerMedmor,
                          },
                      )
            }
            attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
        />
    );
};
