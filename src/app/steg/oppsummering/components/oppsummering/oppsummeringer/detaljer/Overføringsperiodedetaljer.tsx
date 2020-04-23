import * as React from 'react';
import { useIntl } from 'react-intl';
import { Overføringsperiode, StønadskontoType } from '../../../../../../types/uttaksplan/periodetyper';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from 'app/steg/oppsummering/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import getMessage from 'common/util/i18nUtils';
import { getÅrsakTekst } from 'app/util/oppsummeringUtils';
import { NavnPåForeldre } from 'common/types';
import { dokumentasjonBehøvesForOverføringsperiode } from '../../../../../../util/uttaksplan/utsettelsesperiode';

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

const Overføringsperiodedetaljer: React.StatelessComponent<Props> = ({
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
                feltnavn={getMessage(intl, 'oppsummering.uttak.årsak')}
                verdi={getÅrsakTekst(intl, periode, { annenForelderNavn })}
            />

            {dokumentasjonBehøvesForOverføringsperiode(erFarEllerMedmor, periode) && periodeErNyEllerEndret && (
                <OppsummeringAvDokumentasjon vedlegg={vedlegg || []} />
            )}
        </>
    );
};

export default Overføringsperiodedetaljer;
