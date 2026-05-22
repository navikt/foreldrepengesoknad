import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';

import { Uttaksdagen } from '@navikt/fp-utils';

import { erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { UttakPeriodeBuilder } from '../../utils/UttakPeriodeBuilder';
import { Periode, Regel, Regelgruppe, i18n, ValideringInput } from './types';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(minMax);

const TO_UKER_UTTAKSDAGER = 10;
const SEKS_UKER_UTTAKSDAGER = 30;

type FarMedmorMaks2UkerKontekst = {
    totaltAntallDagerInnenforIntervallet: number;
};

const tellArbeidsdagerInnenfor = (
    fom: string,
    tom: string,
    førsteDag: string,
    sisteDag: string,
): number => {
    const start = dayjs.max(dayjs(fom), dayjs(førsteDag));
    const slutt = dayjs.min(dayjs(tom), dayjs(sisteDag));

    if (slutt.isBefore(start, 'day')) {
        return 0;
    }

    let dager = 0;
    let current = start.clone();
    while (!current.isAfter(slutt, 'day')) {
        const weekday = current.day();
        if (weekday !== 0 && weekday !== 6) {
            dager += 1;
        }
        current = current.add(1, 'day');
    }
    return dager;
};

const REGLER: ReadonlyArray<Regel<FarMedmorMaks2UkerKontekst>> = [
    {
        id: 'MerEnnToUkerRundtFamiliehendelse',
        beskrivelse:
            'Når begge foreldre har rett og far/medmor tar uttak i intervallet 2 uker før til 6 uker etter ' +
            'fødsel/termin, kan far/medmor maks ha 2 uker (10 uttaksdager) totalt i dette intervallet. ' +
            'Også gradert uttak teller med (skalert med stillingsprosent).',
        erBrutt: (k) => k.totaltAntallDagerInnenforIntervallet > TO_UKER_UTTAKSDAGER,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.FarMedmor.MerEnnToUkerRundtFamiliehendelse'),
    },
];

export const FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_GRUPPE: Regelgruppe<FarMedmorMaks2UkerKontekst> = {
    id: 'farMedmorMaksToUkerRundtFødsel',
    beskrivelse:
        'Kontroll på at far/medmor ikke samlet får mer enn 2 uker uttak i intervallet 2 uker før til ' +
        '6 uker etter fødsel/termin. Gjelder bare når begge har rett og søknaden gjelder begge foreldre, og ' +
        'ikke ved adopsjon eller overført mødrekvote eller flerbarnsdager.',
    byggKontekst: (input: ValideringInput): FarMedmorMaks2UkerKontekst | null => {
        const {
            familiesituasjon,
            foreldreInfo,
            formValues,
            familiehendelsedato,
            termindato,
            erEndringssøknad,
            perioder,
            uttakPerioder,
        } = input;

        if (familiesituasjon === 'adopsjon') {
            return null;
        }
        if (foreldreInfo.rettighetType !== 'BEGGE_RETT' || formValues.forelder !== 'BEGGE') {
            return null;
        }

        const tidligsteDato = termindato
            ? dayjs.min(dayjs(familiehendelsedato), dayjs(termindato)).format('YYYY-MM-DD')
            : familiehendelsedato;
        const senesteDato = termindato
            ? dayjs.max(dayjs(familiehendelsedato), dayjs(termindato)).format('YYYY-MM-DD')
            : familiehendelsedato;

        const førsteDag = Uttaksdagen.denneEllerNeste(
            erEndringssøknad ? tidligsteDato : familiehendelsedato,
        ).getDatoAntallUttaksdagerTidligere(TO_UKER_UTTAKSDAGER);
        const sisteDag = Uttaksdagen.denneEllerNeste(
            erEndringssøknad ? senesteDato : familiehendelsedato,
        ).getDatoAntallUttaksdagerSenere(SEKS_UKER_UTTAKSDAGER);

        const skalRegelHoppesOverForNyePerioder =
            formValues.kontoTypeFarMedmor === 'MØDREKVOTE' || formValues.ønskerFlerbarnsdager === true;

        const nyePerioderInnenforIntervallet: Periode[] = skalRegelHoppesOverForNyePerioder
            ? []
            : perioder.filter((p) => {
                  const fom = dayjs(p.fom);
                  const tom = dayjs(p.tom);
                  return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
              });

        if (nyePerioderInnenforIntervallet.length === 0) {
            return null;
        }

        const stillingsprosentFaktor =
            formValues.stillingsprosentFarMedmor === undefined
                ? 1
                : Number.parseFloat(formValues.stillingsprosentFarMedmor) / 100;

        const dagerNyePerioder =
            nyePerioderInnenforIntervallet.reduce(
                (sum, p) => sum + tellArbeidsdagerInnenfor(p.fom, p.tom, førsteDag, sisteDag),
                0,
            ) * stillingsprosentFaktor;

        const uttakPerioderUtenOverførtMødrekvote = uttakPerioder.filter(
            (p) => !(erVanligUttakPeriode(p) && p.forelder === 'FAR_MEDMOR' && p.kontoType === 'MØDREKVOTE'),
        );

        const eksisterendeFarMedmorPerioder = new UttakPeriodeBuilder(uttakPerioderUtenOverførtMødrekvote, 'validator')
            .fjernUttakPerioder(perioder, false)
            .getUttakPerioder()
            .filter((p) => erVanligUttakPeriode(p) && p.forelder === 'FAR_MEDMOR');

        const dagerEksisterendePerioder = eksisterendeFarMedmorPerioder.reduce((sum, p) => {
            const dager = tellArbeidsdagerInnenfor(p.fom, p.tom, førsteDag, sisteDag);
            const stillingsprosent =
                erVanligUttakPeriode(p) && p.gradering?.arbeidstidprosent !== undefined
                    ? p.gradering.arbeidstidprosent
                    : 100;
            return sum + dager * (stillingsprosent / 100);
        }, 0);

        return {
            totaltAntallDagerInnenforIntervallet: Math.floor(dagerNyePerioder + dagerEksisterendePerioder),
        };
    },
    regler: REGLER,
};
