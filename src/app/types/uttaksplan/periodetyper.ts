import { Tidsperiode, Forelder } from 'common/types';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { RecursivePartial } from '../Partial';

export enum Periodetype {
    'Uttak' = 'uttak',
    'Utsettelse' = 'utsettelse',
    'Opphold' = 'opphold',
    'Overføring' = 'overføring'
}

export enum StønadskontoType {
    /** Kvote forbeholdt mor */
    'Mødrekvote' = 'MØDREKVOTE',
    /** Kvote forbehold medforelder */
    'Fedrekvote' = 'FEDREKVOTE',
    /** Felleskvote som kan fordeles mellom mor og medforelder */
    'Fellesperiode' = 'FELLESPERIODE',
    /** Når det kun er en forsørger/forelder */
    'Foreldrepenger' = 'FORELDREPENGER',
    /** Når det kun er en forsørger/forelder */
    'ForeldrepengerFørFødsel' = 'FORELDREPENGER_FØR_FØDSEL',
    /** Når det kun er en forsørger/forelder */
    'SamtidigUttak' = 'SAMTIDIGUTTAK',
    'Flerbarnsuker' = 'FLERBARNSUKER'
}

export enum UtsettelseÅrsakType {
    'Ferie' = 'LOVBESTEMT_FERIE',
    'Arbeid' = 'ARBEID'
}

export enum SelvstendigNæringsdrivendeEllerFrilans {
    'frilans' = 'FRILANS',
    'selvstendignæringsdrivende' = 'SELVSTENDIG_NÆRINGSDRIVENDE'
}

export enum UtsettelseÅrsakSykdomType {
    'Sykdom' = 'SYKDOM',
    'InstitusjonSøker' = 'INSTITUSJONSOPPHOLD_SØKER',
    'InstitusjonBarnet' = 'INSTITUSJONSOPPHOLD_BARNET'
}

export type Utsettelsesårsaker = UtsettelseÅrsakType | UtsettelseÅrsakSykdomType;

export enum OppholdÅrsakType {
    'UttakFellesperiodeAnnenForelder' = 'UTTAK_FELLESP_ANNEN_FORELDER',
    'UttakKvoteAnnenForelder' = 'UTTAK_KVOTE_ANNEN_FORELDER'
}

export enum OverføringÅrsakType {
    'insititusjonsoppholdAnnenForelder' = 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
    'sykdomAnnenForelder' = 'SYKDOM_ANNEN_FORELDER',
    'aleneomsorg' = 'ALENEOMSORG',
    'ikkeRettAnnenForelder' = 'IKKE_RETT_ANNEN_FORELDER'
}

export interface Helligdag {
    dato: Date;
    navn: string;
}

export interface PeriodeBase {
    id?: string;
    type: Periodetype;
    tidsperiode: Tidsperiode;
    vedlegg?: Attachment[];
}

export interface UttaksperiodeBase extends PeriodeBase {
    type: Periodetype.Uttak;
    konto: StønadskontoType;
    forelder: Forelder;
    morsAktivitetIPerioden?: MorsAktivitet;
    ønskerSamtidigUttak: boolean;
    gradert?: boolean;
    stillingsprosent?: string;
    orgnr?: string;
    selvstendigNæringsdrivendeEllerFrilans?: SelvstendigNæringsdrivendeEllerFrilans;
}

export interface ForeldrepengerFørFødselUttaksperiode extends UttaksperiodeBase {
    konto: StønadskontoType.ForeldrepengerFørFødsel;
    skalIkkeHaUttakFørTermin: boolean;
}

export type Uttaksperiode = UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode;

interface UtsettelsesperiodeBase extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: Utsettelsesårsaker;
    forelder: Forelder;
    helligdager?: Helligdag[];
    morsAktivitetIPerioden?: MorsAktivitet;
}

export interface UtsettelsePgaArbeidPeriode extends UtsettelsesperiodeBase {
    årsak: UtsettelseÅrsakType.Arbeid;
    orgnr: string;
    selvstendigNæringsdrivendeEllerFrilans?: SelvstendigNæringsdrivendeEllerFrilans;
}

export interface UtsettelsePgaFerie extends UtsettelsesperiodeBase {
    årsak: UtsettelseÅrsakType.Ferie;
}

export interface UtsettelsePgaSykdom extends UtsettelsesperiodeBase {
    årsak: UtsettelseÅrsakSykdomType.Sykdom;
}
export interface UtsettelsePgaInnleggelseBarnet extends UtsettelsesperiodeBase {
    årsak: UtsettelseÅrsakSykdomType.InstitusjonBarnet;
}
export interface UtsettelsePgaInnleggelseSøker extends UtsettelsesperiodeBase {
    årsak: UtsettelseÅrsakSykdomType.InstitusjonSøker;
}

export type Utsettelsesperiode =
    | UtsettelsePgaArbeidPeriode
    | UtsettelsePgaFerie
    | UtsettelsePgaSykdom
    | UtsettelsePgaInnleggelseSøker
    | UtsettelsePgaInnleggelseBarnet;

export interface Oppholdsperiode extends PeriodeBase {
    type: Periodetype.Opphold;
    årsak: OppholdÅrsakType;
    forelder: Forelder;
}

export interface Overføringsperiode extends PeriodeBase {
    type: Periodetype.Overføring;
    konto: StønadskontoType;
    forelder: Forelder;
    årsak: OverføringÅrsakType;
}

export type Periode = Uttaksperiode | Utsettelsesperiode | Oppholdsperiode | Overføringsperiode;

export interface TilgjengeligStønadskonto {
    konto: StønadskontoType;
    dager: number;
}

export enum MorsAktivitet {
    'Arbeid' = 'ARBEID',
    'Utdanning' = 'UTDANNING',
    'Kvalifiseringsprogrammet' = 'KVALPROG',
    'Introduksjonsprogrammet' = 'INTROPROG',
    'TrengerHjelp' = 'TRENGER_HJELP',
    'Innlagt' = 'INNLAGT',
    'ArbeidOgUtdanning' = 'ARBEID_OG_UTDANNING'
}

export function isForeldrepengerFørFødselUttaksperiode(
    periode: Periode | RecursivePartial<Periode>
): periode is ForeldrepengerFørFødselUttaksperiode {
    return periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
}
