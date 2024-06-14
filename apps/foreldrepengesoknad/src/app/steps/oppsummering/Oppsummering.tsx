import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Accordion, Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';

import {
    AnnenForelder,
    Barn,
    Block,
    ISOStringToDate,
    SivilstandType,
    getErSøkerFarEllerMedmor,
    getKjønnFromFnrString,
    getNavnPåForeldre,
    isAdoptertBarn,
    isAnnenForelderOppgitt,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import {
    BoIUtlandetOppsummeringspunkt,
    HendelseType,
    OppsummeringPanel,
    SøkerOppsummeringspunkt,
} from '@navikt/fp-oppsummering';
import {
    Søker,
    Søkerinfo,
    Søkerrolle,
    Utenlandsopphold,
    UtenlandsoppholdSenere,
    UtenlandsoppholdTidligere,
} from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { formatDateIso } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { Opphold, SenereOpphold, TidligereOpphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';

import { søknadInneholderIngenVedlegg } from '../manglende-vedlegg/util';
import ArbeidsforholdOgAndreInntekterOppsummering from './components/andre-inntekter-oppsummering/ArbeidsforholdOgAndreInntekterOppsummering';
import AnnenForelderOppsummering from './components/annen-forelder-oppsummering/AnnenForelderOppsummering';
import BarnOppsummering from './components/barn-oppsummering/BarnOppsummering';
import DokumentasjonOppsummering from './components/dokumentasjon-oppsummering/DokumentasjonOppsummering';
import UttaksplanOppsummering from './components/uttaksplan-oppsummering/UttaksplanOppsummering';

const getDatoOgHendelsetype = (barn: Barn): [string, HendelseType] => {
    if (isFødtBarn(barn)) {
        return [formatDateIso(barn.fødselsdatoer[0]), HendelseType.FØDSEL];
    }
    if (isAdoptertBarn(barn)) {
        return [formatDateIso(barn.adopsjonsdato), HendelseType.ADOPSJON];
    }
    if (isUfødtBarn(barn)) {
        return [formatDateIso(barn.termindato), HendelseType.TERMIN];
    }
    throw new Error('Informasjon om barn er feil!');
};

// TODO (TOR) Bruk same typar i dei forskjellige appane
const tempMappingOpphold = (utenlandsopphold: Opphold): Utenlandsopphold => ({
    harBoddUtenforNorgeSiste12Mnd: !utenlandsopphold.iNorgeSiste12Mnd,
    skalBoUtenforNorgeNeste12Mnd: !utenlandsopphold.iNorgeNeste12Mnd,
});
// TODO (TOR) Bruk same typar i dei forskjellige appane
const tempMappingSenere = (utenlandsopphold?: SenereOpphold): UtenlandsoppholdSenere | undefined => {
    if (!utenlandsopphold) {
        return undefined;
    }

    return {
        utenlandsoppholdNeste12Mnd: utenlandsopphold.senereOpphold.map((o) => ({
            fom: o.tidsperiode.fom,
            tom: o.tidsperiode.tom,
            landkode: o.land,
        })),
    };
};
// TODO (TOR) Bruk same typar i dei forskjellige appane
const tempMappingTidligere = (utenlandsopphold?: TidligereOpphold): UtenlandsoppholdTidligere | undefined => {
    if (!utenlandsopphold) {
        return undefined;
    }

    return {
        utenlandsoppholdSiste12Mnd: utenlandsopphold.tidligereOpphold.map((o) => ({
            fom: o.tidsperiode.fom,
            tom: o.tidsperiode.tom,
            landkode: o.land,
        })),
    };
};

const skalViseInfoOmFarskapsportal = (
    søker: Søker,
    rolle: Søkerrolle,
    annenForelder: AnnenForelder,
    barnetErIkkeFødt?: boolean,
): boolean => {
    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    if (!erAnnenForelderOppgitt) {
        return false;
    }

    const harAnnenForelderRett = erAnnenForelderOppgitt.harRettPåForeldrepengerINorge;
    const harRettErBesvartForAnnenForelder = harAnnenForelderRett !== undefined;
    const erAnnenForelderFar =
        !!erAnnenForelderOppgitt.fnr && getKjønnFromFnrString(erAnnenForelderOppgitt.fnr) === 'M';
    const harAnnenForelderUtenlandskFnr = !!erAnnenForelderOppgitt.utenlandskFnr;
    const erSøkerIkkeGift = søker.sivilstand?.type !== SivilstandType.GIFT;

    return (
        ((rolle === 'far' && (erAnnenForelderOppgitt.erAleneOmOmsorg || harRettErBesvartForAnnenForelder)) ||
            (rolle === 'mor' && erAnnenForelderFar && !harAnnenForelderUtenlandskFnr && !!harAnnenForelderRett)) &&
        !!barnetErIkkeFødt &&
        erSøkerIkkeGift
    );
};

export interface Props {
    søkerInfo: Søkerinfo;
    erEndringssøknad: boolean;
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
}

const Oppsummering: FunctionComponent<Props> = ({
    søkerInfo,
    erEndringssøknad,
    sendSøknad,
    avbrytSøknad,
    mellomlagreSøknadOgNaviger,
}) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold, erEndringssøknad);
    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger, erEndringssøknad);
    const [manglerDokumentasjon, setManglerDokumentasjon] = useState(false);

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const søkerData = useContextGetData(ContextDataType.SØKER_DATA);
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const periodeMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const uttaksplanMetadata = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA));
    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);
    const inneholderIkkeVedlegg = søknadInneholderIngenVedlegg(vedlegg);

    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder);
    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(søkerInfo.søker, annenForelder, søkerErFarEllerMedmor, intl);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const termindato = getTermindato(barn);
    const erEndringssøknadOgAnnenForelderHarRett =
        erEndringssøknad && isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;
    const ekstraSamtykketekst = erEndringssøknadOgAnnenForelderHarRett
        ? intl.formatMessage(
              { id: 'oppsummering.harGodkjentOppsummering.endringssøknadMedAnnenForelder' },
              {
                  navnAnnenForelder: annenForelder.fornavn,
              },
          )
        : '';

    const søker = søkerInfo.søker;
    const rolle = søkersituasjon.rolle;

    const datoOgHendelsetype = getDatoOgHendelsetype(barn);
    const barnetErIkkeFødt = isUfødtBarn(barn);

    const visInfoboksOmFarskapsportal = skalViseInfoOmFarskapsportal(søker, rolle, annenForelder, barnetErIkkeFødt);

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <OppsummeringPanel
                appName="Foreldrepenger"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                cancelApplication={avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onContinueLater={navigator.fortsettSøknadSenere}
                ekstraSamtykketekst={ekstraSamtykketekst}
            >
                <Accordion indent={false}>
                    <SøkerOppsummeringspunkt søker={søkerInfo.søker} />
                    <OppsummeringPanel.Punkt tittel="Barnet" hide={erEndringssøknad}>
                        <BarnOppsummering barn={barn} familiehendelsesdato={familiehendelsesdato!} />
                    </OppsummeringPanel.Punkt>
                    <OppsummeringPanel.Punkt tittel="Den andre forelderen" hide={erEndringssøknad}>
                        <AnnenForelderOppsummering annenForelder={annenForelder} søkerrolle={søkersituasjon.rolle} />
                    </OppsummeringPanel.Punkt>
                    <BoIUtlandetOppsummeringspunkt
                        familiehendelseDato={datoOgHendelsetype[0]}
                        hendelseType={datoOgHendelsetype[1]}
                        utenlandsopphold={
                            erEndringssøknad ? ({} as any) : tempMappingOpphold(notEmpty(utenlandsopphold))
                        }
                        tidligereUtenlandsopphold={tempMappingTidligere(tidligereUtenlandsopphold)}
                        senereUtenlandsopphold={tempMappingSenere(senereUtenlandsopphold)}
                        hide={erEndringssøknad}
                    />
                    <OppsummeringPanel.Punkt tittel="Arbeidsforhold og andre inntektskilder" hide={erEndringssøknad}>
                        <ArbeidsforholdOgAndreInntekterOppsummering
                            arbeidsforhold={søkerInfo.arbeidsforhold}
                            barn={barn}
                            søkersituasjon={søkersituasjon}
                            søkerData={søkerData}
                        />
                    </OppsummeringPanel.Punkt>
                    <OppsummeringPanel.Punkt tittel={intl.formatMessage({ id: 'oppsummering.uttak' })}>
                        <UttaksplanOppsummering
                            perioder={uttaksplan}
                            navnPåForeldre={navnPåForeldre}
                            annenForelder={annenForelder}
                            erFarEllerMedmor={søkerErFarEllerMedmor}
                            registrerteArbeidsforhold={søkerInfo.arbeidsforhold}
                            dekningsgrad={periodeMedForeldrepenger.dekningsgrad}
                            antallUkerUttaksplan={uttaksplanMetadata.antallUkerIUttaksplan!}
                            eksisterendeUttaksplan={eksisterendeSak ? eksisterendeSak.uttaksplan : undefined}
                            familiehendelsesdato={familiehendelsesdato!}
                            termindato={termindato}
                            situasjon={søkersituasjon.situasjon}
                            erAleneOmOmsorg={erAnnenForelderOppgitt ? annenForelder?.erAleneOmOmsorg : false}
                            antallBarn={barn.antallBarn}
                            ønskerJustertUttakVedFødsel={uttaksplanMetadata.ønskerJustertUttakVedFødsel}
                        />
                    </OppsummeringPanel.Punkt>
                    <OppsummeringPanel.Punkt
                        hide={vedlegg === undefined || inneholderIkkeVedlegg}
                        tittel={intl.formatMessage({
                            id: manglerDokumentasjon
                                ? 'oppsummering.manglerDokumentasjon'
                                : 'oppsummering.dokumentasjon',
                        })}
                    >
                        <DokumentasjonOppsummering
                            vedlegg={vedlegg!}
                            setManglerDokumentasjon={setManglerDokumentasjon}
                        />
                    </OppsummeringPanel.Punkt>
                </Accordion>
                <Block visible={manglerDokumentasjon} margin="xl">
                    <Alert variant="info">
                        <VStack gap="2">
                            <Heading size="small" level="2">
                                <FormattedMessage id="oppsummering.manglerDokumentasjon.heading" />
                            </Heading>
                            <BodyLong>
                                <FormattedMessage id="oppsummering.manglerDokumentasjon.content" />
                            </BodyLong>
                        </VStack>
                    </Alert>
                </Block>
                <Block visible={visInfoboksOmFarskapsportal} margin="xl">
                    <Alert variant="info">
                        <Heading size="small" level="3">
                            <FormattedMessage
                                id="oppsummering.tekstOmFarskapsportal.overskrift"
                                values={{ hvem: søkersituasjon.rolle }}
                            />
                        </Heading>

                        <FormattedMessage
                            id="oppsummering.tekstOmFarskapsportal.far"
                            values={{
                                hvem: søkersituasjon.rolle,
                                a: (msg: any) => (
                                    <a href={links.farskapsportal} className="lenke" rel="noreferrer" target="_blank">
                                        {msg}
                                    </a>
                                ),
                                antallBarn: barn.antallBarn,
                            }}
                        />
                    </Alert>
                </Block>
            </OppsummeringPanel>
        </ContentWrapper>
    );
};

export default Oppsummering;
