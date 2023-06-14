import { FunctionComponent } from 'react';
import { ModalSummaryProps } from '../ArbeidSeksjon/ArbeidSeksjon';
import { FrilansOppdrag } from 'app/types/FrilansInformasjon';
import InteractiveListElement from 'common/components/interactive-list-element/InteractiveListElement';
import { prettifyTidsperiode } from 'app/utils/formatDate';
import getMessage from 'common/util/i18nUtils';
import { useIntl } from 'react-intl';

const FrilansListElement: FunctionComponent<ModalSummaryProps<FrilansOppdrag>> = ({ element, ...rest }) => {
    const intl = useIntl();
    return (
        <InteractiveListElement
            style="grayWithBorder"
            title={element.navnPåArbeidsgiver}
            text={prettifyTidsperiode(element.tidsperiode)}
            deleteLinkText={getMessage(intl, 'utenlandsopphold.land.slett')}
            {...rest}
        />
    );
};

export default FrilansListElement;
