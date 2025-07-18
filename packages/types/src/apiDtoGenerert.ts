// This file is auto-generated by @hey-api/openapi-ts

export type YtelseMellomlagringType = 'FORELDREPENGER' | 'SVANGERSKAPSPENGER' | 'ENGANGSSTONAD';

export type AnnenInntektDto = {
    type: AnnenOpptjeningType;
    fom: string;
    tom?: string;
    land?: CountryCode;
    arbeidsgiverNavn?: string;
};

export type AnnenOpptjeningType =
    | 'ETTERLØNN_SLUTTPAKKE'
    | 'ETTERLØNN_ARBEIDSGIVER'
    | 'JOBB_I_UTLANDET'
    | 'LØNN_UNDER_UTDANNING'
    | 'MILITÆR_ELLER_SIVILTJENESTE'
    | 'SLUTTPAKKE'
    | 'VENTELØNN_VARTPENGER'
    | 'VENTELØNN'
    | 'VARTPENGER';

export type ArbeidsforholdDto = {
    type: string;
};

export type AvtaltFerieDto = {
    arbeidsforhold: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    fom: string;
    tom: string;
    arbeidsforholdVirksomhet?: boolean;
};

export type BarnSvpDto = {
    termindato: string;
    fødselsdato?: string;
};

export type BrukerRolle = 'MOR' | 'FAR' | 'MEDMOR' | 'IKKE_RELEVANT';

export type CountryCode =
    | 'UNDEFINED'
    | 'AC'
    | 'AD'
    | 'AE'
    | 'AF'
    | 'AG'
    | 'AI'
    | 'AL'
    | 'AM'
    | 'AN'
    | 'AO'
    | 'AQ'
    | 'AR'
    | 'AS'
    | 'AT'
    | 'AU'
    | 'AW'
    | 'AX'
    | 'AZ'
    | 'BA'
    | 'BB'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BH'
    | 'BI'
    | 'BJ'
    | 'BL'
    | 'BM'
    | 'BN'
    | 'BO'
    | 'BQ'
    | 'BR'
    | 'BS'
    | 'BT'
    | 'BU'
    | 'BV'
    | 'BW'
    | 'BY'
    | 'BZ'
    | 'CA'
    | 'CC'
    | 'CD'
    | 'CF'
    | 'CG'
    | 'CH'
    | 'CI'
    | 'CK'
    | 'CL'
    | 'CM'
    | 'CN'
    | 'CO'
    | 'CP'
    | 'CR'
    | 'CS'
    | 'CU'
    | 'CV'
    | 'CW'
    | 'CX'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DG'
    | 'DJ'
    | 'DK'
    | 'DM'
    | 'DO'
    | 'DZ'
    | 'EA'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'EH'
    | 'ER'
    | 'ES'
    | 'ET'
    | 'EU'
    | 'EZ'
    | 'FI'
    | 'FJ'
    | 'FK'
    | 'FM'
    | 'FO'
    | 'FR'
    | 'FX'
    | 'GA'
    | 'GB'
    | 'GD'
    | 'GE'
    | 'GF'
    | 'GG'
    | 'GH'
    | 'GI'
    | 'GL'
    | 'GM'
    | 'GN'
    | 'GP'
    | 'GQ'
    | 'GR'
    | 'GS'
    | 'GT'
    | 'GU'
    | 'GW'
    | 'GY'
    | 'HK'
    | 'HM'
    | 'HN'
    | 'HR'
    | 'HT'
    | 'HU'
    | 'IC'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IM'
    | 'IN'
    | 'IO'
    | 'IQ'
    | 'IR'
    | 'IS'
    | 'IT'
    | 'JE'
    | 'JM'
    | 'JO'
    | 'JP'
    | 'KE'
    | 'KG'
    | 'KH'
    | 'KI'
    | 'KM'
    | 'KN'
    | 'KP'
    | 'KR'
    | 'KW'
    | 'KY'
    | 'KZ'
    | 'LA'
    | 'LB'
    | 'LC'
    | 'LI'
    | 'LK'
    | 'LR'
    | 'LS'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'LY'
    | 'MA'
    | 'MC'
    | 'MD'
    | 'ME'
    | 'MF'
    | 'MG'
    | 'MH'
    | 'MK'
    | 'ML'
    | 'MM'
    | 'MN'
    | 'MO'
    | 'MP'
    | 'MQ'
    | 'MR'
    | 'MS'
    | 'MT'
    | 'MU'
    | 'MV'
    | 'MW'
    | 'MX'
    | 'MY'
    | 'MZ'
    | 'NA'
    | 'NC'
    | 'NE'
    | 'NF'
    | 'NG'
    | 'NI'
    | 'NL'
    | 'NO'
    | 'NP'
    | 'NR'
    | 'NT'
    | 'NU'
    | 'NZ'
    | 'OM'
    | 'PA'
    | 'PE'
    | 'PF'
    | 'PG'
    | 'PH'
    | 'PK'
    | 'PL'
    | 'PM'
    | 'PN'
    | 'PR'
    | 'PS'
    | 'PT'
    | 'PW'
    | 'PY'
    | 'QA'
    | 'RE'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'RW'
    | 'SA'
    | 'SB'
    | 'SC'
    | 'SD'
    | 'SE'
    | 'SF'
    | 'SG'
    | 'SH'
    | 'SI'
    | 'SJ'
    | 'SK'
    | 'SL'
    | 'SM'
    | 'SN'
    | 'SO'
    | 'SR'
    | 'SS'
    | 'ST'
    | 'SU'
    | 'SV'
    | 'SX'
    | 'SY'
    | 'SZ'
    | 'TA'
    | 'TC'
    | 'TD'
    | 'TF'
    | 'TG'
    | 'TH'
    | 'TJ'
    | 'TK'
    | 'TL'
    | 'TM'
    | 'TN'
    | 'TO'
    | 'TP'
    | 'TR'
    | 'TT'
    | 'TV'
    | 'TW'
    | 'TZ'
    | 'UA'
    | 'UG'
    | 'UK'
    | 'UM'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VA'
    | 'VC'
    | 'VE'
    | 'VG'
    | 'VI'
    | 'VN'
    | 'VU'
    | 'WF'
    | 'WS'
    | 'XI'
    | 'XU'
    | 'XK'
    | 'YE'
    | 'YT'
    | 'YU'
    | 'ZA'
    | 'ZM'
    | 'ZR'
    | 'ZW';

