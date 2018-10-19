import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Utsettelsesperiode, UtsettelseÅrsakType } from '../../../../../app/types/uttaksplan/periodetyper';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/MorsAktivitetDetaljer';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import OppsummeringAvDokumentasjon from 'common/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import { dokumentasjonBehøvesForUtsettelsesperiode } from '../../../../../app/util/uttaksplan/utsettelsesperiode';
import { getArbeidsformTekst, getÅrsakTekst } from 'common/util/oppsummeringUtils';
import getMessage from 'common/util/i18nUtils';

interface UtsettelsesperiodedetaljerProps {
    periode: Utsettelsesperiode;
}

type Props = UtsettelsesperiodedetaljerProps & InjectedIntlProps;

const Utsettelsesperiodedetaljer: React.StatelessComponent<Props> = ({ periode, intl }) => {
    const { årsak, morsAktivitetIPerioden, orgnr, arbeidsform, vedlegg } = periode;

    let arbeidsformTekst = '';
    if (arbeidsform) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsform, { orgnr });
    }

    return (
        <>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.uttak.årsak')}
                verdi={getÅrsakTekst(intl, periode)}
            />
            {dokumentasjonBehøvesForUtsettelsesperiode(periode) && (
                <OppsummeringAvDokumentasjon
                    vedlegg={(vedlegg || []).filter(
                        (currentVedlegg) => currentVedlegg.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                    )}
                />
            )}
            {årsak === UtsettelseÅrsakType.Arbeid && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.uttak.arbeidstaker.label')}
                    verdi={arbeidsformTekst}
                />
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
