import { BabyWrappedIcon, InformationIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';

import { BodyLong, Link, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, links } from '@navikt/fp-constants';

export const barnehagestartDato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetUFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    if (erFødt || erIkkeFødt || erAdoptert) {
        const dato = erAdoptert || erFødt ? barnet.fødselsdato : barnet.termindato;

        if (dayjs(dato).month() < 8) return dayjs(dato).month(7).add(1, 'year').format('MMMM YYYY');

        if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) return dayjs(dato).add(1, 'year').format('MMMM YYYY');

        if (dayjs(dato).month() === 11)
            return dayjs(dato).startOf('year').add(2, 'year').add(7, 'months').format('MMMM YYYY');
    }
    return undefined;
};

interface Props {
    barnet: OmBarnet;
}

const AleneforsørgerBarnehageplass: FunctionComponent<Props> = ({ barnet }) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetUFødt(barnet);

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
                icon={<BabyWrappedIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
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
                icon={<InformationIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
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
