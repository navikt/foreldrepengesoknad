import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { erIkkeEøsPeriode, erUttaksperiode } from 'utils/uttaksplanInfoUtils';

import { NavnPåForeldre } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { erPeriodeIMellomToUkerFørFamdatoOgSeksUkerEtter } from '@navikt/fp-uttaksplan-ny';

import { UttakUploaderNy } from '../attachment-uploaders/UttakUploaderNy';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    familiehendelsedato: string;
}

export const MorInnlagtDokumentasjonNy = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    erFarEllerMedmor,
    familiehendelsedato,
}: Props) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    const perioderRundtFødsel = perioder.filter((p) =>
        erPeriodeIMellomToUkerFørFamdatoOgSeksUkerEtter(p, familiehendelsedato),
    );

    const morErForSykEllerInnlagtFørsteSeksUker = perioderRundtFødsel.some((p) => {
        if (erIkkeEøsPeriode(p) && erUttaksperiode(p) && p.kontoType === 'FEDREKVOTE' && !p.samtidigUttak) {
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
