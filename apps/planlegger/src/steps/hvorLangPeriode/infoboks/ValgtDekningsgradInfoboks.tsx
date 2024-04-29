import { CalendarIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerForDekningsgrad } from 'types/TilgjengeligeStønadskontoer';
import { erAlenesøker, erMorDelAvSøknaden, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerAktivitetsfriKvote, getAntallUkerForeldrepenger } from 'utils/stønadskontoerUtils';
import { Uttaksdata, finnUttaksdata } from 'utils/uttakUtils';

import { BodyLong, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

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

    const søker1HarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    const søker2HarIkkeRett = arbeidssituasjon.jobberAnnenPart === false;
    const kunEnPartSkalHa = erAlenesøker(hvemPlanlegger) || søker1HarIkkeRett || søker2HarIkkeRett;

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const uttaksdata = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet);

    const familiehendelsedato = dayjs(uttaksdata.familiehendelsedato).format('D. MMMM');

    const sluttdatoSøker1 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoPeriode1
            : uttaksdata80.sluttdatoPeriode1;

    const sluttdatoSøker2 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoPeriode2
            : uttaksdata80.sluttdatoPeriode2;

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
            icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <BodyLong>
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
            </BodyLong>
            {søker1HarIkkeRett && (
                <VStack gap="2">
                    <BodyLong>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker"
                            values={{
                                uker: getAntallUkerAktivitetsfriKvote(valgtStønadskonto),
                                uker2: antallUker,
                                b: (msg: any) => <b>{msg}</b>,
                                hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                            }}
                        />
                    </BodyLong>
                    <BodyLong>
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
                                hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                            }}
                        />
                    </BodyLong>
                </VStack>
            )}
        </Infobox>
    );
};

export default ValgtDekningsgradInfoboks;
