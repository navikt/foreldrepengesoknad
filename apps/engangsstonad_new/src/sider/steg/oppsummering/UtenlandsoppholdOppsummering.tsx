import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { BodyShort, HStack, Label, VStack } from '@navikt/ds-react';
import LandOppsummering from './LandOppsummering';
import { FormValues as OmBarnetFormValues } from '../omBarnet/OmBarnetForm';
import { FormValues as UtenlandsoppholdFormFormValus } from '../utenlandsopphold/UtenlandsoppholdForm';
import { FormValues as UtenlandsoppholdFremtidigFormFormValus } from '../utlandsoppholdNeste/NesteUtlandsopphold';
import { FormValues as UtenlandsoppholdTidligereFormFormValus } from '../utlandsoppholdSiste/SisteUtlandsopphold';

interface Props {
    barn: OmBarnetFormValues;
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormFormValus;
    utenlandsoppholdFremtidig?: UtenlandsoppholdFremtidigFormFormValus;
    utenlandsoppholdTidligere?: UtenlandsoppholdTidligereFormFormValus;
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
    barn,
    informasjonOmUtenlandsopphold,
    utenlandsoppholdFremtidig,
    utenlandsoppholdTidligere,
}) => {
    const intl = useIntl();

    return (
        <VStack gap="4">
            {informasjonOmUtenlandsopphold.harBoddUtenforNorgeSiste12Mnd === false ? (
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
                    <LandOppsummering utenlandsoppholdListe={utenlandsoppholdTidligere.utenlandsoppholdSiste12Mnd} />
                </div>
            )}
            {informasjonOmUtenlandsopphold.skalBoUtenforNorgeNeste12Mnd === false ? (
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
                    <LandOppsummering utenlandsoppholdListe={utenlandsoppholdFremtidig.utenlandsoppholdNeste12Mnd} />
                </div>
            )}
            {barn.erBarnetFødt === false && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.ogKommerPåFødselstidspunktet'} />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id={
                                erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                    barn.termindato!,
                                    utenlandsoppholdTidligere.utenlandsoppholdSiste12Mnd,
                                    utenlandsoppholdFremtidig.utenlandsoppholdNeste12Mnd,
                                )
                                    ? intl.formatMessage({ id: 'medlemmskap.radiobutton.vareUtlandet' })
                                    : intl.formatMessage({ id: 'medlemmskap.radiobutton.vareNorge' })
                            }
                        />
                    </BodyShort>
                </HStack>
            )}
            {barn.erBarnetFødt && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.varPåFødselstidspunktet'} />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id={
                                erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                    barn.fødselsdatoer[0],
                                    utenlandsoppholdTidligere.utenlandsoppholdSiste12Mnd,
                                    utenlandsoppholdFremtidig.utenlandsoppholdNeste12Mnd,
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
