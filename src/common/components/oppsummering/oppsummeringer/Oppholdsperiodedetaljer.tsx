import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
// import getMessage from 'common/util/i18nUtils';
import { Søknadsinfo } from 'app/selectors/types';
import { Oppholdsperiode } from 'app/types/uttaksplan/periodetyper';
import { getPeriodeForelderNavn } from 'app/util/uttaksplan';

interface OppholdsperiodedetaljerProps {
    periode: Oppholdsperiode;
    periodeErNyEllerEndret: boolean;
    søknadsinfo: Søknadsinfo;
}

type Props = OppholdsperiodedetaljerProps & InjectedIntlProps;

const Oppholdsperiodedetaljer: React.StatelessComponent<Props> = ({ periode, søknadsinfo, intl }) => {
    const { årsak } = periode;
    //const navn = getForelderNavn(forelder, søknadsinfo.navn.navnPåForeldre);
    const navn = getPeriodeForelderNavn(periode, søknadsinfo.navn.navnPåForeldre);

    return (
        <>
            <Feltoppsummering feltnavn={årsak} verdi={navn} />
        </>
    );
};

export default injectIntl(Oppholdsperiodedetaljer);
