import { ChatElipsisIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { TilgjengeligeStønadskontoer } from 'types/TilgjengeligeStønadskontoer';
import {
    erAlenesøker as erAlene,
    erFarOgFar,
    finnSøker1Tekst,
    finnSøker2Tekst,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
} from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import {
    getAntallUker,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepengerFørFødsel,
} from 'utils/stønadskontoerUtils';

import { BodyLong, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

const onToggleExpansionCard = (open: boolean) => {
    if (open) {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'planlegger',
            team: 'foreldrepenger',
            pageKey: 'toggle-oppgitt-informasjon',
        });
    }
};

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    hvorLangPeriode: HvorLangPeriode;
    fordeling?: Fordeling;
}

const OppgittInformasjon: FunctionComponent<Props> = ({
    stønadskontoer,
    barnet,
    hvemPlanlegger,
    arbeidssituasjon,
    hvorLangPeriode,
    fordeling,
}) => {
    const intl = useIntl();

    const erFødt = erBarnetFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    const antallBarn = barnet.antallBarn;

    const erFedre = erFarOgFar(hvemPlanlegger);
    const erAlenesøker = erAlene(hvemPlanlegger);
    const fornavn1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavn2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    const getTekstTilFar1 = () => {
        if (
            getFornavnPåSøker1(hvemPlanlegger, intl) === 'Far' ||
            getFornavnPåSøker1(hvemPlanlegger, intl) === 'Father'
        ) {
            return <FormattedMessage id="OppgittInformasjon.TekstFar1" />;
        }
        return getFornavnPåSøker1(hvemPlanlegger, intl);
    };
    const getTekstTilFar2 = () => {
        if (
            getFornavnPåSøker2(hvemPlanlegger, intl) === 'Far' ||
            getFornavnPåSøker2(hvemPlanlegger, intl) === 'Father'
        ) {
            return <FormattedMessage id="OppgittInformasjon.TekstFar2" />;
        }
        return getFornavnPåSøker2(hvemPlanlegger, intl);
    };

    const fornavnFar1 = getTekstTilFar1();
    const fornavnFar2 = getTekstTilFar2();

    const valgtStønadskonto = stønadskontoer[hvorLangPeriode.dekningsgrad];
    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);
    const antallUker = getAntallUker(valgtStønadskonto);

    const antallUkerAdopsjon = erAdoptert
        ? getAntallUker(valgtStønadskonto) - getAntallUkerForeldrepengerFørFødsel(valgtStønadskonto)
        : getAntallUker(valgtStønadskonto);

    const antallUkerFellesperiodeSøker1 = fordeling ? fordeling.antallUkerSøker1 : '';
    const antallUkerFellesperiodeSøker2 = fordeling ? antallUkerFellesperiode - fordeling.antallUkerSøker1 : '';

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const erFarOgFarFødsel = hvemPlanlegger.type === Situasjon.FAR_OG_FAR && !erAdoptert;

    return (
        <VStack gap="10">
            <ExpansionCard aria-label="" onToggle={onToggleExpansionCard} size="small">
                <ExpansionCard.Header>
                    <HStack gap="6" align="center" wrap={false}>
                        <IconCircleWrapper size="medium" color="green">
                            <ChatElipsisIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage id="OppgittInformasjon.OppgittInformasjon" values={{ erAlenesøker }} />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="10">
                        <GreenPanel>
                            <>
                                <Heading size="small" level="4">
                                    <FormattedMessage id="OppgittInformasjon.Barnet.Tittel" values={{ antallBarn }} />
                                </Heading>

                                {barnet.erFødsel && erFødt && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.InformasjonOmBarn"
                                            values={{
                                                antallBarn,
                                                erFødt,
                                                dato: intl.formatDate(barnet.fødselsdato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                dato2: intl.formatDate(barnet.termindato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                                {barnet.erFødsel && !erFødt && !erAdoptert && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.InformasjonOmBarn"
                                            values={{
                                                antallBarn,
                                                erFødt,
                                                dato: intl.formatDate(barnet.termindato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                                {erAdoptert && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.InformasjonOmBarnAdopsjon"
                                            values={{
                                                antallBarn,
                                                dato2: intl.formatDate(barnet.fødselsdato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                dato: intl.formatDate(barnet.overtakelsesdato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                            </>
                        </GreenPanel>
                        <GreenPanel>
                            <>
                                <Heading size="small" level="4">
                                    <FormattedMessage id="OppgittInformasjon.Arbeid.Tittel" />
                                </Heading>

                                {erAlenesøker && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.Arbeidssituasjon"
                                            values={{
                                                navn: fornavn1,
                                                arbeidssituasjon: arbeidssituasjon.status,
                                            }}
                                        />
                                    </BodyLong>
                                )}
                                {!erAlenesøker && (
                                    <>
                                        {hvemHarRett === 'beggeHarRett' && (
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="OppgittInformasjon.ArbeidssituasjonBeggeJobber"
                                                    values={{
                                                        navn: fornavn1,
                                                        navn2: fornavn2,
                                                        arbeidssituasjon: arbeidssituasjon.status,
                                                    }}
                                                />
                                            </BodyLong>
                                        )}
                                        {hvemHarRett !== 'beggeHarRett' && erFedre && (
                                            <>
                                                <BodyLong>
                                                    <FormattedMessage
                                                        id="OppgittInformasjon.Arbeidssituasjon"
                                                        values={{
                                                            navn: fornavnFar1 ? fornavnFar1 : fornavn1,
                                                            arbeidssituasjon: arbeidssituasjon.status,
                                                        }}
                                                    />
                                                </BodyLong>
                                                <BodyLong>
                                                    <FormattedMessage
                                                        id="OppgittInformasjon.ArbeidssituasjonAnnenPart"
                                                        values={{
                                                            navn: fornavn2 ? fornavnFar2 : fornavn2,
                                                            arbeidssituasjon: arbeidssituasjon.jobberAnnenPart,
                                                        }}
                                                    />
                                                </BodyLong>
                                            </>
                                        )}
                                        {hvemHarRett !== 'beggeHarRett' && !erFedre && (
                                            <>
                                                <BodyLong>
                                                    <FormattedMessage
                                                        id="OppgittInformasjon.Arbeidssituasjon"
                                                        values={{
                                                            navn: fornavn1,
                                                            arbeidssituasjon: arbeidssituasjon.status,
                                                        }}
                                                    />
                                                </BodyLong>
                                                <BodyLong>
                                                    <FormattedMessage
                                                        id="OppgittInformasjon.ArbeidssituasjonAnnenPart"
                                                        values={{
                                                            navn: fornavn2,
                                                            arbeidssituasjon: arbeidssituasjon.jobberAnnenPart,
                                                        }}
                                                    />
                                                </BodyLong>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        </GreenPanel>
                        <GreenPanel>
                            <Heading size="small" level="4">
                                <FormattedMessage
                                    id="OppgittInformasjon.LengdeOgFordeling"
                                    values={{ kunEnPartSkalHa: hvemHarRett !== 'beggeHarRett' }}
                                />
                            </Heading>
                            <VStack gap="5">
                                <BodyLong>
                                    {!erFarOgFarFødsel && (
                                        <FormattedMessage
                                            id="OppgittInformasjon.FordelingOptionsMedUker"
                                            values={{
                                                erAlenesøker,
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                uker: erAdoptert ? antallUkerAdopsjon : antallUker,
                                                fellesuker: antallUkerFellesperiodeSøker1,
                                                fellesuker2: antallUkerFellesperiodeSøker2,
                                                hvem: finnSøker1Tekst(intl, hvemPlanlegger),
                                                hvem2: finnSøker2Tekst(intl, hvemPlanlegger),
                                                kunEnPartSkalHa: hvemHarRett !== 'beggeHarRett',
                                            }}
                                        />
                                    )}
                                    {erFarOgFarFødsel && (
                                        <FormattedMessage
                                            id="OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel"
                                            values={{
                                                erAlenesøker,
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                uker: erAdoptert ? antallUkerAdopsjon : antallUker,
                                            }}
                                        />
                                    )}
                                </BodyLong>
                            </VStack>
                        </GreenPanel>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};

export default OppgittInformasjon;
