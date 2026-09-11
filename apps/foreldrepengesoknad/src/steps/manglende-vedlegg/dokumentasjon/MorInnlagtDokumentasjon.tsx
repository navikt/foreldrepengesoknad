import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, NavnPåForeldre, PeriodeDto_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan/validators';

import { UttakUploader } from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: PeriodeDto_fpoversikt[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    familiehendelsedato: string;
}

export const MorInnlagtDokumentasjon = ({
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
        UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            p,
            familiehendelsedato,
            undefined,
        ),
    );

    const morErForSykEllerInnlagtFørsteSeksUker = perioderRundtFødsel.some((p) => {
        const side = p.søker;
        return (
            !!side && Uttaksperioden.erUttaksperiode(side) && side.kontoType === 'FEDREKVOTE' && !side.samtidigUttak
        );
    });

    return (
        <UttakUploader
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
