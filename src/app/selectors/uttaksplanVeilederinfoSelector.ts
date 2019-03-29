import { createSelector } from 'reselect';
import { getSøknadsinfo } from './søknadsinfoSelector';
import { Message } from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import { søknadSelector } from './søknadSelector';
import Søknad from 'app/types/søknad/Søknad';
import { isUtsettelsesperiode } from 'app/types/uttaksplan/periodetyper';
import { formaterDato } from 'common/util/datoUtils';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import { InjectedIntl } from 'react-intl';

export const selectUttaksplanVeilederinfo = (intl: InjectedIntl) =>
    createSelector([getSøknadsinfo, søknadSelector], (søknadsinfo, søknad) => {
        const messages: Message[] = [];
        const { uttaksplan } = søknad as Søknad;

        const planErBareUtsettelser = !uttaksplan.some((p) => !isUtsettelsesperiode(p)) && uttaksplan.length > 0;

        if (planErBareUtsettelser) {
            const messageContent = søknad.erEndringssøknad
                ? 'uttaksplan.veileder.planenInneholderKunUtsettelser.endringssøknad'
                : 'uttaksplan.veileder.planenInneholderKunUtsettelser';

            messages.push({
                title: 'uttaksplan.veileder.planenInneholderKunUtsettelser.tittel',
                type: 'info',
                contentIntlKey: messageContent,
                values: {
                    sisteDag: formaterDato(
                        Uttaksdagen(Periodene(uttaksplan).getFørsteUttaksdagEtterSistePeriode()!).forrige(),
                        'D. MMMM YYYY'
                    )
                }
            });
        }

        return messages;
    });
