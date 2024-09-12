import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import isFarEllerMedmor from 'utils/isFarEllerMedmor';

import { FormSummary } from '@navikt/ds-react';

import { AnnenForelder, Søkerrolle, isAnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from '@navikt/fp-common';

interface Props {
    annenForelder: AnnenForelder;
    søkerrolle: Søkerrolle;
    onVilEndreSvar: () => void;
}

const AnnenForelderOppsummering: FunctionComponent<Props> = ({ annenForelder, søkerrolle, onVilEndreSvar }) => {
    const erFarEllerMedmor = isFarEllerMedmor(søkerrolle);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="AnnenForelderOppsummering.tittel" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {isAnnenForelderIkkeOppgitt(annenForelder) && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="oppsummering.annenForelder.ikkeOppgitt" />
                        </FormSummary.Label>
                    </FormSummary.Answer>
                )}
                {isAnnenForelderOppgitt(annenForelder) && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="oppsummering.annenForelder.navn" />
                            </FormSummary.Label>
                            <FormSummary.Value>{`${annenForelder.fornavn} ${annenForelder.etternavn}`}</FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="oppsummering.annenForelder.fnr" />
                            </FormSummary.Label>
                            <FormSummary.Value>{annenForelder.fnr}</FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                {!annenForelder.erAleneOmOmsorg ? (
                                    <FormattedMessage id="oppsummering.annenForelder.fellesOmsorg.tittel" />
                                ) : (
                                    <FormattedMessage id="oppsummering.annenForelder.aleneOmOmsorg.tittel" />
                                )}
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {annenForelder.erAleneOmOmsorg ? (
                                    <FormattedMessage id="oppsummering.annenForelder.aleneOmOmsorg.tekst" />
                                ) : (
                                    <FormattedMessage id="oppsummering.annenForelder.fellesOmsorg.tekst" />
                                )}
                            </FormSummary.Value>
                            {!annenForelder.erAleneOmOmsorg && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <FormattedMessage
                                            id="oppsummering.annenForelder.rettPåForeldrepengerINorge"
                                            values={{ navn: annenForelder.fornavn }}
                                        />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <FormattedMessage
                                            id={annenForelder.harRettPåForeldrepengerINorge ? 'ja' : 'nei'}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                            {!annenForelder.erAleneOmOmsorg && !annenForelder.harRettPåForeldrepengerINorge && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <FormattedMessage
                                            id="oppsummering.annenForelder.harOppholdtSegIEØS"
                                            values={{ navn: annenForelder.fornavn }}
                                        />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <FormattedMessage id={annenForelder.harOppholdtSegIEØS ? 'ja' : 'nei'} />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                            {!annenForelder.erAleneOmOmsorg && annenForelder.harOppholdtSegIEØS === true && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <FormattedMessage
                                            id="oppsummering.annenForelder.rettPåForeldrepengerIEØS"
                                            values={{ navn: annenForelder.fornavn }}
                                        />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <FormattedMessage
                                            id={annenForelder.harRettPåForeldrepengerIEØS ? 'ja' : 'nei'}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                            {erFarEllerMedmor &&
                                !annenForelder.erAleneOmOmsorg &&
                                !annenForelder.harRettPåForeldrepengerINorge &&
                                !annenForelder.harRettPåForeldrepengerIEØS && (
                                    <FormSummary.Answer>
                                        <FormSummary.Label>
                                            <FormattedMessage
                                                id="oppsummering.annenForelder.erMorUfør"
                                                values={{ navn: annenForelder.fornavn }}
                                            />
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <FormattedMessage id={annenForelder.erMorUfør ? 'ja' : 'nei'} />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                )}
                        </FormSummary.Answer>
                    </>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default AnnenForelderOppsummering;
