import { Alert } from '@navikt/ds-react';
import { Block, getVarighetString, intlUtils } from '@navikt/fp-common';
import { getTekstForAntallBarn } from 'app/utils/barnUtils';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

interface Props {
    flerbarnsDager: number;
    antallBarn: number;
    erAdopsjon: boolean;
    morTekst: string;
    farTekst: string;
}

const getBarnTekst = (antallBarn: number, erAdopsjon: boolean, intl: IntlShape) => {
    if (erAdopsjon) {
        return antallBarn === 2
            ? intlUtils(intl, 'oppsummering.barn.antallBarn.toBarn').toLowerCase()
            : intlUtils(intl, 'oppsummering.barn.antallBarn.flere', { antallBarn });
    }
    return getTekstForAntallBarn(antallBarn, intl).toLowerCase();
};

const FlerbarnsdagerInformasjon: React.FunctionComponent<Props> = ({
    flerbarnsDager,
    antallBarn,
    erAdopsjon,
    morTekst,
    farTekst,
}) => {
    const intl = useIntl();
    const varighetTekst = getVarighetString(flerbarnsDager, intl);
    const barnTekst = getBarnTekst(antallBarn, erAdopsjon, intl);
    return (
        <Block padBottom="xl">
            <Alert variant="info">
                <Block padBottom="l">
                    <FormattedMessage
                        id="fordeling.flerbarnsuker.info.del1"
                        values={{
                            varighetTekst,
                            barnTekst,
                        }}
                    />
                </Block>
                <FormattedMessage id="fordeling.flerbarnsuker.info.del2" values={{ morTekst, farTekst }} />
            </Alert>
        </Block>
    );
};

export default FlerbarnsdagerInformasjon;
