import { Button, Menu, MenuItem, Wrapper } from 'react-aria-menubutton';
import { IntlShape, useIntl } from 'react-intl';
import { LocaleAll } from '@navikt/fp-types';
import intlHelper from '../../utils/intlUtils';
import NorwayFlagSVG from './NorwayFlag';
import { Expand } from '@navikt/ds-icons';

import './languageToggle.less';

export interface LanguageToggleProps<T extends LocaleAll> {
    toggle: (locale: T) => void;
    locale: T;
    availableLocales: T[];
    isCleanVersion?: boolean;
}

const renderMenuItem = (intl: IntlShape, locale: LocaleAll) => {
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

const LanguageToggle = <T extends LocaleAll>({
    locale,
    toggle: toggleLanguage,
    availableLocales,
    isCleanVersion = false,
}: LanguageToggleProps<T>) => {
    const selectableOtherMenuLanguages: T[] = [...availableLocales].filter((code) => code !== locale);
    const intl = useIntl();

    return (
        <div className={isCleanVersion ? 'languageToggle__without_background' : 'languageToggle__background'}>
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
