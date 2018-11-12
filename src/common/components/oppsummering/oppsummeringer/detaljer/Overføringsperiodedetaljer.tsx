import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Overføringsperiode, StønadskontoType } from '../../../../../app/types/uttaksplan/periodetyper';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from 'common/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import getMessage from 'common/util/i18nUtils';
import { getÅrsakTekst } from 'common/util/oppsummeringUtils';
import { NavnPåForeldre } from 'common/types';

interface OverføringsperiodedetaljerProps {
    periode: Overføringsperiode;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

type Props = OverføringsperiodedetaljerProps & InjectedIntlProps;

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
    intl
}) => {
    const { vedlegg } = periode;
    const annenForelderNavn = getNavnPåAnnenForelder(navnPåForeldre, periode.konto);
    return (
        <>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.uttak.årsak')}
                verdi={getÅrsakTekst(intl, periode, { annenForelderNavn })}
            />
            <OppsummeringAvDokumentasjon vedlegg={vedlegg || []} />
        </>
    );
};

export default injectIntl(Overføringsperiodedetaljer);
