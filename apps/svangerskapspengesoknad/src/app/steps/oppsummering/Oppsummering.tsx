import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

import {
    BoIUtlandetOppsummeringspunkt,
    HendelseType,
    OppsummeringIndex,
    SøkerOppsummeringspunkt,
} from '@navikt/fp-oppsummering';
import { Søkerinfo, Utenlandsopphold, UtenlandsoppholdSenere, UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { bemUtils, formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';
import { DelivisTilretteleggingPeriodeType } from 'app/types/DelivisTilretteleggingPeriodeType';
import Tilrettelegging, { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import {
    Utenlandsopphold as Opphold,
    UtenlandsoppholdSenere as SenereOpphold,
    UtenlandsoppholdTidligere as TidligereOpphold,
} from 'app/types/Utenlandsopphold';
import { getAktiveArbeidsforhold, getTekstOmManglendeArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { getSisteDagForSvangerskapspenger } from 'app/utils/dateUtils';
import { mapTilretteleggingTilPerioder } from 'app/utils/tilretteleggingUtils';

import ArbeidsforholdInformasjon from '../inntektsinformasjon/components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import ArbeidIUtlandetVisning from './arbeid-i-utlandet-visning/ArbeidIUtlandetVisning';
import EgenNæringVisning from './egen-næring-visning/EgenNæringVisning';
import FrilansVisning from './frilans-visning/FrilansVisning';
import './oppsummering.css';
import PeriodeOppsummering from './periode-oppsummering/PeriodeOppsummering';
import VedleggOppsummering from './vedlegg-oppsummering/VedleggOppsummering';

const getBackLinkAndId = (
    tilrettelegging: Tilrettelegging[],
): { previousRoute: SøknadRoutes; previousTilretteleggingId?: string } => {
    const sisteTilrettelegging = tilrettelegging[tilrettelegging?.length - 1];
    if (
        sisteTilrettelegging.type === TilretteleggingstypeOptions.DELVIS &&
        sisteTilrettelegging.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    ) {
        return { previousRoute: SøknadRoutes.PERIODER, previousTilretteleggingId: sisteTilrettelegging.id };
    }
    return { previousRoute: SøknadRoutes.TILRETTELEGGING, previousTilretteleggingId: sisteTilrettelegging.id };
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

type Props = {
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const Oppsummering: React.FunctionComponent<Props> = ({
    sendSøknad,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, søkerInfo.arbeidsforhold);
    const bem = bemUtils('oppsummering');

    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const arbeidIUtlandet = useContextGetData(ContextDataType.ARBEID_I_UTLANDET);
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const utenlandsoppholdSenere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdTidligere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const allePerioderMedFomOgTom = useMemo(
        () => mapTilretteleggingTilPerioder(tilrettelegginger, sisteDagForSvangerskapspenger),
        [tilrettelegginger, sisteDagForSvangerskapspenger],
    );
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(søkerInfo.arbeidsforhold, barn.termindato);
    const tilretteleggingMedFrilans = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER,
    );
    const tilretteleggingMedSN = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG,
    );

    const { previousRoute, previousTilretteleggingId } = getBackLinkAndId(tilrettelegginger);

    const gåTilForrigeSteg = () => {
        oppdaterValgtTilretteleggingId(previousTilretteleggingId);
        navigator.goToPreviousStep(previousRoute);
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <OppsummeringIndex
                appName="Svangerskapspenger"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                cancelApplication={avbrytSøknad}
                goToPreviousStep={gåTilForrigeSteg}
                onContinueLater={navigator.fortsettSøknadSenere}
            >
                <SøkerOppsummeringspunkt søker={søkerInfo.søker} />
                <OppsummeringIndex.Punkt tittel={intl.formatMessage({ id: 'oppsummering.omBarnet' })}>
                    <VStack gap="2">
                        <BodyShort>{`Termindato: ${formatDate(barn.termindato)}`}</BodyShort>
                        {barn.erBarnetFødt && barn.fødselsdato && (
                            <BodyShort>{`Fødselsdato: ${
                                barn.fødselsdato ? formatDate(barn.fødselsdato) : undefined
                            }`}</BodyShort>
                        )}
                    </VStack>
                </OppsummeringIndex.Punkt>
                <BoIUtlandetOppsummeringspunkt
                    familiehendelseDato={barn.erBarnetFødt && barn.fødselsdato ? barn.fødselsdato : barn.termindato}
                    hendelseType={barn.erBarnetFødt ? HendelseType.FØDSEL : HendelseType.TERMIN}
                    utenlandsopphold={tempMappingOpphold(utenlandsopphold)}
                    tidligereUtenlandsopphold={tempMappingTidligere(utenlandsoppholdTidligere)}
                    senereUtenlandsopphold={tempMappingSenere(utenlandsoppholdSenere)}
                />
                <OppsummeringIndex.Punkt tittel={intl.formatMessage({ id: 'oppsummering.omArbeidsforhold' })}>
                    <VStack gap="2">
                        {aktiveArbeidsforhold.length > 0 && (
                            <ArbeidsforholdInformasjon visManglerInfo={false} arbeidsforhold={aktiveArbeidsforhold} />
                        )}
                        {inntektsinformasjon.harJobbetSomFrilans && frilans && (
                            <FrilansVisning frilans={frilans}></FrilansVisning>
                        )}
                        {inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende && egenNæring && (
                            <EgenNæringVisning næring={egenNæring}></EgenNæringVisning>
                        )}
                        {inntektsinformasjon.harHattArbeidIUtlandet &&
                            arbeidIUtlandet &&
                            arbeidIUtlandet.arbeidIUtlandet.map((arbeid) => (
                                <ArbeidIUtlandetVisning
                                    key={`${arbeid.fom}${arbeid.tom}${arbeid.arbeidsgiverNavn}`}
                                    arbeidIUtlandet={arbeid}
                                ></ArbeidIUtlandetVisning>
                            ))}
                        {(!inntektsinformasjon.harJobbetSomFrilans ||
                            !inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende ||
                            !inntektsinformasjon.harHattArbeidIUtlandet) && (
                            <BodyShort>{getTekstOmManglendeArbeidsforhold(inntektsinformasjon, intl)}</BodyShort>
                        )}
                    </VStack>
                </OppsummeringIndex.Punkt>
                <OppsummeringIndex.Punkt tittel={intl.formatMessage({ id: 'oppsummering.skjema' })}>
                    <VedleggOppsummering tilrettelegging={tilrettelegginger} />
                </OppsummeringIndex.Punkt>
                <OppsummeringIndex.Punkt
                    tittel={intl.formatMessage({ id: 'oppsummering.periodeMedSvangerskapspenger' })}
                >
                    <VStack gap="2">
                        {tilretteleggingMedFrilans && (
                            <VStack gap="2">
                                <div>
                                    <BodyShort className={bem.element('label')}>
                                        Risikofaktorer i jobben din som frilanser:
                                    </BodyShort>
                                    <BodyShort>{tilretteleggingMedFrilans.risikofaktorer}</BodyShort>
                                </div>
                                <div>
                                    <BodyShort className={bem.element('label')}>
                                        Tilretteleggingstiltak i jobben din som frilanser:
                                    </BodyShort>
                                    <BodyShort>{tilretteleggingMedFrilans.tilretteleggingstiltak}</BodyShort>
                                </div>
                            </VStack>
                        )}
                        {tilretteleggingMedSN && (
                            <VStack gap="2">
                                <div>
                                    <BodyShort
                                        className={bem.element('label')}
                                    >{`Risikofaktorer i ${tilretteleggingMedSN.arbeidsforhold.navn}`}</BodyShort>
                                    <BodyShort>{tilretteleggingMedSN.risikofaktorer}</BodyShort>
                                </div>
                                <div>
                                    <BodyShort className={bem.element('label')}>
                                        {`Tilretteleggingstiltak i ${tilretteleggingMedSN.arbeidsforhold.navn}`}
                                    </BodyShort>
                                    <BodyShort>{tilretteleggingMedSN.tilretteleggingstiltak}</BodyShort>
                                </div>
                            </VStack>
                        )}
                        <PeriodeOppsummering
                            perioder={allePerioderMedFomOgTom}
                            sisteDagForSvangerskapspenger={sisteDagForSvangerskapspenger}
                            barn={barn}
                        />
                    </VStack>
                </OppsummeringIndex.Punkt>
            </OppsummeringIndex>
        </ContentWrapper>
    );
};

export default Oppsummering;