export type Del = TilretteleggingDto & {
    type: 'Del';
} & {
    fom: string;
    stillingsprosent: number;
};

export type DokumentType =
    | 'I000001'
    | 'I000002'
    | 'I000003'
    | 'I000004'
    | 'I000005'
    | 'I000006'
    | 'I000050'
    | 'I000027'
    | 'I500027'
    | 'I000114'
    | 'I000119'
    | 'I000067'
    | 'I000007'
    | 'I000023'
    | 'I000026'
    | 'I000032'
    | 'I000036'
    | 'I000037'
    | 'I000038'
    | 'I000039'
    | 'I000041'
    | 'I000042'
    | 'I000043'
    | 'I000044'
    | 'I000045'
    | 'I000047'
    | 'I000049'
    | 'I000051'
    | 'I000060'
    | 'I000061'
    | 'I000062'
    | 'I000063'
    | 'I000064'
    | 'I000065'
    | 'I000066'
    | 'I000107'
    | 'I000108'
    | 'I000109'
    | 'I000110'
    | 'I000111'
    | 'I000112'
    | 'I000116'
    | 'I000117'
    | 'I000118'
    | 'I000120'
    | 'I000121'
    | 'I000122'
    | 'I000123'
    | 'I000124'
    | 'I000130'
    | 'I000131'
    | 'I000132'
    | 'I000133'
    | 'I000140'
    | 'I000141'
    | 'I000143'
    | 'I000144'
    | 'I000145'
    | 'I000146'
    | 'I500001'
    | 'I500002'
    | 'I500003'
    | 'I500004'
    | 'I500005'
    | 'I500006'
    | 'I500050';

export type Dokumenterer = {
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
};

export type DokumentererType = 'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING';

export type FrilansDto = {
    jobberFremdelesSomFrilans?: boolean;
    oppstart: string;
};

export type FrilanserDto = ArbeidsforholdDto & {
    type: 'FrilanserDto';
};

export type Hel = TilretteleggingDto & {
    type: 'Hel';
} & {
    fom: string;
};

export type Ingen = TilretteleggingDto & {
    type: 'Ingen';
} & {
    fom: string;
};

export type Målform = 'NB' | 'NN' | 'EN' | 'E';

export type NæringDto = {
    fom: string;
    tom?: string;
    næringstype: Virksomhetstype;
    navnPåNæringen?: string;
    organisasjonsnummer?: string;
    næringsinntekt?: number;
    registrertINorge: boolean;
    registrertILand?: CountryCode;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    varigEndringDato?: string;
    varigEndringInntektEtterEndring?: number;
    varigEndringBeskrivelse?: string;
    varigEndringGyldig?: boolean;
};

export type PrivatArbeidsgiverDto = ArbeidsforholdDto & {
    type: 'PrivatArbeidsgiverDto';
} & {
    id: string;
};

export type SelvstendigNæringsdrivendeDto = ArbeidsforholdDto & {
    type: 'SelvstendigNæringsdrivendeDto';
};

export type SvangerskapspengesøknadDto = {
    mottattdato?: string;
    barn: BarnSvpDto;
    rolle?: BrukerRolle;
    språkkode: Målform;
    frilans?: FrilansDto;
    egenNæring?: NæringDto;
    andreInntekterSiste10Mnd?: AnnenInntektDto[];
    utenlandsopphold?: UtenlandsoppholdsperiodeDto[];
    tilretteleggingsbehov: TilretteleggingbehovDto[];
    avtaltFerie: AvtaltFerieDto[];
    vedlegg: VedleggDto[];
};

export type TilretteleggingDto = {
    type: string;
};

export type TilretteleggingbehovDto = {
    arbeidsforhold: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    behovForTilretteleggingFom: string;
    risikofaktorer?: string;
    tilretteleggingstiltak?: string;
    tilrettelegginger?: Array<Del | Hel | Ingen>;
    risikofaktorerOgTilretteleggingtiltakSattForNæringFrilans?: boolean;
};

export type UtenlandsoppholdsperiodeDto = {
    fom: string;
    tom: string;
    landkode: CountryCode;
    fomAfterTom?: boolean;
};

