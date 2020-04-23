import * as React from 'react';
import BEMHelper from 'common/util/bem';
import Veileder from 'common/components/veileder/Veileder';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import Applikasjonsside from '../../../components/applikasjon/applikasjonsside/Applikasjonsside';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';
import DocumentTitle from 'react-document-title';
import Block from 'common/components/block/Block';
import Lenke from 'nav-frontend-lenker';

import './ikkeTilgjengelig.less';

const bem = BEMHelper('ikkeTilgjengelig');

interface Props {
    intl: IntlShape;
}

const Feilmeldingsplakat: React.StatelessComponent<Props> = ({ intl }) => (
    <Applikasjonsside visSpråkvelger={false} margin={true}>
        <DocumentTitle title={getMessage(intl, 'dokument.tittel.ikkeTilgjengelig')} />

        <div className={bem.element('veileder')}>
            <Veileder ansikt="skeptisk" stil="normal" />
        </div>
        <div className={bem.element('tittel')}>
            <Innholdstittel tag="h1">
                <FormattedMessage id="feilside.ikkeTilgjengelig.tittel" />
            </Innholdstittel>
        </div>
        <div className={bem.element('innhold')}>
            <Block margin="l">
                <Ingress tag="div">
                    <p>
                        <FormattedMessage id="feilside.ikkeTilgjengelig.melding" />
                    </p>
                    <Lenke href="https://familie.nav.no/">familie.nav.no</Lenke>
                </Ingress>
            </Block>
        </div>
    </Applikasjonsside>
);

export default injectIntl(Feilmeldingsplakat);
