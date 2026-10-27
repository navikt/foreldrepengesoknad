import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { KontoDto, UttakPeriodeDto } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

dayjs.extend(minMax);

export const tilpassForslagForFørstegangssøknad = (
    fødselsdato: string,
    termindato: string,
    startdato: string,
    kontoer: KontoDto[],
) => {
    const førsteDagEtterFødsel = Uttaksdagen.denneEllerNeste(fødselsdato).getDato();
    const førsteDagFraTermin = Uttaksdagen.denneEllerNeste(termindato).getDato();
    const foreldrepengerFørFødsel = kontoer.find((konto) => konto.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const startForeldrepengerFørFødsel = Uttaksdagen.denne(førsteDagFraTermin).getDatoAntallUttaksdagerTidligere(15);
    const fellesperiode = kontoer.find((konto) => konto.konto === 'FELLESPERIODE' || konto.konto === 'FORELDREPENGER');
    const perioder: UttakPeriodeDto[] = [];
    let brukteFellesperiodedager = 0;

    const leggTilPeriode = (fom: string, tom: string, konto: KontoDto | undefined) => {
        if (!konto || konto.konto === 'AKTIVITETSFRI_KVOTE' || fom >= tom) {
            return;
        }
        const dager = Uttaksdagen.denne(fom).getUttaksdagerFremTilDato(tom);
        const tilgjengeligeDager = konto === fellesperiode ? konto.dager - brukteFellesperiodedager : konto.dager;
        const antallDager = Math.min(dager, tilgjengeligeDager);
        if (antallDager <= 0) {
            return;
        }
        perioder.push({
            fom,
            tom: Uttaksdagen.denne(fom).getDatoAntallUttaksdagerSenere(antallDager - 1),
            søker: { forelder: 'MOR', kontoType: konto.konto, flerbarnsdager: false },
        });
        if (konto === fellesperiode) {
            brukteFellesperiodedager += antallDager;
        }
    };

    leggTilPeriode(
        startdato,
        dayjs.min(dayjs(startForeldrepengerFørFødsel), dayjs(førsteDagEtterFødsel)).format(ISO_DATE_FORMAT),
        fellesperiode,
    );
    leggTilPeriode(
        dayjs.max(dayjs(startdato), dayjs(startForeldrepengerFørFødsel)).format(ISO_DATE_FORMAT),
        dayjs.min(dayjs(førsteDagFraTermin), dayjs(førsteDagEtterFødsel)).format(ISO_DATE_FORMAT),
        foreldrepengerFørFødsel,
    );
    // Ved fødsel etter termin brukes fellesperioden selv om mor har valgt å hoppe over fordelingen.
    leggTilPeriode(førsteDagFraTermin, førsteDagEtterFødsel, fellesperiode);

    return {
        perioder,
        kontoer: kontoer.map((konto) =>
            konto === fellesperiode ? { ...konto, dager: konto.dager - brukteFellesperiodedager } : konto,
        ),
        startdatoEtterFødsel:
            fødselsdato > termindato || startdato < førsteDagEtterFødsel ? førsteDagEtterFødsel : startdato,
    };
};
