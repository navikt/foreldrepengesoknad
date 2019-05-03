import { Periode, Periodetype, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import { Uttaksdagen } from '../Uttaksdagen';
import { guid } from 'nav-frontend-js-utils';
import { Forelder } from 'common/types';
import { getTidsperiode } from '../Tidsperioden';

const uttakEndringssøknad = (startDato: Date | undefined, familiehendelsesdato: Date): Periode[] => {
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const perioder: Periode[] = [];

    const currentTomDate: Date = førsteUttaksdag;
    if (startDato !== undefined) {
        const startdatoPermisjon = Uttaksdagen(startDato).denneEllerNeste();
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(currentTomDate);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = Uttaksdagen(førsteUttaksdag).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.MOR,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(startdatoPermisjon, dagerFørFødsel - 15),
                vedlegg: []
            };

            perioder.push(ekstraPeriodeFørFødsel);
        }

        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: {
                fom: startdatoFpFørFødsel,
                tom: Uttaksdagen(currentTomDate).forrige()
            }
        };

        perioder.push(periodeFørFødsel);

        return perioder;
    }

    return perioder;
};

export default uttakEndringssøknad;
