import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Select } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const LanguageToggle: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return (
        <Select
            label=""
            hideLabel
            onChange={(evt) => changeLocale(evt.target.value as LocaleAll)}
            defaultValue={locale}
        >
            <option value="nb">
                <FormattedMessage id="LanguageToggle.Norsk" />
            </option>
            <option value="en">
                <FormattedMessage id="LanguageToggle.Engelsk" />
            </option>
        </Select>
    );
};

export default LanguageToggle;