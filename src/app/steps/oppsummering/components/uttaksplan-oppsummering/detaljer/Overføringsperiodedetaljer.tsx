import * as React from 'react';
import { useIntl } from 'react-intl';
import { NavnPåForeldre } from 'common/types';
import { Overføringsperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import { intlUtils } from '@navikt/fp-common';
import OppsummeringAvDokumentasjon from '../oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import { dokumentasjonBehøvesForOverføringsperiode } from 'app/utils/manglendeVedleggUtils';
import { getÅrsakTekst } from '../OppsummeringUtils';

interface OverføringsperiodedetaljerProps {
    periode: Overføringsperiode;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    periodeErNyEllerEndret: boolean;
}

type Props = OverføringsperiodedetaljerProps;

const getNavnPåAnnenForelder = (navnPåForeldre: NavnPåForeldre, konto: StønadskontoType) => {
    if (konto === StønadskontoType.Fedrekvote) {
        return navnPåForeldre.farMedmor;
    } else if (konto === StønadskontoType.Mødrekvote) {
        return navnPåForeldre.mor;
    }
    return 'Annen forelder ';
};

const Overføringsperiodedetaljer: React.FunctionComponent<Props> = ({
    periode,
    navnPåForeldre,
    erFarEllerMedmor,
    periodeErNyEllerEndret,
}) => {
    const { vedlegg } = periode;
    const intl = useIntl();
    const annenForelderNavn = getNavnPåAnnenForelder(navnPåForeldre, periode.konto);
    return (
        <>
            <Feltoppsummering
                feltnavn={intlUtils(intl, 'oppsummering.uttak.årsak')}
                verdi={getÅrsakTekst(intl, periode, { annenForelderNavn })}
            />

            {dokumentasjonBehøvesForOverføringsperiode(erFarEllerMedmor, periode) && periodeErNyEllerEndret && (
                <OppsummeringAvDokumentasjon vedlegg={vedlegg || []} />
            )}
        </>
    );
};

export default Overføringsperiodedetaljer;
