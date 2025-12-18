import { MinusIcon, PlusIcon } from '@navikt/aksel-icons';
import { useIntl } from 'react-intl';
import { UkerOgDager } from 'utils/stønadskontoerUtils';

import { BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { SliderComponent } from './slider';

interface FordelingSliderProps {
    antallDagerSøker1: number | undefined;
    antallUkerOgDagerFellesperiode: UkerOgDager;
    fornavnSøker1: string | undefined;
    fornavnSøker2: string | undefined;
    onValueChange: (value: number) => void;
    ariaLabelledby: string;
    gap?: 'space-4' | 'space-8';
}

export const FordelingSlider = ({
    antallDagerSøker1,
    antallUkerOgDagerFellesperiode,
    fornavnSøker1,
    fornavnSøker2,
    onValueChange,
    ariaLabelledby,
    gap = 'space-8',
}: FordelingSliderProps) => {
    const intl = useIntl();

    const totalDager = antallUkerOgDagerFellesperiode.uker * 5 + antallUkerOgDagerFellesperiode.dager;

    return (
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4">
            <VStack gap={gap} align="start">
                <BodyShort weight="semibold">{fornavnSøker1}</BodyShort>
                {antallDagerSøker1 !== undefined && (
                    <Heading size="small" level="4">
                        {intl.formatMessage({ id: 'FordelingSteg.Uker' }, { uker: Math.floor(antallDagerSøker1 / 5) })}
                    </Heading>
                )}
                {antallDagerSøker1 !== undefined && (
                    <Button
                        type="button"
                        variant="tertiary"
                        size="small"
                        icon={<MinusIcon aria-hidden />}
                        aria-label={intl.formatMessage(
                            { id: 'FordelingSteg.ReduserAntallUker' },
                            { navn: fornavnSøker1 },
                        )}
                        onClick={() => {
                            const newValue = Math.max(0, antallDagerSøker1 - 5);
                            onValueChange(newValue);
                        }}
                        disabled={antallDagerSøker1 <= 0}
                    />
                )}
            </VStack>
            <SliderComponent
                min={0}
                max={totalDager}
                step={5}
                value={[totalDager - (antallDagerSøker1 ?? 0)]}
                ariaLabelledby={ariaLabelledby}
                getAriaValueText={(sliderVerdi) => {
                    const dager1 = totalDager - sliderVerdi;
                    const uker1 = Math.floor(dager1 / 5);
                    const dager1Rest = dager1 % 5;
                    const resterende = totalDager - dager1;
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
                        onValueChange(totalDager - value[0]);
                    }
                }}
            />
            <VStack gap={gap} align="end">
                <BodyShort weight="semibold">{fornavnSøker2}</BodyShort>
                {antallDagerSøker1 !== undefined && (
                    <Heading size="small" level="4">
                        {intl.formatMessage(
                            { id: 'FordelingSteg.Uker' },
                            { uker: Math.floor((totalDager - antallDagerSøker1) / 5) },
                        )}
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
                            const newValue = Math.min(totalDager, antallDagerSøker1 + 5);
                            onValueChange(newValue);
                        }}
                        disabled={antallDagerSøker1 >= totalDager}
                    />
                )}
            </VStack>
        </div>
    );
};
