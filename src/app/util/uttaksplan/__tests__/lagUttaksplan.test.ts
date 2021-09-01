import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import mockSøknad from '../../../testdata/soknad.data';
import { FødtBarn } from '../../../types/søknad/Barn';
import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import { StønadskontoType, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { finnHullIPerioder } from '../builder/UttaksplanBuilder';
import { lagUttaksplan, LagUttaksplanParams } from '../forslag/lagUttaksplan';
import { Periodene } from '../Periodene';

const tilgjengeligeKontoerDeltUttak: TilgjengeligStønadskonto[] = [
    {
        konto: StønadskontoType.Mødrekvote,
        dager: 95,
    },
    {
        konto: StønadskontoType.Fedrekvote,
        dager: 95,
    },
    {
        konto: StønadskontoType.Fellesperiode,
        dager: 90,
    },
    {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15,
    },
];

const tilgjengeligeKontoerIkkeDeltUttak: TilgjengeligStønadskonto[] = [
    {
        konto: StønadskontoType.Foreldrepenger,
        dager: 230,
    },
    {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15,
    },
];

const søknad: Søknad = { ...(mockSøknad as Søknad) };

const lagUttaksplanProps: LagUttaksplanParams = {
    annenForelderErUfør: false,
    erDeltUttak: true,
    erEndringssøknad: false,
    familiehendelsesdato: ISOStringToDate((søknad.barn as FødtBarn).fødselsdatoer[0])!,
    situasjon: Søkersituasjon.FØDSEL,
    søkerErFarEllerMedmor: false,
    tilgjengeligeStønadskontoer: tilgjengeligeKontoerDeltUttak,
    uttaksplanSkjema: søknad.ekstrainfo.uttaksplanSkjema,
    erEnkelEndringssøknad: true,
    førsteUttaksdagEtterSeksUker: new Date('2019-01-01'),
    søkerHarMidlertidigOmsorg: false,
};

describe('Forslag til uttaksplan', () => {
    describe('Delt uttaksplan', () => {
        it('mor: skal bestå av 3 perioder', () => {
            const uttaksplan = lagUttaksplan(lagUttaksplanProps);
            expect(uttaksplan.length).toBe(3);
        });
        it('mor: skal ikke ha hull', () => {
            const uttaksplan = lagUttaksplan(lagUttaksplanProps);
            expect(
                finnHullIPerioder(uttaksplan, false, false, false, false, lagUttaksplanProps.familiehendelsesdato)
                    .length
            ).toBe(0);
        });
        it('mor: skal ikke ha overlappende perioder', () => {
            const uttaksplan = lagUttaksplan(lagUttaksplanProps);
            const overlappendePerioder = uttaksplan.find(
                (periode) => Periodene(uttaksplan).finnOverlappendePerioder(periode).length > 0
            );
            expect(overlappendePerioder).toBeUndefined();
        });
        it('far/medmor: skal ikke få foreslått plan gitt ikke valgt fellesperiode', () => {
            const uttaksplan = lagUttaksplan({ ...lagUttaksplanProps, søkerErFarEllerMedmor: true });
            expect(uttaksplan.length).toBe(0);
        });
        it('far/medmor: skal få foreslått plan gitt valgt fellesperiode', () => {
            const farSøknad = {
                antallUkerFellesperiodeFarMedmor: 8,
                antallDagerFellesperiodeFarMedmor: 0,
                morSinSisteUttaksdag: dateToISOString(new Date('2019-01-01')),
                farSinFørsteUttaksdag: dateToISOString(new Date('2019-01-02')),
            };
            const uttaksplan = lagUttaksplan({
                ...lagUttaksplanProps,
                søkerErFarEllerMedmor: true,
                uttaksplanSkjema: {
                    ...lagUttaksplanProps.uttaksplanSkjema,
                    ...farSøknad,
                },
            });

            expect(uttaksplan.length).toBe(2);
        });
    });
    describe('Ikke delt uttaksplan', () => {
        it('mor: skal bestå av 2 perioder', () => {
            const uttaksplan = lagUttaksplan({
                ...lagUttaksplanProps,
                erDeltUttak: false,
                tilgjengeligeStønadskontoer: tilgjengeligeKontoerIkkeDeltUttak,
            });
            expect(uttaksplan.length).toBe(2);
        });
        it('mor: skal ikke ha hull', () => {
            const uttaksplan = lagUttaksplan({
                ...lagUttaksplanProps,
                erDeltUttak: false,
                tilgjengeligeStønadskontoer: tilgjengeligeKontoerIkkeDeltUttak,
            });
            expect(
                finnHullIPerioder(uttaksplan, false, false, false, false, lagUttaksplanProps.familiehendelsesdato)
                    .length
            ).toBe(0);
        });
        it('mor: skal ikke ha overlappende perioder', () => {
            const uttaksplan = lagUttaksplan({
                ...lagUttaksplanProps,
                erDeltUttak: false,
                tilgjengeligeStønadskontoer: tilgjengeligeKontoerIkkeDeltUttak,
            });
            const overlappendePerioder = uttaksplan.find(
                (periode) => Periodene(uttaksplan).finnOverlappendePerioder(periode).length > 0
            );
            expect(overlappendePerioder).toBeUndefined();
        });
    });
});
