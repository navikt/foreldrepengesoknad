import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import UtvidetInformasjon from 'uttaksplan/elements/utvidetInformasjon/UtvidetInformasjon';
import { Element } from 'nav-frontend-typografi';
import {
    injectIntl,
    InjectedIntlProps,
    FormattedMessage,
    FormattedHTMLMessage
} from 'react-intl';
import EksterneLenker from 'uttaksplan/eksterneLenker';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

export interface Props {}

const PlanleggerInfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
    intl
}) => (
    <div>
        <Veilederinfo>
            <p>
                <FormattedMessage id="uttaksplan.veileder.forbehold.intro" />
            </p>
            <UtvidetInformasjon
                apneLabel={intl.formatMessage({
                    id: 'uttaksplan.planleggerinfo.apne'
                })}
                lukkLabel={intl.formatMessage({
                    id: 'uttaksplan.planleggerinfo.lukk'
                })}>
                <div className="blokkPad-m">
                    <Element tag="h2">
                        <FormattedMessage id="uttaksplan.veileder.forbehold.utvidetinfo.tittel" />
                    </Element>
                    <FormattedHTMLMessage id="uttaksplan.veileder.forbehold.utvidetinfo.html" />
                    <Lenke href={EksterneLenker.nav_foreldrepenger}>
                        Les om foreldrepenger
                    </Lenke>
                </div>
            </UtvidetInformasjon>
        </Veilederinfo>
    </div>
);

export default injectIntl(PlanleggerInfo);
