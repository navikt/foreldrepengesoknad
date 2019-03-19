import { Regel, Regelgrunnlag, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { regelHarAvvik, regelPasserer } from '../regelUtils';
import { harFarHarSøktUgyldigUttakFørsteSeksUker } from '../../../util/validation/uttaksplan/uttakFarValidation';

export const harFarMedmorSøktUgyldigUttakFørsteSeksUkerRegel: Regel = {
    key: RegelKey.harFarMedmorSøktUgyldigUttakFørsteSeksUker,
    alvorlighet: RegelAlvorlighet.ULOVLIG,
    test: (regel: Regel, grunnlag: Regelgrunnlag) => {
        const {
            søknadsinfo: { søker, søknaden },
            perioder
        } = grunnlag;

        if (søker.erFarEllerMedmor && søknaden.erDeltUttak) {
            return harFarHarSøktUgyldigUttakFørsteSeksUker(
                perioder,
                søknaden.familiehendelsesdato,
                søknaden.antallBarn,
                søknaden.situasjon
            )
                ? regelHarAvvik(regel)
                : regelPasserer(regel);
        }

        return regelPasserer(regel);
    }
};
