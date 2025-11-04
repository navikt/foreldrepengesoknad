import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { andreAugust2022ReglerGjelder } from 'utils/dateUtils';

import { Barn, isAdoptertBarn, isUfødtBarn } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { getFamiliehendelsedato } from '@navikt/fp-utils';

import { VedleggUploader } from '../attachment-uploaders/VedleggUploader';

const getKanSøkePåTermin = (erFarEllerMedmor: boolean, termindato: string): boolean => {
    if (!erFarEllerMedmor) {
        return true;
    }
    return termindato ? andreAugust2022ReglerGjelder(termindato) : false;
};

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    barn: Barn;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    erFarEllerMedmor: boolean;
}

export const TerminbekreftelseDokumentasjon = ({
    attachments,
    updateAttachments,
    barn,
    arbeidsforhold,
    erFarEllerMedmor,
}: Props) => {
    const intl = useIntl();

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(
        arbeidsforhold,
        isAdoptertBarn(barn),
        erFarEllerMedmor,
        getFamiliehendelsedato(barn),
    );

    if (
        !isUfødtBarn(barn) ||
        (aktiveArbeidsforhold.length > 0 && !erFarEllerMedmor) ||
        !getKanSøkePåTermin(erFarEllerMedmor, barn.termindato)
    ) {
        return null;
    }

    return (
        <VedleggUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.TERMINBEKREFTELSE)}
            skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.terminbekreftelse.tittel' })}
            description={intl.formatMessage({
                id: erFarEllerMedmor
                    ? 'manglendeVedlegg.terminbekreftelse.description.farMedmor'
                    : 'manglendeVedlegg.terminbekreftelse.description',
            })}
            attachmentType={AttachmentType.TERMINBEKREFTELSE}
            metadataType={'BARN'}
        />
    );
};
