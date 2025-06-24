import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions } from 'api/queries';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { getFamiliehendelsedato } from 'utils/barnUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

import { Alert, BodyLong, BodyShort, List, Radio, ReadMore, VStack } from '@navikt/ds-react';

import { Barn } from '@navikt/fp-common';
import { RhfDatepicker, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { Søkerrolle } from '@navikt/fp-types';
import { isAfterOrSame, isRequired, isValidDate } from '@navikt/fp-validation';

import { AnnenForelderFormData, erAnnenForelderOppgitt } from './AnnenForelderFormData';

type Props = {
    rolle: Søkerrolle;
    barn: Barn;
};

export const AnnenForelderOppgittPanel = ({ rolle, barn }: Props) => {
    const intl = useIntl();

    const familiehendelsedato = getFamiliehendelsedato(barn);

    const formMethods = useFormContext<AnnenForelderFormData>();
    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    const annenPartHarVedtak =
        useQuery({
            ...annenPartVedtakOptions,
            select: (vedtak) => !!vedtak,
        }).data ?? false;

    const formValues = formMethods.watch();
    if (!erAnnenForelderOppgitt(formValues)) {
        throw Error('Annen forelder skal alltid være oppgitt her');
    }

    return (
        <>
            <div>
                <RhfRadioGroup
                    name="erAleneOmOmsorg"
                    control={formMethods.control}
                    label={intl.formatMessage({ id: 'annenForelder.aleneOmOmsorg' })}
                    validate={[
                        isRequired(
                            intl.formatMessage({
                                id: 'valideringsfeil.annenForelder.harAleneOmsorgPåkrevd',
                            }),
                        ),
                    ]}
                >
                    <Radio value={false}>
                        <FormattedMessage id="annenForelder.aleneOmOmsorg.ja" />
                    </Radio>
                    <Radio value={true}>
                        <FormattedMessage id="annenForelder.aleneOmOmsorg.nei" />
                    </Radio>
                </RhfRadioGroup>
                <ReadMore header={intl.formatMessage({ id: 'annenForelder.aleneOmOmsorg.apneLabel' })}>
                    <VStack gap="4">
                        <BodyLong>
                            <FormattedMessage id="annenForelder.aleneOmOmsorg.del1" />
                        </BodyLong>
                        <BodyShort>
                            <FormattedMessage id="annenForelder.aleneOmOmsorg.del2" />
                        </BodyShort>
                    </VStack>
                </ReadMore>
            </div>
            {!isFarEllerMedmor(rolle) && formValues.erAleneOmOmsorg === true && (
                <Alert variant="info">
                    <FormattedMessage id="annenForelder.veileder.aleneOmsorg.forBarnet" />
                </Alert>
            )}
            {formValues.erAleneOmOmsorg === true && isFarEllerMedmor(rolle) && (
                <RhfDatepicker
                    name="datoForAleneomsorg"
                    control={formMethods.control}
                    label={intl.formatMessage({ id: 'annenForelder.datoForAleneomsorg' })}
                    minDate={dayjs(familiehendelsedato).toDate()}
                    validate={[
                        isRequired(
                            intl.formatMessage({
                                id: 'valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi',
                            }),
                        ),
                        isValidDate(
                            intl.formatMessage({
                                id: 'valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat',
                            }),
                        ),
                        isAfterOrSame(
                            intl.formatMessage(
                                {
                                    id: 'valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato',
                                },
                                { dato: familiehendelsedato },
                            ),
                            familiehendelsedato,
                        ),
                    ]}
                />
            )}
            {formValues.erAleneOmOmsorg !== true && !annenPartHarVedtak && (
                <div>
                    <RhfRadioGroup
                        name="harRettPåForeldrepengerINorge"
                        control={formMethods.control}
                        label={intl.formatMessage({
                            id: 'annenForelder.harRettPåForeldrepengerINorge',
                        })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'valideringsfeil.annenForelder.harRettTilForeldrepengerPåkrevd',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RhfRadioGroup>
                    <ReadMore
                        header={intl.formatMessage({
                            id: 'annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel',
                        })}
                    >
                        <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder"></FormattedMessage>
                        <List>
                            <List.Item>
                                <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1" />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2" />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3" />
                            </List.Item>
                        </List>
                    </ReadMore>
                </div>
            )}

            {formValues.erAleneOmOmsorg === false && formValues.harRettPåForeldrepengerINorge === false && (
                <div>
                    <RhfRadioGroup
                        name="harOppholdtSegIEØS"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'annenForelder.harOppholdtSegIEØS' })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'valideringsfeil.annenForelder.harOppholdtSegIEØS',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RhfRadioGroup>
                    <ReadMore
                        header={intl.formatMessage({
                            id: 'annenForelder.harOppholdtSegIEØS.veileder.apneLabel',
                        })}
                    >
                        <FormattedMessage id="annenForelder.harOppholdtSegIEØS.veileder"></FormattedMessage>
                    </ReadMore>
                </div>
            )}
            {formValues.erAleneOmOmsorg === false && formValues.harOppholdtSegIEØS === true && (
                <div>
                    <RhfRadioGroup
                        name="harRettPåForeldrepengerIEØS"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'annenForelder.harRettPåForeldrepengerIEØS' })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'valideringsfeil.annenForelder.harRettPåForeldrepengerIEØS',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RhfRadioGroup>

                    <ReadMore
                        header={intl.formatMessage({
                            id: 'annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel',
                        })}
                    >
                        <VStack gap="4">
                            <div>
                                <FormattedMessage id="annenForelder.harRettPåForeldrepengerIEØS.veileder.del1"></FormattedMessage>
                            </div>
                            <FormattedMessage id="annenForelder.harRettPåForeldrepengerIEØS.veileder.del2"></FormattedMessage>
                            <Link to="https://www.nav.no/foreldrepenger#utland" target="_blank">
                                <FormattedMessage id="annenForelder.harRettPåForeldrepengerIEØS.veileder.link" />
                            </Link>
                        </VStack>
                    </ReadMore>
                </div>
            )}
            {formValues.erAleneOmOmsorg !== true && formValues.harRettPåForeldrepengerINorge !== false && (
                <>
                    <RhfRadioGroup
                        name="erInformertOmSøknaden"
                        control={formMethods.control}
                        label={intl.formatMessage({
                            id: 'annenForelder.spørsmål.erAnnenForelderInformert',
                        })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'valideringsfeil.annenForelder.informertAnnenForelderPåkrevd',
                                }),
                            ),
                            (value) =>
                                value === false
                                    ? intl.formatMessage({
                                          id: 'annenForelder.erAnnenForelderInformert.veileder',
                                      })
                                    : null,
                        ]}
                    >
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RhfRadioGroup>
                    {formValues.erInformertOmSøknaden === false && (
                        <Alert variant="warning">
                            <FormattedMessage id="annenForelder.erAnnenForelderInformert.veileder" />
                        </Alert>
                    )}
                </>
            )}

            {formValues.erAleneOmOmsorg === false &&
                formValues.harRettPåForeldrepengerINorge === false &&
                (formValues.harOppholdtSegIEØS === false || formValues.harRettPåForeldrepengerIEØS === false) &&
                isFarEllerMedmor(rolle) && (
                    <div>
                        <RhfRadioGroup
                            name="erMorUfør"
                            control={formMethods.control}
                            label={intl.formatMessage({ id: 'annenForelder.erMorUfør' })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'valideringsfeil.annenForelder.erMorUfør',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value={true}>Ja</Radio>
                            <Radio value={false}>Nei</Radio>
                        </RhfRadioGroup>
                        <ReadMore
                            header={intl.formatMessage({
                                id: 'annenForelder.erMorUfør.veileder.apneLabel',
                            })}
                        >
                            <FormattedMessage id="annenForelder.erMorUfør.veileder" />
                        </ReadMore>
                    </div>
                )}
        </>
    );
};
