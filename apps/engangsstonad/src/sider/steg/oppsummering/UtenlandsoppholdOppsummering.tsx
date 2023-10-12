import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { BodyShort, HStack, Label, VStack } from '@navikt/ds-react';
import LandOppsummering from './LandOppsummering';
import { OmBarnet, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import {
    UtenlandsoppholdPeriode,
    Utenlandsopphold,
    UtenlandsoppholdNeste,
    UtenlandsoppholdSiste,
} from 'types/Utenlandsopphold';
import { notEmpty } from '@navikt/fp-validation';

const erDatoITidsperiode = (dato: string, fom: string, tom: string) => {
    return dayjs(dato).isBetween(dayjs(fom), dayjs(tom), 'day', '[]');
};

const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: string,
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[] = [],
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[] = [],
) => {
    return (
        utenlandsoppholdSiste12Mnd.some((tidligereOpphold) =>
            erDatoITidsperiode(familiehendelsedato, tidligereOpphold.fom, tidligereOpphold.tom),
        ) ||
        utenlandsoppholdNeste12Mnd.some((senereOpphold) =>
            erDatoITidsperiode(familiehendelsedato, senereOpphold.fom, senereOpphold.tom),
        )
    );
};

interface Props {
    omBarnet: OmBarnet;
    utenlandsopphold: Utenlandsopphold;
    utenlandsoppholdSiste?: UtenlandsoppholdSiste;
    utenlandsoppholdNeste?: UtenlandsoppholdNeste;
}

const UtenlandsoppholdOppsummering: React.FunctionComponent<Props> = ({
    omBarnet,
    utenlandsopphold,
    utenlandsoppholdSiste,
    utenlandsoppholdNeste,
}) => {
    const harTermin = erBarnetIkkeFødt(omBarnet);
    const harFødt = erBarnetFødt(omBarnet);

    return (
        <VStack gap="4">
            {utenlandsopphold.harBoddUtenforNorgeSiste12Mnd === false ? (
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
                    <LandOppsummering
                        utenlandsoppholdListe={notEmpty(utenlandsoppholdSiste).utenlandsoppholdSiste12Mnd}
                    />
                </div>
            )}
            {utenlandsopphold.skalBoUtenforNorgeNeste12Mnd === false ? (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id="oppsummering.text.neste12mnd" />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage id="medlemmskap.radiobutton.boNorge" />
                    </BodyShort>
                </HStack>
            ) : (
                <div>
                    <Label className="textWithLabel__label">
                        <FormattedMessage id="oppsummering.text.neste12mnd" />
                    </Label>
                    <LandOppsummering
                        utenlandsoppholdListe={notEmpty(utenlandsoppholdNeste).utenlandsoppholdNeste12Mnd}
                    />
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
                                    utenlandsoppholdSiste?.utenlandsoppholdSiste12Mnd,
                                    utenlandsoppholdNeste?.utenlandsoppholdNeste12Mnd,
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
                                    utenlandsoppholdSiste?.utenlandsoppholdSiste12Mnd,
                                    utenlandsoppholdNeste?.utenlandsoppholdNeste12Mnd,
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
