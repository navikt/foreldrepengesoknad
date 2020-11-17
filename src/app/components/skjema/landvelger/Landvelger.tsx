import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { injectIntl, IntlShape } from 'react-intl';
import Select from 'common/components/skjema/wrappers/Select';
import { Validator } from 'common/lib/validation/types';
import { SelectChangeEvent } from 'common/types/Events';

interface StateProps {
    defaultValue?: string;
    label: React.ReactNode;
    validators?: Validator[];
    navn?: string;
    onChange: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
    infotekst?: string;
    visBareEuOgEftaLand?: boolean;
    intl: IntlShape;
}

type Props = StateProps;

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

    updateCache(intl: IntlShape) {
        this.countryOptionsCache = {
            locale: intl.locale,
            options: createCountryOptions(
                this.props.visBareEuOgEftaLand ? this.props.visBareEuOgEftaLand : false,
                intl
            ),
        };
    }

    getCountryOptions(): React.ReactNode[] {
        if (!this.countryOptionsCache || this.props.intl.locale !== this.countryOptionsCache.locale) {
            this.updateCache(this.props.intl);
        }
        return this.countryOptionsCache.options;
    }

    render() {
        const { validators, onChange, navn, infotekst, visBareEuOgEftaLand, ...restProps } = this.props;
        return (
            <Select
                name={navn || 'land'}
                {...restProps}
                infotekst={infotekst}
                onChange={(e: SelectChangeEvent) => onChange(e.target.value, e)}
                validators={validators}
                autoComplete="off"
            >
                <option value="" />
                {this.getCountryOptions()}
            </Select>
        );
    }
}

const filteredListEØSCountries = (countryOptionValue: [string, string | string[]], shouldFilter?: boolean) => {
    if (shouldFilter) {
        switch (countryOptionValue[0]) {
            case 'BE':
            case 'BG':
            case 'DK':
            case 'EE':
            case 'FI':
            case 'FR':
            case 'GR':
            case 'IE':
            case 'IS':
            case 'IT':
            case 'HR':
            case 'CY':
            case 'LV':
            case 'LI':
            case 'LT':
            case 'LU':
            case 'MT':
            case 'NL':
            case 'PL':
            case 'PT':
            case 'RO':
            case 'SK':
            case 'SI':
            case 'ES':
            case 'GB':
            case 'SE':
            case 'CZ':
            case 'DE':
            case 'HU':
            case 'AT':
            case 'CH':
                return true;
            default:
                return false;
        }
    } else {
        // Filter ut Antarktis
        return countryOptionValue[0] !== 'AQ';
    }
};

const createCountryOptions = (visBareEuOgEftaLand: boolean, intl: IntlShape): React.ReactNode[] => {
    const språk = intl.locale;
    const isoCodeIndex = 0;
    const countryNameIndex = 1;

    return Object.entries(countries.getNames(språk))
        .sort((a: [string, string | string[]], b: [string, string | string[]]) =>
            typeof a[1] === 'string' && typeof b[1] === 'string' ? a[1].localeCompare(b[1], språk) : 1
        )
        .filter((countryOptionValue: [string, string | string[]]) =>
            filteredListEØSCountries(countryOptionValue, visBareEuOgEftaLand)
        )
        .map((countryOptionValue: [string, string | string[]]) => (
            <option key={countryOptionValue[isoCodeIndex]} value={countryOptionValue[isoCodeIndex]}>
                {countryOptionValue[countryNameIndex]}
            </option>
        ));
};

export default injectIntl(Landvelger);
