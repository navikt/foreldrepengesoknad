import { useIntl } from 'react-intl';

import { AnnenForelder, PeriodeUtenUttakUtsettelse, Utsettelsesperiode, UtsettelseÅrsakType } from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';

import { getÅrsakTekst } from '../OppsummeringUtils';
import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    periode: Utsettelsesperiode | PeriodeUtenUttakUtsettelse;
    registrerteArbeidsforhold: Arbeidsforhold[];
    søkerErFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
    periodeErNyEllerEndret: boolean;
}

export const Utsettelsesperiodedetaljer = ({ periode }: Props) => {
    const { årsak, morsAktivitetIPerioden, bekrefterArbeidIPerioden } = periode;
    const intl = useIntl();
    const bekreftErIArbeidSvar =
        bekrefterArbeidIPerioden === true ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' });

    return (
        <>
            <Feltoppsummering
                feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
                verdi={getÅrsakTekst(intl, periode)}
            />
            {årsak === UtsettelseÅrsakType.Arbeid && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.bekreft100ProsentIArbeid.label' })}
                    verdi={bekreftErIArbeidSvar}
                />
            )}
            {morsAktivitetIPerioden && <MorsAktivitetDetaljer morsAktivitet={morsAktivitetIPerioden} />}
        </>
    );
};
