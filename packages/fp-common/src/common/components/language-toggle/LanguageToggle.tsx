import React from 'react';
import { Button, Menu, MenuItem, Wrapper } from 'react-aria-menubutton';
import { IntlShape, useIntl } from 'react-intl';
import { Locale } from '../../types/Locale';
import intlHelper from '../../utils/intlUtils';
import NorwayFlagSVG from './NorwayFlag';
import { Expand } from '@navikt/ds-icons';

import './languageToggle.less';

export interface LanguageToggleProps {
    toggle: (locale: Locale) => void;
    locale: Locale;
    availableLocales: Locale[];
}

const renderMenuItem = (intl: IntlShape, locale: Locale) => {
    return (
        <li key={locale}>
            <MenuItem className="languageToggle__menu__item">
                <div className="languageToggle__button__flag">
                    <NorwayFlagSVG />
                </div>
                <div className="languageToggle__button__language" data-locale={locale}>
                    {intlHelper(intl, `locale.${locale}`)}
                </div>
            </MenuItem>
        </li>
    );
};

const LanguageToggle: React.FunctionComponent<LanguageToggleProps> = ({
    locale,
    toggle: toggleLanguage,
    availableLocales,
}) => {
    const selectableOtherMenuLanguages: Locale[] = [...availableLocales].filter((code) => code !== locale) as Locale[];
    const intl = useIntl();

    return (
        <div className="languageToggle">
            <Wrapper
                className="languageToggle__wrapper"
                onSelection={(element: JSX.Element[]) => toggleLanguage(element[1].props['data-locale'])}
            >
                <Button className="languageToggle__button">
                    <div className="languageToggle__button__flag">
                        <NorwayFlagSVG />
                    </div>
                    <div className="languageToggle__button__language">{intlHelper(intl, `locale.${locale}`)}</div>
                    <div>
                        <Expand />
                    </div>
                </Button>
                <Menu className="languageToggle__menu">
                    <ul>{selectableOtherMenuLanguages.map((code) => renderMenuItem(intl, code))}</ul>
                </Menu>
            </Wrapper>
        </div>
    );
};
export default LanguageToggle;
