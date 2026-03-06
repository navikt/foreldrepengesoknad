import { useIntl } from 'react-intl';

import { AnnenForelder, UttaksperiodeBase, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { getArbeidsformTekst } from '../OppsummeringUtils';
import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    periode: UttaksperiodeBase;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[] | undefined;
    annenForelder: AnnenForelder;
}

export const Uttaksperiodedetaljer = ({ periode, registrerteArbeidsforhold, annenForelder }: Props) => {
    const {
        konto,
        morsAktivitetIPerioden,
        ønskerSamtidigUttak,
        gradert,
        stillingsprosent,
        orgnumre,
        arbeidsformer,
        ønskerFlerbarnsdager,
    } = periode;
    const intl = useIntl();

    let arbeidsformTekst = '';
    if (arbeidsformer) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsformer, orgnumre, registrerteArbeidsforhold).join('\r\n');
    }

    const erDeltUttakINorge = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;

    return (
        <>
            {ønskerFlerbarnsdager !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.ønskerFlerbarnsdagerOld' })}
                    verdi={ønskerFlerbarnsdager ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {ønskerSamtidigUttak !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.samtidigUttak' })}
                    verdi={ønskerSamtidigUttak ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {konto !== 'FORELDREPENGER_FØR_FØDSEL' && ønskerSamtidigUttak !== true && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.kombineresMedarbeidOld' })}
                    verdi={gradert ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}

            {gradert === true && stillingsprosent && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.stillingsprosent' })}
                    verdi={stillingsprosent}
                />
            )}

            {arbeidsformer && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.arbeidstaker.label' })}
                    verdi={arbeidsformTekst}
                />
            )}
            {morsAktivitetIPerioden && morsAktivitetIPerioden !== 'IKKE_OPPGITT' && (
                <MorsAktivitetDetaljer morsAktivitet={morsAktivitetIPerioden} />
            )}
        </>
    );
};