export type VedleggDto = {
    uuid?: string;
    skjemanummer: DokumentType;
    innsendingsType?: VedleggInnsendingType;
    beskrivelse?: string;
    dokumenterer?: Dokumenterer;
};

export type VedleggInnsendingType = 'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK';

export type VirksomhetDto = ArbeidsforholdDto & {
    type: 'VirksomhetDto';
} & {
    id: string;
};

export type Virksomhetstype = 'ANNEN' | 'JORDBRUK_SKOGBRUK' | 'FISKE' | 'DAGMAMMA';

export type ÅpenPeriodeDto = {
    fom: string;
    tom?: string;
};

export type Kvittering = {
    mottattDato?: string;
    saksNr?: string;
    pdf?: string;
};

export type AdopsjonDto = BarnDto & {
    type: 'adopsjon';
} & {
    antallBarn?: number;
    fødselsdatoer?: string[];
    adopsjonsdato: string;
    ankomstdato?: string;
    adopsjonAvEktefellesBarn: boolean;
    søkerAdopsjonAlene?: boolean;
};

export type AnnenForelderDto = {
    type: string;
};

export type BarnDto = {
    type: string;
};

export type Dekningsgrad = '80' | '100';

export type ForeldrepengesøknadDto = {
    mottattdato?: string;
    rolle?: BrukerRolle;
    språkkode?: Målform;
    frilans?: FrilansDto;
    egenNæring?: NæringDto;
    andreInntekterSiste10Mnd?: AnnenInntektDto[];
    barn: AdopsjonDto | FødselDto | OmsorgsovertakelseDto | TerminDto;
    annenForelder?: NorskForelderDto | UtenlandskForelderDto;
    dekningsgrad: Dekningsgrad;
    uttaksplan: UttaksplanDto;
    utenlandsopphold?: UtenlandsoppholdsperiodeDto[];
    vedlegg?: VedleggDto[];
};

export type FødselDto = BarnDto & {
    type: 'fødsel';
} & {
    antallBarn?: number;
    fødselsdato: string;
    termindato?: string;
};

export type GraderingDto = {
    stillingsprosent: number;
    erArbeidstaker?: boolean;
    erFrilanser?: boolean;
    erSelvstendig?: boolean;
    orgnumre?: string[];
};

export type KontoType = 'FELLESPERIODE' | 'MØDREKVOTE' | 'FEDREKVOTE' | 'FORELDREPENGER' | 'FORELDREPENGER_FØR_FØDSEL';

export type MorsAktivitet =
    | 'ARBEID'
    | 'UTDANNING'
    | 'KVALPROG'
    | 'INTROPROG'
    | 'TRENGER_HJELP'
    | 'INNLAGT'
    | 'ARBEID_OG_UTDANNING'
    | 'UFØRE'
    | 'IKKE_OPPGITT';

export type NorskForelderDto = AnnenForelderDto & {
    type: 'norsk';
} & {
    fnr: string;
    fornavn: string;
    etternavn: string;
    rettigheter: Rettigheter;
};

export type OmsorgsovertakelseDto = BarnDto & {
    type: 'omsorgsovertakelse';
} & {
    antallBarn?: number;
    fødselsdatoer?: string[];
    foreldreansvarsdato: string;
};

export type OppholdsPeriodeDto = Uttaksplanperiode & {
    type: 'opphold';
} & {
    fom: string;
    tom: string;
    årsak: Oppholdsårsak;
};

export type Oppholdsårsak =
    | 'INGEN'
    | 'UTTAK_MØDREKVOTE_ANNEN_FORELDER'
    | 'UTTAK_FEDREKVOTE_ANNEN_FORELDER'
    | 'UTTAK_FORELDREPENGER_ANNEN_FORELDER'
    | 'UTTAK_FELLESP_ANNEN_FORELDER';

export type OverføringsPeriodeDto = Uttaksplanperiode & {
    type: 'overføring';
} & {
    fom: string;
    tom: string;
    årsak: Overføringsårsak;
    konto: KontoType;
};

export type Overføringsårsak =
    | 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
    | 'SYKDOM_ANNEN_FORELDER'
    | 'ALENEOMSORG'
    | 'IKKE_RETT_ANNEN_FORELDER';

export type Rettigheter = {
    harRettPåForeldrepenger: boolean;
    erInformertOmSøknaden?: boolean;
    erAleneOmOmsorg?: boolean;
    harMorUføretrygd?: boolean;
    harAnnenForelderOppholdtSegIEØS?: boolean;
    harAnnenForelderTilsvarendeRettEØS?: boolean;
};

export type TerminDto = BarnDto & {
    type: 'termin';
} & {
    antallBarn?: number;
    termindato: string;
    terminbekreftelseDato?: string;
};

export type UtenlandskForelderDto = AnnenForelderDto & {
    type: 'utenlandsk';
} & {
    fnr: string;
    fornavn: string;
    etternavn: string;
    bostedsland: CountryCode;
    rettigheter: Rettigheter;
};

export type UtsettelsesPeriodeDto = Uttaksplanperiode & {
    type: 'utsettelse';
} & {
    fom: string;
    tom: string;
    årsak: UtsettelsesÅrsak;
    morsAktivitetIPerioden?: MorsAktivitet;
    erArbeidstaker?: boolean;
};

