import * as React from 'react';
import moment from 'moment';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import getMessage from 'common/util/i18nUtils';
import { formaterDato } from 'common/util/datoUtils';
import { Avgrensninger } from 'nav-datovelger';
import { Uttaksdagen } from '../util/uttaksplan/Uttaksdagen';

type ugyldigStartdatoÅrsak = undefined | 'helgedag' | 'fortidlig';

export interface OwnProps {
    antallDager: number;
    antallDagerFørFødselIhtRegler: number;
    skalIkkeHaUttakFørTermin: boolean;
    ugyldigDatoÅrsak: ugyldigStartdatoÅrsak;
    førsteMuligeStartdato: Date | undefined;
}

type Props = OwnProps & InjectedIntlProps;

export const getÅrsakDersomUgyldigStartdato = (
    startdato: Date | undefined,
    avgrensninger: Avgrensninger
): ugyldigStartdatoÅrsak => {
    if (startdato === undefined) {
        return;
    }
    if (Uttaksdagen(startdato).erUttaksdag() === false) {
        return 'helgedag';
    } else if (moment(startdato).isBefore(avgrensninger.minDato)) {
        return 'fortidlig';
    }
    return;
};

const VeilederStartdatoPermisjon: React.StatelessComponent<Props> = ({
    antallDager,
    antallDagerFørFødselIhtRegler,
    skalIkkeHaUttakFørTermin,
    ugyldigDatoÅrsak,
    førsteMuligeStartdato,
    intl
}) => {
    const getMsg = () => {
        if (ugyldigDatoÅrsak && førsteMuligeStartdato) {
            return ugyldigDatoÅrsak === 'fortidlig'
                ? getMessage(intl, 'uttaksplan.startdato.veileder.forTidligStartdato', {
                      dato: formaterDato(førsteMuligeStartdato)
                  })
                : getMessage(intl, 'uttaksplan.startdato.veileder.helgedag');
        }
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
    const erFeilmelding = ugyldigDatoÅrsak !== undefined;
    const msg = getMsg();
    return (
        <Block margin="none" visible={msg !== undefined}>
            <Veilederinfo type={erFeilmelding ? 'feil' : 'info'}>{msg}</Veilederinfo>
        </Block>
    );
};

export default injectIntl(VeilederStartdatoPermisjon);
