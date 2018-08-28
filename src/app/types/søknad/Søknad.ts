import AnnenForelder, { AnnenForelderPartial } from './AnnenForelder';

import InformasjonOmUtenlandsopphold, {
    InformasjonOmUtenlandsoppholdPartial
} from './InformasjonOmUtenlandsopphold';
import { Periode } from 'uttaksplan/types';
import { BarnPartial, Barn } from './Barn';
import Søker, { SøkerPartial } from './Søker';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { RegistrertBarn, RegistrertAnnenForelder } from '../Person';

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

interface SkjemaEkstradata {
    søknadenGjelderBarnValg: SøknadenGjelderBarnValg;
    registrertAnnenForelder: RegistrertAnnenForelder;
}

interface Søknad {
    type: Foreldrepenger;
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    barn: Barn;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    uttaksplan: Periode[];
    søker: Søker;
    vedlegg?: Attachment[];
    temp: SkjemaEkstradata;
}

export interface SøknadPartial {
    type?: Foreldrepenger;
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    annenForelder: AnnenForelderPartial;
    situasjon?: Søkersituasjon;
    barn: BarnPartial;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsoppholdPartial;
    uttaksplan?: Periode[];
    søker: SøkerPartial;
    vedlegg?: Attachment[];
    temp: SkjemaEkstradata;
}

export enum AttachmentType {
    OMSORGSOVERTAKELSE = 'omsorgsovertakelse',
    ADOPSJONSVEDTAK = 'adopsjonsvedtak',
    TERMINBEKREFTELSE = 'terminbekreftelse',
    FØDSELSATTEST = 'fødselsattest',
    ANNEN_INNTEKT_DOKUMENTASJON = 'anneninntektdokumentasjon'
}

// TODO remove redundant skjemanummer when we know more about which to use
export enum Skjemanummer {
    DOKUMENTASJON_AV_TERMIN_ELLER_FØDSEL = 'I000041',
    BEKREFTELSE_FRA_ARBEIDSGIVER = 'I000065',
    INNTEKTSOPPLYSNINGER = 'I000026',
    ARBEIDSFORHOLD = 'I000043',
    ETTERLØNN_ELLER_SLUTTVEDERLAG = 'I000044',
    TERMINDATO_ELLER_OMSORGSOVERTAKELSESDATO = 'I000041',
    OMSORGSOVERTAKELSESDATO = 'I000042',
    ANNET = 'I000060',
    FØDSELSATTEST = 'I000063',
    TERMINBEKREFTELSE = 'I000062',
    DOK_ETTERLØNN = 'I000044',
    DOK_MILITÆR_SILVIL_TJENESTE = 'I000039',
    INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG = 'I000007'
}

export default Søknad;
