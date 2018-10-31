import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { StønadskontoType, UttaksperiodeBase } from '../../../../../app/types/uttaksplan/periodetyper';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/MorsAktivitetDetaljer';
import getMessage from 'common/util/i18nUtils';
import { getArbeidsformTekst } from 'common/util/oppsummeringUtils';
import OppsummeringAvDokumentasjon from 'common/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

interface UttaksperiodedetaljerProps {
    periode: UttaksperiodeBase;
    registrerteArbeidsforhold: Arbeidsforhold[] | undefined;
}

type Props = UttaksperiodedetaljerProps & InjectedIntlProps;

const Uttaksperiodedetaljer: React.StatelessComponent<Props> = ({ periode, registrerteArbeidsforhold, intl }) => {
    const {
        konto,
        morsAktivitetIPerioden,
        ønskerSamtidigUttak,
        gradert,
        stillingsprosent,
        orgnr,
        arbeidsform,
        vedlegg
    } = periode;

    let arbeidsformTekst = '';
    if (arbeidsform) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsform, orgnr, registrerteArbeidsforhold);
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

            {arbeidsform && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.uttak.arbeidstaker.label')}
                    verdi={arbeidsformTekst}
                />
            )}
            {morsAktivitetIPerioden && (
                <MorsAktivitetDetaljer
                    morsAktivitet={morsAktivitetIPerioden!}
                    dokumentasjonAvMorsAktivitet={vedlegg || []}
                />
            )}
            {periode.gradert === true &&
                periode.erArbeidstaker === true && (
                    <OppsummeringAvDokumentasjon
                        ledetekst={getMessage(intl, 'oppsummering.uttak.dokumentasjonAvArbeidsforhold')}
                        vedlegg={vedlegg || []}
                    />
                )}
        </>
    );
};

export default injectIntl(Uttaksperiodedetaljer);
