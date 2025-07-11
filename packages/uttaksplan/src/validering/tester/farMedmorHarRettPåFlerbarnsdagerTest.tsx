import { Link } from '@navikt/ds-react';

import { Søknadsinfo } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';

import { andreAugust2022ReglerGjelder } from '../../utils/dateUtils';
import {
    getBareFarHarRettAntallUkerPåÅTaUtDagerUtenAktivitetskravFørWLB,
    getBareFarHarRettFlerbarnsdagerUker,
} from '../../utils/minsterettUtils';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';

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
                a: () => (msg: string) => (
                    <Link href={links.aktivitetsfriUttakInfo} rel="noreferrer" target="_blank">
                        {msg}
                    </Link>
                ),
            },
        },
    };
};
