import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { getTekstForAntallBarn } from 'utils/barnUtils';
import { getVarighetString } from 'utils/dateUtils';

import { Alert, VStack } from '@navikt/ds-react';

import { getNavnGenitivEierform } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { getHarFåttEllerSkalFå } from './fordelingOversiktUtils';

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

export const FlerbarnsdagerInformasjon = ({
    flerbarnsDager,
    antallBarn,
    erAdopsjon,
    morTekst,
    farTekst,
    erFarEllerMedmor,
}: Props) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const varighetTekst = getVarighetString(flerbarnsDager, intl);
    const barnTekst = getBarnTekst(antallBarn, erAdopsjon, intl);
    const harFåttEllerSkalFå = getHarFåttEllerSkalFå(barn, intl);
    const degEllerMor = erFarEllerMedmor ? morTekst : intl.formatMessage({ id: 'deg' });
    const dinEllerFarSin = erFarEllerMedmor
        ? intl.formatMessage({ id: 'din' })
        : getNavnGenitivEierform(farTekst, intl.locale);
    return (
        <Alert variant="info" style={{ paddingBottom: '2rem', marginTop: '1.5rem' }}>
            <VStack gap="3">
                <div>
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
                </div>
                <div>
                    <FormattedMessage
                        id="fordeling.flerbarnsuker.info.del2"
                        values={{
                            farTekst,
                            degEllerMor,
                            dinEllerFarSin,
                        }}
                    />
                </div>
            </VStack>
        </Alert>
    );
};
