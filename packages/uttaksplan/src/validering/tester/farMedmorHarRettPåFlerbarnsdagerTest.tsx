import {
    andreAugust2022ReglerGjelder,
    getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB,
    getBareFarHarRettFlerbarnsdagerUker,
    links,
} from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';
import { IntlShape } from 'react-intl';

export const farMedmorHarRettPåFlerbarnsdagerTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const tattUtForMangeDagerIPlanen = erUttaksmengdeForFarMedmorForHøyTest(grunnlag).passerer === false;
    if (
        !grunnlag.søkerErFarEllerMedmor ||
        grunnlag.morHarRett ||
        tattUtForMangeDagerIPlanen ||
        (grunnlag.søkerErFarEllerMedmor && grunnlag.søkerErAleneOmOmsorg) ||
        andreAugust2022ReglerGjelder(grunnlag.familiehendelsesdato)
    ) {
        return {
            passerer: true,
        };
    }
    const flerbarnsUker = getBareFarHarRettFlerbarnsdagerUker(
        grunnlag.antallBarn,
        grunnlag.familiehendelsesdato,
        grunnlag.dekningsgrad,
        !grunnlag.morHarRett,
    );
    const bareFarHarRett = grunnlag.søkerErFarEllerMedmor && !grunnlag.morHarRett;
    const antallUkerPåÅTaUtDager = getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB(
        grunnlag.antallBarn,
        grunnlag.familiehendelsesdato,
        grunnlag.dekningsgrad,
        bareFarHarRett,
    );

    return {
        passerer: flerbarnsUker === 0,
        info: {
            intlKey: 'uttaksplan.validering.info.flerbarnsdagerKanBrukes',
            renderAsHtml: true,
            values: {
                antallUker: flerbarnsUker,
                antallUkerÅTaUtFlerbarnsdager: antallUkerPåÅTaUtDager,
                a: (_intl: IntlShape) => (msg: any) => (
                    <a href={links.aktivitetsfriUttakInfo} className="lenke" rel="noreferrer" target="_blank">
                        {msg}
                    </a>
                ),
            },
        },
    };
};
