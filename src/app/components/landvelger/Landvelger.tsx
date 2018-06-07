import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { Select } from 'nav-frontend-skjema';
import { Feil } from 'common/components/skjema-input-element/types';
import ValidSelect from 'common/nav-frontend-validform/ValidSelect';
import { Språkkode } from 'common/intl/types';

interface StateProps {
    defaultValue?: string;
    språk: Språkkode;
    label: React.ReactNode;
    feil?: Feil;
    validators?: any;
    name?: string;
    onChange: (
        value: string,
        event?: React.ChangeEvent<HTMLSelectElement>
    ) => void;
}

export default class Landvelger extends React.Component<StateProps> {
    renderCountryOptions() {
        const { språk } = this.props;
        const isoCodeIndex = 0;
        const countryNameIndex = 1;
        return Object.entries(countries.getNames(språk))
            .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], språk))
            .filter(
                (countryOptionValue) =>
                    countryOptionValue[isoCodeIndex] !== 'NO'
            )
            .map((countryOptionValue: string[]) => (
                <option
                    key={countryOptionValue[isoCodeIndex]}
                    value={countryOptionValue[isoCodeIndex]}>
                    {countryOptionValue[countryNameIndex]}
                </option>
            ));
    }

    render() {
        const { validators, onChange, ...restProps } = this.props;
        const SelectComponent =
            validators && validators.length > 0 ? ValidSelect : Select;
        return (
            <SelectComponent
                {...restProps}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    onChange(e.target.value, e)
                }
                validators={validators}>
                <option value="" />
                {this.renderCountryOptions()}
            </SelectComponent>
        );
    }
}
