import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import VeilederinfoContainer from 'uttaksplan/connectedComponents/VeilederinfoContainer';
import EksterneLenker from 'uttaksplan/eksterneLenker';
import { Infotekster } from 'uttaksplan/redux/reducers/viewReducer';
import { Permisjonsregler } from 'uttaksplan/types';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

export interface Props {
    permisjonsregler: Permisjonsregler;
    navnForelder1?: string;
    navnForelder2?: string;
}

const AktivitetskravInfo: React.StatelessComponent<
    Props & InjectedIntlProps
> = ({ permisjonsregler, navnForelder1, navnForelder2, intl }) => (
    <VeilederinfoContainer
        id={Infotekster.fordelingFellesperiode}
        visVeileder={false}
        type="info"
        stil="kunTekst">
        <div className="blokkPad-xxs">
            <FormattedMessage
                id="uttaksplan.skjema.fordeling.veiledning"
                values={{
                    pakrevdForelder1:
                        permisjonsregler.antallUkerForeldrepengerFørFødsel +
                        permisjonsregler.antallUkerMødrekvote,
                    pakrevdForelder2: permisjonsregler.antallUkerFedrekvote,
                    navnForelder1:
                        navnForelder1 ||
                        intl.formatMessage({ id: 'uttaksplan.forelder1' }),
                    navnForelder2:
                        navnForelder2 ||
                        intl.formatMessage({ id: 'uttaksplan.forelder2' })
                }}
            />
        </div>
        <Lenke href={EksterneLenker.nav_aktivitetskrav} target="_blank">
            <FormattedMessage id="uttaksplan.skjema.fordeling.veiledning.lenketekst" />
        </Lenke>
    </VeilederinfoContainer>
);

export default injectIntl(AktivitetskravInfo);
