import lenker from 'app/util/routing/lenker';
import { VeilederMessage } from '../../../components/veileder-info/VeilederInfo';
import { Søknadsinfo } from '../../../selectors/types';

export const getVeilederInfoText = (søknadsinfo: Søknadsinfo, aktivitetsfriKvote: number): VeilederMessage => {
    const { søknaden, annenForelder, søker, navn } = søknadsinfo;

    if (søknaden.erEndringssøknad) {
        return {
            type: 'normal',
            contentIntlKey: 'uttaksplan.informasjon.endringssøknad'
        };
    } else {
        if (søker.erFarEllerMedmor) {
            if (
                annenForelder.kanIkkeOppgis ||
                (!annenForelder.harRett && !annenForelder.erUfør) ||
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
                        navnAnnenForelder: navn.annenForelder.fornavn,
                        link: lenker.viktigeFrister
                    }
                };
            }
        } else {
            if (annenForelder.kanIkkeOppgis || !annenForelder.harRett || søker.erAleneOmOmsorg) {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.mor.aleneOmsorg'
                };
            } else {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.mor.deltOmsorg',
                    values: { navnAnnenForelder: navn.annenForelder.fornavn }
                };
            }
        }
    }
};
