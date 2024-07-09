import { FormattedMessage } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { UtenlandsoppholdPeriode } from '@navikt/fp-types';

import LandOppsummering from './LandOppsummering';

export enum HendelseType {
    ADOPSJON = 'ADOPSJON',
    FØDSEL = 'FØDSEL',
    TERMIN = 'TERMIN',
}

interface Props {
    tidligereUtenlandsopphold: UtenlandsoppholdPeriode[];
    senereUtenlandsopphold: UtenlandsoppholdPeriode[];
    onVilEndreSvar: () => void;
}

const BoIUtlandetOppsummeringspunkt = ({
    onVilEndreSvar,
    tidligereUtenlandsopphold,
    senereUtenlandsopphold,
}: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="BoIUtlandetOppsummeringspunkt.tittel" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar} />
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.tittel" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <FormattedMessage
                            id={
                                tidligereUtenlandsopphold.length > 0
                                    ? 'BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.utlandet'
                                    : 'BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.iNorge'
                            }
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>

            {tidligereUtenlandsopphold.length > 0 && (
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage
                                id="BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.land.label"
                                values={{ antall: tidligereUtenlandsopphold.length }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <LandOppsummering utenlandsoppholdListe={tidligereUtenlandsopphold} />
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
                                senereUtenlandsopphold.length > 0
                                    ? 'BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.utlandet'
                                    : 'BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.iNorge'
                            }
                        />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            {senereUtenlandsopphold.length > 0 && (
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage
                                id="BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.land.label"
                                values={{ antall: senereUtenlandsopphold.length }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <LandOppsummering utenlandsoppholdListe={senereUtenlandsopphold} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            )}
        </FormSummary>
    );
};

export default BoIUtlandetOppsummeringspunkt;
