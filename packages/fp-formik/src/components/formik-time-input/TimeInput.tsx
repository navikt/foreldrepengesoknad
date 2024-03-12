import { TextField } from '@navikt/ds-react';
import React, { RefObject, useState } from 'react';
import classNames from 'classnames';
import { InputTime, TestProps } from '../../types';
import bemUtils from '../../utils/bemUtils';
import { getNumberFromNumberInputValue } from '../../utils/numberInputUtils';
import { hasValue } from '../../validation/validationUtils';
import './timeInput.scss';

const MAX_HOURS = 23;
const MAX_MINUTES = 59;

type TimeInputChangeFunc = (time: Partial<InputTime> | undefined, isValidTime: boolean) => void;

export type TimeInputLabels = {
    hours?: string;
    minutes?: string;
};

export type TimeInputLayout = 'vertical' | 'horizontal';
export interface TimeInputRefProps {
    refs?: {
        hours?: RefObject<HTMLInputElement>;
        minutes?: RefObject<HTMLInputElement>;
    };
}
export interface TimeInputLayoutProps {
    direction?: TimeInputLayout;
    compact?: boolean;
    justifyContent?: 'left' | 'center' | 'right';
    placeholders?: {
        hours: string;
        minutes: string;
    };
}

interface TimeInputProps extends TimeInputLayoutProps, TestProps, TimeInputRefProps {
    time?: InputTime | Partial<InputTime> | undefined;
    maxHours?: number;
    maxMinutes?: number;
    className?: string;
    disabled?: boolean;
    description?: React.ReactNode;
    labels?: TimeInputLabels;
    onChange: TimeInputChangeFunc;
}

const bem = bemUtils('timeInput');

export const isValidTime = (time: Partial<InputTime>): time is InputTime => {
    const hours = getNumberFromNumberInputValue(time.hours || '0');
    const minutes = getNumberFromNumberInputValue(time.minutes || '0');
    return hours !== undefined && minutes !== undefined;
};

const handleTimeChange = (time: Partial<InputTime>, onChange: TimeInputChangeFunc) => {
    onChange(time, isValidTime(time));
};

const TimeInput: React.FunctionComponent<TimeInputProps> = ({
    time = { hours: undefined, minutes: undefined },
    maxHours = MAX_HOURS,
    maxMinutes = MAX_MINUTES,
    direction: layout = 'normal',
    compact = true,
    justifyContent = 'center',
    placeholders,
    description,
    disabled,
    onChange,
    refs,
    className,
    labels = {
        hours: 'Timer',
        minutes: 'Minutter',
    },
    ...restProps
}) => {
    const [stateTime, setStateTime] = useState<Partial<InputTime> | undefined>(time);
    const testKey = restProps['data-testid'];

    return (
        <div
            data-testid={testKey}
            className={classNames(
                bem.block,
                bem.modifier(layout),
                bem.modifier(`content-${justifyContent}`),
                bem.modifierConditional('compact', compact),
                bem.modifierConditional('withValue', hasValue(time.hours) || hasValue(time.minutes)),
                bem.modifierConditional('withHours', hasValue(time.hours)),
                bem.modifierConditional('withMinutes', hasValue(time.minutes)),
                className,
            )}
        >
            <div className={bem.element('contentWrapper')}>
                <div className={bem.element('inputWrapper')}>
                    <span role="presentation" aria-hidden="true" className={bem.element('label')}>
                        {labels.hours}
                    </span>
                    {disabled ? (
                        <DisabledInput className={bem.element('hours')} />
                    ) : (
                        <TextField
                            label={labels.hours}
                            ref={refs?.hours}
                            className={bem.element('hours')}
                            type="text"
                            autoComplete={'off'}
                            inputMode={'numeric'}
                            pattern={'[0-9]*'}
                            placeholder={placeholders?.hours}
                            min={0}
                            max={maxHours}
                            maxLength={2}
                            value={stateTime?.hours || ''}
                            disabled={disabled}
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                                const newTime = { ...stateTime, hours: evt.target.value };
                                setStateTime(newTime);
                                handleTimeChange(newTime, onChange);
                            }}
                            hideLabel={true}
                            data-testid={testKey ? `${testKey}_hours` : undefined}
                        />
                    )}
                </div>
                <div className={bem.element('inputWrapper')}>
                    <span className={bem.element('label')} role="presentation" aria-hidden={true}>
                        {labels.minutes}
                    </span>
                    {disabled ? (
                        <DisabledInput className={bem.element('minutes')} />
                    ) : (
                        <TextField
                            label={labels.minutes}
                            hideLabel={true}
                            className={bem.element('minutes')}
                            ref={refs?.minutes}
                            type="text"
                            autoComplete={'off'}
                            inputMode={'numeric'}
                            placeholder={placeholders?.minutes}
                            pattern={'[0-9]*'}
                            min={0}
                            maxLength={2}
                            max={maxMinutes}
                            value={stateTime?.minutes || ''}
                            disabled={disabled}
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                                const newTime = { ...stateTime, minutes: evt.target.value };
                                setStateTime(newTime);
                                handleTimeChange(newTime, onChange);
                            }}
                            data-testid={testKey ? `${testKey}_minutes` : undefined}
                        />
                    )}
                </div>
            </div>
            {description && <p className={bem.element('description')}>{description}</p>}
        </div>
    );
};

const DisabledInput = ({ className }: { className: string }) => {
    return (
        <div className={className} role="presentation" aria-hidden={true}>
            <div className={`navds-text-field__input navds-form-field--medium fakeDisabledInput`}> </div>
        </div>
    );
};

export default TimeInput;
