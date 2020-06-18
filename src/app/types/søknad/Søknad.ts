import AnnenForelder, { AnnenForelderPartial } from './AnnenForelder';
import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdPartial } from './InformasjonOmUtenlandsopphold';
import { Barn } from './Barn';
import Søker, { SøkerPartial } from './Søker';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { RegistrertAnnenForelder, RegistrertBarn } from '../Person';
import { Periode } from '../uttaksplan/periodetyper';
import { Dekningsgrad } from 'common/types';
import { UttaksplanSkjemadata } from '../../steg/uttaksplanSkjema/uttaksplanSkjemadata';
import { StegID } from '../../util/routing/stegConfig';
import { Omit } from 'react-redux';
import { EksisterendeSak } from '../EksisterendeSak';

export type Foreldrepenger = 'foreldrepenger';

export enum SøkerRolle {
    MOR = 'MOR',
    FAR = 'FAR',
    FAR2 = 'FAR2',
    MEDMOR = 'MEDMOR',
    FORESATT = 'FORESATT',
    FORESATT2 = 'FORESATT2',
}

export enum Søkersituasjon {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
    FORELDREANSVAR = 'omsorgsovertakelse',
}

export interface SøknadenGjelderBarnValg {
    valgteBarn: RegistrertBarn[];
    gjelderAnnetBarn?: boolean;
    termindato?: Date;
}

interface SensitivSkjemaInfo {
    registrertAnnenForelder?: RegistrertAnnenForelder;
}

export enum Opplysning {
    'BEGRUNNELSE_FOR_SEN_ENDRING' = 'begrunnelseForSenEndring',
}

export interface Tilleggsopplysning {
    tekst: string;
    ekstraInformasjon?: string;
}

export interface Tilleggsopplysninger {
    begrunnelseForSenEndring?: Tilleggsopplysning;
}

export interface SøknadEkstrainfo {
    erEnkelEndringssøknad: boolean;
    currentStegID: StegID | undefined;
    uttaksplanSkjema: Partial<UttaksplanSkjemadata>;
    lastAddedPeriodeId?: string;
    søknadenGjelderBarnValg?: SøknadenGjelderBarnValg;
    eksisterendeSak?: EksisterendeSak;
    endringstidspunkt?: Date;
}

interface Søknad {
    type: Foreldrepenger;
    saksnummer?: string;
    erEndringssøknad: boolean;
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    barn: Barn;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    uttaksplan: Periode[];
    søker: Søker;
    vedlegg?: Attachment[];
    dekningsgrad: Dekningsgrad;
    ekstrainfo: SøknadEkstrainfo;
    vedleggForSenEndring: Attachment[];
    sensitivInfoIkkeLagre: SensitivSkjemaInfo;
    tilleggsopplysninger: Tilleggsopplysninger;
}

interface SøknadEndretForInnsending {
    tilleggsopplysninger?: string;
}

export type EnkelEndringssøknadForInnsending = Pick<
    Søknad,
    | 'type'
    | 'saksnummer'
    | 'erEndringssøknad'
    | 'uttaksplan'
    | 'vedlegg'
    | 'søker'
    | 'annenForelder'
    | 'barn'
    | 'dekningsgrad'
    | 'situasjon'
> &
    SøknadEndretForInnsending;

export type SøknadForInnsending = Omit<
    Søknad,
    'ekstrainfo' | 'sensitivInfoIkkeLagre' | 'vedleggForSenEndring' | 'tilleggsopplysninger'
> &
    SøknadEndretForInnsending;

export interface SøknadPartial {
    type?: Foreldrepenger;
    saksnummer?: string;
    erEndringssøknad?: boolean;
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    annenForelder: AnnenForelderPartial;
    situasjon?: Søkersituasjon;
    barn: Partial<Barn>;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsoppholdPartial;
    uttaksplan: Periode[];
    søker: SøkerPartial;
    vedlegg?: Attachment[];
    dekningsgrad?: Dekningsgrad;
    ekstrainfo: SøknadEkstrainfo;
    vedleggForSenEndring?: Attachment[];
    sensitivInfoIkkeLagre: SensitivSkjemaInfo;
    tilleggsopplysninger: Tilleggsopplysninger;
}

export enum Skjemanummer {
    ANNET = 'I000060',
    BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM = 'I000051',
    BEKREFTELSE_FRA_STUDIESTED = 'I000061',
    DOKUMENTASJON_AV_TERMIN_ELLER_FØDSEL = 'I000041',
    DOK_AV_ALENEOMSORG = 'I000110',
    DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID = 'I000111',
    DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET = 'I000112',
    DOK_INNLEGGELSE = 'I000037',
    DOK_MILITÆR_SILVIL_TJENESTE = 'I000039',
    DOK_MORS_UTDANNING_ARBEID_SYKDOM = 'I000038',
    DOK_OVERFØRING_FOR_SYK = 'I000023',
    ETTERLØNN_ELLER_SLUTTVEDERLAG = 'I000044',
    FØDSELSATTEST = 'I000063', // will be required once we start fetching data from TPS about registered children.
    INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG = 'I000007',
    OMSORGSOVERTAKELSESDATO = 'I000042',
    TERMINBEKREFTELSE = 'I000062',
    HV_ØVELSE = 'I000116',
    NAV_TILTAK = 'I000117',
}

export default Søknad;
