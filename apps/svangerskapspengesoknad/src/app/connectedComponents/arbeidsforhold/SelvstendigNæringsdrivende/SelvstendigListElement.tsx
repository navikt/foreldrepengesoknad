import React from 'react';
import { ModalSummaryProps } from '../ArbeidSeksjon/ArbeidSeksjon';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import getMessage from 'common/util/i18nUtils';
import { useIntl } from 'react-intl';
import { prettifyTidsperiode } from 'app/utils/formatDate';
import InteractiveListElement from 'common/components/interactive-list-element/InteractiveListElement';

const SelvstendigListElement: React.FunctionComponent<ModalSummaryProps<Næring>> = ({ element, ...rest }) => {
    const intl = useIntl();
    const title = element.organisasjonsnummer
        ? `${element.organisasjonsnummer} ${element.navnPåNæringen}`
        : element.navnPåNæringen;

    return (
        <InteractiveListElement
            style="gray"
            title={title}
            text={prettifyTidsperiode(element.tidsperiode)}
            deleteLinkText={getMessage(intl, 'utenlandsopphold.land.slett')}
            {...rest}
        />
    );
};
export default SelvstendigListElement;
