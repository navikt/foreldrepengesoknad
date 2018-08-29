import * as React from 'react';
import EksterneLenker from 'uttaksplan/eksterneLenker';
import Lenke from 'nav-frontend-lenker';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

export interface Props {
    navnForelder1?: string;
    navnForelder2?: string;
}

const TidslinjeAktivitetskravInfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
    navnForelder1,
    navnForelder2,
    intl
}) => (
    <div className="blokkPad-xs">
        <div className="blokkPad-xxs">
            <FormattedMessage
                id="uttaksplan.tidslinje.aktivitetskrav"
                values={{
                    navnForelder1: navnForelder1 || intl.formatMessage({ id: 'uttaksplan.forelder1' }),
                    navnForelder2: navnForelder2 || intl.formatMessage({ id: 'uttaksplan.forelder2' })
                }}
            />
        </div>
        <Lenke href={EksterneLenker.nav_aktivitetskrav} target="_blank">
            <FormattedMessage id="uttaksplan.skjema.fordeling.veiledning.lenketekst" />
        </Lenke>
    </div>
);

export default injectIntl(TidslinjeAktivitetskravInfo);