export type UtsettelsesÅrsak =
    | 'ARBEID'
    | 'LOVBESTEMT_FERIE'
    | 'SYKDOM'
    | 'FRI'
    | 'INSTITUSJONSOPPHOLD_SØKER'
    | 'INSTITUSJONSOPPHOLD_BARNET'
    | 'HV_OVELSE'
    | 'NAV_TILTAK';

export type UttaksPeriodeDto = Uttaksplanperiode & {
    type: 'uttak';
} & {
    fom: string;
    tom: string;
    konto: KontoType;
    morsAktivitetIPerioden?: MorsAktivitet;
    ønskerSamtidigUttak?: boolean;
    ønskerFlerbarnsdager?: boolean;
    samtidigUttakProsent?: number;
    gradering?: GraderingDto;
};

export type UttaksplanDto = {
    ønskerJustertUttakVedFødsel?: boolean;
    uttaksperioder: Array<OppholdsPeriodeDto | OverføringsPeriodeDto | UtsettelsesPeriodeDto | UttaksPeriodeDto>;
};

export type Uttaksplanperiode = {
    type: string;
};

export type EndringssøknadForeldrepengerDto = {
    mottattdato?: string;
    rolle?: BrukerRolle;
    språkkode?: Målform;
    barn: AdopsjonDto | FødselDto | OmsorgsovertakelseDto | TerminDto;
    annenForelder?: NorskForelderDto | UtenlandskForelderDto;
    uttaksplan: UttaksplanDto;
    saksnummer: string;
    vedlegg?: VedleggDto[];
};

export type BrukerTekstDto = {
    dokumentType: DokumentType;
    tekst?: string;
    overskrift?: string;
};

export type EttersendelseDto = {
    mottattdato?: string;
    type: YtelseType;
    saksnummer: string;
    brukerTekst?: BrukerTekstDto;
    dialogId?: string;
    vedlegg: VedleggDto[];
};

export type YtelseType = 'FORELDREPENGER' | 'SVANGERSKAPSPENGER' | 'ENGANGSSTØNAD';

export type EngangsstønadDto = {
    mottattdato?: string;
    språkkode: Målform;
    rolle?: BrukerRolle;
    barn: AdopsjonDto | FødselDto | OmsorgsovertakelseDto | TerminDto;
    utenlandsopphold?: UtenlandsoppholdsperiodeDto[];
    vedlegg?: VedleggDto[];
};

export type Brukerrolle = 'MOR' | 'FAR' | 'MEDMOR' | 'UKJENT';

export type KontoBeregningGrunnlagDto = {
    rettighetstype: Rettighetstype;
    brukerrolle: Brukerrolle;
    antallBarn: number;
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelseDato?: string;
    morHarUføretrygd?: boolean;
    familieHendelseDatoNesteSak?: string;
};

export type Rettighetstype = 'ALENEOMSORG' | 'BARE_SØKER_RETT' | 'BEGGE_RETT';

export type KontoBeregningDto = {
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
};

export type KontoDto = {
    konto: KontoTypeUttak;
    dager: number;
};

export type KontoTypeUttak =
    | 'MØDREKVOTE'
    | 'FEDREKVOTE'
    | 'FELLESPERIODE'
    | 'FORELDREPENGER'
    | 'FORELDREPENGER_FØR_FØDSEL'
    | 'AKTIVITETSFRI_KVOTE';

export type Minsteretter = {
    farRundtFødsel: number;
    toTette: number;
};

export type Tillegg = {
    flerbarn: number;
    prematur: number;
};

export type MorArbeidRequestDto = {
    annenPartFødselsnummer: string;
    barnFødselsnummer?: string;
    familiehendelse?: string;
    perioder?: Periode[];
};

export type Periode = {
    fom: string;
    tom: string;
    periodeType?: PeriodeMedAktivitetskravType;
};

export type PeriodeMedAktivitetskravType = 'UTTAK' | 'UTSETTELSE';

export type AnnenPartSakIdentifikator = {
    annenPartFødselsnummer?: string;
    barnFødselsnummer?: string;
    familiehendelse?: string;
};

export type Aktivitet = {
    type: AktivitetType;
    arbeidsgiver?: Arbeidsgiver;
    arbeidsgiverNavn?: string;
};

export type AktivitetType = 'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET';

export type AnnenPartSak = {
    perioder: UttakPeriode[];
    termindato?: string;
    dekningsgrad: DekningsgradSak;
    antallBarn: number;
};

export type Arbeidsgiver = {
    id?: string;
    type?: ArbeidsgiverType;
};

export type ArbeidsgiverType = 'PRIVAT' | 'ORGANISASJON';

export type BrukerRolleSak = 'MOR' | 'FAR_MEDMOR';

export type DekningsgradSak = 'ÅTTI' | 'HUNDRE';

export type Gradering = {
    arbeidstidprosent: number;
    aktivitet: Aktivitet;
};

export type UttakOppholdÅrsak =
    | 'MØDREKVOTE_ANNEN_FORELDER'
    | 'FEDREKVOTE_ANNEN_FORELDER'
    | 'FELLESPERIODE_ANNEN_FORELDER'
    | 'FORELDREPENGER_ANNEN_FORELDER';

export type UttakOverføringÅrsak =
    | 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER'
    | 'SYKDOM_ANNEN_FORELDER'
    | 'IKKE_RETT_ANNEN_FORELDER'
    | 'ALENEOMSORG';

