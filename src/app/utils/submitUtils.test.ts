import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype, Utsettelsesperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { finnEndringerIUttaksplan } from './submitUtils';

describe('finnEndringerIUttaksplan - skal returnere kun perioder som er endret i planen', () => {
    const opprinneligPlan: Periode[] = [
        {
            id: '1',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-04-01'),
                tom: new Date('2022-05-01'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
        },
        {
            id: '2',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-05-02'),
                tom: new Date('2022-08-01'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Mødrekvote,
        },
        {
            id: '3',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-08-02'),
                tom: new Date('2022-10-01'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        },
    ];
    const nyPlan: Periode[] = [
        ...opprinneligPlan,
        {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-10-02'),
                tom: new Date('2022-11-01'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Mødrekvote,
        },
    ];
    const erFarEllerMedmor = true;
    it('finnEndringerIUttaksplan - Skal returnere alle perioder etter endringstidspunktet', () => {
        const endringstidspunkt = new Date('2022-08-05');
        const endringerIPlan = finnEndringerIUttaksplan(opprinneligPlan, nyPlan, endringstidspunkt, erFarEllerMedmor);
        expect(endringerIPlan.length).toEqual(2);
        expect(endringerIPlan[0]).toEqual(nyPlan[2]);
        expect(endringerIPlan[1]).toEqual(nyPlan[3]);
    });
    it('finnEndringerIUttaksplan - Skal returnere ingen perioder hvis endringstidspunkt langt frem i tid og opprinnelig og ny plan er like', () => {
        const endringstidspunkt = new Date('2024-01-01');
        const endringerIPlan = finnEndringerIUttaksplan(
            opprinneligPlan,
            opprinneligPlan,
            endringstidspunkt,
            erFarEllerMedmor
        );
        expect(endringerIPlan.length).toEqual(0);
    });
    it('finnEndringerIUttaksplan - Skal returnere en utsettelsesperiode hvis endringstidspunkt og opprinnelig plan inneholder en slettet periode på slutten', () => {
        const endringstidspunkt = new Date('2022-08-02');
        const nyPlanMedSlettetSistePeriode = opprinneligPlan.slice(0, -1);
        const endringerIPlan = finnEndringerIUttaksplan(
            opprinneligPlan,
            nyPlanMedSlettetSistePeriode,
            endringstidspunkt,
            erFarEllerMedmor
        );
        expect(endringerIPlan.length).toEqual(1);
        const utsettelseForSlettetPeriode = endringerIPlan[0] as Utsettelsesperiode;
        expect(utsettelseForSlettetPeriode.tidsperiode.fom).toEqual(opprinneligPlan[2].tidsperiode.fom);
        expect(endringerIPlan[0].tidsperiode.tom).toEqual(opprinneligPlan[2].tidsperiode.tom);
        expect(endringerIPlan[0].type).toEqual(Periodetype.Utsettelse);
        expect(utsettelseForSlettetPeriode.årsak).toEqual(UtsettelseÅrsakType.Fri);
        expect(utsettelseForSlettetPeriode.forelder).toEqual(Forelder.farMedmor);
    });

    it('finnEndringerIUttaksplan - Skal returnere en utsettelsesperiode med samme datoer som den første slettede perioden hvis det finnens et endringstidspunkt og opprinnelig plan inneholder to slettede perioder på slutten', () => {
        const endringstidspunkt = new Date('2022-05-02');
        const nyPlanMedToSistePerioderSlettet = opprinneligPlan.slice(0, -2);
        const endringerIPlan = finnEndringerIUttaksplan(
            opprinneligPlan,
            nyPlanMedToSistePerioderSlettet,
            endringstidspunkt,
            erFarEllerMedmor
        );
        expect(endringerIPlan.length).toEqual(1);
        const utsettelseForSlettedePerioder = endringerIPlan[0] as Utsettelsesperiode;
        expect(utsettelseForSlettedePerioder.tidsperiode.fom).toEqual(opprinneligPlan[1].tidsperiode.fom);
        expect(endringerIPlan[0].tidsperiode.tom).toEqual(opprinneligPlan[1].tidsperiode.tom);
        expect(endringerIPlan[0].type).toEqual(Periodetype.Utsettelse);
        expect(utsettelseForSlettedePerioder.årsak).toEqual(UtsettelseÅrsakType.Fri);
        expect(utsettelseForSlettedePerioder.forelder).toEqual(Forelder.farMedmor);
    });
    it('finnEndringerIUttaksplan - Skal returnere en utsettelsesperiode hvis opprinnelig plan hadde kun en periode og den ble slettet', () => {
        const opprinneligPlanMedKunEnPeriode = [opprinneligPlan[0]];
        const endringstidspunkt = opprinneligPlan[0].tidsperiode.fom;
        const nyPlanIngenPerioder: Periode[] = [];
        const endringerIPlan = finnEndringerIUttaksplan(
            opprinneligPlanMedKunEnPeriode,
            nyPlanIngenPerioder,
            endringstidspunkt,
            erFarEllerMedmor
        );
        expect(endringerIPlan.length).toEqual(1);
        const utsettelseSomSendesInn = endringerIPlan[0] as Utsettelsesperiode;
        expect(utsettelseSomSendesInn.tidsperiode.fom).toEqual(opprinneligPlanMedKunEnPeriode[0].tidsperiode.fom);
        expect(endringerIPlan[0].tidsperiode.tom).toEqual(opprinneligPlanMedKunEnPeriode[0].tidsperiode.tom);
        expect(endringerIPlan[0].type).toEqual(Periodetype.Utsettelse);
        expect(utsettelseSomSendesInn.årsak).toEqual(UtsettelseÅrsakType.Fri);
        expect(utsettelseSomSendesInn.forelder).toEqual(Forelder.farMedmor);
    });
});
