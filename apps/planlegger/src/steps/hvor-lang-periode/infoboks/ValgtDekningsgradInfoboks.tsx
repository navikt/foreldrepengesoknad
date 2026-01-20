import { CalendarIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import {
    erAlenesøker,
    erFarDelAvSøknaden,
    erFarOgFar,
    erMorDelAvSøknaden,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
} from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerOgDagerAktivitetsfriKvote, getAntallUkerOgDagerForeldrepenger } from 'utils/stønadskontoerUtils';
import { UttakUkerOgDager, Uttaksdata, getFamiliehendelsedato } from 'utils/uttakUtils';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Dekningsgrad, HvemPlanleggerType, KontoBeregningDto } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';

interface Props {
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    valgtStønadskonto: KontoBeregningDto;
    uttaksdata100: Uttaksdata;
    uttaksdata80: Uttaksdata;
    valgtDekningsgrad: Dekningsgrad;
    antallUkerOgDager: UttakUkerOgDager;
}

export const ValgtDekningsgradInfoboks = ({
    barnet,
    hvemPlanlegger,
    arbeidssituasjon,
    valgtStønadskonto,
    uttaksdata100,
    uttaksdata80,
    valgtDekningsgrad,
    antallUkerOgDager,
}: Props) => {
    const intl = useIntl();
    const antallBarn = barnet.antallBarn;
    const erAdopsjon = erBarnetAdoptert(barnet);
    const erFødt = erBarnetFødt(barnet);

    const erAlenesøkerValue = erAlenesøker(hvemPlanlegger);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const kunEnPartSkalHa =
        erAlenesøkerValue || hvemHarRett === 'kunSøker1HarRett' || hvemHarRett === 'kunSøker2HarRett';

    const familiehendelsedato = intl.formatDate(getFamiliehendelsedato(barnet), {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const sluttdatoSøker1 =
        valgtDekningsgrad === '100' ? uttaksdata100.sluttdatoPeriode1 : uttaksdata80.sluttdatoPeriode1;

    const sluttdatoSøker2 =
        valgtDekningsgrad === '100' ? uttaksdata100.sluttdatoPeriode2 : uttaksdata80.sluttdatoPeriode2;

    const erFarOgFarFødsel = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR && !erAdopsjon;

    return (
        <Infobox
            header={
                <FormattedMessage
                    id="HvorLangPeriodeSteg.Infoboks.SisteDagTittel"
                    values={{
                        dato: intl.formatDate(sluttdatoSøker2 || sluttdatoSøker1, {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            weekday: 'long',
                        }),
                    }}
                />
            }
            icon={
                <CalendarIcon
                    height={24}
                    width={24}
                    color="var(--ax-bg-neutral-strong)"
                    fontSize="1.5rem"
                    aria-hidden
                />
            }
            shouldFadeIn
            color="green"
        >
            <VStack paddingBlock="space-0 space-8">
                <BodyShort>
                    {erAdopsjon && (
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon"
                            values={{
                                antallBarn,
                                kunEnPartSkalHa,
                                dato: familiehendelsedato,
                                erOmsorgsovertakelseFremtidig: dayjs(getFamiliehendelsedato(barnet)).isAfter(dayjs()),
                            }}
                        />
                    )}
                    {!erAdopsjon && erFødt && (
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel"
                            values={{
                                antallBarn,
                                erFarOgFar: erFarOgFar(hvemPlanlegger),
                                kunEnPartSkalHa,
                                erAlenesøkerValue,
                                erFarDelAvSøknaden: erFarDelAvSøknaden(hvemPlanlegger),
                            }}
                        />
                    )}
                    {!erAdopsjon && !erFødt && (
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin"
                            values={{
                                antallBarn,
                                erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                                kunEnPartSkalHa,
                            }}
                        />
                    )}
                </BodyShort>
            </VStack>
            {((hvemHarRett === 'kunSøker2HarRett' && !erFarOgFarFødsel) ||
                (hvemHarRett === 'kunSøker1HarRett' &&
                    hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR &&
                    erAdopsjon)) && (
                <VStack gap="space-8">
                    <BodyShort>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker"
                            values={{
                                uker: getAntallUkerOgDagerAktivitetsfriKvote(valgtStønadskonto).uker,
                                dager: getAntallUkerOgDagerAktivitetsfriKvote(valgtStønadskonto).dager,
                                uker2: antallUkerOgDager.uker,
                                dager2: antallUkerOgDager.dager,
                                b: (msg) => <b>{msg}</b>,
                                hvem: getFornavnPåSøker2(hvemPlanlegger, intl),
                                hvemPart1: getFornavnPåSøker1(hvemPlanlegger, intl),
                            }}
                        />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker"
                            values={{
                                uker: getAntallUkerOgDagerForeldrepenger(valgtStønadskonto).uker,
                                dager: getAntallUkerOgDagerForeldrepenger(valgtStønadskonto).dager,
                                uker2: antallUkerOgDager.uker,
                                dager2: antallUkerOgDager.dager,
                                a: (msg) => (
                                    <Link inlineText href={links.godkjentAktivitet} rel="noreferrer" target="_blank">
                                        {msg}
                                    </Link>
                                ),
                                b: (msg) => <b>{msg}</b>,
                                hvem: getFornavnPåSøker2(hvemPlanlegger, intl),
                                hvemPart1: getFornavnPåSøker1(hvemPlanlegger, intl),
                            }}
                        />
                    </BodyShort>
                </VStack>
            )}
        </Infobox>
    );
};
