// Unntak å hente inn komponenter fra slike 3.parts-biblioteker, men siden native er problematisk
// å få til å se ut likt på tvers av nettlesere og @radix-ui/react-slider er brukt i flere prosjekter i NAV,
// så benytter vi oss av denne
import * as Slider from '@radix-ui/react-slider';

interface SliderComponentProps {
    value?: number[];
    onValueChange?: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number[];
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    getAriaValueText?: (value: number) => string;
}

export const RadixSlider = ({
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    defaultValue = [50],
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    getAriaValueText,
}: SliderComponentProps) => {
    const currentValue = (value ?? defaultValue)?.[0];
    const rootProps = (value === undefined ? { defaultValue } : { value }) as {
        value?: number[];
        defaultValue?: number[];
    };

    return (
        <Slider.Root
            min={min}
            max={max}
            step={step}
            onValueChange={onValueChange}
            {...rootProps}
            className="relative flex h-5 w-full touch-none items-center select-none"
        >
            <Slider.Track className="bg-ax-bg-default relative h-2 grow rounded-full">
                <Slider.Range className="absolute h-full rounded-full bg-ax-bg-default" />
            </Slider.Track>
            <Slider.Thumb
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                aria-describedby={ariaDescribedby}
                aria-orientation="horizontal"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={currentValue}
                aria-valuetext={getAriaValueText ? getAriaValueText(currentValue ?? min) : undefined}
                className={
                    'bg-ax-bg-brand-blue-strong block h-5 w-5 rounded-full border-2 border-white shadow-md ' +
                    'cursor-pointer outline outline-offset-2 outline-transparent'
                }
            />
        </Slider.Root>
    );
};
