import * as React from 'react';
import BEMHelper from 'common/util/bem';
import Veileder from 'common/components/veileder/Veileder';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import Applikasjonsside from '../../Applikasjonsside';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DocumentTitle from 'react-document-title';

import './ikkeTilgjengelig.less';
import Block from 'common/components/block/Block';

const bem = BEMHelper('ikkeTilgjengelig');

const Feilmeldingsplakat: React.StatelessComponent<InjectedIntlProps> = ({ intl }) => (
    <Applikasjonsside visSpråkvelger={false} margin={true}>
        <DocumentTitle title={getMessage(intl, 'dokument.tittel.ikkeTilgjengelig')} />

        <div className={bem.element('veileder')}>
            <Veileder ansikt="skeptisk" stil="normal" />
        </div>
        <div className={bem.element('tittel')}>
            <Block margin="s">
                <Innholdstittel tag="h1">Oops, nå gikk noe galt</Innholdstittel>
            </Block>
        </div>
        <div className={bem.element('innhold')}>
            <Block margin="l">
                <Ingress>
                    Det virker dessverre som om en av våre systemer en nede akkurat nå. Vi jobber med å rette feilen,
                    prøv igjen litt senere. Beklager ulempen dette medfører.
                </Ingress>
            </Block>
        </div>
    </Applikasjonsside>
);

export default injectIntl(Feilmeldingsplakat);
