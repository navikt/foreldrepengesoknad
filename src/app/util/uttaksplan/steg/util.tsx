import * as React from 'react';
import Søknad from 'app/types/søknad/Søknad';
import { getErSøkerFarEllerMedmor } from 'app/util/domain/personUtil';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import lenker from 'app/util/routing/lenker';

export const getVeilederInfoText = (søknad: Søknad, aktivitetsfriKvote: number) => {
    const { annenForelder, søker } = søknad;

    if (søknad.erEndringssøknad) {
        return <FormattedMessage id="uttaksplan.informasjon.endringssøknad" />;
    }

    if (getErSøkerFarEllerMedmor(søknad.søker.rolle)) {
        if (
            annenForelder.kanIkkeOppgis ||
            (!annenForelder.harRettPåForeldrepenger && !annenForelder.erUfør) ||
            søker.erAleneOmOmsorg
        ) {
            return <FormattedMessage id="uttaksplan.informasjon.farMedmor.aleneOmsorg" />;
        } else if (annenForelder.erUfør) {
            return (
                <FormattedMessage
                    id="uttaksplan.informasjon.farMedmor.deltOmsorgMorUfør"
                    values={{ aktivitetsfriKvote }}
                />
            );
        } else {
            return (
                <FormattedHTMLMessage
                    id="uttaksplan.informasjon.farMedmor.deltUttak"
                    values={{
                        navnAnnenForelder: annenForelder.fornavn,
                        link: lenker.viktigeFrister
                    }}
                />
            );
        }
    } else {
        if (annenForelder.kanIkkeOppgis || !annenForelder.harRettPåForeldrepenger || søker.erAleneOmOmsorg) {
            return <FormattedMessage id="uttaksplan.informasjon.mor.aleneOmsorg" />;
        } else {
            return (
                <FormattedMessage
                    id="uttaksplan.informasjon.mor.deltOmsorg"
                    values={{ navnAnnenForelder: annenForelder.fornavn }}
                />
            );
        }
    }
};
