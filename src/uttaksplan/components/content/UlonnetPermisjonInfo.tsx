import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import EksterneLenker from 'uttaksplan/eksterneLenker';
import Lenke from 'nav-frontend-lenker';
import { Element } from 'nav-frontend-typografi';

const UlonnetPermisjonInfo: React.StatelessComponent<InjectedIntlProps> = ({ intl }) => {
    return (
        <div>
            <Element tag="h2">
                <FormattedMessage id="uttaksplan.veileder.ulonnetpermisjon.tittel" />
            </Element>
            <p>
                <FormattedMessage id="uttaksplan.veileder.ulonnetpermisjon.tekst1" />
            </p>
            <p>
                <FormattedMessage id="uttaksplan.veileder.ulonnetpermisjon.tekst2" />{' '}
                <Lenke href={EksterneLenker.nav_foreldrepenger} target="_blank">
                    <FormattedMessage id="uttaksplan.veileder.ulonnetpermisjon.navlenketekst" />
                </Lenke>
            </p>
        </div>
    );
};

export default injectIntl(UlonnetPermisjonInfo);
