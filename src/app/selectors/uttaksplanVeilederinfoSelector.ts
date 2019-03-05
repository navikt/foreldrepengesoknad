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
import { findMissingAttachmentsForPerioder } from 'app/util/attachments/missingAttachmentUtil';
import { formaterDato } from 'common/util/datoUtils';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import { selectTilgjengeligeStønadskontoer } from './apiSelector';
import { beregnGjenståendeUttaksdager } from 'app/util/uttaksPlanStatus';
import { getVarighetString } from 'common/util/intlUtils';
import { getStønadskontoNavn } from 'app/util/uttaksplan';
import { InjectedIntl } from 'react-intl';
import { erSenUtsettelsePgaFerieEllerArbeid, erSentGradertUttak } from 'app/util/uttaksplan/uttakUtils';
import { isFeatureEnabled, Feature } from 'app/Feature';

export const selectUttaksplanVeilederinfo = (intl: InjectedIntl) =>
    createSelector(
        [getSøknadsinfo, søknadSelector, selectTilgjengeligeStønadskontoer],
        (søknadsinfo, søknad, tilgjengeligeStønadskontoer) => {
            const messages: Message[] = [];
            const { uttaksplan, annenForelder } = søknad as Søknad;
            const { søknaden, søker, mor, navn } = søknadsinfo!;

            const infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor = getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor(
                uttaksplan,
                søknaden.familiehendelsesdato,
                søker.erFarEllerMedmor,
                mor.harRett === false,
                mor.erUfør
            );
            const missingAttachments = findMissingAttachmentsForPerioder(uttaksplan, søker.rolle, annenForelder);
            const planInneholderTapteDager =
                Periodene(uttaksplan).getHull().length > 0 ||
                infoOmTaptUttakVedUttakEtterSeksUkerFarMedmor !== undefined;
            const planInneholderAnnetEnnAktivitetsfriKvote = uttaksplan
                .filter((p) => p.type !== Periodetype.Hull)
                .some(
                    (p) =>
                        (isUttaksperiode(p) && p.konto !== StønadskontoType.AktivitetsfriKvote) || !isUttaksperiode(p)
                );
            const planErBareUtsettelser = !uttaksplan.some((p) => !isUtsettelsesperiode(p)) && uttaksplan.length > 0;
            const uttaksstatusOvertrukneDager = beregnGjenståendeUttaksdager(
                tilgjengeligeStønadskontoer,
                uttaksplan,
                false
            );
            const overtrukneKontoer = uttaksstatusOvertrukneDager.filter((konto) => konto.antallDager < 0);
            const seneUtsettelserPgaFerieEllerArbeid = uttaksplan.filter(
                erSenUtsettelsePgaFerieEllerArbeid
            ) as Utsettelsesperiode[];

            const seneGraderteUttak = uttaksplan.filter(erSentGradertUttak) as Uttaksperiode[];

            if (overtrukneKontoer.length > 0) {
                overtrukneKontoer.map((konto) =>
                    messages.push({
                        title: 'Overtrukken konto',
                        type: 'feil',
                        content: 'uttaksteg.overtruknedager.info',
                        values: {
                            varighet: getVarighetString(Math.abs(konto.antallDager), intl),
                            konto: getStønadskontoNavn(intl, konto.konto, navn.navnPåForeldre)
                        }
                    })
                );
            }

            if (
                isFeatureEnabled(Feature.ferieOgArbeidTilbakeITid) &&
                (seneUtsettelserPgaFerieEllerArbeid.length > 0 || seneGraderteUttak.length > 0)
            ) {
                const inneholderUtsettelsePgaFerie = seneUtsettelserPgaFerieEllerArbeid.some(
                    (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Ferie
                );
                const inneholderUtsettelsePgaArbeid = seneUtsettelserPgaFerieEllerArbeid.some(
                    (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Arbeid
                );
                const inneholderSeneGraderteUttak = seneGraderteUttak.length > 0;

                if (inneholderUtsettelsePgaFerie) {
                    messages.push({
                        title: 'Sen ferie',
                        type: 'info',
                        content: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.ferie'
                    });
                }

                if (inneholderUtsettelsePgaArbeid) {
                    messages.push({
                        title: 'Sent arbeid',
                        type: 'info',
                        content: 'uttaksplan.veileder.planenAdvarerOmUtsettelser.arbeid'
                    });
                }

                if (inneholderSeneGraderteUttak) {
                    messages.push({
                        title: 'Sen gradering',
                        type: 'info',
                        content: 'uttaksplan.veileder.planenAdvarerOmUttak'
                    });
                }
            }

            if (planInneholderTapteDager && planInneholderAnnetEnnAktivitetsfriKvote) {
                messages.push({
                    title: 'Hull i planen',
                    type: 'info',
                    content: 'uttaksplan.veileder.planenInneholderHull'
                });
            }

            if (missingAttachments.length > 0) {
                messages.push({
                    title: 'Manglende vedlegg',
                    type: 'info',
                    content: 'oppsummering.veileder.manglendeVedlegg'
                });
            }

            if (planErBareUtsettelser) {
                messages.push({
                    title: 'Plan inneholder kun utsettelser',
                    type: 'info',
                    content: 'uttaksplan.veileder.planenInneholderKunUtsettelser',
                    values: {
                        sisteDag: formaterDato(
                            Uttaksdagen(Periodene(uttaksplan).getFørsteUttaksdagEtterSistePeriode()!).forrige(),
                            'D. MMMM YYYY'
                        )
                    }
                });
            }

            return messages;
        }
    );
