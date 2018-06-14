import { Periode } from 'uttaksplan/types';
import { sorterPerioder } from 'uttaksplan/utils/dataUtils';
import { guid } from 'nav-frontend-js-utils';

export const UttaksplanManuell = (perioder: Periode[]) =>
    new UttaksplanManuellBuilder(perioder);

class UttaksplanManuellBuilder {
    constructor(public perioder: Periode[]) {}

    public leggTilEllerOppdater(periode: Periode) {
        if (periode.id) {
            this.oppdaterPeriode(periode);
            return this;
        }
        this.leggTilPeriode({ ...periode, id: guid() });
        return this;
    }

    public leggTilPeriode(periode: Periode) {
        this.perioder = [...this.perioder, ...[periode]];
        this.sort();
        return this;
    }

    public oppdaterPeriode(periode: Periode) {
        this.slettPeriode(periode)
            .leggTilPeriode(periode)
            .sort();
        return this;
    }

    public slettPeriode(periode: Periode) {
        this.perioder = this.perioder.filter((p) => p.id !== periode.id);
        return this;
    }

    protected sort() {
        this.perioder.sort(sorterPerioder);
    }
}
