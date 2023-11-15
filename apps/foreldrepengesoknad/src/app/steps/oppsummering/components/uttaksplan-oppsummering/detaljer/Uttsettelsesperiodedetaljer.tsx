import {
    AnnenForelder,
    Arbeidsforhold,
    PeriodeUtenUttakUtsettelse,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    intlUtils,
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
    const bekreftErIArbeidSvar = bekrefterArbeidIPerioden === true ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei');

    return (
        <>
            <Feltoppsummering
                feltnavn={intlUtils(intl, 'oppsummering.uttak.årsak')}
                verdi={getÅrsakTekst(intl, periode)}
            />
            {årsak === UtsettelseÅrsakType.Arbeid && (
                <Feltoppsummering
                    feltnavn={intlUtils(intl, 'oppsummering.uttak.bekreft100ProsentIArbeid.label')}
                    verdi={bekreftErIArbeidSvar}
                />
            )}
            {morsAktivitetIPerioden && <MorsAktivitetDetaljer morsAktivitet={morsAktivitetIPerioden} />}
        </>
    );
};

export default Utsettelsesperiodedetaljer;
