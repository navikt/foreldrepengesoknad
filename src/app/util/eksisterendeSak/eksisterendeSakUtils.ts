import Søknad, { Søkersituasjon, SøkerRolle } from '../../types/søknad/Søknad';
import {
    EksisterendeUttak,
    FamiliehendelsesType,
    Uttaksgrunnlag,
    EksisterendePeriode,
    PeriodeResultatType
} from '../../types/EksisterendeUttak';
import { Barn } from '../../types/søknad/Barn';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Søker } from '../../types/søknad/Søker';
import { Søkerinfo } from '../../types/søkerinfo';
import Person from '../../types/Person';
import { Kjønn } from '../../types/common';
import Sak, { AnnenPart } from 'app/types/søknad/Sak';
import mapSaksperioderTilUttaksperioder from './mapSaksperioderTilUttaksperioder';

const getSøkersituasjonFromSaksgrunnlag = (grunnlag: Uttaksgrunnlag): Søkersituasjon | undefined => {
    switch (grunnlag.familieHendelseType) {
        case FamiliehendelsesType.TERM:
        case FamiliehendelsesType.FØDSEL:
            return Søkersituasjon.FØDSEL;
        case FamiliehendelsesType.ADOPSJON:
        case FamiliehendelsesType.OMSORGSOVERTAKELSE:
            return undefined;
    }
};

const getSøkerrolleFromSaksgrunnlag = (
    person: Person,
    situasjon: Søkersituasjon,
    grunnlag: Uttaksgrunnlag
): SøkerRolle | undefined => {
    const { søkerErFarEllerMedmor } = grunnlag;
    const søkerErKvinne = person.kjønn === Kjønn.KVINNE;
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
            if (søkerErKvinne) {
                return søkerErFarEllerMedmor ? SøkerRolle.MEDMOR : SøkerRolle.MOR;
            }
            return SøkerRolle.FAR;
    }
    return undefined;
};

const getSøkerFromSaksgrunnlag = (
    person: Person,
    situasjon: Søkersituasjon,
    grunnlag: Uttaksgrunnlag
): Partial<Søker> | undefined => {
    return {
        erAleneOmOmsorg: grunnlag.søkerErFarEllerMedmor
            ? grunnlag.farMedmorErAleneOmOmsorg
            : grunnlag.morErAleneOmOmsorg,
        rolle: getSøkerrolleFromSaksgrunnlag(person, situasjon, grunnlag)
    };
};

const getBarnFromSaksgrunnlag = (situasjon: Søkersituasjon, sak: Uttaksgrunnlag): Partial<Barn> | undefined => {
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
            return {
                antallBarn: sak.antallBarn,
                erBarnetFødt: sak.erBarnetFødt,
                ...(sak.erBarnetFødt
                    ? {
                          fødselsdatoer: [sak.familieHendelseDato]
                      }
                    : {
                          termindato: sak.familieHendelseDato
                      })
            };
    }
    return undefined;
};

const getAnnenForelderFromSaksgrunnlag = (
    situasjon: Søkersituasjon,
    sak: Uttaksgrunnlag,
    annenPart?: AnnenPart
): Partial<AnnenForelder> | undefined => {
    const { søkerErFarEllerMedmor } = sak;
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
            if (søkerErFarEllerMedmor) {
                return {
                    fornavn: annenPart ? annenPart.navn.fornavn : 'mor',
                    etternavn: annenPart ? annenPart.navn.etternavn : '',
                    erUfør: sak.morErUfør,
                    harRettPåForeldrepenger: sak.morHarRett,
                    fnr: annenPart ? annenPart.fnr : undefined,
                    kanIkkeOppgis: annenPart === undefined
                };
            }
            return {
                fornavn: annenPart ? annenPart.navn.fornavn : 'Far eller medmor',
                etternavn: annenPart ? annenPart.navn.etternavn : '',
                harRettPåForeldrepenger: sak.farMedmorHarRett,
                fnr: annenPart ? annenPart.fnr : undefined,
                kanIkkeOppgis: annenPart === undefined
            };
    }
    return undefined;
};

const saksperiodeKanKonverteresTilPeriode = (periode: EksisterendePeriode) => {
    if (
        periode.arbeidstidprosent === 0 &&
        periode.flerbarnsdager === false &&
        periode.gjelderAnnenPart === false &&
        periode.periodeResultatType === PeriodeResultatType.INNVILGET &&
        periode.samtidigUttak === false
    ) {
        return true;
    }
    return false;
};

export const kanUttaksplanGjennskapesFraSak = (perioder: EksisterendePeriode[]): boolean => {
    const noenPerioderKanIkkeGjennskapes = perioder.some(
        (periode) => saksperiodeKanKonverteresTilPeriode(periode) === false
    );
    return noenPerioderKanIkkeGjennskapes === false;
};

export const opprettSøknadFraEksisterendeUttak = (
    søkerinfo: Søkerinfo,
    eksisterendeUttak: EksisterendeUttak,
    sak: Sak,
    stateSøknad: Søknad
): Partial<Søknad> | undefined => {
    const { grunnlag, uttak: eksisterendePerioder } = eksisterendeUttak;
    const situasjon = getSøkersituasjonFromSaksgrunnlag(grunnlag);

    if (!situasjon) {
        return undefined;
    }

    const søker = getSøkerFromSaksgrunnlag(søkerinfo.person, situasjon, grunnlag);
    const barn = getBarnFromSaksgrunnlag(situasjon, grunnlag);
    const annenForelder = getAnnenForelderFromSaksgrunnlag(situasjon, grunnlag, sak.annenPart);

    if (!søker || !barn || !annenForelder) {
        return undefined;
    }

    const uttaksplan = kanUttaksplanGjennskapesFraSak(eksisterendePerioder)
        ? mapSaksperioderTilUttaksperioder(eksisterendePerioder, grunnlag)
        : undefined;

    const søknad: Partial<Søknad> = {
        saksnummer: sak.saksnummer,
        erEndringssøknad: true,
        situasjon,
        søker: søker as Søker,
        barn: barn as Barn,
        annenForelder: annenForelder as AnnenForelder,
        dekningsgrad: grunnlag.dekningsgrad,
        ekstrainfo: {
            ...stateSøknad.ekstrainfo,
            eksisterendeSak: {
                sak,
                uttak: eksisterendeUttak,
                uttaksplan,
                grunnlagErDefinert: true
            }
        },
        uttaksplan: uttaksplan || []
    };
    return søknad;
};
