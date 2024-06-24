import { BabyWrappedIcon, InformationIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';

import { BodyLong, Link, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';

import { barnehagestartDato } from './AleneforsørgerBarnehageplass';

interface Props {
    barnet: OmBarnet;
}

const FlereForsørgereBarnehageplass: FunctionComponent<Props> = ({ barnet }) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetUFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    return (
        <VStack gap="10">
            <BodyLong>
                <FormattedMessage id="FlereForsørgereBarnehageplass.KommuneTekstDeg" />
            </BodyLong>
            <Infobox
                header={
                    <FormattedMessage
                        id="FlereForsørgereBarnehageplass.DatoTittel"
                        values={{
                            dato: barnehagestartDato(barnet),
                        }}
                    />
                }
                icon={<BabyWrappedIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            >
                <BodyLong>
                    {(erFødt || erAdoptert) && (
                        <FormattedMessage
                            id="FlereForsørgereBarnehageplass.DatoTekst"
                            values={{
                                a: (msg: any) => (
                                    <Link
                                        inlineText
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
                    )}
                    {erIkkeFødt && (
                        <FormattedMessage
                            id="FlereForsørgereBarnehageplass.DatoTekstTermin"
                            values={{
                                a: (msg: any) => (
                                    <Link
                                        inlineText
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
                    )}
                </BodyLong>
            </Infobox>
            <Infobox
                header={<FormattedMessage id="FlereForsørgereBarnehageplass.BarnehageTittel" />}
                icon={<InformationIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
                isGray
            >
                <BodyLong>
                    <FormattedMessage id="FlereForsørgereBarnehageplass.BarnehageTekst" />
                </BodyLong>
            </Infobox>
        </VStack>
    );
};

export default FlereForsørgereBarnehageplass;
