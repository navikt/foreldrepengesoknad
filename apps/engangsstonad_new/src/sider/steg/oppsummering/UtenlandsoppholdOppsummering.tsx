import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { BodyShort, HStack, Label, VStack } from '@navikt/ds-react';
import LandOppsummering from './LandOppsummering';
import { OmBarnet } from 'types/OmBarnet';
import { Utenlandsopphold, UtenlandsoppholdNeste, UtenlandsoppholdSiste } from 'types/Utenlandsopphold';

interface Props {
    omBarnet: OmBarnet;
    utenlandsopphold: Utenlandsopphold;
    utenlandsoppholdNeste: UtenlandsoppholdNeste;
    utenlandsoppholdSiste: UtenlandsoppholdSiste;
}

const erDatoITidsperiode = (dato: string, fom: string, tom: string) => {
    return dayjs(dato).isBetween(dayjs(fom), dayjs(tom), 'day', '[]');
};

const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: string,
    utenlandsoppholdSiste12Mnd: any,
    utenlandsoppholdNeste12Mnd: any,
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

const UtenlandsoppholdOppsummering: React.FunctionComponent<Props> = ({
    omBarnet,
    utenlandsopphold,
    utenlandsoppholdNeste,
    utenlandsoppholdSiste,
}) => {
    const intl = useIntl();

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
                        {intl.formatMessage({ id: 'oppsummering.text.boddSisteTolv' })}
                    </Label>
                    <LandOppsummering utenlandsoppholdListe={utenlandsoppholdSiste.utenlandsoppholdSiste12Mnd} />
                </div>
            )}
            {utenlandsopphold.skalBoUtenforNorgeNeste12Mnd === false ? (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.neste12mnd'} />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage id={'medlemmskap.radiobutton.boNorge'} />
                    </BodyShort>
                </HStack>
            ) : (
                <div>
                    <Label className="textWithLabel__label">
                        {intl.formatMessage({ id: 'oppsummering.text.neste12mnd' })}
                    </Label>
                    <LandOppsummering utenlandsoppholdListe={utenlandsoppholdNeste.utenlandsoppholdNeste12Mnd} />
                </div>
            )}
            {omBarnet.erBarnetFødt === false && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.ogKommerPåFødselstidspunktet'} />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id={
                                erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                    omBarnet.termindato!,
                                    utenlandsoppholdSiste.utenlandsoppholdSiste12Mnd,
                                    utenlandsoppholdNeste.utenlandsoppholdNeste12Mnd,
                                )
                                    ? intl.formatMessage({ id: 'medlemmskap.radiobutton.vareUtlandet' })
                                    : intl.formatMessage({ id: 'medlemmskap.radiobutton.vareNorge' })
                            }
                        />
                    </BodyShort>
                </HStack>
            )}
            {omBarnet.erBarnetFødt && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.varPåFødselstidspunktet'} />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id={
                                erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                    omBarnet.fødselsdatoer[0],
                                    utenlandsoppholdSiste.utenlandsoppholdSiste12Mnd,
                                    utenlandsoppholdNeste.utenlandsoppholdNeste12Mnd,
                                )
                                    ? intl.formatMessage({ id: 'oppsummering.utenlandsopphold.iUtlandet' })
                                    : intl.formatMessage({ id: 'oppsummering.utenlandsopphold.iNorge' })
                            }
                        />
                    </BodyShort>
                </HStack>
            )}
        </VStack>
    );
};

export default UtenlandsoppholdOppsummering;