export type UttakPeriode = {
    fom: string;
    tom: string;
    kontoType?: KontoType;
    resultat?: UttakPeriodeResultat;
    utsettelseÅrsak?: UttakUtsettelseÅrsak;
    oppholdÅrsak?: UttakOppholdÅrsak;
    overføringÅrsak?: UttakOverføringÅrsak;
    gradering?: Gradering;
    morsAktivitet?: MorsAktivitet;
    samtidigUttak?: number;
    flerbarnsdager?: boolean;
    forelder?: BrukerRolleSak;
};

export type UttakPeriodeResultat = {
    innvilget?: boolean;
    trekkerMinsterett?: boolean;
    trekkerDager?: boolean;
    årsak?: UttakPeriodeResultatÅrsak;
};

export type UttakPeriodeResultatÅrsak =
    | 'ANNET'
    | 'AVSLAG_HULL_MELLOM_FORELDRENES_PERIODER'
    | 'AVSLAG_FRATREKK_PLEIEPENGER'
    | 'AVSLAG_UTSETTELSE_TILBAKE_I_TID'
    | 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID';

export type UttakUtsettelseÅrsak =
    | 'HV_ØVELSE'
    | 'ARBEID'
    | 'LOVBESTEMT_FERIE'
    | 'SØKER_SYKDOM'
    | 'SØKER_INNLAGT'
    | 'BARN_INNLAGT'
    | 'NAV_TILTAK'
    | 'FRI';

export type AktivMellomlagringDto = {
    engangsstonad: boolean;
    foreldrepenger: boolean;
    svangerskapspenger: boolean;
};

export type AnnenForelderFrontend = {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
};

export type Arbeidsforhold = {
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
};

export type Bankkonto = {
    kontonummer?: string;
    banknavn?: string;
};

export type BarnFrontend = {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
};

export type Kjønn = 'M' | 'K' | 'U';

export type PersonFrontend = {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: string;
    bankkonto?: Bankkonto;
    barn: BarnFrontend[];
    sivilstand?: Sivilstand;
};

export type Sivilstand = {
    type?: SivilstandType;
};

export type SivilstandType =
    | 'UOPPGITT'
    | 'UGIFT'
    | 'GIFT'
    | 'ENKE_ELLER_ENKEMANN'
    | 'SKILT'
    | 'SEPARERT'
    | 'REGISTRERT_PARTNER'
    | 'SEPARERT_PARTNER'
    | 'SKILT_PARTNER'
    | 'GJENLEVENDE_PARTNER';

export type Søkerinfo = {
    søker: PersonFrontend;
    arbeidsforhold: Arbeidsforhold[];
};

export type MinidialogInnslag = {
    saksnr: string;
    opprettet: string;
    dialogId: string;
    frist?: string;
};

export type AvslagÅrsak =
    | 'ARBEIDSGIVER_KAN_TILRETTELEGGE'
    | 'SØKER_ER_INNVILGET_SYKEPENGER'
    | 'MANGLENDE_DOKUMENTASJON'
    | 'ANNET';

export type AvslutningÅrsak =
    | 'NORMAL'
    | 'TILBAKE_I_HEL_STILLING'
    | 'AVSLAG_OVERGANG_FORELDREPENGER'
    | 'AVSLAG_FØDSEL'
    | 'AVSLAG_TIDSPERIODE_FØR_TERMIN'
    | 'AVSLAG_ANNET'
    | 'AVSLAG_INNGANGSVILKÅR';

export type BehandlingTilstand =
    | 'UNDER_BEHANDLING'
    | 'VENT_TIDLIG_SØKNAD'
    | 'VENT_MELDEKORT'
    | 'VENT_DOKUMENTASJON'
    | 'VENT_INNTEKTSMELDING';

export type EsSak = {
    saksnummer: string;
    familiehendelse: Familiehendelse;
    sakAvsluttet?: boolean;
    åpenBehandling?: EsÅpenBehandling;
    gjelderAdopsjon?: boolean;
    oppdatertTidspunkt: string;
};

export type EsÅpenBehandling = {
    tilstand: BehandlingTilstand;
};

export type Familiehendelse = {
    fødselsdato?: string;
    termindato?: string;
    antallBarn: number;
    omsorgsovertakelse?: string;
};

export type FpSak = {
    saksnummer: string;
    sakAvsluttet: boolean;
    kanSøkeOmEndring: boolean;
    sakTilhørerMor: boolean;
    gjelderAdopsjon: boolean;
    morUføretrygd: boolean;
    harAnnenForelderTilsvarendeRettEØS?: boolean;
    ønskerJustertUttakVedFødsel?: boolean;
    rettighetType: RettighetType;
    annenPart?: Person;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak?: FpVedtak;
    åpenBehandling?: FpÅpenBehandling;
    barn?: Person[];
    dekningsgrad?: DekningsgradSak;
    oppdatertTidspunkt: string;
    forelder?: BrukerRolleSak;
};

export type FpVedtak = {
    perioder: UttakPeriode[];
};

export type FpÅpenBehandling = {
    tilstand: BehandlingTilstand;
    søknadsperioder: UttakPeriode[];
};

export type OppholdKilde = 'SAKSBEHANDLER' | 'INNTEKTSMELDING' | 'SØKNAD';

