import lenker from 'app/util/routing/lenker';
import { Søknadsinfo } from '../../../selectors/types';
import { getNavnGenitivEierform } from '../../tekstUtils';
import { IntlShape } from 'react-intl';
import { VeilederMessage } from 'app/components/veilederInfo/types';

export const getVeilederInfoText = (
    søknadsinfo: Søknadsinfo,
    aktivitetsfriKvote: number,
    intl: IntlShape
): VeilederMessage => {
    const { søknaden, annenForelder, søker, navn } = søknadsinfo;

    if (søknaden.erEndringssøknad) {
        return {
            type: 'normal',
            contentIntlKey: 'uttaksplan.informasjon.endringssøknad',
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
                    contentIntlKey: 'uttaksplan.informasjon.farMedmor.aleneOmsorg',
                };
            } else if (annenForelder.erUfør) {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.farMedmor.deltOmsorgMorUfør',
                    values: { aktivitetsfriKvote },
                };
            } else {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.farMedmor.deltUttak',
                    formatContentAsHTML: true,
                    values: {
                        navnAnnenForelder: getNavnGenitivEierform(navn.annenForelder.fornavn, intl.locale),
                        link: lenker.viktigeFrister,
                    },
                };
            }
        } else {
            if (annenForelder.kanIkkeOppgis || !annenForelder.harRett || søker.erAleneOmOmsorg) {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.mor.aleneOmsorg',
                };
            } else {
                return {
                    type: 'normal',
                    contentIntlKey: 'uttaksplan.informasjon.mor.deltOmsorg',
                    values: { navnAnnenForelder: navn.annenForelder.fornavn },
                };
            }
        }
    }
};
