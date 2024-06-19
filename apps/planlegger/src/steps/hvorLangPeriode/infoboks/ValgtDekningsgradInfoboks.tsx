import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { erAlenesøker, erMorDelAvSøknaden, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerAktivitetsfriKvote, getAntallUkerForeldrepenger } from 'utils/stønadskontoerUtils';
import { Uttaksdata, finnUttaksdata } from 'utils/uttakUtils';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';

interface Props {
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad;
    uttaksdata100: Uttaksdata;
    uttaksdata80: Uttaksdata;
    valgtDekningsgrad: Dekningsgrad;
    antallUker: number;
}

const ValgtDekningsgradInfoboks: FunctionComponent<Props> = ({
    barnet,
    hvemPlanlegger,
    arbeidssituasjon,
    valgtStønadskonto,
    uttaksdata100,
    uttaksdata80,
    valgtDekningsgrad,
    antallUker,
}) => {
    const intl = useIntl();

    const antallBarn = barnet.antallBarn;
    const erAdopsjon = erBarnetAdoptert(barnet);
    const erFødt = erBarnetFødt(barnet);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const kunEnPartSkalHa =
        erAlenesøker(hvemPlanlegger) || hvemHarRett === 'kunSøker1HarRett' || hvemHarRett === 'kunSøker2HarRett';

    const uttaksdata = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet);

    const familiehendelsedato = intl.formatDate(uttaksdata.familiehendelsedato, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const sluttdatoSøker1 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoPeriode1
            : uttaksdata80.sluttdatoPeriode1;

    const sluttdatoSøker2 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoPeriode2
            : uttaksdata80.sluttdatoPeriode2;

    const erFarOgFarFødsel = hvemPlanlegger.type === Situasjon.FAR_OG_FAR && !erAdopsjon;

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
            icon={<CalendarIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <BodyShort>
                {erAdopsjon && (
                    <FormattedMessage
                        id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon"
                        values={{
                            antallBarn,
                            kunEnPartSkalHa,
                            dato: familiehendelsedato,
                        }}
                    />
                )}
                {!erAdopsjon && erFødt && (
                    <FormattedMessage
                        id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel"
                        values={{
                            antallBarn,
                            erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                            dato: familiehendelsedato,
                            kunEnPartSkalHa,
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
            {((hvemHarRett === 'kunSøker2HarRett' && !erFarOgFarFødsel) ||
                (hvemHarRett === 'kunSøker1HarRett' && hvemPlanlegger.type === Situasjon.FAR_OG_FAR && erAdopsjon)) && (
                <VStack gap="2">
                    <BodyShort>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker"
                            values={{
                                uker: getAntallUkerAktivitetsfriKvote(valgtStønadskonto),
                                uker2: antallUker,
                                b: (msg: any) => <b>{msg}</b>,
                                hvem: getFornavnPåSøker2(hvemPlanlegger, intl),
                                hvemPart1: getFornavnPåSøker1(hvemPlanlegger, intl),
                            }}
                        />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker"
                            values={{
                                uker: getAntallUkerForeldrepenger(valgtStønadskonto),
                                uker2: antallUker,
                                a: (msg: any) => (
                                    <Link
                                        inlineText
                                        href={links.godkjentAktivitet}
                                        className="lenke"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        {msg}
                                    </Link>
                                ),
                                b: (msg: any) => <b>{msg}</b>,
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

export default ValgtDekningsgradInfoboks;