export type OppholdPeriode = {
    fom: string;
    tom: string;
    årsak: OppholdÅrsak;
    oppholdKilde: OppholdKilde;
};

export type OppholdÅrsak = 'SYKEPENGER' | 'FERIE';

export type PeriodeResultat = {
    resultatType?: ResultatType;
    utbetalingsgrad?: number;
};

export type Person = {
    fnr?: string;
    aktørId?: string;
};

export type ResultatType = 'INNVILGET' | 'AVSLAG_SØKNADSFRIST' | 'AVSLAG_ANNET';

export type RettighetType = 'ALENEOMSORG' | 'BEGGE_RETT' | 'BARE_SØKER_RETT';

export type Saker = {
    foreldrepenger: FpSak[];
    engangsstønad: EsSak[];
    svangerskapspenger: SvpSak[];
};

export type SvpArbeidsforhold = {
    aktivitet: Aktivitet;
    behovFrom?: string;
    risikofaktorer?: string;
    tiltak?: string;
    tilrettelegginger: Tilrettelegging[];
    oppholdsperioder: OppholdPeriode[];
    avslutningÅrsak?: AvslutningÅrsak;
};

export type SvpSak = {
    saksnummer: string;
    familiehendelse: Familiehendelse;
    sakAvsluttet: boolean;
    åpenBehandling?: SvpÅpenBehandling;
    gjeldendeVedtak?: Vedtak;
    oppdatertTidspunkt: string;
};

export type SvpÅpenBehandling = {
    tilstand: BehandlingTilstand;
    søknad: Søknad;
};

export type Søknad = {
    arbeidsforhold: SvpArbeidsforhold[];
};

export type Tilrettelegging = {
    fom: string;
    tom: string;
    type?: TilretteleggingType;
    arbeidstidprosent?: number;
    resultat?: PeriodeResultat;
};

export type TilretteleggingType = 'HEL' | 'DELVIS' | 'INGEN';

export type Vedtak = {
    arbeidsforhold: SvpArbeidsforhold[];
    avslagÅrsak?: AvslagÅrsak;
};

export type AktørType = 'BRUKER' | 'NAV' | 'ARBEIDSGIVER';

export type Dokument = {
    journalpostId: string;
    dokumentId: string;
    tittel: string;
};

export type TidslinjeHendelseDto = {
    opprettet: string;
    aktørType: AktørType;
    tidslinjeHendelseType: TidslinjeHendelseType;
    dokumenter: Dokument[];
};

export type TidslinjeHendelseType =
    | 'FØRSTEGANGSSØKNAD'
    | 'FØRSTEGANGSSØKNAD_NY'
    | 'ETTERSENDING'
    | 'ENDRINGSSØKNAD'
    | 'INNTEKTSMELDING'
    | 'VEDTAK'
    | 'UTGÅENDE_INNHENT_OPPLYSNINGER'
    | 'UTGÅENDE_ETTERLYS_INNTEKTSMELDING'
    | 'FORELDREPENGER_FEIL_PRAKSIS_UTSETTELSE_INFOBREV'
    | 'UTGÅENDE_VARSEL_TILBAKEBETALING';

export type BortfaltNaturalytelse = {
    fomDato?: string;
    tomDato?: string;
    beløpPerMnd?: number;
    type?: NaturalytelseType;
};

export type FpOversiktInntektsmeldingDto = {
    versjon?: number;
    erAktiv?: boolean;
    stillingsprosent?: number;
    inntektPrMnd?: number;
    refusjonPrMnd?: number;
    arbeidsgiverNavn?: string;
    arbeidsgiverIdent?: string;
    journalpostId?: string;
    mottattTidspunkt?: string;
    startDatoPermisjon?: string;
    bortfalteNaturalytelser?: BortfaltNaturalytelse[];
    refusjonsperioder?: Refusjon[];
};

export type NaturalytelseType =
    | 'ELEKTRISK_KOMMUNIKASJON'
    | 'AKSJER_GRUNNFONDSBEVIS_TIL_UNDERKURS'
    | 'LOSJI'
    | 'KOST_DØGN'
    | 'BESØKSREISER_HJEMMET_ANNET'
    | 'KOSTBESPARELSE_I_HJEMMET'
    | 'RENTEFORDEL_LÅN'
    | 'BIL'
    | 'KOST_DAGER'
    | 'BOLIG'
    | 'SKATTEPLIKTIG_DEL_FORSIKRINGER'
    | 'FRI_TRANSPORT'
    | 'OPSJONER'
    | 'TILSKUDD_BARNEHAGEPLASS'
    | 'ANNET'
    | 'BEDRIFTSBARNEHAGEPLASS'
    | 'YRKEBIL_TJENESTLIGBEHOV_KILOMETER'
    | 'YRKEBIL_TJENESTLIGBEHOV_LISTEPRIS'
    | 'INNBETALING_TIL_UTENLANDSK_PENSJONSORDNING';

export type Refusjon = {
    refusjonsbeløpMnd?: number;
    fomDato?: string;
};

export type DokumentDto = {
    tittel?: string;
    type: DokumentKategori;
    saksnummer?: string;
    journalpostId?: string;
    dokumentId?: string;
    mottatt: string;
};

export type DokumentKategori = 'INNGÅENDE_DOKUMENT' | 'UTGÅENDE_DOKUMENT';

