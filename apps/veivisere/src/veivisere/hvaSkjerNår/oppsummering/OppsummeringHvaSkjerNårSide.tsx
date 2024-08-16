import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, VStack } from '@navikt/ds-react';

import { BluePanel } from '@navikt/fp-ui';

import VeiviserPage from '../../felles/VeiviserPage';
import { HvaSkjerNårSituasjon } from '../situasjon/SituasjonSide';

interface Props {
    hvaSkjerNårSituasjon: HvaSkjerNårSituasjon;
}

const OppsummeringHvaSkjerNårSide: React.FunctionComponent<Props> = ({ hvaSkjerNårSituasjon }) => {
    const intl = useIntl();
    const { ref } = useScrollBehaviour();
    const { situasjon, fødselsdato, termindato } = hvaSkjerNårSituasjon;
    return (
        <>
            <VeiviserPage ref={ref} label={intl.formatMessage({ id: 'OppsummeringFpEllerEsSide.Oppsummering' })}>
                <VStack gap="8">
                    <BluePanel isDarkBlue>
                        <VStack gap="4">
                            <BodyShort>
                                <FormattedMessage id="OppsummeringSide.DetteSvarteDu" />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage id="OppsummeringSide.DetteSvarteDu" />
                            </BodyShort>
                            <BodyShort>{situasjon + ' ' + fødselsdato + ' ' + termindato} </BodyShort>
                        </VStack>
                    </BluePanel>
                </VStack>
            </VeiviserPage>
        </>
    );
};

export default OppsummeringHvaSkjerNårSide;
