import { useIntl } from 'react-intl';
import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import { Barn, EksternArbeidsforholdDto_fpoversikt, UttakDto } from '@navikt/fp-types';
import { skalBesvareFlerbarnsdager } from '@navikt/fp-uttaksplan/flerbarnsdager';

import { getAktivitetTekst } from '../OppsummeringUtils';
import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    part: UttakDto;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[] | undefined;
    annenForelder: AnnenForelder;
    barn: Barn;
    erSøker: boolean;
}

export const Uttaksperiodedetaljer = ({ part, annenForelder, registrerteArbeidsforhold, barn, erSøker }: Props) => {
    const intl = useIntl();

    const erDeltUttakINorge = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;

    const skalViseFlerbarnsdager = skalBesvareFlerbarnsdager(
        barn.antallBarn,
        part.forelder,
        part.kontoType,
        part.samtidigUttak,
    );

    return (
        <>
            {skalViseFlerbarnsdager && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage(
                        { id: 'oppsummering.uttak.ønskerFlerbarnsdager' },
                        { erSøker, fornavn: annenForelder.kanIkkeOppgis ? '' : annenForelder.fornavn },
                    )}
                    verdi={part.flerbarnsdager ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {part.samtidigUttak !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.samtidigUttak' })}
                    verdi={part.samtidigUttak ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {part.kontoType !== 'FORELDREPENGER_FØR_FØDSEL' && !part.samtidigUttak && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage(
                        { id: 'oppsummering.uttak.kombineresMedarbeid' },
                        { erSøker, fornavn: annenForelder.kanIkkeOppgis ? '' : annenForelder.fornavn },
                    )}
                    verdi={part.gradering ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}

            {part.gradering?.arbeidstidprosent && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.stillingsprosent' })}
                    verdi={part.gradering.arbeidstidprosent.toString()}
                />
            )}

            {part.gradering?.aktivitet && erSøker && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.arbeidstaker.label' })}
                    verdi={getAktivitetTekst(intl, part.gradering?.aktivitet, registrerteArbeidsforhold)}
                />
            )}
            {part.morsAktivitet && part.morsAktivitet !== 'IKKE_OPPGITT' && (
                <MorsAktivitetDetaljer morsAktivitet={part.morsAktivitet} />
            )}
        </>
    );
};
