import * as Slider from '@radix-ui/react-slider';

interface SliderComponentProps {
    value?: number[];
    onValueChange?: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number[];
}

export const SliderComponent = ({
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    defaultValue = [50],
}: SliderComponentProps) => (
    <Slider.Root
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        className="bg-green"
        defaultValue={defaultValue}
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
            className="bg-ax-bg-brand-blue-moderate"
            style={{
                position: 'relative',
                flexGrow: 1,
                backgroundColor: 'green',
                borderRadius: '9999px',
                height: '8px',
            }}
        >
            <Slider.Range
                style={{
                    position: 'absolute',
                    backgroundColor: 'red',
                    borderRadius: '9999px',
                    height: '100%',
                }}
            />
        </Slider.Track>
        <Slider.Thumb
            style={{
                display: 'block',
                width: '20px',
                height: '20px',
                backgroundColor: 'pink',
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
            }}
        />
    </Slider.Root>
);
