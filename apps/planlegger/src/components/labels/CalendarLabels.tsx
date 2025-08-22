import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { getDefaultNavnSøker1, getDefaultNavnSøker2 } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert } from 'utils/barnetUtils';
import {
    HvemHarRett,
    harKunFarSøker1Rett,
    harKunMedmorEllerFarSøker2Rett,
    harKunMorRett,
} from 'utils/hvemHarRettUtils';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { HvemPlanleggerType, SaksperiodeNy, UtsettelseÅrsakType } from '@navikt/fp-types';
import { CalendarLabel } from '@navikt/fp-ui';

import { AktivitetskravLabel } from './calendar-labels/AktivitetskravLabel';
import { AntallUkerFpLabel } from './calendar-labels/AntallUkerFpLabel';
import { BarnehageplassLabel } from './calendar-labels/BarnehageplassLabel';
import { FamiliehendelseLabel } from './calendar-labels/FamiliehendelseLabel';
import { ForeldrepengerLabel } from './calendar-labels/ForeldrepengerLabel';

interface Props {
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    hvemHarRett: HvemHarRett;
    uttaksplan: SaksperiodeNy[];
    inneholderTapteDager?: boolean;
}

export const CalendarLabels = ({ barnet, hvemPlanlegger, hvemHarRett, uttaksplan, inneholderTapteDager }: Props) => {
    const intl = useIntl();

    const erAdoptert = erBarnetAdoptert(barnet);

    const erFarOgFar = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;
    const søker1Tekst = getDefaultNavnSøker1(hvemPlanlegger, intl);
    const søker2Tekst = getDefaultNavnSøker2(hvemPlanlegger, intl);

    const erFarOgFarOgFødsel = erFarOgFar && !erAdoptert;
    const erFarOgFarOgAdopsjon = erFarOgFar && erAdoptert;

    const inneholderFerie =
        uttaksplan.find((p) => p.utsettelseÅrsak && p.utsettelseÅrsak === UtsettelseÅrsakType.Ferie) !== undefined;

    const skalViseAntallUkerLabels =
        !erFarOgFarOgFødsel &&
        (hvemHarRett === 'beggeHarRett' ||
            (harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger) && !erFarOgFarOgAdopsjon) ||
            harKunMorRett(hvemHarRett, hvemPlanlegger));
    const skalViseAktivitetskravLabels =
        !erFarOgFarOgFødsel &&
        søker2Tekst &&
        (harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) ||
            (hvemHarRett === 'kunSøker1HarRett' && erFarOgFarOgAdopsjon));

    return (
        <VStack gap="space-4">
            {skalViseAntallUkerLabels && (
                <HStack gap="space-8">
                    <AntallUkerFpLabel søkerTekst={søker1Tekst} isBluePanel />
                    {søker2Tekst && hvemHarRett === 'beggeHarRett' && <AntallUkerFpLabel søkerTekst={søker2Tekst} />}
                    <FamiliehendelseLabel barnet={barnet} />
                    {!erAdoptert && <BarnehageplassLabel barnet={barnet} />}
                    {inneholderTapteDager && (
                        <CalendarLabel iconType={PeriodeColor.BLACK}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                <FormattedMessage id="CalendarLabels.TapteDager" />
                            </BodyShort>
                        </CalendarLabel>
                    )}
                    {inneholderFerie && (
                        <CalendarLabel iconType={PeriodeColor.BLUEOUTLINE}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                <FormattedMessage id="CalendarLabels.Ferie" />
                            </BodyShort>
                        </CalendarLabel>
                    )}
                </HStack>
            )}
            {skalViseAktivitetskravLabels && (
                <HStack gap="space-8">
                    <AktivitetskravLabel utenAktivitetskrav isBluePanel />
                    <AktivitetskravLabel />
                    <FamiliehendelseLabel barnet={barnet} />
                    {!erAdoptert && <BarnehageplassLabel barnet={barnet} />}
                    {inneholderTapteDager && (
                        <CalendarLabel iconType={PeriodeColor.BLACK}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                <FormattedMessage id="CalendarLabels.TapteDager" />
                            </BodyShort>
                        </CalendarLabel>
                    )}
                    {inneholderFerie && (
                        <CalendarLabel iconType={PeriodeColor.BLUEOUTLINE}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                <FormattedMessage id="CalendarLabels.Ferie" />
                            </BodyShort>
                        </CalendarLabel>
                    )}
                </HStack>
            )}
            {erFarOgFarOgFødsel && (
                <HStack gap="space-8">
                    <ForeldrepengerLabel />
                    <FamiliehendelseLabel barnet={barnet} />
                    {!erAdoptert && <BarnehageplassLabel barnet={barnet} />}
                    {inneholderTapteDager && (
                        <CalendarLabel iconType={PeriodeColor.BLACK}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                <FormattedMessage id="CalendarLabels.TapteDager" />
                            </BodyShort>
                        </CalendarLabel>
                    )}
                    {inneholderFerie && (
                        <CalendarLabel iconType={PeriodeColor.BLUEOUTLINE}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                <FormattedMessage id="CalendarLabels.Ferie" />
                            </BodyShort>
                        </CalendarLabel>
                    )}
                </HStack>
            )}
        </VStack>
    );
};
