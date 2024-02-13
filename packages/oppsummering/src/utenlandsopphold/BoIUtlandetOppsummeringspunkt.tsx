import { BodyShort, VStack } from '@navikt/ds-react';
import {
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
    UtenlandsoppholdSenere,
    UtenlandsoppholdTidligere,
} from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';
import dayjs from 'dayjs';
import { FormattedMessage, IntlShape, PrimitiveType, useIntl } from 'react-intl';
import Oppsummeringspunkt from '../Oppsummeringspunkt';
import LandOppsummering from './LandOppsummering';

const erDatoITidsperiode = (dato: string, fom: string, tom: string) => {
    return dayjs(dato).isBetween(dayjs(fom), dayjs(tom), 'day', '[]');
};

const finnDatotekst = (
    intl: IntlShape,
    hendelseType: HendelseType,
    values: Record<string, PrimitiveType>,
): string | undefined => {
    if (hendelseType === HendelseType.TERMIN) {
        return intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.Text.OgKommerPåFødselstidspunktet' }, values);
    }
    if (hendelseType === HendelseType.FØDSEL) {
        return intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.VarPåFødselstidspunktet' }, values);
    }
    if (hendelseType === HendelseType.ADOPSJON) {
        return intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.VarPåOmsorgsovertakelsepunktet' }, values);
    }
    throw new Error('Function not implemented.');
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

export enum HendelseType {
    ADOPSJON = 'ADOPSJON',
    FØDSEL = 'FØDSEL',
    TERMIN = 'TERMIN',
}

interface Props {
    familiehendelseDato: string;
    hendelseType: HendelseType;
    utenlandsopphold: Utenlandsopphold;
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere;
    senereUtenlandsopphold?: UtenlandsoppholdSenere;
    hide?: boolean;
}

const BoIUtlandetOppsummeringspunkt: React.FunctionComponent<Props> = ({
    familiehendelseDato,
    hendelseType,
    utenlandsopphold,
    tidligereUtenlandsopphold,
    senereUtenlandsopphold,
    hide = false,
}) => {
    const intl = useIntl();

    if (hide) {
        return null;
    }

    return (
        <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.Utenlandsopphold' })}>
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
                            id={'BoIUtlandetOppsummeringspunkt.BoddSisteTolv'}
                            values={{ country: intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.Norge' }) }}
                        />
                    </BodyShort>
                )}
                {utenlandsopphold.skalBoUtenforNorgeNeste12Mnd === false && (
                    <BodyShort>
                        <FormattedMessage
                            id="BoIUtlandetOppsummeringspunkt.BoNesteTolv"
                            values={{ country: intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.Norge' }) }}
                        />
                    </BodyShort>
                )}
                <BodyShort>
                    {finnDatotekst(intl, hendelseType, {
                        country: erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                            familiehendelseDato,
                            tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd,
                            senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd,
                        )
                            ? intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.Utlandet' })
                            : intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.Norge' }),
                    })}
                </BodyShort>
            </VStack>
        </Oppsummeringspunkt>
    );
};

export default BoIUtlandetOppsummeringspunkt;
