import { IntlShape, useIntl } from 'react-intl';

import { UttakDto_fpoversikt } from '@navikt/fp-types';

import { Feltoppsummering } from './Feltoppsummering';
import { MorsAktivitetDetaljer } from './MorsaktiviteterDetaljer';

interface Props {
    periode: UttakDto_fpoversikt;
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

const getÅrsakTekst = (intl: IntlShape, periode: UttakDto_fpoversikt) => {
    switch (periode.utsettelseÅrsak) {
        case 'ARBEID': {
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.ARBEID' });
        }
        case 'FERIE': {
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.LOVBESTEMT_FERIE' });
        }
        case 'SØKER_SYKDOM': {
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.SØKER_SYKDOM' });
        }
        case 'FRI': {
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.FRI' });
        }
        case 'SØKER_INNLAGT': {
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.SØKER_INNLAGT' });
        }
        case 'BARN_INNLAGT': {
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.BARN_INNLAGT' });
        }
        case 'HV_ØVELSE': {
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.HV_ØVELSE' });
        }
        case 'NAV_TILTAK': {
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.NAV_TILTAK' });
        }
        default: {
            throw new Error(`Ukjent utsettelseÅrsak: ${periode.utsettelseÅrsak}`);
        }
    }
};
