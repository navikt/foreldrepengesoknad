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
import Arbeidsforhold from '../../../../../app/types/Arbeidsforhold';
import AnnenForelder from '../../../../../app/types/søknad/AnnenForelder';

interface UtsettelsesperiodedetaljerProps {
    periode: Utsettelsesperiode;
    registrerteArbeidsforhold: Arbeidsforhold[];
    erFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
}

type Props = UtsettelsesperiodedetaljerProps & InjectedIntlProps;

const Utsettelsesperiodedetaljer: React.StatelessComponent<Props> = ({
    periode,
    registrerteArbeidsforhold,
    annenForelder,
    erFarEllerMedmor,
    intl
}: Props) => {
    const { årsak, morsAktivitetIPerioden, orgnumre, arbeidsformer, vedlegg } = periode;

    let arbeidsformTekst: string[] = [];
    if (arbeidsformer) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsformer, orgnumre, registrerteArbeidsforhold);
    }

    return (
        <>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.uttak.årsak')}
                verdi={getÅrsakTekst(intl, periode)}
            />
            {dokumentasjonBehøvesForUtsettelsesperiode(periode, erFarEllerMedmor, annenForelder) && (
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
