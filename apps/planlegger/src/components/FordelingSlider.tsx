import { PlusIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { UkerOgDager } from 'utils/stønadskontoerUtils';

import { BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { SliderComponent } from './slider';

interface FordelingSliderProps {
    antallDagerSøker1: number | undefined;
    onAntallDagerSøker1Change: (value: number) => void;
    antallUkerOgDagerFellesperiode: UkerOgDager;
    fornavnSøker1?: string;
    fornavnSøker2?: string;
    onScrollToBottom?: () => void;
}

export const FordelingSlider = ({
    antallDagerSøker1,
    onAntallDagerSøker1Change,
    antallUkerOgDagerFellesperiode,
    fornavnSøker1,
    fornavnSøker2,
    onScrollToBottom,
}: FordelingSliderProps) => {
    const intl = useIntl();

    const totalDager = antallUkerOgDagerFellesperiode.uker * 5 + antallUkerOgDagerFellesperiode.dager;

    return (
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-sm">
            <VStack gap="space-8" align="start">
                <BodyShort weight="semibold">{fornavnSøker1}</BodyShort>
                {antallDagerSøker1 !== undefined && (
                    <Heading size="small" level="4">
                        <FormattedMessage
                            id="FordelingSteg.Uker"
                            values={{ uker: Math.floor(antallDagerSøker1 / 5) }}
                        />
                    </Heading>
                )}
                {antallDagerSøker1 !== undefined && (
                    <Button
                        type="button"
                        variant="tertiary"
                        size="small"
                        icon={<PlusIcon aria-hidden />}
                        aria-label={intl.formatMessage({ id: 'FordelingSteg.ØkAntallUker' }, { navn: fornavnSøker1 })}
                        onClick={() => {
                            const newValue = Math.min(totalDager, antallDagerSøker1 + 5);
                            onAntallDagerSøker1Change(newValue);
                            onScrollToBottom?.();
                        }}
                        disabled={antallDagerSøker1 >= totalDager}
                    />
                )}
            </VStack>
            {/* Slideren er implementert omvendt: slider-verdien representerer antall dager til søker 2, 
    slik at det blir intuitivt at slideren beveger seg mot personen som får flere dager */}
            <SliderComponent
                min={0}
                max={totalDager}
                step={5}
                value={[antallDagerSøker1 === undefined ? totalDager / 2 : totalDager - antallDagerSøker1]}
                ariaLabelledby="fordeling-slider-label"
                getAriaValueText={(sliderValue) => {
                    const dager1 = totalDager - sliderValue;
                    const uker1 = Math.floor(dager1 / 5);
                    const dager1Rest = dager1 % 5;
                    const resterende = sliderValue;
                    const uker2 = Math.floor(resterende / 5);
                    const dager2Rest = resterende % 5;

                    return intl.formatMessage(
                        { id: 'FordelingSteg.Slider.AriaValueText' },
                        {
                            uker1,
                            dager1: dager1Rest,
                            uker2,
                            dager2: dager2Rest,
                            fornavn1: fornavnSøker1,
                            fornavn2: fornavnSøker2,
                        },
                    );
                }}
                onValueChange={(value) => {
                    if (value[0] !== undefined) {
                        onAntallDagerSøker1Change(totalDager - value[0]);
                        onScrollToBottom?.();
                    }
                }}
            />
            <VStack gap="space-8" align="end">
                <BodyShort style={{ fontWeight: 600 }}>{fornavnSøker2}</BodyShort>
                {antallDagerSøker1 !== undefined && (
                    <Heading size="small" level="4">
                        <FormattedMessage
                            id="FordelingSteg.Uker"
                            values={{
                                uker: Math.floor((totalDager - antallDagerSøker1) / 5),
                            }}
                        />
                    </Heading>
                )}
                {antallDagerSøker1 !== undefined && (
                    <Button
                        type="button"
                        variant="tertiary"
                        size="small"
                        icon={<PlusIcon aria-hidden />}
                        aria-label={intl.formatMessage({ id: 'FordelingSteg.ØkAntallUker' }, { navn: fornavnSøker2 })}
                        onClick={() => {
                            const newValue = Math.max(0, antallDagerSøker1 - 5);
                            onAntallDagerSøker1Change(newValue);
                            onScrollToBottom?.();
                        }}
                        disabled={antallDagerSøker1 <= 0}
                    />
                )}
            </VStack>
        </div>
    );
};
