import { Block, NavnPåForeldre, Periode, Situasjon, isUttakAvFellesperiode } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import React from 'react';
import MorsAktivitetIntroprogramUploader from '../periode-attachment-uploaders/MorsAktivitetIntroprogramUploader';
import MorsAktivitetKvalprogramUploader from '../periode-attachment-uploaders/MorsAktivitetKvalprogramUploader';
import MorsAktivitetSykdomUtdanningEllerArbeidUploader from '../periode-attachment-uploaders/MorsAktivitetSykdomUtdanningEllerArbeidUploader';
import {
    GyldigeSkjemanummer,
    grupperteFellesperioderIntroduksjonsprogram,
    grupperteFellesperioderKvalifiseringsprogram,
    grupperteFellesperioderMorsAktivitetArbeidUtdanningEllerSykdom,
    isArbeidUtdanningEllerSykdomVedlegg,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
} from '../util';
import { Skjemanummer } from '@navikt/fp-constants';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
    setFellesperiodeVedlegg: (attachments: Attachment[]) => void;
}

const FellesperiodeDok: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const fellesperioderSomManglerVedlegg = perioder.filter(isUttakAvFellesperiode);
    const grupperteFellesperioderArbeidUtdanningSykdom = grupperteFellesperioderMorsAktivitetArbeidUtdanningEllerSykdom(
        fellesperioderSomManglerVedlegg,
    );
    const grupperteFellesperioderIntroprogram = grupperteFellesperioderIntroduksjonsprogram(
        fellesperioderSomManglerVedlegg,
    );
    const grupperteFellesperioderKvalprogram = grupperteFellesperioderKvalifiseringsprogram(
        fellesperioderSomManglerVedlegg,
    );

    const kvalifiseringsprogramVedlegg = attachments.filter(isKvalifiseringsprogramVedlegg);
    const introduksjonsprogramVedlegg = attachments.filter(isIntroduksjonsprogramVedlegg);
    const arbeidUtdanningEllerSykdomVedlegg = attachments.filter(isArbeidUtdanningEllerSykdomVedlegg);

    return (
        <div>
            {grupperteFellesperioderArbeidUtdanningSykdom.length > 0 && (
                <Block padBottom="xl">
                    <MorsAktivitetSykdomUtdanningEllerArbeidUploader
                        attachments={arbeidUtdanningEllerSykdomVedlegg}
                        updateAttachments={updateAttachments(Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM)}
                        perioder={grupperteFellesperioderArbeidUtdanningSykdom}
                        navnPåForeldre={navnPåForeldre}
                        familiehendelsesdato={familiehendelsesdato}
                        termindato={termindato}
                        situasjon={situasjon}
                    />
                </Block>
            )}
            {grupperteFellesperioderIntroprogram.length > 0 && (
                <Block padBottom="xl">
                    <MorsAktivitetIntroprogramUploader
                        attachments={introduksjonsprogramVedlegg}
                        updateAttachments={updateAttachments(Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET)}
                        perioder={grupperteFellesperioderIntroprogram}
                        navnPåForeldre={navnPåForeldre}
                        familiehendelsesdato={familiehendelsesdato}
                        termindato={termindato}
                        situasjon={situasjon}
                    />
                </Block>
            )}
            {grupperteFellesperioderKvalprogram.length > 0 && (
                <Block padBottom="xl">
                    <MorsAktivitetKvalprogramUploader
                        attachments={kvalifiseringsprogramVedlegg}
                        updateAttachments={updateAttachments(Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM)}
                        perioder={grupperteFellesperioderKvalprogram}
                        navnPåForeldre={navnPåForeldre}
                        familiehendelsesdato={familiehendelsesdato}
                        termindato={termindato}
                        situasjon={situasjon}
                    />
                </Block>
            )}
        </div>
    );
};

export default FellesperiodeDok;
