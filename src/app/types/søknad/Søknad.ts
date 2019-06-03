import AnnenForelder, { AnnenForelderPartial } from './AnnenForelder';
import InformasjonOmUtenlandsopphold, { InformasjonOmUtenlandsoppholdPartial } from './InformasjonOmUtenlandsopphold';
import { Barn } from './Barn';
import Søker, { SøkerPartial } from './Søker';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { RegistrertAnnenForelder, RegistrertBarn } from '../Person';
import { Periode } from '../uttaksplan/periodetyper';
import { Dekningsgrad } from 'common/types';
import { UttaksplanSkjemadata } from '../../steg/uttaksplanSkjema/uttaksplanSkjemadata';
import { StegID } from '../../util/routing/stegConfig';
import { Omit } from 'react-redux';
import { EksisterendeSak } from '../EksisterendeSak';

type Foreldrepenger = 'foreldrepenger';

export enum SøkerRolle {
    MOR = 'MOR',
    FAR = 'FAR',
    FAR2 = 'FAR2',
    MEDMOR = 'MEDMOR',
    FORESATT = 'FORESATT',
    FORESATT2 = 'FORESATT2'
}

export enum Søkersituasjon {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
    FORELDREANSVAR = 'omsorgsovertakelse'
}

export interface SøknadenGjelderBarnValg {
    valgteBarn: RegistrertBarn[];
    gjelderAnnetBarn?: boolean;
}

interface SensitivSkjemaInfo {
    registrertAnnenForelder?: RegistrertAnnenForelder;
}

export enum Opplysning {
    'BEGRUNNELSE_FOR_SEN_ENDRING' = 'begrunnelseForSenEndring'
}

export interface Tilleggsopplysning {
    tekst: string;
    ekstraInformasjon?: string;
}

export interface Tilleggsopplysninger {
    begrunnelseForSenEndring?: Tilleggsopplysning;
}

interface SøknadEkstrainfo {
    erEnkelEndringssøknad: boolean;
    erEnkelEndringssøknadMedUttaksplan: boolean;
    currentStegID: StegID | undefined;
    uttaksplanSkjema: Partial<UttaksplanSkjemadata>;
    lastAddedPeriodeId?: string;
    søknadenGjelderBarnValg?: SøknadenGjelderBarnValg;
    eksisterendeSak?: EksisterendeSak;
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
    DOKUMENTASJON_AV_TERMIN_ELLER_FØDSEL = 'I000041',
    ETTERLØNN_ELLER_SLUTTVEDERLAG = 'I000044',
    OMSORGSOVERTAKELSESDATO = 'I000042',
    ANNET = 'I000060',
    FØDSELSATTEST = 'I000063', // will be required once we start fetching data from TPS about registered children.
    TERMINBEKREFTELSE = 'I000062',
    DOK_MILITÆR_SILVIL_TJENESTE = 'I000039',
    INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG = 'I000007',
    DOK_MORS_UTDANNING_ARBEID_SYKDOM = 'I000038',
    DOK_INNLEGGELSE = 'I000037',
    DOK_OVERFØRING_FOR_SYK = 'I000045',
    BEKREFTELSE_FRA_STUDIESTED = 'I000061',
    BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM = 'I000051',
    ANNET_SKJEMA_IKKE_NAV = 'I000049'
}

export default Søknad;