export type SlettMellomlagringData = {
    body?: never;
    path: {
        ytelse: YtelseMellomlagringType;
    };
    query?: never;
    url: '/rest/storage/{ytelse}';
};

export type SlettMellomlagringResponses = {
    /**
     * No Content
     */
    204: void;
};

export type SlettMellomlagringResponse = SlettMellomlagringResponses[keyof SlettMellomlagringResponses];

export type LesSøknadData = {
    body?: never;
    path: {
        ytelse: YtelseMellomlagringType;
    };
    query?: never;
    url: '/rest/storage/{ytelse}';
};

export type LesSøknadResponses = {
    /**
     * OK
     */
    200: string;
};

export type LesSøknadResponse = LesSøknadResponses[keyof LesSøknadResponses];

export type LagreSøknadYtelseData = {
    body: string;
    path: {
        ytelse: YtelseMellomlagringType;
    };
    query?: never;
    url: '/rest/storage/{ytelse}';
};

export type LagreSøknadYtelseResponses = {
    /**
     * OK
     */
    200: unknown;
};

export type LagreVedleggData = {
    body?: {
        vedlegg: Blob | File;
    };
    path: {
        ytelse: YtelseMellomlagringType;
    };
    query?: {
        uuid?: string;
    };
    url: '/rest/storage/{ytelse}/vedlegg';
};

export type LagreVedleggResponses = {
    /**
     * OK
     */
    200: string;
};

export type LagreVedleggResponse = LagreVedleggResponses[keyof LagreVedleggResponses];

export type SendInnForeldrepengesøknadData = {
    body: SvangerskapspengesøknadDto;
    path?: never;
    query?: never;
    url: '/rest/soknad/svangerskapspenger';
};

export type SendInnForeldrepengesøknadResponses = {
    /**
     * OK
     */
    200: Kvittering;
};

export type SendInnForeldrepengesøknadResponse =
    SendInnForeldrepengesøknadResponses[keyof SendInnForeldrepengesøknadResponses];

export type SendInnForeldrepengesøknad1Data = {
    body: ForeldrepengesøknadDto;
    path?: never;
    query?: never;
    url: '/rest/soknad/foreldrepenger';
};

export type SendInnForeldrepengesøknad1Responses = {
    /**
     * OK
     */
    200: Kvittering;
};

export type SendInnForeldrepengesøknad1Response =
    SendInnForeldrepengesøknad1Responses[keyof SendInnForeldrepengesøknad1Responses];

export type SendInnEndringssøknadForeldrepengerData = {
    body: EndringssøknadForeldrepengerDto;
    path?: never;
    query?: never;
    url: '/rest/soknad/foreldrepenger/endre';
};

export type SendInnEndringssøknadForeldrepengerResponses = {
    /**
     * OK
     */
    200: Kvittering;
};

export type SendInnEndringssøknadForeldrepengerResponse =
    SendInnEndringssøknadForeldrepengerResponses[keyof SendInnEndringssøknadForeldrepengerResponses];

export type EttersendData = {
    body: EttersendelseDto;
    path?: never;
    query?: never;
    url: '/rest/soknad/ettersend';
};

export type EttersendResponses = {
    /**
     * OK
     */
    200: Kvittering;
};

export type EttersendResponse = EttersendResponses[keyof EttersendResponses];

export type SendInnEngangsstonadData = {
    body: EngangsstønadDto;
    path?: never;
    query?: never;
    url: '/rest/soknad/engangsstonad';
};

export type SendInnEngangsstonadResponses = {
    /**
     * OK
     */
    200: Kvittering;
};

export type SendInnEngangsstonadResponse = SendInnEngangsstonadResponses[keyof SendInnEngangsstonadResponses];

export type SendInnEngangsstønadData = {
    body: EngangsstønadDto;
    path?: never;
    query?: never;
    url: '/rest/soknad/engangssoknad';
};

export type SendInnEngangsstønadResponses = {
    /**
     * OK
     */
    200: Kvittering;
};

export type SendInnEngangsstønadResponse = SendInnEngangsstønadResponses[keyof SendInnEngangsstønadResponses];

export type BeregnData = {
    body: KontoBeregningGrunnlagDto;
    path?: never;
    query?: never;
    url: '/rest/konto';
};

export type BeregnResponses = {
    /**
     * OK
     */
    200: {
        [key: string]: KontoBeregningDto;
    };
};

export type BeregnResponse = BeregnResponses[keyof BeregnResponses];

export type TrengerDokumentereMorsArbeidData = {
    body: MorArbeidRequestDto;
    path?: never;
    query?: never;
    url: '/rest/innsyn/v2/trengerDokumentereMorsArbeid';
};

export type TrengerDokumentereMorsArbeidResponses = {
    /**
     * OK
     */
    200: boolean;
};

export type TrengerDokumentereMorsArbeidResponse =
    TrengerDokumentereMorsArbeidResponses[keyof TrengerDokumentereMorsArbeidResponses];

export type AnnenPartVedtakData = {
    body: AnnenPartSakIdentifikator;
    path?: never;
    query?: never;
    url: '/rest/innsyn/v2/annenPartVedtak';
};

export type AnnenPartVedtakResponses = {
    /**
     * OK
     */
    200: AnnenPartSak;
};

export type AnnenPartVedtakResponse = AnnenPartVedtakResponses[keyof AnnenPartVedtakResponses];

