import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import isFarEllerMedmor from 'utils/isFarEllerMedmor';

import { FormSummary } from '@navikt/ds-react';

import { AnnenForelder, Søkerrolle, isAnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { formatDate } from '@navikt/fp-utils';

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
                            <FormSummary.Value>
                                {`${annenForelder.fornavn} ${annenForelder.etternavn}, ${annenForelder.fnr || annenForelder.utenlandskFnr}`}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="annenForelder.aleneOmOmsorg" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {annenForelder.erAleneOmOmsorg ? (
                                    <FormattedMessage id="nei" />
                                ) : (
                                    <FormattedMessage id="ja" />
                                )}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        {annenForelder.erAleneOmOmsorg && annenForelder.datoForAleneomsorg && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <FormattedMessage id="annenForelder.datoForAleneomsorg" />
                                </FormSummary.Label>
                                <FormSummary.Value>{formatDate(annenForelder.datoForAleneomsorg)}</FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                        {!annenForelder.erAleneOmOmsorg && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {annenForelder.harRettPåForeldrepengerINorge ? (
                                        <FormattedMessage id="ja" />
                                    ) : (
                                        <FormattedMessage id="nei" />
                                    )}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                        {!annenForelder.erAleneOmOmsorg && annenForelder.harRettPåForeldrepengerINorge === false && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <FormattedMessage id="annenForelder.harOppholdtSegIEØS" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {annenForelder.harOppholdtSegIEØS ? (
                                        <FormattedMessage id="ja" />
                                    ) : (
                                        <FormattedMessage id="nei" />
                                    )}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                        {!annenForelder.erAleneOmOmsorg && annenForelder.harOppholdtSegIEØS && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <FormattedMessage id="annenForelder.harRettPåForeldrepengerIEØS" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {annenForelder.harRettPåForeldrepengerIEØS ? (
                                        <FormattedMessage id="ja" />
                                    ) : (
                                        <FormattedMessage id="nei" />
                                    )}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                        {!annenForelder.erAleneOmOmsorg && annenForelder.harRettPåForeldrepengerINorge && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <FormattedMessage id="annenForelder.spørsmål.erAnnenForelderInformert" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {annenForelder.erInformertOmSøknaden ? (
                                        <FormattedMessage id="ja" />
                                    ) : (
                                        <FormattedMessage id="nei" />
                                    )}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                        {erFarEllerMedmor &&
                            !annenForelder.erAleneOmOmsorg &&
                            !annenForelder.harRettPåForeldrepengerINorge === false &&
                            (annenForelder.harOppholdtSegIEØS === false ||
                                annenForelder.harRettPåForeldrepengerIEØS === false) && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <FormattedMessage id="annenForelder.erMorUfør" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        {annenForelder.erMorUfør ? (
                                            <FormattedMessage id="ja" />
                                        ) : (
                                            <FormattedMessage id="nei" />
                                        )}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                    </>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default AnnenForelderOppsummering;
