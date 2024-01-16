import { useIntl, FormattedMessage, IntlShape } from 'react-intl';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { FeedingBottleIcon, ExternalLinkIcon } from '@navikt/aksel-icons';
import { Radio, VStack, ReadMore, Link, Box, BodyShort, Heading, HStack } from '@navikt/ds-react';
import {
    Barn,
    Dekningsgrad,
    Tidsperioden,
    TilgjengeligStønadskonto,
    Uttaksdagen,
    bemUtils,
    isAnnenForelderOppgitt,
    capitalizeFirstLetter,
    getFlerbarnsuker,
    isAdoptertBarn,
} from '@navikt/fp-common';
import { isRequired, notEmpty } from '@navikt/fp-validation';
import { links } from '@navikt/fp-constants';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { RadioGroup, Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import PeriodeMedForeldrepenger from 'app/context/types/PeriodeMedForeldrepenger';
import { getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import { skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';

import './dekningsgradForm.less';

const finnSisteDagMedForeldrepenger = (stønadskonto: TilgjengeligStønadskonto[], barn: Barn) => {
    const dagerSomSkalLeggesTil = getAntallUker(stønadskonto) * 5;

    const erAdopsjon = isAdoptertBarn(barn);
    const fødselsdato = getFødselsdato(barn);
    const termindato = getTermindato(barn);

    //FIXME Dette er ikkje korrekt

    if (erAdopsjon) {
        const førsteDag = Uttaksdagen(barn.adopsjonsdato).denneEllerNeste();
        const sisteDag = Uttaksdagen(førsteDag).leggTil(dagerSomSkalLeggesTil);
        return dayjs(sisteDag).format('dddd DD. MMMM YYYY');
    }
    if (fødselsdato) {
        const førsteDag = Uttaksdagen(fødselsdato).denneEllerNeste();
        const sisteDag = Uttaksdagen(førsteDag).leggTil(dagerSomSkalLeggesTil);
        return dayjs(sisteDag).format('dddd DD. MMMM YYYY');
    }
    if (termindato) {
        const førsteDag = Uttaksdagen(termindato).denneEllerNeste();
        const sisteDag = Uttaksdagen(førsteDag).leggTil(dagerSomSkalLeggesTil);
        return dayjs(sisteDag).format('dddd DD. MMMM YYYY');
    }

    return undefined;
};

const getSøkerAntallTekst = (intl: IntlShape, erDeltUttak: boolean) => {
    return erDeltUttak
        ? intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.dere' })
        : intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.du' });
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    barn: Barn;
    søkersituasjon: SøkersituasjonFp;
    stønadskonto100: TilgjengeligStønadskonto[];
    stønadskonto80: TilgjengeligStønadskonto[];
};

const DekningsgradForm: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    barn,
    søkersituasjon,
    stønadskonto100,
    stønadskonto80,
}) => {
    const intl = useIntl();
    const bem = bemUtils('circle');

    const periodeMedForeldrepenger = useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const oppdaterPeriodeMedForeldrepenger = useContextSaveData(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const formMethods = useForm<PeriodeMedForeldrepenger>({
        defaultValues: periodeMedForeldrepenger,
    });

    const onSubmit = (values: PeriodeMedForeldrepenger) => {
        oppdaterPeriodeMedForeldrepenger(values);
        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN_INFO);

        return mellomlagreSøknadOgNaviger();
    };

    const goToPreviousStep = () => {
        oppdaterAppRoute(SøknadRoutes.ANNEN_FORELDER);
        mellomlagreSøknadOgNaviger();
    };

    const erDeltUttak =
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true);

    const erAdopsjon = isAdoptertBarn(barn);
    const fødselsdato = getFødselsdato(barn);
    const termindato = getTermindato(barn);
    const visInfoOmPrematuruker = skalViseInfoOmPrematuruker(fødselsdato, termindato, søkersituasjon.situasjon);
    const ekstraDagerGrunnetPrematurFødsel =
        visInfoOmPrematuruker && fødselsdato && termindato
            ? Tidsperioden({ fom: fødselsdato, tom: termindato }).getAntallUttaksdager() - 1
            : undefined;

    const sisteDag100Prosent = finnSisteDagMedForeldrepenger(stønadskonto100, barn);
    const sisteDag80Prosent = finnSisteDagMedForeldrepenger(stønadskonto80, barn);

    const søkerAntallTekst = getSøkerAntallTekst(intl, erDeltUttak);

    return (
        <Form formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="10">
                <ErrorSummaryHookForm />
                <VStack gap="4">
                    <RadioGroup
                        name="dekningsgrad"
                        description={
                            erDeltUttak ? (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.beskrivelse" />
                            ) : (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.beskrivelse.alene" />
                            )
                        }
                        label={
                            erDeltUttak ? (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.label.deltUttak" />
                            ) : (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.label.ikkeDeltUttak" />
                            )
                        }
                        validate={[
                            isRequired(
                                intl.formatMessage(
                                    { id: 'DekningsgradForm.MåOppgiDekningsgrad' },
                                    { soker: søkerAntallTekst },
                                ),
                            ),
                        ]}
                    >
                        <Radio
                            value={Dekningsgrad.HUNDRE_PROSENT}
                            description={
                                erAdopsjon || fødselsdato
                                    ? intl.formatMessage(
                                          { id: 'uttaksplaninfo.Uker.beskrivelseErFodtEllerAdopsjon' },
                                          { dato: sisteDag100Prosent, soker: søkerAntallTekst },
                                      )
                                    : intl.formatMessage(
                                          { id: 'uttaksplaninfo.Uker.beskrivelse' },
                                          { dato: sisteDag100Prosent, soker: søkerAntallTekst },
                                      )
                            }
                        >
                            <FormattedMessage
                                id="uttaksplaninfo.49Uker"
                                values={{
                                    antallUker: getAntallUker(stønadskonto100),
                                }}
                            />
                        </Radio>
                        <Radio
                            value={Dekningsgrad.ÅTTI_PROSENT}
                            description={
                                erAdopsjon || fødselsdato
                                    ? intl.formatMessage(
                                          { id: 'uttaksplaninfo.Uker.beskrivelseErFodtEllerAdopsjon' },
                                          { dato: sisteDag80Prosent, soker: søkerAntallTekst },
                                      )
                                    : intl.formatMessage(
                                          { id: 'uttaksplaninfo.Uker.beskrivelse' },
                                          { dato: sisteDag80Prosent, soker: søkerAntallTekst },
                                      )
                            }
                        >
                            <FormattedMessage
                                id="uttaksplaninfo.59Uker"
                                values={{
                                    antallUker: getAntallUker(stønadskonto80),
                                }}
                            />
                        </Radio>
                    </RadioGroup>
                    <ReadMore
                        header={
                            erDeltUttak ? (
                                <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad.header" />
                            ) : (
                                <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad.header.alene" />
                            )
                        }
                    >
                        <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad" />
                        <Link href={links.søknadsfrister} target="_blank">
                            nav.no/foreldrepenger
                            <ExternalLinkIcon title="a11y-title" fontSize="1.5rem" />
                        </Link>
                    </ReadMore>
                </VStack>
                {visInfoOmPrematuruker && !!ekstraDagerGrunnetPrematurFødsel && (
                    <Box padding="4" background="surface-action-subtle">
                        <HStack justify="space-between" align="start">
                            <VStack gap="2" style={{ width: '85%' }}>
                                <Heading size="xsmall">
                                    <FormattedMessage
                                        id="DekningsgradForm.InformasjonPrematurukerHeader"
                                        values={{
                                            soker: capitalizeFirstLetter(søkerAntallTekst),
                                        }}
                                    />
                                </Heading>
                                <BodyShort>
                                    <FormattedMessage
                                        id="DekningsgradForm.InformasjonPrematuruker"
                                        values={{
                                            uker: Math.floor(ekstraDagerGrunnetPrematurFødsel / 5),
                                            dager: ekstraDagerGrunnetPrematurFødsel % 5,
                                            soker: erDeltUttak
                                                ? intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.dere' })
                                                : intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.deg' }),
                                        }}
                                    />
                                </BodyShort>
                            </VStack>
                            <div className={bem.block}>
                                <FeedingBottleIcon height={24} width={24} color="#005B82" />
                            </div>
                        </HStack>
                    </Box>
                )}
                {barn.antallBarn > 1 && (
                    <Box padding="4" background="surface-action-subtle">
                        <HStack justify="space-between" align="start">
                            <VStack gap="2" style={{ width: '85%' }}>
                                <Heading size="xsmall">
                                    {barn.antallBarn === 2 && (
                                        <FormattedMessage
                                            id="DekningsgradForm.InformasjonToBarn"
                                            values={{
                                                sokerStorBokstav: capitalizeFirstLetter(søkerAntallTekst),
                                                soker: søkerAntallTekst,
                                            }}
                                        />
                                    )}
                                    {barn.antallBarn > 2 && (
                                        <FormattedMessage
                                            id="DekningsgradForm.InformasjonFlereEnnToBarn"
                                            values={{
                                                sokerStorBokstav: capitalizeFirstLetter(søkerAntallTekst),
                                                soker: søkerAntallTekst,
                                            }}
                                        />
                                    )}
                                </Heading>
                                <BodyShort>
                                    <FormattedMessage
                                        id="DekningsgradForm.InformasjonFlerbarnUker"
                                        values={{
                                            uker80: getFlerbarnsuker(Dekningsgrad.ÅTTI_PROSENT, barn.antallBarn),
                                            uker100: getFlerbarnsuker(Dekningsgrad.HUNDRE_PROSENT, barn.antallBarn),
                                            soker: søkerAntallTekst,
                                        }}
                                    />
                                </BodyShort>
                            </VStack>
                            <div className={bem.block}>
                                <FeedingBottleIcon height={24} width={24} color="#005B82" />
                            </div>
                        </HStack>
                    </Box>
                )}
                <StepButtonsHookForm goToPreviousStep={goToPreviousStep} />
            </VStack>
        </Form>
    );
};

export default DekningsgradForm;
