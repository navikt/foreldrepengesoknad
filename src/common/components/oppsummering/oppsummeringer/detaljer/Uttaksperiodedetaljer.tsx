import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { StønadskontoType, UttaksperiodeBase } from '../../../../../app/types/uttaksplan/periodetyper';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/MorsAktivitetDetaljer';
import getMessage from 'common/util/i18nUtils';
import { getArbeidsformTekst } from 'common/util/oppsummeringUtils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

interface UttaksperiodedetaljerProps {
    periode: UttaksperiodeBase;
    registrerteArbeidsforhold: Arbeidsforhold[] | undefined;
    periodeErNyEllerEndret: boolean;
}

type Props = UttaksperiodedetaljerProps & InjectedIntlProps;

const Uttaksperiodedetaljer: React.StatelessComponent<Props> = ({
    periode,
    registrerteArbeidsforhold,
    periodeErNyEllerEndret,
    intl
}) => {
    const {
        konto,
        morsAktivitetIPerioden,
        ønskerSamtidigUttak,
        gradert,
        stillingsprosent,
        orgnumre,
        arbeidsformer,
        vedlegg
    } = periode;

    let arbeidsformTekst = '';
    if (arbeidsformer) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsformer, orgnumre, registrerteArbeidsforhold).join('\r\n');
    }

    return (
        <>
            {ønskerSamtidigUttak !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.uttak.samtidigUttak')}
                    verdi={ønskerSamtidigUttak ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
            {konto !== StønadskontoType.ForeldrepengerFørFødsel && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.uttak.kombineresMedarbeid')}
                    verdi={gradert ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}

            {gradert === true &&
                stillingsprosent && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.uttak.stillingsprosent')}
                        verdi={stillingsprosent}
                    />
                )}

            {arbeidsformer && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.uttak.arbeidstaker.label')}
                    verdi={arbeidsformTekst}
                />
            )}
            {morsAktivitetIPerioden && (
                <MorsAktivitetDetaljer
                    morsAktivitet={morsAktivitetIPerioden!}
                    dokumentasjonAvMorsAktivitet={vedlegg || []}
                    visOppsummeringAvDokumentasjon={periodeErNyEllerEndret}
                />
            )}
        </>
    );
};

export default injectIntl(Uttaksperiodedetaljer);
