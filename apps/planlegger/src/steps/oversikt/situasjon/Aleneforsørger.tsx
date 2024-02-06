import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { PeriodeEnum } from 'types/Periode';

const Aleneforsørger: FunctionComponent = () => {
    const valgtPeriode = notEmpty(useContextGetData(ContextDataType.PERIODE));

    return (
        <VStack gap="10">
            <div className="panel-top green">
                <VStack gap="5">
                    <Heading size="large" spacing>
                        <FormattedMessage id="oversikt.tittel" />
                    </Heading>

                    <BodyShort size="large">
                        <FormattedMessage id="oversikt.ingressDeg" />
                    </BodyShort>
                    <div className="panel white">
                        <HStack align="center" justify="space-between">
                            <BodyShort>
                                <FormattedMessage id="oversikt.valgtTittelDeg" />
                            </BodyShort>
                            <Button icon={<PencilIcon aria-hidden />} className="icon-right" />
                        </HStack>
                        <BodyShort weight="semibold">
                            {valgtPeriode.periode === PeriodeEnum.HUNDRE && <FormattedMessage id="oversikt.100" />}
                            {valgtPeriode.periode === PeriodeEnum.ÅTTI && <FormattedMessage id="oversikt.80" />}
                        </BodyShort>
                    </div>
                </VStack>
            </div>
        </VStack>
    );
};

export default Aleneforsørger;
