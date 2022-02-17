import AnnenForelder from 'app/context/types/AnnenForelder';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { groupBy } from 'lodash';
import { Periode } from 'uttaksplan/types/Periode';
import { getUttaksstatus } from 'uttaksplan/utils/uttaksstatus';
import uttaksplanRegler from '.';
import { getRegelAvvik, hasRegelFeil, regelHarAvvik, regelPasserer } from './utils/regelUtils';
import { Søknadsinfo } from './utils/types/Søknadsinfo';
import { RegelStatus, UttaksplanRegelTestresultat } from './utils/types/regelTypes';
import { Tilleggsopplysninger } from 'app/context/types/Tilleggsopplysninger';
import { EksisterendeSak } from 'app/types/EksisterendeSak';

const REGEL_INTL_PREFIX = 'uttaksplan.validering';

export const sjekkUttaksplanOppMotRegler = (valideringsgrunnlag: Søknadsinfo): RegelStatus[] => {
    return uttaksplanRegler.map((regel) => {
        const resultat = regel.test(valideringsgrunnlag);
        return resultat.passerer
            ? regelPasserer(regel)
            : regelHarAvvik(regel, REGEL_INTL_PREFIX, resultat.info, resultat.periodeId);
    });
};

export const validerUttaksplan = (
    søkersituasjon: Søkersituasjon,
    arbeidsforhold: Arbeidsforhold[],
    dekningsgrad: Dekningsgrad,
    erEndringssøknad: boolean,
    antallBarn: number,
    annenForelder: AnnenForelder,
    navnPåForeldre: NavnPåForeldre,
    søkerErFarEllerMedmor: boolean,
    søkerErAleneOmOmsorg: boolean,
    erDeltUttak: boolean,
    morErUfør: boolean,
    morHarRett: boolean,
    erFlerbarnssøknad: boolean,
    familiehendelsesdato: Date,
    stønadskontoer: TilgjengeligStønadskonto[],
    perioder: Periode[],
    harKomplettUttaksplan: boolean,
    tilleggsopplysninger: Tilleggsopplysninger,
    eksisterendeSak: EksisterendeSak | undefined
): UttaksplanRegelTestresultat => {
    const uttaksstatus = getUttaksstatus({
        erDeltUttak: erDeltUttak,
        erEndringssøknad: erEndringssøknad,
        harKomplettUttaksplan: harKomplettUttaksplan,
        erFarEllerMedmor: søkerErFarEllerMedmor,
        tilgjengeligeStønadskontoer: stønadskontoer,
        uttaksplan: perioder,
    });

    const søknadsinfoForValidering = {
        søkersituasjon: søkersituasjon,
        arbeidsforhold: arbeidsforhold,
        dekningsgrad: dekningsgrad,
        erEndringssøknad: erEndringssøknad,
        antallBarn: antallBarn,
        annenForelder: annenForelder,
        navnPåForeldre: navnPåForeldre,
        søkerErFarEllerMedmor: søkerErFarEllerMedmor,
        søkerErAleneOmOmsorg: søkerErAleneOmOmsorg,
        erDeltUttak: erDeltUttak,
        morErUfør: morErUfør,
        morHarRett: morHarRett,
        erFlerbarnssøknad: erFlerbarnssøknad,
        familiehendelsesdato: familiehendelsesdato,
        stønadskontoer: stønadskontoer,
        perioder: perioder,
        uttaksstatus: uttaksstatus,
        harKomplettUttaksplan: harKomplettUttaksplan,
        tilleggsopplysninger: tilleggsopplysninger,
        eksisterendeSak: eksisterendeSak,
    };

    return kjørUttaksplanRegler(søknadsinfoForValidering);
};

const kjørUttaksplanRegler = (søknadsinfo: Søknadsinfo): UttaksplanRegelTestresultat => {
    const resultat = sjekkUttaksplanOppMotRegler(søknadsinfo);

    const avvik = getRegelAvvik(resultat);
    const avvikPerPeriode = groupBy(
        avvik.filter((a) => a.periodeId !== undefined),
        (r) => r.periodeId
    );

    const harFeil = hasRegelFeil(avvik);
    return {
        resultat,
        avvik,
        avvikPerPeriode,
        harFeil,
    };
};
