import React from 'react';
import InteractiveListElement, {
    InteractiveListElementProps
} from '../../components/skjema/interactive-list-element/InteractiveListElement';
import { FrilansOppdrag } from '../../types/søknad/FrilansInformasjon';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { prettifyTidsperiode } from '../../util/dates/dates';

interface FrilansOppdragListeElementProps extends InteractiveListElementProps {
    oppdrag: FrilansOppdrag;
}

const FrilansOppdragListElement: React.StatelessComponent<FrilansOppdragListeElementProps & InjectedIntlProps> = ({
    oppdrag,
    intl,
    ...rest
}) => {
    const deleteLinkText = getMessage(intl, 'slett.oppdrag');
    return (
        <InteractiveListElement
            title={oppdrag.navnPåArbeidsgiver}
            text={prettifyTidsperiode(oppdrag.tidsperiode)}
            deleteLinkText={deleteLinkText}
            {...rest}
        />
    );
};

export default injectIntl(FrilansOppdragListElement);
