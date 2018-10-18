import {
    Arbeidsform,
    Overføringsperiode,
    Periodetype,
    Utsettelsesperiode
} from '../../app/types/uttaksplan/periodetyper';
import getMessage from 'common/util/i18nUtils';
import { MessageValue, InjectedIntl } from 'react-intl';

export const getArbeidsformTekst = (
    intl: InjectedIntl,
    arbeidsform: Arbeidsform,
    messageValues?: { [key: string]: MessageValue }
) => {
    return getMessage(intl, `oppsummering.uttak.${arbeidsform.toLowerCase()}`, messageValues);
};

export const getÅrsakTekst = (
    intl: InjectedIntl,
    { type, årsak }: Utsettelsesperiode | Overføringsperiode,
    messageValues?: { [key: string]: MessageValue }
) => {
    const intlKeyPrefix = type === Periodetype.Utsettelse ? 'utsettelsesårsak.' : 'overføringsårsaktype.';
    return getMessage(intl, `${intlKeyPrefix + årsak}`, messageValues);
};
