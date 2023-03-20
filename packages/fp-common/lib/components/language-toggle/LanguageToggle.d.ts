import React from 'react';
import { Locale } from '../../types/Locale';
import './languageToggle.less';
export interface LanguageToggleProps {
    toggle: (locale: Locale) => void;
    locale: Locale;
    availableLocales: Locale[];
}
declare const LanguageToggle: React.FunctionComponent<LanguageToggleProps>;
export default LanguageToggle;
