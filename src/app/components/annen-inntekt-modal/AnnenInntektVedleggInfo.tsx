import * as React from 'react';
import { AnnenInntektType } from '../../types/søknad/AnnenInntekt';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

interface OwnProps {
    type?: AnnenInntektType;
}

export type Props = OwnProps & InjectedIntlProps;

const AnnenInntektVedleggInfo: React.StatelessComponent<Props> = ({
    intl,
    type
}) => {
    if (type === undefined) {
        return null;
    }
    const textKey = `inntektstype.${type.toLowerCase()}_info`;
    const info = getMessage(intl, textKey);
    if (info === textKey) {
        return null;
    }
    return <Veilederinfo>{info}</Veilederinfo>;
};

export default injectIntl(AnnenInntektVedleggInfo);
