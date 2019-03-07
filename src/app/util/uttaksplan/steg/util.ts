import Søknad from 'app/types/søknad/Søknad';
import { getErSøkerFarEllerMedmor } from 'app/util/domain/personUtil';
import lenker from 'app/util/routing/lenker';
import { Message } from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';

export const getVeilederInfoText = (søknad: Søknad, aktivitetsfriKvote: number): Message => {
    const { annenForelder, søker } = søknad;

    if (søknad.erEndringssøknad) {
        return {
            type: 'normal',
            contentIntlKey: 'uttaksplan.informasjon.endringssøknad'
        };
    } else {
        if (getErSøkerFarEllerMedmor(søknad.søker.rolle)) {
            if (
                annenForelder.kanIkkeOppgis ||
                (!annenForelder.harRettPåForeldrepenger && !annenForelder.erUfør) ||
                søker.erAleneOmOmsorg
            ) {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.farMedmor.aleneOmsorg'
                };
            } else if (annenForelder.erUfør) {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.farMedmor.deltOmsorgMorUfør',
                    values: { aktivitetsfriKvote }
                };
            } else {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.farMedmor.deltUttak',
                    formatContentAsHTML: true,
                    values: {
                        navnAnnenForelder: annenForelder.fornavn,
                        link: lenker.viktigeFrister
                    }
                };
            }
        } else {
            if (annenForelder.kanIkkeOppgis || !annenForelder.harRettPåForeldrepenger || søker.erAleneOmOmsorg) {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.mor.aleneOmsorg'
                };
            } else {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.mor.deltOmsorg',
                    values: { navnAnnenForelder: annenForelder.fornavn }
                };
            }
        }
    }
};