export type AnnenPartSakData = {
    body: AnnenPartSakIdentifikator;
    path?: never;
    query?: never;
    url: '/rest/innsyn/v2/annenPartSak';
};

export type AnnenPartSakResponses = {
    /**
     * OK
     */
    200: AnnenPartSak;
};

export type AnnenPartSakResponse = AnnenPartSakResponses[keyof AnnenPartSakResponses];

export type SlettVedleggData = {
    body?: never;
    path: {
        ytelse: YtelseMellomlagringType;
        key: string;
    };
    query?: never;
    url: '/rest/storage/{ytelse}/vedlegg/{key}';
};

export type SlettVedleggResponses = {
    /**
     * No Content
     */
    204: void;
};

export type SlettVedleggResponse = SlettVedleggResponses[keyof SlettVedleggResponses];

export type LesVedleggData = {
    body?: never;
    path: {
        ytelse: YtelseMellomlagringType;
        key: string;
    };
    query?: never;
    url: '/rest/storage/{ytelse}/vedlegg/{key}';
};

export type LesVedleggResponses = {
    /**
     * OK
     */
    200: string;
};

export type LesVedleggResponse = LesVedleggResponses[keyof LesVedleggResponses];

export type FinnesDetAktivMellomlagringData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/rest/storage/aktive';
};

export type FinnesDetAktivMellomlagringResponses = {
    /**
     * OK
     */
    200: AktivMellomlagringDto;
};

export type FinnesDetAktivMellomlagringResponse =
    FinnesDetAktivMellomlagringResponses[keyof FinnesDetAktivMellomlagringResponses];

export type SøkerinfoData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/rest/sokerinfo';
};

export type SøkerinfoResponses = {
    /**
     * OK
     */
    200: Søkerinfo;
};

export type SøkerinfoResponse = SøkerinfoResponses[keyof SøkerinfoResponses];

export type SatserData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/rest/satser';
};

export type SatserResponses = {
    /**
     * OK
     */
    200: string;
};

export type SatserResponse = SatserResponses[keyof SatserResponses];

export type PersoninfoData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/rest/personinfo';
};

export type PersoninfoResponses = {
    /**
     * OK
     */
    200: PersonFrontend;
};

export type PersoninfoResponse = PersoninfoResponses[keyof PersoninfoResponses];

export type AktiveData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/rest/minidialog';
};

export type AktiveResponses = {
    /**
     * OK
     */
    200: MinidialogInnslag[];
};

export type AktiveResponse = AktiveResponses[keyof AktiveResponses];

export type SakerData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/rest/innsyn/v2/saker';
};

export type SakerResponses = {
    /**
     * OK
     */
    200: Saker;
};

export type SakerResponse = SakerResponses[keyof SakerResponses];

export type ErSakOppdatertData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/rest/innsyn/v2/saker/oppdatert';
};

export type ErSakOppdatertResponses = {
    /**
     * OK
     */
    200: boolean;
};

export type ErSakOppdatertResponse = ErSakOppdatertResponses[keyof ErSakOppdatertResponses];

export type HentTidslinjeData = {
    body?: never;
    path?: never;
    query: {
        saksnummer: string;
    };
    url: '/rest/innsyn/tidslinje';
};

export type HentTidslinjeResponses = {
    /**
     * OK
     */
    200: TidslinjeHendelseDto[];
};

export type HentTidslinjeResponse = HentTidslinjeResponses[keyof HentTidslinjeResponses];

export type HentInntektsmeldingerData = {
    body?: never;
    path?: never;
    query: {
        saksnummer: string;
    };
    url: '/rest/innsyn/inntektsmeldinger';
};

export type HentInntektsmeldingerResponses = {
    /**
     * OK
     */
    200: FpOversiktInntektsmeldingDto[];
};

export type HentInntektsmeldingerResponse = HentInntektsmeldingerResponses[keyof HentInntektsmeldingerResponses];

export type VedleggData = {
    body?: never;
    path?: never;
    query: {
        saksnummer: string;
    };
    url: '/rest/historikk/vedlegg';
};

export type VedleggResponses = {
    /**
     * OK
     */
    200: string[];
};

export type VedleggResponse = VedleggResponses[keyof VedleggResponses];

export type HentDokumentV2Data = {
    body?: never;
    path: {
        journalpostId: string;
        dokumentId: string;
    };
    query?: never;
    url: '/rest/dokument/hent-dokument/{journalpostId}/{dokumentId}';
};

export type HentDokumentV2Responses = {
    /**
     * OK
     */
    200: string;
};

export type HentDokumentV2Response = HentDokumentV2Responses[keyof HentDokumentV2Responses];

export type HentDokumentoversiktenData = {
    body?: never;
    path?: never;
    query: {
        saksnummer: string;
    };
    url: '/rest/dokument/alle';
};

export type HentDokumentoversiktenResponses = {
    /**
     * OK
     */
    200: DokumentDto[];
};

export type HentDokumentoversiktenResponse = HentDokumentoversiktenResponses[keyof HentDokumentoversiktenResponses];

export type PreStopData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/internal/preStop';
};

export type PreStopResponses = {
    /**
     * OK
     */
    200: string;
};

export type PreStopResponse = PreStopResponses[keyof PreStopResponses];

export type ClientOptions = {
    baseUrl: 'http://localhost:9002' | (string & {});
};
