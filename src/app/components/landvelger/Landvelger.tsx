import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import Select from 'common/components/skjema/wrappers/Select';
import { Validator } from 'common/lib/validation/types';
import { SelectChangeEvent } from '../../types/dom/Events';

interface StateProps {
    defaultValue?: string;
    label: React.ReactNode;
    validators?: Validator[];
    navn?: string;
    onChange: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
    infotekst?: string;
}

type Props = StateProps & InjectedIntlProps;

interface CountryOptionsCache {
    locale: string;
    options: React.ReactNode[];
}

class Landvelger extends React.Component<Props> {
    countryOptionsCache: CountryOptionsCache;
    constructor(props: Props) {
        super(props);
        this.getCountryOptions = this.getCountryOptions.bind(this);
        this.updateCache = this.updateCache.bind(this);
    }

    updateCache(intl: InjectedIntl) {
        this.countryOptionsCache = {
            locale: intl.locale,
            options: createCountryOptions(intl)
        };
    }

    getCountryOptions(): React.ReactNode[] {
        if (!this.countryOptionsCache || this.props.intl.locale !== this.countryOptionsCache.locale) {
            this.updateCache(this.props.intl);
        }
        return this.countryOptionsCache.options;
    }

    render() {
        const { validators, onChange, navn, infotekst, ...restProps } = this.props;
        return (
            <Select
                name={navn || 'land'}
                {...restProps}
                infotekst={infotekst}
                onChange={(e: SelectChangeEvent) => onChange(e.target.value, e)}
                validators={validators}>
                <option value="" />
                {this.getCountryOptions()}
            </Select>
        );
    }
}

const createCountryOptions = (intl: InjectedIntl): React.ReactNode[] => {
    const språk = intl.locale;
    const isoCodeIndex = 0;
    const countryNameIndex = 1;
    return Object.entries(countries.getNames(språk))
        .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], språk))
        .filter((countryOptionValue) => countryOptionValue[isoCodeIndex] !== 'NO')
        .map((countryOptionValue: string[]) => (
            <option key={countryOptionValue[isoCodeIndex]} value={countryOptionValue[isoCodeIndex]}>
                {countryOptionValue[countryNameIndex]}
            </option>
        ));
};

export default injectIntl(Landvelger);
