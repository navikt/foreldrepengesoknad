import { useIntl } from 'react-intl';
import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import { Barn, EksternArbeidsforholdDto_fpoversikt, UttakDto } from '@navikt/fp-types';
import { skalBesvareFlerbarnsdager } from '@navikt/fp-uttaksplan/flerbarnsdager';

import { getAktivitetTekst } from '../OppsummeringUtils';
import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    uttak: UttakDto;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[] | undefined;
    annenForelder: AnnenForelder;
    barn: Barn;
    erSøker: boolean;
}

export const Uttaksperiodedetaljer = ({ uttak, annenForelder, registrerteArbeidsforhold, barn, erSøker }: Props) => {
    const intl = useIntl();

    const erDeltUttakINorge = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;

    const skalViseFlerbarnsdager = skalBesvareFlerbarnsdager(
        barn.antallBarn,
        uttak.forelder,
        uttak.kontoType,
        uttak.samtidigUttak,
    );

    return (
        <>
            {skalViseFlerbarnsdager && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage(
                        { id: 'oppsummering.uttak.ønskerFlerbarnsdager' },
                        { erSøker, fornavn: annenForelder.kanIkkeOppgis ? '' : annenForelder.fornavn },
                    )}
                    verdi={uttak.flerbarnsdager ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {uttak.samtidigUttak !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.samtidigUttak' })}
                    verdi={uttak.samtidigUttak ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {uttak.kontoType !== 'FORELDREPENGER_FØR_FØDSEL' && !uttak.samtidigUttak && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage(
                        { id: 'oppsummering.uttak.kombineresMedarbeid' },
                        { erSøker, fornavn: annenForelder.kanIkkeOppgis ? '' : annenForelder.fornavn },
                    )}
                    verdi={uttak.gradering ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}

            {uttak.gradering?.arbeidstidprosent && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.stillingsprosent' })}
                    verdi={uttak.gradering.arbeidstidprosent.toString()}
                />
            )}

            {uttak.gradering?.aktivitet && erSøker && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.arbeidstaker.label' })}
                    verdi={getAktivitetTekst(intl, uttak.gradering?.aktivitet, registrerteArbeidsforhold)}
                />
            )}
            {uttak.morsAktivitet && uttak.morsAktivitet !== 'IKKE_OPPGITT' && (
                <MorsAktivitetDetaljer morsAktivitet={uttak.morsAktivitet} />
            )}
        </>
    );
};
