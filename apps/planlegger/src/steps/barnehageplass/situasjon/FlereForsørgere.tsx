import { BabyWrappedIcon, InformationIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { barnehagestartDato, erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';

import { BodyLong, Link, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, links } from '@navikt/fp-constants';
import { notEmpty } from '@navikt/fp-validation';

const FlereForsørgere: FunctionComponent = () => {
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    return (
        <VStack gap="10">
            <BodyLong>
                <FormattedMessage id="barnehageplass.kommuneTekst" />
            </BodyLong>
            <Infobox
                header={
                    <FormattedMessage
                        id="barnehageplass.datoTittel"
                        values={{
                            dato: barnehagestartDato(barnet),
                        }}
                    />
                }
                icon={<BabyWrappedIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
            >
                <BodyLong>
                    {erFødt || erAdoptert ? (
                        <FormattedMessage
                            id="barnehageplass.datoTekst"
                            values={{
                                a: (msg: any) => (
                                    <Link
                                        href={links.barnehageloven}
                                        className="lenke"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
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
                                        <Link
                                            href={links.barnehageloven}
                                            className="lenke"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            {msg}
                                        </Link>
                                    ),
                                    dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT),
                                }}
                            />
                        )
                    )}
                </BodyLong>
            </Infobox>

            <Infobox
                header={<FormattedMessage id="barnehageplass.barnehageTittel" />}
                icon={<InformationIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                isGray
            >
                <BodyLong>
                    <FormattedMessage id="barnehageplass.barnehageTekst" />
                </BodyLong>
            </Infobox>
        </VStack>
    );
};

export default FlereForsørgere;
