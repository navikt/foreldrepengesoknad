import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { Alert, BodyLong, BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';

import {
    AnnenForelder,
    Barn,
    SivilstandType,
    getKjønnFromFnrString,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isUfødtBarn,
} from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import { Datepicker, RadioGroup } from '@navikt/fp-form-hooks';
import { Søker, Søkerrolle } from '@navikt/fp-types';
import { isAfterOrSame, isRequired, isValidDate } from '@navikt/fp-validation';

import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import { AnnenForelderErOppgitt, AnnenForelderFormData, erAnnenForelderOppgitt } from './AnnenForelderFormData';

const skalViseInfoOmFarskapsportal = (
    søker: Søker,
    rolle: Søkerrolle,
    formValues: AnnenForelderErOppgitt,
    annenForelder?: AnnenForelder,
    barnetErIkkeFødt?: boolean,
) => {
    const annenForelderHarRett = formValues.harRettPåForeldrepengerINorge === true;
    const fnrFraAnnenForelder = annenForelder && isAnnenForelderOppgitt(annenForelder) ? annenForelder.fnr : undefined;
    const annenForelderFnr = fnrFraAnnenForelder || formValues.fnr;
    const annenForelderErFarEllerUtenlandsk =
        (annenForelderFnr !== undefined && getKjønnFromFnrString(annenForelderFnr) === 'M') || formValues.utenlandskFnr;
    const annenForelderHarRettErBesvart = formValues.harRettPåForeldrepengerINorge !== undefined;
    const søkerErIkkeGift = søker.sivilstand === undefined || søker.sivilstand.type !== SivilstandType.GIFT;
    return (
        ((rolle === 'far' && annenForelderHarRettErBesvart) ||
            (rolle === 'mor' && annenForelderErFarEllerUtenlandsk && annenForelderHarRett)) &&
        barnetErIkkeFødt &&
        søkerErIkkeGift
    );
};

const getTekstOmFarskapsportal = (rolle: Søkerrolle, barnetErIkkeFødt: boolean) => {
    if (rolle === 'far' && barnetErIkkeFødt) {
        return 'annenForelder.tekstOmFarskapsportal.far.del1';
    }
    if (rolle === 'mor' && barnetErIkkeFødt) {
        return 'annenForelder.tekstOmFarskapsportal.mor.del1';
    }
    return '';
};

type Props = {
    søker: Søker;
    rolle: Søkerrolle;
    barn: Barn;
    annenForelder?: AnnenForelder;
};

const AnnenForelderOppgittPanel: React.FunctionComponent<Props> = ({ søker, rolle, barn, annenForelder }) => {
    const intl = useIntl();

    const familiehendelsedato = getFamiliehendelsedato(barn);

    const formMethods = useFormContext<AnnenForelderFormData>();

    const barnetErIkkeFødt = isUfødtBarn(barn);
    const tekstOmFarskapsportalId = getTekstOmFarskapsportal(rolle, barnetErIkkeFødt);

    const formValues = formMethods.watch();
    if (!erAnnenForelderOppgitt(formValues)) {
        throw Error('Annen forelder skal alltid være oppgitt her');
    }

    const visInfoboksOmFarskapsportal = skalViseInfoOmFarskapsportal(
        søker,
        rolle,
        formValues,
        annenForelder,
        barnetErIkkeFødt,
    );

    return (
        <>
            <div>
                <RadioGroup
                    name="erAleneOmOmsorg"
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
                </RadioGroup>
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
                <Datepicker
                    name="datoForAleneomsorg"
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
            {formValues.erAleneOmOmsorg !== true && (
                <div>
                    <RadioGroup
                        name="harRettPåForeldrepengerINorge"
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
                    </RadioGroup>
                    <ReadMore
                        header={intl.formatMessage({
                            id: 'annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel',
                        })}
                    >
                        <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder"></FormattedMessage>
                        <ul style={{ margin: '0', padding: '1rem 2rem 0' }}>
                            <li>
                                <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1" />
                            </li>
                            <li>
                                <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2" />
                            </li>
                            <li>
                                <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3" />
                            </li>
                        </ul>
                    </ReadMore>
                </div>
            )}
            {formValues.erAleneOmOmsorg === false && visInfoboksOmFarskapsportal && (
                <Alert variant="info">
                    <FormattedMessage
                        id={tekstOmFarskapsportalId}
                        values={{
                            a: (msg: any) => (
                                <a href={links.farskapsportal} className="lenke" rel="noreferrer" target="_blank">
                                    {msg}
                                </a>
                            ),
                        }}
                    />
                    <FormattedMessage id="annenForelder.tekstOmFarskapsportal.mor.far.del2" />
                </Alert>
            )}
            {formValues.erAleneOmOmsorg === false && formValues.harRettPåForeldrepengerINorge === false && (
                <div>
                    <RadioGroup
                        name="harOppholdtSegIEØS"
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
                    </RadioGroup>
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
                    <RadioGroup
                        name="harRettPåForeldrepengerIEØS"
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
                    </RadioGroup>

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
                    <RadioGroup
                        name="erInformertOmSøknaden"
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
                    </RadioGroup>
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
                        <RadioGroup
                            name="erMorUfør"
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
                        </RadioGroup>
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

export default AnnenForelderOppgittPanel;
