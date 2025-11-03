import { useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { andreAugust2022ReglerGjelder } from 'utils/dateUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor.ts';
import { getFarMedmorErAleneOmOmsorg, getMorHarRettPåForeldrepengerINorgeEllerEØS } from 'utils/personUtils.ts';

import { AnnenForelder, Barn, isAnnenForelderOppgitt, isUfødtBarn } from '@navikt/fp-common';
import { AttachmentMetadataType, AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, EksternArbeidsforholdDto_fpoversikt, SøkersituasjonFp } from '@navikt/fp-types';
import { getFamiliehendelsedato } from '@navikt/fp-utils';

import { VedleggUploader } from '../attachment-uploaders/VedleggUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    barn: Barn;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    erFarEllerMedmor: boolean;
    søkersituasjon?: SøkersituasjonFp;
    annenForelder: AnnenForelder;
}

export const TerminbekreftelseDokumentasjon = ({
    attachments,
    updateAttachments,
    barn,
    arbeidsforhold,
    erFarEllerMedmor,
    søkersituasjon,
    annenForelder,
}: Props) => {
    const intl = useIntl();

    if (
        !skalViseTerminbekreftelseDokumentasjon({
            søkersituasjon,
            barn,
            arbeidsforhold,
            annenForelder,
            erFarEllerMedmor,
        })
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
            metadataType={AttachmentMetadataType.BARN}
        />
    );
};

export const skalViseTerminbekreftelseDokumentasjon = ({
    søkersituasjon,
    barn,
    arbeidsforhold,
    annenForelder,
    erFarEllerMedmor,
}: {
    barn?: Barn;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    søkersituasjon?: SøkersituasjonFp;
    annenForelder?: AnnenForelder;
    erFarEllerMedmor: boolean;
}) => {
    if (søkersituasjon?.situasjon === 'adopsjon') {
        return true;
    }

    const skalHaOmBarnetDok =
        søkersituasjon &&
        barn &&
        isUfødtBarn(barn) &&
        (harIngenAktiveArbeidsforhold(arbeidsforhold, søkersituasjon, barn) ||
            getBareFarMedmorHarRett(annenForelder, søkersituasjon, erFarEllerMedmor)) &&
        getKanSøkePåTermin(erFarEllerMedmor, barn.termindato);

    return skalHaOmBarnetDok;
};

const getBareFarMedmorHarRett = (
    annenForelder: AnnenForelder | undefined,
    søkersituasjon: SøkersituasjonFp | undefined,
    erFarEllerMedmor: boolean,
) => {
    if (annenForelder === undefined || søkersituasjon === undefined) {
        return false;
    }

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;

    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);

    const bareFarMedmorHarRett =
        !getMorHarRettPåForeldrepengerINorgeEllerEØS(søkersituasjon.rolle, erFarEllerMedmor, annenForelder) &&
        !farMedmorErAleneOmOmsorg;

    return bareFarMedmorHarRett;
};

const getKanSøkePåTermin = (erFarEllerMedmor: boolean, termindato: string): boolean => {
    if (!erFarEllerMedmor) {
        return true;
    }
    return termindato ? andreAugust2022ReglerGjelder(termindato) : false;
};

const harIngenAktiveArbeidsforhold = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
) => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(
        arbeidsforhold,
        søkersituasjon.situasjon === 'adopsjon',
        isFarEllerMedmor(søkersituasjon.rolle),
        getFamiliehendelsedato(barn),
    );
    return aktiveArbeidsforhold.length === 0;
};
