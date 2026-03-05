import { useIntl } from 'react-intl';

import { AnnenForelder, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { Barn, EksternArbeidsforholdDto_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { skalBesvareFlerbarnsdager } from '@navikt/fp-uttaksplan-ny';

import { getAktivitetTekst } from '../OppsummeringUtils';
import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    periode: UttakPeriode_fpoversikt;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[] | undefined;
    annenForelder: AnnenForelder;
    barn: Barn;
    erSøker: boolean;
}

export const UttaksperiodedetaljerNy = ({
    periode,
    annenForelder,
    registrerteArbeidsforhold,
    barn,
    erSøker,
}: Props) => {
    const intl = useIntl();

    const erDeltUttakINorge = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;

    const skalViseFlerbarnsdager = skalBesvareFlerbarnsdager(barn.antallBarn, periode.forelder, periode.kontoType);

    return (
        <>
            {skalViseFlerbarnsdager && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage(
                        { id: 'oppsummering.uttak.ønskerFlerbarnsdager' },
                        { erSøker, fornavn: annenForelder.kanIkkeOppgis ? '' : annenForelder.fornavn },
                    )}
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
                    feltnavn={intl.formatMessage(
                        { id: 'oppsummering.uttak.kombineresMedarbeid' },
                        { erSøker, fornavn: annenForelder.kanIkkeOppgis ? '' : annenForelder.fornavn },
                    )}
                    verdi={periode.gradering ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}

            {periode.gradering?.arbeidstidprosent && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.stillingsprosent' })}
                    verdi={periode.gradering.arbeidstidprosent.toString()}
                />
            )}

            {periode.gradering?.aktivitet && erSøker && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.arbeidstaker.label' })}
                    verdi={getAktivitetTekst(intl, periode.gradering?.aktivitet, registrerteArbeidsforhold)}
                />
            )}
            {periode.morsAktivitet && periode.morsAktivitet !== 'IKKE_OPPGITT' && (
                <MorsAktivitetDetaljer morsAktivitet={periode.morsAktivitet} />
            )}
        </>
    );
};
