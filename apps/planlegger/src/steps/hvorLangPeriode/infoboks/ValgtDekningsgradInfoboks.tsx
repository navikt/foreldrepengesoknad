import { CalendarIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { erAlenesøker, erMorDelAvSøknaden, finnAnnenPartTekst } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import {
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerForeldrepenger,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoerUtils';
import { Uttaksdata, finnAntallUkerMedForeldrepenger, finnUttaksdata } from 'utils/uttakUtils';

import { BodyLong, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

interface Props {
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
    uttaksdata100: Uttaksdata;
    uttaksdata80: Uttaksdata;
    valgtDekningsgrad: Dekningsgrad;
}

const ValgtDekningsgradInfoboks: FunctionComponent<Props> = ({
    barnet,
    hvemPlanlegger,
    arbeidssituasjon,
    stønadskontoer,
    uttaksdata100,
    uttaksdata80,
    valgtDekningsgrad,
}) => {
    const intl = useIntl();

    const antallBarn = barnet.antallBarn;

    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    const farHarIkkeRett = arbeidssituasjon.jobberAnnenPart === false;

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const kunEnPartSkalHa = erAlenesøker(hvemPlanlegger) || morHarIkkeRett || farHarIkkeRett;

    const stønadskonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.HUNDRE_PROSENT],
    );
    const stønadskonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.ÅTTI_PROSENT],
    );
    const valgtStønadskonto = valgtDekningsgrad
        ? valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? stønadskonto100
            : stønadskonto80
        : [];

    const antallUker100 = finnAntallUkerMedForeldrepenger(uttaksdata100);
    const antallUker80 = finnAntallUkerMedForeldrepenger(uttaksdata80);
    const antallUker = valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? antallUker100 : antallUker80;

    const erAdopsjon = erBarnetAdoptert(barnet);
    const erFødt = erBarnetFødt(barnet);
    const uttaksdata = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet);
    const familiehendelsedato = dayjs(uttaksdata.familiehendelsedato).format('D. MMMM');

    const sluttdatoSøker1 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoSøker1
            : uttaksdata80.sluttdatoSøker1;

    const sluttdatoSøker2 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoSøker2
            : uttaksdata80.sluttdatoSøker2;

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
                        values={{ antallBarn, kunEnPartSkalHa, dato: familiehendelsedato }}
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
            {morHarIkkeRett && (
                <VStack gap="2">
                    <BodyLong>
                        <FormattedMessage
                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker"
                            values={{
                                uker: getAntallUkerAktivitetsfriKvote(valgtStønadskonto),
                                uker2: antallUker,
                                b: (msg: any) => <b>{msg}</b>,
                                hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
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
                                hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
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
