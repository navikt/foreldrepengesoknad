import { lagUttaksplan } from '../forslag/lagUttaksplan';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import Søknad, { SøkerRolle } from '../../../types/søknad/Søknad';
import mockSøknad from '../../testdata/soknad.data';
import { finnHullIPerioder } from '../builder/UttaksplanBuilder';
import { Periodene } from '../Periodene';

const tilgjengeligeKontoerDeltUttak: TilgjengeligStønadskonto[] = [
    {
        konto: StønadskontoType.Mødrekvote,
        dager: 95
    },
    {
        konto: StønadskontoType.Fedrekvote,
        dager: 95
    },
    {
        konto: StønadskontoType.Fellesperiode,
        dager: 90
    },
    {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
    }
];

const tilgjengeligeKontoerIkkeDeltUttak: TilgjengeligStønadskonto[] = [
    {
        konto: StønadskontoType.Foreldrepenger,
        dager: 230
    },
    {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
    }
];

const søknad: Søknad = { ...(mockSøknad as Søknad) };

describe('Forslag til uttaksplan', () => {
    describe('Delt uttaksplan', () => {
        it('mor: skal bestå av 3 perioder', () => {
            const uttaksplan = lagUttaksplan(søknad, tilgjengeligeKontoerDeltUttak);
            expect(uttaksplan.length).toBe(3);
        });
        it('mor: skal ikke ha hull', () => {
            const uttaksplan = lagUttaksplan(søknad, tilgjengeligeKontoerDeltUttak);
            expect(finnHullIPerioder(uttaksplan).length).toBe(0);
        });
        it('mor: skal ikke ha overlappende perioder', () => {
            const uttaksplan = lagUttaksplan(søknad, tilgjengeligeKontoerDeltUttak);
            const overlappendePerioder = uttaksplan.find(
                (periode) => Periodene(uttaksplan).finnOverlappendePerioder(periode).length > 0
            );
            expect(overlappendePerioder).toBeUndefined();
        });
        it('far/medmor: skal ikke få foreslått plan gitt ikke valgt fellesperiode', () => {
            const uttaksplan = lagUttaksplan(
                { ...søknad, søker: { ...søknad.søker, rolle: SøkerRolle.FAR } },
                tilgjengeligeKontoerDeltUttak
            );
            expect(uttaksplan.length).toBe(0);
        });
        it('far/medmor: skal få foreslått plan gitt valgt fellesperiode', () => {
            const farSøknad = {
                antallUkerFellesperiodeFarMedmor: 8,
                antallDagerFellesperiodeFarMedmor: 0,
                morSinSisteUttaksdag: new Date(2019, 0, 1),
                farSinFørsteUttaksdag: new Date(2019, 0, 2)
            };

            const uttaksplan = lagUttaksplan(
                {
                    ...søknad,
                    søker: { ...søknad.søker, rolle: SøkerRolle.FAR },
                    ekstrainfo: {
                        ...søknad.ekstrainfo,
                        uttaksplanSkjema: { ...søknad.ekstrainfo.uttaksplanSkjema, ...farSøknad }
                    }
                },
                tilgjengeligeKontoerDeltUttak
            );
            expect(uttaksplan.length).toBe(2);
        });
    });
    describe('Ikke delt uttaksplan', () => {
        it('mor: skal bestå av 2 perioder', () => {
            const uttaksplan = lagUttaksplan(søknad, tilgjengeligeKontoerIkkeDeltUttak);
            expect(uttaksplan.length).toBe(2);
        });
        it('mor: skal ikke ha hull', () => {
            const uttaksplan = lagUttaksplan(søknad, tilgjengeligeKontoerIkkeDeltUttak);
            expect(finnHullIPerioder(uttaksplan).length).toBe(0);
        });
        it('mor: skal ikke ha overlappende perioder', () => {
            const uttaksplan = lagUttaksplan(søknad, tilgjengeligeKontoerIkkeDeltUttak);
            const overlappendePerioder = uttaksplan.find(
                (periode) => Periodene(uttaksplan).finnOverlappendePerioder(periode).length > 0
            );
            expect(overlappendePerioder).toBeUndefined();
        });
    });
});
