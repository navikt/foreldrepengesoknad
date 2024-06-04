import { ChatElipsisIcon, InformationIcon } from '@navikt/aksel-icons';
import VeilederPage from 'components/Page/VeilederPage';
import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { Dekningsgrad } from '@navikt/fp-types';
import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import HarIkkeRettTilFpInfobox from '../HarIkkeRettTilFpInfobox';
import HøyInntektInfobox from '../HøyInntektInfobox';
import { Arbeidssituasjon, finnGjennomsnittslønn } from '../arbeidssituasjon/ArbeidssituasjonSide';
import Utbetalingspanel from './Utbetalingspanel';

//FIXME Hent frå tjeneste
export const GRUNNBELØPET = 118620;
const minÅrslønn = 59310;

export const getDailyPayment = (monthlyWage: number) => (monthlyWage * 12) / 260;

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
}

const OppsummeringSide: React.FunctionComponent<Props> = ({ arbeidssituasjon }) => {
    const intl = useIntl();

    const { ref } = useScrollBehaviour();

    const gjennomsnittslønn = parseFloat(notEmpty(finnGjennomsnittslønn(arbeidssituasjon)));
    const grunnbeløpetGanger6 = GRUNNBELØPET * 6;

    return (
        <VeilederPage ref={ref} label={intl.formatMessage({ id: 'Tittel' })}>
            <VStack gap="5">
                {gjennomsnittslønn * 12 > grunnbeløpetGanger6 && (
                    <HøyInntektInfobox maxÅrslønnDekket={grunnbeløpetGanger6} isGray />
                )}
                {gjennomsnittslønn * 12 < minÅrslønn && (
                    <HarIkkeRettTilFpInfobox antattÅrslønn={gjennomsnittslønn * 12} minÅrslønn={minÅrslønn} isGray />
                )}
                <Utbetalingspanel dekningsgrad={Dekningsgrad.HUNDRE_PROSENT} gjennomsnittslønn={gjennomsnittslønn} />
                <Utbetalingspanel dekningsgrad={Dekningsgrad.ÅTTI_PROSENT} gjennomsnittslønn={gjennomsnittslønn} />
                <Infobox
                    header={<FormattedMessage id="OppsummeringSide.UtbetaltSomVanlig" />}
                    icon={<InformationIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
                    isGray
                >
                    <FormattedMessage id="OppsummeringSide.ArbeidsgiverFraNav" />
                </Infobox>
                <ExpansionCard aria-label="" size="small">
                    <ExpansionCard.Header>
                        <HStack gap="6" align="center" wrap={false}>
                            <IconCircleWrapper size="medium" color="green">
                                <ChatElipsisIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <ExpansionCard.Title size="small">
                                <FormattedMessage id="OppsummeringSide.DetteSvarteDu" />
                            </ExpansionCard.Title>
                        </HStack>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>todo</ExpansionCard.Content>
                </ExpansionCard>
            </VStack>
        </VeilederPage>
    );
};

export default OppsummeringSide;
