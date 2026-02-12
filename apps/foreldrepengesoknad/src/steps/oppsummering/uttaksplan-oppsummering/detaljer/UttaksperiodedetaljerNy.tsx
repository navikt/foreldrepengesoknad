import { useIntl } from 'react-intl';

import { AnnenForelder, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { EksternArbeidsforholdDto_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

// import { getArbeidsformTekst } from '../OppsummeringUtils';
import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    periode: UttakPeriode_fpoversikt;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[] | undefined;
    periodeErNyEllerEndret: boolean;
    søkerErFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
}

export const UttaksperiodedetaljerNy = ({ periode, annenForelder }: Props) => {
    const intl = useIntl();

    // FIXME (TOR) Få inn arbeidsformer
    // let arbeidsformTekst = '';
    // if (arbeidsformer) {
    //     arbeidsformTekst = getArbeidsformTekst(intl, arbeidsformer, orgnumre, registrerteArbeidsforhold).join('\r\n');
    // }

    const erDeltUttakINorge = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;

    return (
        <>
            {periode.flerbarnsdager !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.ønskerFlerbarnsdager' })}
                    verdi={
                        periode.flerbarnsdager ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })
                    }
                />
            )}
            {periode.samtidigUttak !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.samtidigUttak' })}
                    verdi={periode.samtidigUttak ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {periode.kontoType !== 'FORELDREPENGER_FØR_FØDSEL' && !periode.samtidigUttak && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.kombineresMedarbeid' })}
                    verdi={periode.gradering ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}

            {periode.gradering?.arbeidstidprosent && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.stillingsprosent' })}
                    verdi={periode.gradering.arbeidstidprosent.toString()}
                />
            )}

            {/* {arbeidsformer && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.arbeidstaker.label' })}
                    verdi={arbeidsformTekst}
                />
            )} */}
            {periode.morsAktivitet && periode.morsAktivitet !== 'IKKE_OPPGITT' && (
                <MorsAktivitetDetaljer morsAktivitet={periode.morsAktivitet} />
            )}
        </>
    );
};
