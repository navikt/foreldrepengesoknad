import { FunctionComponent } from 'react';
import { ModalSummaryProps } from '../ArbeidSeksjon/ArbeidSeksjon';
import { useIntl } from 'react-intl';
import { AnnenInntekt } from 'app/types/AnnenInntekt';
import InteractiveListElement from 'common/components/interactive-list-element/InteractiveListElement';
import { prettifyTidsperiode } from 'app/utils/formatDate';
import getMessage from 'common/util/i18nUtils';
import { getAnnenInntektElementTitle } from '../../../utils/arbeidsforholdUtils';

const AnnenInntektListElement: FunctionComponent<ModalSummaryProps<AnnenInntekt>> = ({ element, ...rest }) => {
    const intl = useIntl();
    return (
        <InteractiveListElement
            title={getAnnenInntektElementTitle(element, intl)}
            text={prettifyTidsperiode(element.tidsperiode)}
            deleteLinkText={getMessage(intl, 'utenlandsopphold.land.slett')}
            {...rest}
        />
    );
};

export default AnnenInntektListElement;
