import { createSelector } from 'reselect';
import { getSøknadsinfo } from './søknadsinfoSelector';
import { Message } from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import { søknadSelector } from './søknadSelector';
import Søknad from 'app/types/søknad/Søknad';
import getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor from 'app/regler/uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import {
    Periodetype,
    isUttaksperiode,
    StønadskontoType,
    isUtsettelsesperiode,
    Utsettelsesperiode,
    Uttaksperiode,
    UtsettelseÅrsakType
} from 'app/types/uttaksplan/periodetyper';
import { formaterDato } from 'common/util/datoUtils';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import { InjectedIntl } from 'react-intl';
import { erSenUtsettelsePgaFerieEllerArbeid, erSentGradertUttak } from 'app/util/uttaksplan/uttakUtils';

export const selectUttaksplanVeilederinfo = (intl: InjectedIntl) =>
    createSelector([getSøknadsinfo, søknadSelector], (søknadsinfo, søknad) => {
        const messages: Message[] = [];
        const { uttaksplan } = søknad as Søknad;
        const { søknaden, søker, mor } = søknadsinfo!;

        const infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor = getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor(
            uttaksplan,
            søknaden.familiehendelsesdato,
            søker.erFarEllerMedmor,
            mor.harRett === false,
            mor.erUfør
        );
        const planInneholderTapteDager =
            Periodene(uttaksplan).getHull().length > 0 || infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor !== undefined;
        const planInneholderAnnetEnnAktivitetsfriKvote = uttaksplan
            .filter((p) => p.type !== Periodetype.Hull)
            .some(
                (p) => (isUttaksperiode(p) && p.konto !== StønadskontoType.AktivitetsfriKvote) || !isUttaksperiode(p)
            );
        const planErBareUtsettelser = !uttaksplan.some((p) => !isUtsettelsesperiode(p)) && uttaksplan.length > 0;
        const seneUtsettelserPgaFerieEllerArbeid = uttaksplan.filter(
            erSenUtsettelsePgaFerieEllerArbeid
        ) as Utsettelsesperiode[];

        const seneGraderteUttak = uttaksplan.filter(erSentGradertUttak) as Uttaksperiode[];

        if (seneUtsettelserPgaFerieEllerArbeid.length > 0 || seneGraderteUttak.length > 0) {
            const inneholderUtsettelsePgaFerie = seneUtsettelserPgaFerieEllerArbeid.some(
                (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Ferie
            );
            const inneholderUtsettelsePgaArbeid = seneUtsettelserPgaFerieEllerArbeid.some(
                (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Arbeid
            );
            const inneholderSeneGraderteUttak = seneGraderteUttak.length > 0;

            if (inneholderUtsettelsePgaFerie) {
                messages.push({
                    title: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.ferie.tittel',
                    type: 'info',
                    contentIntlKey: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.ferie'
                });
            }

            if (inneholderUtsettelsePgaArbeid) {
                messages.push({
                    title: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.arbeid.tittel',
                    type: 'info',
                    contentIntlKey: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.arbeid'
                });
            }

            if (inneholderSeneGraderteUttak) {
                messages.push({
                    title: 'uttaksplan.veileder.planenAdvarerOmUttak.tittel',
                    type: 'info',
                    contentIntlKey: 'uttaksplan.veileder.planenAdvarerOmUttak'
                });
            }
        }

        if (planInneholderTapteDager && planInneholderAnnetEnnAktivitetsfriKvote) {
            messages.push({
                title: 'uttaksplan.veileder.planenInneholderHull.tittel',
                type: 'info',
                contentIntlKey: 'uttaksplan.veileder.planenInneholderHull'
            });
        }

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
