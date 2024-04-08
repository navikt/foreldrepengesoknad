import { BabyWrappedIcon, InformationIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { OmBarnet, barnehagestartDato, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';

import { BodyLong, Link, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, links } from '@navikt/fp-constants';

interface Props {
    barnet: OmBarnet;
}

const AleneforsørgerBarnehageplass: FunctionComponent<Props> = ({ barnet }) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);

    return (
        <VStack gap="10">
            <BodyLong>
                <FormattedMessage id="AleneforsørgerBarnehageplass.KommuneTekstDeg" />
            </BodyLong>
            <Infobox
                header={
                    <FormattedMessage
                        id="AleneforsørgerBarnehageplass.DatoTittel"
                        values={{
                            dato: barnehagestartDato(barnet),
                        }}
                    />
                }
                icon={<BabyWrappedIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
            >
                <BodyLong>
                    {erFødt && (
                        <FormattedMessage
                            id="AleneforsørgerBarnehageplass.DatoTekst"
                            values={{
                                a: (msg: any) => (
                                    <Link href={links.barnehageloven} target="_blank" inlineText>
                                        {msg}
                                    </Link>
                                ),
                                dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT),
                            }}
                        />
                    )}
                    {erIkkeFødt && (
                        <FormattedMessage
                            id="AleneforsørgerBarnehageplass.DatoTekstTermin"
                            values={{
                                a: (msg: any) => (
                                    <Link href={links.barnehageloven} target="_blank" inlineText>
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
                header={<FormattedMessage id="AleneforsørgerBarnehageplass.BarnehageTittel" />}
                icon={<InformationIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                isGray
            >
                <BodyLong>
                    <FormattedMessage id="AleneforsørgerBarnehageplass.BarnehageTekst" />
                </BodyLong>
            </Infobox>
        </VStack>
    );
};

export default AleneforsørgerBarnehageplass;
