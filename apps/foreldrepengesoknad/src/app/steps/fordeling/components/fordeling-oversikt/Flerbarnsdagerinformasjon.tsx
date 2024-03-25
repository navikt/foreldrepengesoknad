import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Alert } from '@navikt/ds-react';

import { Block, getVarighetString } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import {
    getDegEllerMorTekst,
    getDinEllerFarGenitivEierformTekst,
    getHarFåttEllerSkalFå,
} from 'app/steps/fordeling/components/fordeling-oversikt/fordelingOversiktUtils';
import { getTekstForAntallBarn } from 'app/utils/barnUtils';

interface Props {
    flerbarnsDager: number;
    antallBarn: number;
    erAdopsjon: boolean;
    morTekst: string;
    farTekst: string;
    erFarEllerMedmor: boolean;
}

const getBarnTekst = (antallBarn: number, erAdopsjon: boolean, intl: IntlShape) => {
    if (erAdopsjon) {
        return antallBarn === 2
            ? intl.formatMessage({ id: 'oppsummering.barn.antallBarn.toBarn' }).toLowerCase()
            : intl.formatMessage({ id: 'oppsummering.barn.antallBarn.flere' }, { antallBarn });
    }
    return getTekstForAntallBarn(antallBarn, intl).toLowerCase();
};

const FlerbarnsdagerInformasjon: React.FunctionComponent<Props> = ({
    flerbarnsDager,
    antallBarn,
    erAdopsjon,
    morTekst,
    farTekst,
    erFarEllerMedmor,
}) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const varighetTekst = getVarighetString(flerbarnsDager, intl);
    const barnTekst = getBarnTekst(antallBarn, erAdopsjon, intl);
    const harFåttEllerSkalFå = getHarFåttEllerSkalFå(barn, intl);
    const degEllerMor = getDegEllerMorTekst(erFarEllerMedmor, morTekst, intl);
    const dinEllerFarSin = getDinEllerFarGenitivEierformTekst(erFarEllerMedmor, farTekst, intl);
    return (
        <Block padBottom="l">
            <Alert variant="info">
                <Block padBottom="l">
                    <FormattedMessage
                        id="fordeling.flerbarnsuker.info.del1"
                        values={{
                            varighetTekst,
                            barnTekst,
                            harFåttEllerSkalFå,
                            morTekst,
                            farTekst,
                        }}
                    />
                </Block>
                <Block padBottom="m">
                    <FormattedMessage
                        id="fordeling.flerbarnsuker.info.del2"
                        values={{
                            farTekst,
                            degEllerMor,
                            dinEllerFarSin,
                        }}
                    />
                </Block>
            </Alert>
        </Block>
    );
};

export default FlerbarnsdagerInformasjon;
