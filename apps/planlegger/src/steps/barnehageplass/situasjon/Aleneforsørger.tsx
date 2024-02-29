import { BabyWrappedIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import Infoboks from 'components/Infoboks';
import InfoboksGenerell from 'components/InfoboksGenerell';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';

import { BodyLong, Link, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { notEmpty } from '@navikt/fp-validation';

import { BARNEHAGELOVEN_TEKST } from '../BarnehageplassSteg';
import { barnehageStartdato } from '../BarnehageplassSteg';

const Aleneforsørger: FunctionComponent = () => {
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);

    return (
        <VStack gap="10">
            <BodyLong>
                <FormattedMessage id="barnehageplass.kommuneTekstDeg" />
            </BodyLong>
            <Infoboks
                header={
                    <FormattedMessage
                        id="barnehageplass.datoTittel"
                        values={{
                            dato: barnehageStartdato(barnet),
                        }}
                    />
                }
            >
                <BodyLong>
                    {erFødt ? (
                        <FormattedMessage
                            id="barnehageplass.datoTekst"
                            values={{
                                a: (msg: any) => (
                                    <Link href={BARNEHAGELOVEN_TEKST} target="_blank" inlineText>
                                        {msg}
                                    </Link>
                                ),
                                dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT),
                            }}
                        />
                    ) : (
                        erIkkeFødt && (
                            <FormattedMessage
                                id="barnehageplass.datoTekstTermin"
                                values={{
                                    a: (msg: any) => (
                                        <Link href={BARNEHAGELOVEN_TEKST} target="_blank" inlineText>
                                            {msg}
                                        </Link>
                                    ),
                                    dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT),
                                }}
                            />
                        )
                    )}
                </BodyLong>
            </Infoboks>

            <InfoboksGenerell
                header={<FormattedMessage id="barnehageplass.barnehageTittel" />}
                icon={<BabyWrappedIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" />}
            >
                <BodyLong>
                    <FormattedMessage id="barnehageplass.barnehageTekst" />
                </BodyLong>
            </InfoboksGenerell>
        </VStack>
    );
};

export default Aleneforsørger;
