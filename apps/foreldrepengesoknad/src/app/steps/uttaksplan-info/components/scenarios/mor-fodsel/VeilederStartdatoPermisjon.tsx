import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Block, intlUtils } from '@navikt/fp-common';
import { formaterDato, getVarighetString } from 'app/utils/dateUtils';
import { Uttaksdagen } from '../../../utils/Uttaksdagen';
import { GuidePanel } from '@navikt/ds-react';

type ugyldigStartdatoÅrsak = undefined | 'helgedag' | 'fortidlig';

export interface Props {
    startdato: Date | undefined;
    antallDager: number;
    antallDagerFørFødselIhtRegler: number;
    skalIkkeHaUttakFørTermin: boolean | undefined;
    førsteMuligeStartdato: Date | undefined;
    visKunFeil?: boolean;
}

export const getÅrsakDersomUgyldigStartdato = (
    startdato: Date | undefined,
    førsteMuligeStartdato: Date | undefined
): ugyldigStartdatoÅrsak => {
    if (startdato === undefined) {
        return;
    }
    if (Uttaksdagen(startdato).erUttaksdag() === false) {
        return 'helgedag';
    } else if (førsteMuligeStartdato && dayjs(startdato).isBefore(førsteMuligeStartdato, 'day')) {
        return 'fortidlig';
    }

    return undefined;
};

const VeilederStartdatoPermisjon: React.FunctionComponent<Props> = ({
    startdato,
    antallDager,
    antallDagerFørFødselIhtRegler,
    skalIkkeHaUttakFørTermin,
    førsteMuligeStartdato,
    visKunFeil,
}) => {
    const intl = useIntl();

    const ugyldigDatoÅrsak = startdato && getÅrsakDersomUgyldigStartdato(startdato, førsteMuligeStartdato);

    const msg = React.useMemo(() => {
        if (ugyldigDatoÅrsak && førsteMuligeStartdato) {
            return ugyldigDatoÅrsak === 'fortidlig'
                ? intlUtils(intl, 'uttaksplaninfo.veileder.forTidligStartdato', {
                      dato: formaterDato(førsteMuligeStartdato),
                  })
                : intlUtils(intl, 'uttaksplaninfo.veileder.helgedag');
        }
        if (visKunFeil) {
            return undefined;
        }
        if (skalIkkeHaUttakFørTermin === true) {
            return <FormattedMessage id="uttaksplaninfo.informasjon.foreldrepengerFørFødselSkalIkkeHa" />;
        } else if (antallDager < antallDagerFørFødselIhtRegler) {
            return (
                <FormattedMessage
                    id="uttaksplaninfo.informasjon.foreldrepengerFørFødselMindreEnnTreUker"
                    values={{
                        varighet: getVarighetString(antallDagerFørFødselIhtRegler - antallDager, intl),
                    }}
                />
            );
        } else if (antallDager > antallDagerFørFødselIhtRegler) {
            return (
                <FormattedMessage
                    id="uttaksplaninfo.informasjon.foreldrepengerFørFødselMerEnnTreUker"
                    values={{
                        varighet: getVarighetString(antallDager - antallDagerFørFødselIhtRegler, intl),
                    }}
                />
            );
        }
        return undefined;
    }, [
        ugyldigDatoÅrsak,
        antallDager,
        antallDagerFørFødselIhtRegler,
        førsteMuligeStartdato,
        intl,
        skalIkkeHaUttakFørTermin,
        visKunFeil,
    ]);

    return (
        <Block margin="none" visible={msg !== undefined}>
            <GuidePanel>{msg}</GuidePanel>
        </Block>
    );
};

export default VeilederStartdatoPermisjon;
