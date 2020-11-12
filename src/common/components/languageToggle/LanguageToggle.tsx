import * as React from 'react';
import { useIntl, IntlShape } from 'react-intl';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
const { NedChevron } = require('nav-frontend-chevron');
import 'nav-frontend-lenker-style';

import getMessage from 'common/util/i18nUtils';
import './languageToggle.less';
import UKFlagSVG from 'common/components/flags/UkFlagSvg';
import NorwayFlagSVG from 'common/components/flags/NorwayFlagSVG';

interface Props {
    toggleLanguage: (langaugeCode: string) => void;
    language: string;
}

const getLanguageCodeFromValue = (value: string) => {
    if (value === 'Bokmål - Norsk') {
        return 'nb';
    } else if (value === 'Nynorsk - Norsk') {
        return 'nn';
    } else {
        return 'en';
    }
};

const getLanguageTextFromCode = (intl: IntlShape, code: string) => {
    if (code === 'nb') {
        return getMessage(intl, 'languageToggle.bokmål');
    } else if (code === 'nn') {
        return getMessage(intl, 'languageToggle.nynorsk');
    } else {
        return getMessage(intl, 'languageToggle.english');
    }
};

const renderMenuItem = (intl: IntlShape, languageCode: string) => {
    return (
        <li key={languageCode}>
            <MenuItem className="languageToggle__menu__item">
                <div className="languageToggle__button__flag">
                    {languageCode === 'en' ? <UKFlagSVG /> : <NorwayFlagSVG />}
                </div>
                <div className="languageToggle__button__language">{getLanguageTextFromCode(intl, languageCode)}</div>
            </MenuItem>
        </li>
    );
};

const handleSelection = (value: JSX.Element[], _e: any, toggleLanguage: any) => {
    toggleLanguage(getLanguageCodeFromValue(value[1].props.children));
};

const LanguageToggle: React.FunctionComponent<Props> = ({ language, toggleLanguage }) => {
    const intl = useIntl();
    const menuLanguages = ['nb', 'nn'].filter((code) => code !== language);

    return (
        <div className="languageToggle">
            <Wrapper
                className="languageToggle__wrapper"
                onSelection={(value: JSX.Element[], e: any) => handleSelection(value, e, toggleLanguage)}
            >
                <Button className="languageToggle__button">
                    <div className="languageToggle__button__flag">
                        {language === 'en' ? <UKFlagSVG /> : <NorwayFlagSVG />}
                    </div>
                    <div className="languageToggle__button__language">{getLanguageTextFromCode(intl, language)}</div>
                    <div>
                        <NedChevron />
                    </div>
                </Button>
                <Menu className="languageToggle__menu">
                    <ul>{menuLanguages.map((code) => renderMenuItem(intl, code))}</ul>
                </Menu>
            </Wrapper>
        </div>
    );
};
export default LanguageToggle;
