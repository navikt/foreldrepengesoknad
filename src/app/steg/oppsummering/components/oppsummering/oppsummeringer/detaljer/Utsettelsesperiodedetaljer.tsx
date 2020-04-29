import * as React from 'react';
import { useIntl } from 'react-intl';
import { Utsettelsesperiode, UtsettelseÅrsakType } from '../../../../../../types/uttaksplan/periodetyper';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/detaljer/MorsAktivitetDetaljer';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import OppsummeringAvDokumentasjon from 'app/steg/oppsummering/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import { getArbeidsformTekst, getÅrsakTekst } from 'app/util/oppsummeringUtils';
import getMessage from 'common/util/i18nUtils';
import Arbeidsforhold from '../../../../../../types/Arbeidsforhold';
import { Søknadsinfo } from 'app/selectors/types';
import { shouldPeriodeHaveAttachment } from 'app/util/attachments/missingAttachmentUtil';

interface UtsettelsesperiodedetaljerProps {
    periode: Utsettelsesperiode;
    registrerteArbeidsforhold: Arbeidsforhold[];
    søknadsinfo: Søknadsinfo;
    periodeErNyEllerEndret: boolean;
}

type Props = UtsettelsesperiodedetaljerProps;

const Utsettelsesperiodedetaljer: React.FunctionComponent<Props> = ({
    periode,
    registrerteArbeidsforhold,
    søknadsinfo,
    periodeErNyEllerEndret
}) => {
    const { årsak, morsAktivitetIPerioden, orgnumre, arbeidsformer, vedlegg } = periode;
    const intl = useIntl();

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
            {shouldPeriodeHaveAttachment(periode, søknadsinfo) &&
                periodeErNyEllerEndret && (
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
            {shouldPeriodeHaveAttachment(periode, søknadsinfo) &&
                morsAktivitetIPerioden && (
                    <MorsAktivitetDetaljer
                        morsAktivitet={morsAktivitetIPerioden}
                        dokumentasjonAvMorsAktivitet={(vedlegg || []).filter(
                            (currentVedlegg) => currentVedlegg.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                        )}
                        visOppsummeringAvDokumentasjon={periodeErNyEllerEndret}
                    />
                )}
        </>
    );
};

export default Utsettelsesperiodedetaljer;
