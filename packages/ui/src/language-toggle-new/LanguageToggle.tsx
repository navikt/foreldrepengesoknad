import { FormattedMessage } from 'react-intl';

import { Select } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const LanguageToggle = ({ locale, changeLocale }: Props) => {
    return (
        <Select
            label="Velg språk"
            hideLabel
            onChange={(evt) => changeLocale(evt.target.value as LocaleAll)}
            defaultValue={locale}
        >
            <option value="nb">
                <FormattedMessage id="LanguageToggle.nb" />
            </option>
            <option value="nn">
                <FormattedMessage id="LanguageToggle.nn" />
            </option>
            <option value="en">
                <FormattedMessage id="LanguageToggle.en" />
            </option>
        </Select>
    );
};
