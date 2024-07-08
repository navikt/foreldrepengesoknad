import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, IntlShape, PrimitiveType, useIntl } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import {
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
    UtenlandsoppholdSenere,
    UtenlandsoppholdTidligere,
} from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

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
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    {intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.Utenlandsopphold' })}
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Hvor har du bodd de siste 12 månedene?</FormSummary.Label>
                    <FormSummary.Value>
                        <FormattedMessage
                            id={'BoIUtlandetOppsummeringspunkt.BoddSisteTolv'}
                            values={{ country: intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.Norge' }) }}
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>

            {tidligereUtenlandsopphold && (
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>Hvilke land har du bodd i de siste 12?</FormSummary.Label>
                        <FormSummary.Value>
                            <LandOppsummering
                                utenlandsoppholdListe={notEmpty(tidligereUtenlandsopphold.utenlandsoppholdSiste12Mnd)}
                            />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            )}

            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Hvor skal du bo de siste 12 månedene?</FormSummary.Label>
                    <FormSummary.Value>
                        <FormattedMessage // TODO: INTL
                            id="BoIUtlandetOppsummeringspunkt.BoNesteTolv"
                            values={{ country: intl.formatMessage({ id: 'BoIUtlandetOppsummeringspunkt.Norge' }) }}
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            {senereUtenlandsopphold && (
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>Hvilke land skal du bo i de neste 12 månede?</FormSummary.Label>
                        <FormSummary.Value>
                            <LandOppsummering
                                utenlandsoppholdListe={notEmpty(senereUtenlandsopphold.utenlandsoppholdNeste12Mnd)}
                            />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            )}
        </FormSummary>
    );
};

export default BoIUtlandetOppsummeringspunkt;
