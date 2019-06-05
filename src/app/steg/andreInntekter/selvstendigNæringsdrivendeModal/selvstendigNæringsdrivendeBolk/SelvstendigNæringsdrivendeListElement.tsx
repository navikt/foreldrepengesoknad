import React from 'react';
import InteractiveListElement, {
    InteractiveListElementProps
} from '../../../../components/skjema/interactive-list-element/InteractiveListElement';
import { Næring } from '../../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { prettifyTidsperiode } from '../../../../util/dates/dates';
import getMessage from 'common/util/i18nUtils';

interface NæringListeElementProps extends InteractiveListElementProps {
    næring: Næring;
}

const NæringListeElement: React.StatelessComponent<NæringListeElementProps & InjectedIntlProps> = ({
    næring,
    intl,
    ...rest
}) => {
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

export default injectIntl(NæringListeElement);
