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

export const SliderComponent = ({
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
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '20px',
                userSelect: 'none',
                touchAction: 'none',
            }}
        >
            <Slider.Track
                style={{
                    position: 'relative',
                    flexGrow: 1,
                    backgroundColor: 'white',
                    borderRadius: '9999px',
                    height: '8px',
                }}
            >
                <Slider.Range
                    style={{
                        position: 'absolute',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '9999px',
                        height: '100%',
                    }}
                />
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
                style={{
                    display: 'block',
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'blue',
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    outline: '2px solid transparent',
                    outlineOffset: '2px',
                }}
            />
        </Slider.Root>
    );
};
