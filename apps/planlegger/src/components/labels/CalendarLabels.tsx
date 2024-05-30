import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert } from 'utils/barnetUtils';
import { HvemHarRett, harKunFarSøker1Rett, harKunMorRett, harMedmorEllerFarSøker2Rett } from 'utils/hvemHarRettUtils';
import { Uttaksdata } from 'utils/uttakUtils';

import { HStack, VStack } from '@navikt/ds-react';

import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

import AktivitetskravLabel from './calendarLabels/AktivitetskravLabel';
import AntallUkerFpLabel from './calendarLabels/AntallUkerFpLabel';
import FamiliehendelseLabel from './calendarLabels/FamiliehendelseLabel';
import ForeldrepengerLabel from './calendarLabels/ForeldrepengerLabel';

interface Props {
    barnet: OmBarnet;
    uttaksdata: Uttaksdata;
    hvemPlanlegger: HvemPlanlegger;
    hvemHarRett: HvemHarRett;
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad;
}

const CalendarLabels: FunctionComponent<Props> = ({
    barnet,
    uttaksdata,
    hvemPlanlegger,
    hvemHarRett,
    valgtStønadskonto,
}) => {
    const intl = useIntl();

    const erAdoptert = erBarnetAdoptert(barnet);

    const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;
    const søker1Tekst = getFornavnPåSøker1(hvemPlanlegger, intl);
    const søker2Tekst = getFornavnPåSøker2(hvemPlanlegger, intl);

    const { startdatoPeriode1, sluttdatoPeriode1, startdatoPeriode2, sluttdatoPeriode2 } = uttaksdata;

    const erFarOgFarOgFødsel = erFarOgFar && !erAdoptert;
    const erFarOgFarOgAdopsjon = erFarOgFar && erAdoptert;

    const skalViseAntallUkerLabels =
        !erFarOgFarOgFødsel &&
        (hvemHarRett === 'beggeHarRett' ||
            (harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger) && !erFarOgFarOgAdopsjon) ||
            harKunMorRett(hvemHarRett, hvemPlanlegger));
    const skalViseAktivitetskravLabels =
        !erFarOgFarOgFødsel &&
        søker2Tekst &&
        startdatoPeriode2 &&
        sluttdatoPeriode2 &&
        (harMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) ||
            (hvemHarRett === 'kunSøker1HarRett' && erFarOgFarOgAdopsjon));

    const farOgFarAdopsjonDerKunSøker1HarRett = hvemHarRett === 'kunSøker1HarRett' && erFarOgFarOgAdopsjon;

    return (
        <VStack gap="1">
            {skalViseAntallUkerLabels && (
                <HStack gap="2">
                    <AntallUkerFpLabel søkerTekst={søker1Tekst} isBluePanel />
                    {søker2Tekst && hvemHarRett === 'beggeHarRett' && startdatoPeriode2 && sluttdatoPeriode2 && (
                        <AntallUkerFpLabel søkerTekst={søker2Tekst} />
                    )}
                    <FamiliehendelseLabel barnet={barnet} />
                </HStack>
            )}
            {skalViseAktivitetskravLabels && (
                <HStack gap="2">
                    <AktivitetskravLabel
                        utenAktivitetskrav
                        valgtStønadskonto={valgtStønadskonto}
                        tekstPart1={farOgFarAdopsjonDerKunSøker1HarRett ? søker1Tekst : søker2Tekst}
                        tekstPart2={farOgFarAdopsjonDerKunSøker1HarRett ? søker2Tekst : søker1Tekst}
                        isBluePanel
                    />
                    <AktivitetskravLabel
                        valgtStønadskonto={valgtStønadskonto}
                        tekstPart1={farOgFarAdopsjonDerKunSøker1HarRett ? søker1Tekst : søker2Tekst}
                        tekstPart2={farOgFarAdopsjonDerKunSøker1HarRett ? søker2Tekst : søker1Tekst}
                    />
                    <FamiliehendelseLabel barnet={barnet} />
                </HStack>
            )}
            {erFarOgFarOgFødsel && (
                <HStack gap="2">
                    <ForeldrepengerLabel startdato={startdatoPeriode1} sluttdato={sluttdatoPeriode1} />
                    <FamiliehendelseLabel barnet={barnet} />
                </HStack>
            )}
        </VStack>
    );
};

export default CalendarLabels;
