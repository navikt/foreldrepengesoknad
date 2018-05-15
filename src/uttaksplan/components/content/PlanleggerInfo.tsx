import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import Veilederinfo from 'uttaksplan/elements/veilederinfo/Veilederinfo';
import UtvidetInformasjon from 'uttaksplan/elements/utvidetInformasjon/UtvidetInformasjon';
import { Element } from 'nav-frontend-typografi';
import {
    injectIntl,
    InjectedIntlProps,
    FormattedMessage,
    FormattedHTMLMessage
} from 'react-intl';
import EksterneLenker from 'uttaksplan/eksterneLenker';

const PlanleggerInfo: React.StatelessComponent<InjectedIntlProps> = ({
    intl
}) => (
    <div>
        <Veilederinfo>
            <p>
                <FormattedMessage id="veileder.forbehold.intro" />
            </p>
            <UtvidetInformasjon
                apneLabel={intl.formatMessage({ id: 'planleggerinfo.apne' })}
                lukkLabel={intl.formatMessage({ id: 'planleggerinfo.lukk' })}>
                <div className="blokkPad-m">
                    <Element tag="h2">
                        <FormattedMessage id="veileder.forbehold.utvidetinfo.tittel" />
                    </Element>
                    <FormattedHTMLMessage id="veileder.forbehold.utvidetinfo.html" />
                    <Lenke href={EksterneLenker.nav_foreldrepenger}>
                        Les om foreldrepenger
                    </Lenke>
                </div>
            </UtvidetInformasjon>
        </Veilederinfo>
    </div>
);

export default injectIntl(PlanleggerInfo);
