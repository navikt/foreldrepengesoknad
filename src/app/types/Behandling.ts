export default interface Behandling {
    opprettetTidspunkt: string;
    endretTidspunkt: string;
    behandlendeEnhet: string;
    behandlendeEnhetNavn: string;
    status: BehandlingStatus;
    tema: BehandlingTema;
    type: BehandlingType;
    behandlingResultat: BehandlingResultatType;
    inntektsmeldinger: string[];
}

export enum BehandlingResultatType {
    IKKE_FASTSATT = 'IKKE_FASTSATT',
    INNVILGET = 'INNVILGET',
    AVSLÅTT = 'AVSLÅTT',
    OPPHØR = 'OPPHØR',
    HENLAGT_SØKNAD_TRUKKET = 'HENLAGT_SØKNAD_TRUKKET',
    HENLAGT_FEILOPPRETTET = 'HENLAGT_FEILOPPRETTET',
    HENLAGT_BRUKER_DØD = 'HENLAGT_BRUKER_DØD',
    MERGET_OG_HENLAGT = 'MERGET_OG_HENLAGT',
    HENLAGT_SØKNAD_MANGLER = 'HENLAGT_SØKNAD_MANGLER',

    KLAGE_AVVIST = 'KLAGE_AVVIST',
    KLAGE_MEDHOLD = 'KLAGE_MEDHOLD',
    KLAGE_YTELSESVEDTAK_OPPHEVET = 'KLAGE_YTELSESVEDTAK_OPPHEVET',
    KLAGE_YTELSESVEDTAK_STADFESTET = 'KLAGE_YTELSESVEDTAK_STADFESTET',
    HENLAGT_KLAGE_TRUKKET = 'HENLAGT_KLAGE_TRUKKET',

    INNSYN_INNVILGET = 'INNSYN_INNVILGET',
    INNSYN_DELVIS_INNVILGET = 'INNSYN_DELVIS_INNVILGET',
    INNSYN_AVVIST = 'INNSYN_AVVIST',

    FORELDREPENGER_ENDRET = 'FORELDREPENGER_ENDRET',
}

export enum BehandlingStatus {
    OPPRETTET = 'OPPRE',
    UTREDES = 'UTRED',
    FATTER_VEDTAK = 'FVED',
    IVERKSETTER_VEDTAK = 'IVED',
    AVSLUTTET = 'AVSLU',
}

export enum BehandlingTema {
    'ENGANGSTØNAD' = 'ENGST',
    'ENGANGSTØNAD_FØDSEL' = 'ENGST_FODS',
    'ENGANGSTØNAD_ADOPSJON' = 'ENGST_ADOP',
    'FORELDREPENGER' = 'FORP',
    'FORELDREPENGER_ADOPSJON' = 'FORP_ADOP',
    'FORELDREPENGER_FØDSEL' = 'FORP_FODS',
    'UDEFINERT' = '-',
}

export enum BehandlingType {
    'FORELDREPENGESØKNAD' = 'FP',
    'ENGANGSSØNAD' = 'ES',
    'ENDRINGSSØKNAD' = 'ENDRING',
    'SVANGERSKAPSPENGESØKNAD' = 'SVP',
}
