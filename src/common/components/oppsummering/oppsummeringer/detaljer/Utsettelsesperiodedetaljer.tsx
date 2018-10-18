import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Arbeidsform, Utsettelsesperiode, UtsettelseÅrsakType } from '../../../../../app/types/uttaksplan/periodetyper';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/MorsAktivitetDetaljer';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import OppsummeringAvDokumentasjon from 'common/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';

interface UtsettelsesperiodedetaljerProps {
    periode: Utsettelsesperiode;
}

type Props = UtsettelsesperiodedetaljerProps & InjectedIntlProps;

const Utsettelsesperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    const { årsak, morsAktivitetIPerioden, orgnr, arbeidsform, vedlegg } = periode;

    let arbeidsformTekst = '';
    if (arbeidsform === Arbeidsform.arbeidstaker) {
        arbeidsformTekst = `Jeg skal jobbe for registrert arbeidstaker med organisasjonsnummer ${orgnr}`;
    } else if (arbeidsform === Arbeidsform.selvstendignæringsdrivende) {
        arbeidsformTekst = 'Jeg skal jobbe som selvstendig næringsdrivende eller frilans';
    } else if (arbeidsform === Arbeidsform.frilans) {
        arbeidsformTekst = 'Jeg skal jobbe som frilans';
    }

    return (
        <>
            <OppsummeringAvDokumentasjon
                vedlegg={(vedlegg || []).filter(
                    (currentVedlegg) => currentVedlegg.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                )}
                ledetekst="Dokumentasjon av årsak til utsettelse"
            />
            {årsak === UtsettelseÅrsakType.Arbeid && (
                <Feltoppsummering feltnavn="Arbeidstaker" verdi={arbeidsformTekst} />
            )}
            {morsAktivitetIPerioden && (
                <MorsAktivitetDetaljer
                    morsAktivitet={morsAktivitetIPerioden}
                    dokumentasjonAvMorsAktivitet={(vedlegg || []).filter(
                        (currentVedlegg) => currentVedlegg.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                    )}
                />
            )}
        </>
    );
};

export default injectIntl(Utsettelsesperiodedetaljer);
