import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';

import { Uttaksdagen, getFloatFromString } from '@navikt/fp-utils';

import { erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { UttakPeriodeBuilder } from '../../utils/UttakPeriodeBuilder';
import { getFørsteUttaksdag2UkerFørFødsel } from '../../utils/UttaksperiodeValidatorer';
import { ANTALL_UTTAKSDAGER_SEKS_UKER, ANTALL_UTTAKSDAGER_TO_UKER } from '../../utils/uttaksdagerKonstanter';
import { Periode, ValideringInput, Valideringsområde, Valideringsregel } from './types';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(minMax);

export const lagFarMedmorMaksToUkerRundtFødselOmråde = (
    intl: IntlShape,
): Valideringsområde<FarMedmorMaks2UkerKontekst> => ({
    id: 'farMedmorMaksToUkerRundtFødsel',
    område: 'Far/medmor sitt maksimum på 2 uker rundt fødsel',
    beskrivelse:
        'Far/medmor kan ta inntil 10 stønadsdager av egen kvote i forbindelse med fødselen. Intervallet starter ' +
        '2 uker før den tidligste av fødselsdatoen og termindatoen og slutter etter de første 6 ukene fra fødselen. ' +
        'Før fødselen er kjent, brukes termindatoen. Datogrensene er like i førstegangs- og endringssøknader. ' +
        'Kontrollen gjelder samtidig uttak når begge har rett, ikke adopsjon. Flerbarnsdager, overført mødrekvote ' +
        'og uttak fordi mor er innlagt eller helt avhengig av hjelp på grunn av sykdom, telles ikke med.',
    byggKontekst: byggKontekst,
    regler: lagRegler(intl),
});

type FarMedmorMaks2UkerKontekst = {
    totaltAntallDagerInnenforIntervallet: number;
};

const tellArbeidsdagerInnenfor = (fom: string, tom: string, førsteDag: string, sisteDag: string): number => {
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

const lagRegler = (intl: IntlShape): ReadonlyArray<Valideringsregel<FarMedmorMaks2UkerKontekst>> => [
    {
        id: 'farMedmorMaksToUkerRundtFødsel.merEnnToUkerRundtFamiliehendelse',
        beskrivelse:
            'Nye og eksisterende dager med fedrekvote i forbindelse med fødselen kan til sammen ikke overstige ' +
            '10 stønadsdager. Flerbarnsdager og uttak ved mors sykdom eller innleggelse kommer i tillegg til ' +
            'denne grensen, uavhengig av rekkefølgen periodene legges inn i. Overført mødrekvote telles heller ' +
            'ikke med. Gradert uttak teller med uttaksprosenten (100 % minus stillingsprosenten).',
        erBrutt: (k) => k.totaltAntallDagerInnenforIntervallet > ANTALL_UTTAKSDAGER_TO_UKER,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.FarMedmor.MerEnnToUkerRundtFamiliehendelse',
        }),
    },
];

const byggKontekst = (input: ValideringInput): FarMedmorMaks2UkerKontekst | null => {
    const { familiesituasjon, foreldreInfo, formValues, familiehendelsedato, termindato, perioder, uttakPerioder } =
        input;

    if (familiesituasjon === 'adopsjon') {
        return null;
    }
    if (foreldreInfo.rettighetType !== 'BEGGE_RETT' || formValues.forelder !== 'BEGGE') {
        return null;
    }

    const førsteDag = getFørsteUttaksdag2UkerFørFødsel(familiehendelsedato, termindato);
    const sisteDag = Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(
        ANTALL_UTTAKSDAGER_SEKS_UKER - 1,
    );

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

    const uttaksfaktor = (100 - (getFloatFromString(formValues.stillingsprosentFarMedmor) ?? 0)) / 100;

    const dagerNyePerioder =
        nyePerioderInnenforIntervallet.reduce(
            (sum, p) => sum + tellArbeidsdagerInnenfor(p.fom, p.tom, førsteDag, sisteDag),
            0,
        ) * uttaksfaktor;

    const eksisterendeFarMedmorPerioder = new UttakPeriodeBuilder(uttakPerioder, 'validator')
        .fjernUttakPerioder(perioder, false)
        .getUttakPerioder()
        .filter(erVanligUttakPeriode)
        .filter(
            (p) =>
                p.forelder === 'FAR_MEDMOR' &&
                p.kontoType !== 'MØDREKVOTE' &&
                !p.flerbarnsdager &&
                p.morsAktivitet !== 'INNLAGT' &&
                p.morsAktivitet !== 'TRENGER_HJELP',
        );

    const dagerEksisterendePerioder = eksisterendeFarMedmorPerioder.reduce((sum, p) => {
        const dager = tellArbeidsdagerInnenfor(p.fom, p.tom, førsteDag, sisteDag);
        const arbeidstidprosent = p.gradering?.arbeidstidprosent ?? 0;
        return sum + dager * ((100 - arbeidstidprosent) / 100);
    }, 0);

    return {
        totaltAntallDagerInnenforIntervallet: Math.round((dagerNyePerioder + dagerEksisterendePerioder) * 10) / 10,
    };
};
