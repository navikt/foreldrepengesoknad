import { useIntl } from 'react-intl';
import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import { Barn, EksternArbeidsforholdDto_fpoversikt, UttakDto } from '@navikt/fp-types';
import { finnSamtidigUttaksprosent, skalBesvareFlerbarnsdager } from '@navikt/fp-uttaksplan/periode-utils';

import { getAktivitetTekst } from '../OppsummeringUtils';
import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    uttak: UttakDto;
    erSamtidigUttak: boolean;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[] | undefined;
    annenForelder: AnnenForelder;
    barn: Barn;
    erSøker: boolean;
}

export const Uttaksperiodedetaljer = ({
    uttak,
    erSamtidigUttak,
    annenForelder,
    registrerteArbeidsforhold,
    barn,
    erSøker,
}: Props) => {
    const intl = useIntl();

    const erDeltUttakINorge = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;
    const samtidigUttak = erSamtidigUttak ? finnSamtidigUttaksprosent(uttak) : undefined;

    const skalViseFlerbarnsdager = skalBesvareFlerbarnsdager(
        barn.antallBarn,
        uttak.forelder,
        uttak.kontoType,
        samtidigUttak,
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
            {samtidigUttak !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.samtidigUttak' })}
                    verdi={samtidigUttak ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                />
            )}
            {uttak.kontoType !== 'FORELDREPENGER_FØR_FØDSEL' && !samtidigUttak && (
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
