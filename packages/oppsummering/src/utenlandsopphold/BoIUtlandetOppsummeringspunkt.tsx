import dayjs from 'dayjs';
import { FormattedMessage, IntlShape, PrimitiveType } from 'react-intl';

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

const BoIUtlandetOppsummeringspunkt = ({
    familiehendelseDato,
    hendelseType,
    utenlandsopphold,
    tidligereUtenlandsopphold,
    senereUtenlandsopphold,
    hide = false,
}: Props) => {
    if (hide) {
        return null;
    }

    // TODO: trengs begge?
    const harBoddUtenforNorge =
        utenlandsopphold.harBoddUtenforNorgeSiste12Mnd &&
        (tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd ?? []).length > 0;

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="BoIUtlandetOppsummeringspunkt.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.tittel" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <FormattedMessage
                            id={
                                utenlandsopphold.harBoddUtenforNorgeSiste12Mnd
                                    ? 'BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.utlandet'
                                    : 'BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.iNorge'
                            }
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>

            {harBoddUtenforNorge && (
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage
                                id="BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.land.label"
                                values={{ antall: tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd.length ?? 1 }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <LandOppsummering
                                utenlandsoppholdListe={notEmpty(tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd)}
                            />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            )}

            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.tittel" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <FormattedMessage
                            id={
                                utenlandsopphold.skalBoUtenforNorgeNeste12Mnd
                                    ? 'BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.utlandet'
                                    : 'BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.iNorge'
                            }
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            {utenlandsopphold.skalBoUtenforNorgeNeste12Mnd && (
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage
                                id="BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.land.label"
                                values={{ antall: senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd?.length ?? 1 }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <LandOppsummering
                                utenlandsoppholdListe={notEmpty(senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd)}
                            />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            )}
        </FormSummary>
    );
};

export default BoIUtlandetOppsummeringspunkt;
