import Søknad, { Søkersituasjon, SøkerRolle } from '../../types/søknad/Søknad';
import {
    SakForEndring,
    FamiliehendelsesType,
    Saksgrunnlag,
    Saksperiode,
    PeriodeResultatType
} from '../../types/søknad/SakForEndring';
import { Barn } from '../../types/søknad/Barn';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Søker } from '../../types/søknad/Søker';
import { Søkerinfo } from '../../types/søkerinfo';
import Person from '../../types/Person';
import { Kjønn } from '../../types/common';
import Sak, { AnnenPart } from 'app/types/søknad/Sak';

const getSøkersituasjonFromSaksgrunnlag = (grunnlag: Saksgrunnlag): Søkersituasjon | undefined => {
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
    grunnlag: Saksgrunnlag
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
    grunnlag: Saksgrunnlag
): Partial<Søker> | undefined => {
    return {
        erAleneOmOmsorg: grunnlag.søkerErFarEllerMedmor
            ? grunnlag.farMedmorErAleneOmOmsorg
            : grunnlag.morErAleneOmOmsorg,
        rolle: getSøkerrolleFromSaksgrunnlag(person, situasjon, grunnlag)
    };
};

const getBarnFromSaksgrunnlag = (situasjon: Søkersituasjon, sak: Saksgrunnlag): Partial<Barn> | undefined => {
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
    sak: Saksgrunnlag,
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

const saksperiodeKanKonverteresTilPeriode = (periode: Saksperiode) => {
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

export const kanUttaksplanGjennskapesFraSak = (perioder: Saksperiode[]): boolean => {
    return perioder.some((periode) => saksperiodeKanKonverteresTilPeriode(periode) === false);
};

export const opprettSøknadFraSakForEndring = (
    søkerinfo: Søkerinfo,
    sakForEndring: SakForEndring,
    sak: Sak
): Partial<Søknad> | undefined => {
    const { grunnlag, uttaksplan } = sakForEndring;
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

    const søknad: Partial<Søknad> = {
        situasjon,
        søker: søker as Søker,
        barn: barn as Barn,
        annenForelder: annenForelder as AnnenForelder,
        erEndringssøknad: true,
        dekningsgrad: grunnlag.dekningsgrad,
        uttaksplan: uttaksplan || []
    };
    return søknad;
};
