import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { BodyShort, HStack, Label, VStack } from '@navikt/ds-react';
import LandOppsummering from './LandOppsummering';
import { OmBarnet, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import { Utenlandsopphold, UtenlandsoppholdPerioder, Periode } from 'types/Utenlandsopphold';
import { notEmpty } from '@navikt/fp-validation';

const erDatoITidsperiode = (dato: string, fom: string, tom: string) => {
    return dayjs(dato).isBetween(dayjs(fom), dayjs(tom), 'day', '[]');
};

const EMPTY_ARRAY = [] as Periode[];

const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: string,
    utenlandsoppholdPerioder = EMPTY_ARRAY,
) => {
    return utenlandsoppholdPerioder.some((opphold) =>
        erDatoITidsperiode(familiehendelsedato, opphold.fom, opphold.tom),
    );
};

interface Props {
    omBarnet: OmBarnet;
    utenlandsopphold: Utenlandsopphold;
    utenlandsoppholdPerioder?: UtenlandsoppholdPerioder;
}

const UtenlandsoppholdOppsummering: React.FunctionComponent<Props> = ({
    omBarnet,
    utenlandsopphold,
    utenlandsoppholdPerioder,
}) => {
    const harTermin = erBarnetIkkeFødt(omBarnet);
    const harFødt = erBarnetFødt(omBarnet);

    return (
        <VStack gap="4">
            {utenlandsopphold.harKunBoddINorge ? (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.boddSisteTolv'} />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage id={'norge'} />
                    </BodyShort>
                </HStack>
            ) : (
                <div>
                    <Label className="textWithLabel__label">
                        <FormattedMessage id={'oppsummering.text.boddSisteTolv'} />
                    </Label>
                    <LandOppsummering utenlandsoppholdListe={notEmpty(utenlandsoppholdPerioder).perioder} />
                </div>
            )}
            {harTermin && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.ogKommerPåFødselstidspunktet'} />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id={
                                erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                    omBarnet.termindato!,
                                    utenlandsoppholdPerioder?.perioder,
                                )
                                    ? 'medlemmskap.radiobutton.vareUtlandet'
                                    : 'medlemmskap.radiobutton.vareNorge'
                            }
                        />
                    </BodyShort>
                </HStack>
            )}
            {harFødt && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.varPåFødselstidspunktet'} />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id={
                                erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                    omBarnet.fødselsdatoer[0].dato,
                                    utenlandsoppholdPerioder?.perioder,
                                )
                                    ? 'oppsummering.utenlandsopphold.iUtlandet'
                                    : 'oppsummering.utenlandsopphold.iNorge'
                            }
                        />
                    </BodyShort>
                </HStack>
            )}
        </VStack>
    );
};

export default UtenlandsoppholdOppsummering;
