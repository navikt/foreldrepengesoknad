import * as React from 'react';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';

export interface OwnProps {
    antallDager: number;
    antallDagerFørFødselIhtRegler: number;
    skalIkkeHaUttakFørTermin: boolean;
}

type Props = OwnProps & InjectedIntlProps;

const VeilederStartdatoPermisjon: React.StatelessComponent<Props> = ({
    antallDager,
    antallDagerFørFødselIhtRegler,
    skalIkkeHaUttakFørTermin,
    intl
}) => {
    const getMsg = () => {
        if (skalIkkeHaUttakFørTermin) {
            return <FormattedMessage id="uttaksplan.informasjon.foreldrepengerFørFødselSkalIkkeHa" />;
        } else if (antallDager < antallDagerFørFødselIhtRegler) {
            return (
                <FormattedMessage
                    id="uttaksplan.informasjon.foreldrepengerFørFødselMindreEnnTreUker"
                    values={{
                        varighet: getVarighetString(antallDagerFørFødselIhtRegler - antallDager, intl)
                    }}
                />
            );
        } else if (antallDager > antallDagerFørFødselIhtRegler) {
            return (
                <FormattedMessage
                    id="uttaksplan.informasjon.foreldrepengerFørFødselMerEnnTreUker"
                    values={{
                        varighet: getVarighetString(antallDager - antallDagerFørFødselIhtRegler, intl)
                    }}
                />
            );
        }
        return undefined;
    };

    const msg = getMsg();
    return (
        <Block margin="none" visible={msg !== undefined}>
            <Veilederinfo>{msg}</Veilederinfo>
        </Block>
    );
};

export default injectIntl(VeilederStartdatoPermisjon);
