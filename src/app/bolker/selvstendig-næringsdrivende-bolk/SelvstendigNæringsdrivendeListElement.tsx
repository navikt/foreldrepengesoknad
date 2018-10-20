import React from 'react';
import InteractiveListElement, {
    InteractiveListElementProps
} from '../../components/interactive-list-element/InteractiveListElement';
import { Næring } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { prettifyTidsperiode } from '../../util/dates/dates';
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

    const harVedlegg = næring.vedlegg && næring.vedlegg.length > 0;
    const dokVedlagt = getMessage(intl, 'dokumentasjon.vedlagt');
    const dokMangler = getMessage(intl, 'dokumentasjon.mangler');

    return (
        <InteractiveListElement
            title={næring.navnPåNæringen}
            text={prettifyTidsperiode(næring.tidsperiode)}
            deleteLinkText={deleteLinkText}
            etikettProps={{
                type: harVedlegg ? 'suksess' : 'fokus',
                children: harVedlegg ? dokVedlagt : dokMangler
            }}
            {...rest}
        />
    );
};

export default injectIntl(NæringListeElement);
