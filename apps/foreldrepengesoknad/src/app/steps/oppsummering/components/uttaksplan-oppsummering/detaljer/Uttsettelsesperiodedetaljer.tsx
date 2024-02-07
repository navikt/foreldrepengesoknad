import {
    AnnenForelder,
    Arbeidsforhold,
    PeriodeUtenUttakUtsettelse,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
} from '@navikt/fp-common';
import * as React from 'react';
import { useIntl } from 'react-intl';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import { getÅrsakTekst } from '../OppsummeringUtils';
import MorsAktivitetDetaljer from './MorsaktiviteterDetaljer';

interface UtsettelsesperiodedetaljerProps {
    periode: Utsettelsesperiode | PeriodeUtenUttakUtsettelse;
    registrerteArbeidsforhold: Arbeidsforhold[];
    søkerErFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
    periodeErNyEllerEndret: boolean;
}

const Utsettelsesperiodedetaljer: React.FunctionComponent<UtsettelsesperiodedetaljerProps> = ({ periode }) => {
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

export default Utsettelsesperiodedetaljer;
