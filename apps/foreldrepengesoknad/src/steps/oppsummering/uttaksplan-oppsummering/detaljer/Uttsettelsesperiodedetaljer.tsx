import { IntlShape, useIntl } from 'react-intl';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    periode: UttakPeriode_fpoversikt;
}

export const Utsettelsesperiodedetaljer = ({ periode }: Props) => {
    const { morsAktivitet } = periode;
    const intl = useIntl();

    return (
        <>
            <Feltoppsummering
                feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
                verdi={getÅrsakTekst(intl, periode)}
            />
            {morsAktivitet && <MorsAktivitetDetaljer morsAktivitet={morsAktivitet} />}
        </>
    );
};

const getÅrsakTekst = (intl: IntlShape, periode: UttakPeriode_fpoversikt) => {
    //@ts-expect-error Fiks dynamisk id
    return intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${periode.utsettelseÅrsak}` });
};
