import { ChevronDownIcon } from '@navikt/aksel-icons';
import { JSX } from 'react';
import { Button, Menu, MenuItem, Wrapper } from 'react-aria-menubutton';
import { FormattedMessage } from 'react-intl';

import { List } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';

import { NorwayFlagSVG } from './NorwayFlag';
import './languageToggle.css';

const MenuListItem = ({ locale }: { locale: LocaleAll }) => {
    return (
        <List.Item key={locale}>
            <MenuItem className="languageToggle__menu__item">
                <div className="languageToggle__button__flag">
                    <NorwayFlagSVG />
                </div>
                <div className="languageToggle__button__language" data-locale={locale}>
                    {locale === 'en' && <FormattedMessage id="LanguageToggle.en" />}
                    {locale === 'nb' && <FormattedMessage id="LanguageToggle.nb" />}
                    {locale === 'nn' && <FormattedMessage id="LanguageToggle.nn" />}
                </div>
            </MenuItem>
        </List.Item>
    );
};

interface LanguageToggleProps<T extends LocaleAll> {
    locale: T;
    availableLocales: T[];
    toggleLanguage: (locale: T) => void;
}

export const LanguageToggle = <T extends LocaleAll>({
    locale,
    availableLocales,
    toggleLanguage,
}: LanguageToggleProps<T>) => {
    const selectableOtherMenuLanguages: T[] = [...availableLocales].filter((code) => code !== locale);

    return (
        <div className="languageToggle__without_background">
            <Wrapper
                className="languageToggle__wrapper"
                onSelection={(element: JSX.Element[]) => toggleLanguage(element[1].props['data-locale'])}
            >
                <Button className="languageToggle__button">
                    <div className="languageToggle__button__flag">
                        <NorwayFlagSVG />
                    </div>
                    <div className="languageToggle__button__language">
                        {locale === 'en' && <FormattedMessage id="LanguageToggle.en" />}
                        {locale === 'nb' && <FormattedMessage id="LanguageToggle.nb" />}
                        {locale === 'nn' && <FormattedMessage id="LanguageToggle.nn" />}
                    </div>
                    <div>
                        <ChevronDownIcon />
                    </div>
                </Button>
                <Menu className="languageToggle__menu">
                    <List>
                        {selectableOtherMenuLanguages.map((code) => (
                            <MenuListItem key={code} locale={code} />
                        ))}
                    </List>
                </Menu>
            </Wrapper>
        </div>
    );
};
