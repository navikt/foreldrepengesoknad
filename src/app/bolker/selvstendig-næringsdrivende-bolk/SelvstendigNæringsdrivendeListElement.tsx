import React from 'react';
import InteractiveListElement, {
    InteractiveListElementProps
} from '../../components/interactive-list-element/InteractiveListElement';
import { Næring } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { prettifyTidsperiode } from '../../util/dates/dates';
import getMessage from 'common/util/i18nUtils';
import { næringsinntektSisteÅrMåDokumenteres } from '../../util/domain/næringer';

interface NæringListeElementProps extends InteractiveListElementProps {
    næring: Næring;
}

const NæringListeElement: React.StatelessComponent<NæringListeElementProps & InjectedIntlProps> = ({
    næring,
    intl,
    ...rest
}) => {
    const deleteLinkText = getMessage(intl, 'slett.næring');
    const måDokumentereInntektSisteÅr = næringsinntektSisteÅrMåDokumenteres(næring);
    const harVedlegg = næring.vedlegg && næring.vedlegg.length > 0;
    return (
        <InteractiveListElement
            title={næring.navnPåNæringen}
            text={prettifyTidsperiode(næring.tidsperiode)}
            deleteLinkText={deleteLinkText}
            etikettProps={
                måDokumentereInntektSisteÅr
                    ? {
                          type: harVedlegg ? 'suksess' : 'fokus',
                          children: harVedlegg
                              ? getMessage(intl, 'dokumentasjon.vedlagt')
                              : getMessage(intl, 'dokumentasjon.mangler')
                      }
                    : undefined
            }
            {...rest}
        />
    );
};

export default injectIntl(NæringListeElement);
