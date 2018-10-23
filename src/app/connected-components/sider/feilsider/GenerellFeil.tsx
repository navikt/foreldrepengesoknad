import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import Feilsidemelding from 'common/components/feilsidemelding/Feilsidemelding';
import getMessage from 'common/util/i18nUtils';

const GenerellFeil: React.StatelessComponent<InjectedIntlProps> = (props: InjectedIntlProps) => {
    return (
        <Applikasjonsside visSpråkvelger={false}>
            <DocumentTitle title={getMessage(props.intl, 'feilside.dokument.tittel')} />
            <Feilsidemelding tittel="Det oppstod en feil" ingress="Litt mer informasjon om hva som gikk feil" />
        </Applikasjonsside>
    );
};
export default injectIntl(GenerellFeil);
