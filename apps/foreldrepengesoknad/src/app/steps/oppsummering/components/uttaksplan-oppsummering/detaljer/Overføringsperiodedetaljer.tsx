import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import { NavnPåForeldre, Overføringsperiode, StønadskontoType } from '@navikt/fp-common';
import OppsummeringAvDokumentasjon from '../oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import { getÅrsakTekst } from '../OppsummeringUtils';
import { dokumentasjonBehøvesForOverføringsperiode } from '@navikt/uttaksplan';

interface OverføringsperiodedetaljerProps {
    periode: Overføringsperiode;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    periodeErNyEllerEndret: boolean;
}

type Props = OverføringsperiodedetaljerProps;

const getNavnPåAnnenForelder = (navnPåForeldre: NavnPåForeldre, konto: StønadskontoType, intl: IntlShape) => {
    if (konto === StønadskontoType.Fedrekvote) {
        return navnPåForeldre.farMedmor;
    } else if (konto === StønadskontoType.Mødrekvote) {
        return navnPåForeldre.mor;
    }
    return intl.formatMessage({ id: 'annen.forelder' });
};

const Overføringsperiodedetaljer: React.FunctionComponent<Props> = ({
    periode,
    navnPåForeldre,
    erFarEllerMedmor,
    periodeErNyEllerEndret,
}) => {
    const { vedlegg } = periode;
    const intl = useIntl();
    const navnAnnenForelder = getNavnPåAnnenForelder(navnPåForeldre, periode.konto, intl);
    return (
        <>
            <Feltoppsummering
                feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
                verdi={getÅrsakTekst(intl, periode, { navnAnnenForelder })}
            />

            {dokumentasjonBehøvesForOverføringsperiode(erFarEllerMedmor, periode) && periodeErNyEllerEndret && (
                <OppsummeringAvDokumentasjon vedlegg={vedlegg || []} />
            )}
        </>
    );
};

export default Overføringsperiodedetaljer;
