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
    visBareEuOgEftaLand?: boolean;
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
            options: createCountryOptions(this.props.visBareEuOgEftaLand ? this.props.visBareEuOgEftaLand : false, intl)
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
                validators={validators}>
                <option value="" />
                {this.getCountryOptions()}
            </Select>
        );
    }
}

const filteredListEØSCountries = (countryOptionValue: string, shouldFilter?: boolean) => {
    if (shouldFilter) {
        switch (countryOptionValue) {
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
        return true;
    }
};

const createCountryOptions = (filter: boolean, intl: InjectedIntl): React.ReactNode[] => {
    const språk = intl.locale;
    const isoCodeIndex = 0;
    const countryNameIndex = 1;

    return Object.entries(countries.getNames(språk))
        .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], språk))
        .filter((countryOptionValue: string[]) => filteredListEØSCountries(countryOptionValue[isoCodeIndex], filter))
        .map((countryOptionValue: string[]) => (
            <option key={countryOptionValue[isoCodeIndex]} value={countryOptionValue[isoCodeIndex]}>
                {countryOptionValue[countryNameIndex]}
            </option>
        ));
};

export default injectIntl(Landvelger);
