import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import { useCustomIntl } from '@navikt/fp-ui';
import { OmBarnet, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import {
    Utenlandsopphold,
    UtenlandsoppholdSenere,
    UtenlandsoppholdTidligere,
    UtenlandsoppholdPeriode,
} from 'types/Utenlandsopphold';
import LandOppsummering from './LandOppsummering';

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
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere;
    senereUtenlandsopphold?: UtenlandsoppholdSenere;
}

const UtenlandsoppholdOppsummering: React.FunctionComponent<Props> = ({
    omBarnet,
    utenlandsopphold,
    tidligereUtenlandsopphold,
    senereUtenlandsopphold,
}) => {
    const { i18n } = useCustomIntl();
    const harTermin = erBarnetIkkeFødt(omBarnet);
    const harFødt = erBarnetFødt(omBarnet);

    return (
        <VStack gap="5">
            <VStack gap="2">
                {utenlandsopphold.harBoddUtenforNorgeSiste12Mnd && (
                    <LandOppsummering
                        utenlandsoppholdListe={notEmpty(tidligereUtenlandsopphold).utenlandsoppholdSiste12Mnd}
                    />
                )}
                {utenlandsopphold.skalBoUtenforNorgeNeste12Mnd && (
                    <LandOppsummering
                        utenlandsoppholdListe={notEmpty(senereUtenlandsopphold).utenlandsoppholdNeste12Mnd}
                    />
                )}
            </VStack>
            {utenlandsopphold.harBoddUtenforNorgeSiste12Mnd === false && (
                <BodyShort>
                    <FormattedMessage
                        id={'UtenlandsoppholdOppsummering.BoddSisteTolv'}
                        values={{ country: i18n('UtenlandsoppholdOppsummering.Norge') }}
                    />
                </BodyShort>
            )}
            {utenlandsopphold.skalBoUtenforNorgeNeste12Mnd === false && (
                <BodyShort>
                    <FormattedMessage
                        id="UtenlandsoppholdOppsummering.BoNesteTolv"
                        values={{ country: i18n('UtenlandsoppholdOppsummering.Norge') }}
                    />
                </BodyShort>
            )}
            {harTermin && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage
                            id={'UtenlandsoppholdOppsummering.Text.OgKommerPåFødselstidspunktet'}
                            values={{
                                country: erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                    omBarnet.termindato!,
                                    tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd,
                                    senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd,
                                )
                                    ? i18n('UtenlandsoppholdOppsummering.Utlandet')
                                    : i18n('UtenlandsoppholdOppsummering.Norge'),
                            }}
                        />
                    </BodyShort>
                </HStack>
            )}
            {harFødt && (
                <BodyShort>
                    <FormattedMessage
                        id={'UtenlandsoppholdOppsummering.VarPåFødselstidspunktet'}
                        values={{
                            country: erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                omBarnet.fødselsdato,
                                tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd,
                                senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd,
                            )
                                ? i18n('UtenlandsoppholdOppsummering.Utlandet')
                                : i18n('UtenlandsoppholdOppsummering.Norge'),
                        }}
                    />
                </BodyShort>
            )}
        </VStack>
    );
};

export default UtenlandsoppholdOppsummering;
