import React from 'react';
import InteractiveListElement, {
    InteractiveListElementProps,
} from '../../../../../common/components/skjema/elements/interactive-list-element/InteractiveListElement';
import { Næring } from '../../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { useIntl } from 'react-intl';
import { prettifyTidsperiode } from '../../../../util/dates/dates';
import getMessage from 'common/util/i18nUtils';

interface NæringListeElementProps extends InteractiveListElementProps {
    næring: Næring;
}

const NæringListeElement: React.StatelessComponent<NæringListeElementProps> = ({
    næring,

    ...rest
}) => {
    const intl = useIntl();
    const deleteLinkText = getMessage(intl, 'slett.næring');
    return (
        <InteractiveListElement
            title={næring.navnPåNæringen}
            text={prettifyTidsperiode(næring.tidsperiode)}
            deleteLinkText={deleteLinkText}
            {...rest}
        />
    );
};

export default NæringListeElement;
