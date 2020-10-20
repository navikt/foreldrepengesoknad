import React from 'react';
import InteractiveListElement, {
    InteractiveListElementProps,
} from '../../../../common/components/skjema/elements/interactive-list-element/InteractiveListElement';
import { FrilansOppdrag } from '../../../types/søknad/FrilansInformasjon';
import getMessage from 'common/util/i18nUtils';
import { useIntl } from 'react-intl';
import { prettifyTidsperiode } from '../../../util/dates/dates';
import { mapTidsperiodeDatoInputVerdiToTidsperiode } from '../../../util/tidsperiodeUtils';

interface FrilansOppdragListeElementProps extends InteractiveListElementProps {
    oppdrag: FrilansOppdrag;
}

const FrilansOppdragListElement: React.StatelessComponent<FrilansOppdragListeElementProps> = ({ oppdrag, ...rest }) => {
    const intl = useIntl();
    const deleteLinkText = getMessage(intl, 'slett.oppdrag');
    return (
        <InteractiveListElement
            title={oppdrag.navnPåArbeidsgiver}
            text={prettifyTidsperiode(mapTidsperiodeDatoInputVerdiToTidsperiode(oppdrag.tidsperiode))}
            deleteLinkText={deleteLinkText}
            {...rest}
        />
    );
};

export default FrilansOppdragListElement;
