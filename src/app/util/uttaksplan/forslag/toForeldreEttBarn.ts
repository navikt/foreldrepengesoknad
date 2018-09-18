import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';
import { Permisjonsregler } from '../../../types/uttaksplan/permisjonsregler';
import { Periodetype, StønadskontoType, Periode } from '../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import { sorterPerioder } from '../Periodene';
import {
    getMødrekvoteFørTermin,
    getPakrevdMødrekvoteEtterTermin,
    getFrivilligMødrekvoteEtterTermin,
    getFedrekvote,
    getFellesperiodeMor,
    getFellesperiodeFarMedmor
} from './util';

/** Oppretter default stønadsperioder ut fra familiehendelsedato ++ */
export function opprettUttaksperioderToForeldreEttBarn(
    familiehendelsedato: Date,
    fellesukerMor: number,
    fellesukerFarMedmor: number,
    permisjonsregler: Permisjonsregler
): Periode[] {
    familiehendelsedato = normaliserDato(familiehendelsedato);

    const perioder: Periode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: getMødrekvoteFørTermin(familiehendelsedato, permisjonsregler),
            ønskerSamtidigUttak: false
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getPakrevdMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler),
            ønskerSamtidigUttak: false
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getFrivilligMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler),
            ønskerSamtidigUttak: false
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.FARMEDMOR,
            konto: StønadskontoType.Fedrekvote,
            tidsperiode: getFedrekvote(familiehendelsedato, permisjonsregler, fellesukerMor, fellesukerFarMedmor),
            ønskerSamtidigUttak: false
        }
    ];

    if (fellesukerMor > 0) {
        perioder.push({
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: getFellesperiodeMor(familiehendelsedato, permisjonsregler, fellesukerMor),
            ønskerSamtidigUttak: false
        });
    }

    if (fellesukerFarMedmor > 0) {
        perioder.push({
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.FARMEDMOR,
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: getFellesperiodeFarMedmor(
                familiehendelsedato,
                permisjonsregler,
                fellesukerMor,
                fellesukerFarMedmor
            ),
            ønskerSamtidigUttak: false
        });
    }

    return perioder.sort(sorterPerioder);
}
