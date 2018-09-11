import VisibilityFunction from '../../../../types/dom/Visibility';
import { RecursivePartial } from '../../../../types/Partial';
import { UtsettelsePgaArbeid, Uttaksperiode } from '../../../../types/uttaksplan/periodetyper';
import { isStillingsprosentAbove0AndLessThan100 } from '../../../../util/validation/fields/stillingsprosent';
import Søknad from '../../../../types/søknad/Søknad';

type PeriodePartial = RecursivePartial<UtsettelsePgaArbeid> | RecursivePartial<Uttaksperiode>;

const hvilkenKvoteSkalBenyttesSynlig: VisibilityFunction<PeriodePartial> = (periode: PeriodePartial) => {
    const { stillingsprosent } = periode as UtsettelsePgaArbeid;
    return stillingsprosent !== undefined && isStillingsprosentAbove0AndLessThan100(stillingsprosent) === true;
};

const skalDereHaGradertUttakSamtidigSynlig = (periode: PeriodePartial, søknad: Søknad) => {
    const { stillingsprosent } = periode as UtsettelsePgaArbeid;
    const { konto } = periode as Uttaksperiode;
    const { søker, annenForelder } = søknad;
    const { erAleneOmOmsorg } = søker;
    const { harRettPåForeldrepenger, skalHaForeldrepenger } = annenForelder;

    if (hvilkenKvoteSkalBenyttesSynlig(periode)) {
        return konto !== undefined;
    }
    if (stillingsprosent !== undefined) {
        return !erAleneOmOmsorg && skalHaForeldrepenger && harRettPåForeldrepenger;
    }
    return false;
};

export default {
    hvilkenKvoteSkalBenyttes: hvilkenKvoteSkalBenyttesSynlig,
    skalDereHaGradertUttakSamtidig: skalDereHaGradertUttakSamtidigSynlig
};
