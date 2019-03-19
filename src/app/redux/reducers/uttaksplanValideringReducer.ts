import {
    UttaksplanValideringActionTypes,
    UttaksplanValideringActionKeys
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { Periode, Stønadskontouttak } from '../../types/uttaksplan/periodetyper';
import { UttaksplanRegelTestresultat } from '../../regler/uttaksplanValidering/types';

export enum PeriodeValideringErrorKey {
    'PÅKREVD_VERDI_MANGLER' = 'påkrevd',
    'SKJEMA_IKKE_KOMPLETT' = 'skjemaIkkeKomplett',
    'STØNADSKONTO_MANGLER' = 'stønadskontoMangler',
    'UGYLDIG_TIDSPERIODE' = 'ugyldigTidsperiode',
    'UGYLDIG_ÅRSAK_OG_TIDSPERIODE' = 'ugyldigÅrsakOgTidsperiode',
    'UGYLDIG_ÅRSAK_OG_TIDSPERIODE_GAMMEL' = 'ugyldigÅrsakOgTidsperiodeGammel',
    'DATO_IKKE_UTTAKSDAG' = 'datoErIkkeUttaksdag',
    'UGYLDIG_GRADERING_VERDI' = 'ugyldigGraderingVerdi',
    'UGYLDIG_SAMTIDIG_UTTAK_PROSENT' = 'ugyldigSamtidigUttakProsent',
    'UTSETTELSE_FØR_FORELDREPENGER_FØR_FØDSEL' = 'ikkeUtsettelseFørForeldrepengerFørFødsel'
}

export enum PeriodeAdvarselKey {
    'MANGLENDE_VEDLEGG' = 'manglendeVedlegg',
    'SEN_ÅRSAK_OG_TIDSPERIODE' = 'senÅrsakOgTidsperiode'
}

export interface Periodevalidering {
    [periodeId: string]: ValidertPeriode;
}

export interface UttaksplanValideringState {
    regelTestResultat: UttaksplanRegelTestresultat | undefined;
    periodevalidering: Periodevalidering;
    inneholderPerioder: boolean;
    stønadskontoerMedForMyeUttak: Stønadskontouttak[];
    erGyldig: boolean;
    morHarSøktUgyldigUtsettelseFørsteSeksUker: boolean;
    uttaksmengdeForFarMedmorForHøy: boolean;
    uttakErBareOpphold: boolean;
    uttaksplanStarterMedOpphold: boolean;
    uttaksplanSlutterMedOpphold: boolean;
    uttaksplanGraderingStørreEnnSamtidigUttak: boolean;
    begrunnelseForSenEndringErGyldig: boolean;
}

export interface PeriodeValideringsfeil {
    feilKey: PeriodeValideringErrorKey;
}

export interface PeriodeAdvarsel {
    advarselKey: PeriodeAdvarselKey;
}

export interface ValidertPeriode {
    periodeId: string;
    valideringsfeil: PeriodeValideringsfeil[];
    advarsler: PeriodeAdvarsel[];
    overlappendePerioder: Periode[];
}

const getDefaultState = (): UttaksplanValideringState => {
    return {
        regelTestResultat: {
            avvik: [],
            resultat: [],
            resultatPerPeriode: {},
            harFeil: false
        },
        periodevalidering: {},
        inneholderPerioder: false,
        stønadskontoerMedForMyeUttak: [],
        erGyldig: true,
        morHarSøktUgyldigUtsettelseFørsteSeksUker: false,
        uttaksmengdeForFarMedmorForHøy: false,
        uttakErBareOpphold: false,
        uttaksplanStarterMedOpphold: false,
        uttaksplanSlutterMedOpphold: false,
        uttaksplanGraderingStørreEnnSamtidigUttak: false,
        begrunnelseForSenEndringErGyldig: true
    };
};

const periodeneErGyldige = (periodevalidering: Periodevalidering) =>
    Object.keys(periodevalidering).find(
        (key) =>
            periodevalidering[key].overlappendePerioder.length > 0 || periodevalidering[key].valideringsfeil.length > 0
    ) === undefined;

const uttaksplanValideringReducer = (
    state = getDefaultState(),
    action: UttaksplanValideringActionTypes
): UttaksplanValideringState => {
    switch (action.type) {
        case UttaksplanValideringActionKeys.SET_UTTAKSPLAN_VALIDERING:
            const erGyldig =
                periodeneErGyldige(action.validertePerioder) &&
                action.inneholderPerioder &&
                action.stønadskontoerMedForMyeUttak.length === 0 &&
                action.morHarSøktUgyldigUtsettelseFørsteSeksUker === false &&
                action.farHarSøktUgyldigUtsettelseFørsteSeksUker === false &&
                action.uttaksmengdeForFarMedmorForHøy === false &&
                action.uttakErBareOpphold === false &&
                action.uttaksplanStarterMedOpphold === false &&
                action.uttaksplanSlutterMedOpphold === false &&
                action.uttaksplanGraderingStørreEnnSamtidigUttak === false &&
                action.begrunnelseForSenEndringErGyldig === true &&
                action.regelTestresultat !== undefined &&
                action.regelTestresultat.harFeil === false;
            return {
                ...state,
                periodevalidering: action.validertePerioder,
                inneholderPerioder: action.inneholderPerioder,
                stønadskontoerMedForMyeUttak: action.stønadskontoerMedForMyeUttak,
                morHarSøktUgyldigUtsettelseFørsteSeksUker: action.morHarSøktUgyldigUtsettelseFørsteSeksUker,
                erGyldig,
                uttaksmengdeForFarMedmorForHøy: action.uttaksmengdeForFarMedmorForHøy === true,
                uttakErBareOpphold: action.uttakErBareOpphold === true,
                uttaksplanStarterMedOpphold: action.uttaksplanStarterMedOpphold === true,
                uttaksplanSlutterMedOpphold: action.uttaksplanSlutterMedOpphold === true,
                uttaksplanGraderingStørreEnnSamtidigUttak: action.uttaksplanGraderingStørreEnnSamtidigUttak === true,
                begrunnelseForSenEndringErGyldig: action.begrunnelseForSenEndringErGyldig === true,
                regelTestResultat: action.regelTestresultat
            };
    }
    return state;
};

export default uttaksplanValideringReducer;
