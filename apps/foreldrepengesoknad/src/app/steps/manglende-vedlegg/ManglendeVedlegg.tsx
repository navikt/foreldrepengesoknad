import { Block, formatDate, intlUtils, Step } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import _ from 'lodash';

import { FormattedMessage, useIntl } from 'react-intl';
import { isInfoPeriode, Periode } from 'uttaksplan/types/Periode';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig, { getPreviousStepHref, getPreviousStepHrefEndringssøknad } from '../stepsConfig';
import {
    ManglendeVedleggFormComponents,
    ManglendeVedleggFormData,
    ManglendeVedleggFormField,
} from './manglendeVedleggFormConfig';
import dayjs from 'dayjs';
import { manglendeVedleggQuestionsConfig, ManglendeVedleggQuestionsPayload } from './manglendeVedleggQuestionsConfig';
import { sorterPerioder } from '../uttaksplan-info/utils/Periodene';
import { finnSendSenereVedlegg, isAttachmentForPeriode } from './util';
import { AttachmentType } from 'app/types/AttachmentType';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { getInitValues } from './manglendeVedleggFormUtils';
import { FieldArray } from 'formik';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import { BodyShort, Button, GuidePanel, Label, ReadMore } from '@navikt/ds-react';

export const attenUkerPluss3Number = 18 * 7 + 3;

const getManglendeVedleggValues = (type: AttachmentType, fornavnAnnenForelder: string) => {
    return type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
        ? {
              navn: fornavnAnnenForelder,
          }
        : undefined;
};

const lagSti = (stiDeler: string[]) => {
    const sti = stiDeler.reduce((formatertSti, del) => {
        return isNaN(+del) ? formatertSti + '.' + del : formatertSti + '[' + del + ']';
    }, '');
    return sti.replace('.søknad.', '');
};

const ManglendeVedlegg: React.FunctionComponent = () => {
    const intl = useIntl();
    const søknad = useSøknad();
    const { uttaksplan, erEndringssøknad } = søknad;

    const alleSendSenereVedlegg = finnSendSenereVedlegg(søknad);
    const alleStierMedManglendeVedlegg = Array.from(alleSendSenereVedlegg.keys());

    const onValidSubmitHandler = (values: Partial<ManglendeVedleggFormData>) => {
        values.vedlegg!.forEach((vedlegg, index) => {
            if (vedlegg) {
                const sti = lagSti(alleStierMedManglendeVedlegg[index].split('.'));
                _.set(søknad, sti, vedlegg);
            }
        });

        //TODO (TOR) Om ein skal gjera det på denne måten må ein laga ei djup klone av søknad og så ein updateSøknad actionCreator
        //Utan djup klone gir det liten meining å kalla actionCreator
        return [
            /*actionCreator.setVedlegg(stiOgVedlegg)*/
        ];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.OPPSUMMERING,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const fornavnAnnenForelder = isAnnenForelderOppgitt(søknad.annenForelder) ? søknad.annenForelder.fornavn : '';

    const førsteUttaksEllerUttsettelsesPeriode = uttaksplan
        .filter((p: Periode) => p.tidsperiode.fom !== undefined && !isInfoPeriode(p))
        .sort(sorterPerioder)
        .shift();

    const erLikEllerMindreEnnFireUkerTilUttaketStarter =
        førsteUttaksEllerUttsettelsesPeriode !== undefined &&
        dayjs
            .utc(førsteUttaksEllerUttsettelsesPeriode.tidsperiode.fom)
            .isSameOrBefore(dayjs.utc().add(4, 'weeks'), 'day');

    const manglendeVedleggTyper = Array.from(alleSendSenereVedlegg.values()).map((v) => v.type);
    useSaveLoadedRoute(SøknadRoutes.MANGLENDE_VEDLEGG);

    return (
        <ManglendeVedleggFormComponents.FormikWrapper
            initialValues={getInitValues()}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = manglendeVedleggQuestionsConfig.getVisbility({
                    ...formValues,
                    manglendeVedleggTyper,
                    erLikEllerMindreEnnFireUkerTilUttaketStarter,
                } as ManglendeVedleggQuestionsPayload);

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        backLinkHref={
                            erEndringssøknad
                                ? getPreviousStepHrefEndringssøknad('dokumentasjon')
                                : getPreviousStepHref('dokumentasjon')
                        }
                        activeStepId="dokumentasjon"
                        pageTitle={intlUtils(intl, 'søknad.manglendeVedlegg')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl, erEndringssøknad)}
                    >
                        <ManglendeVedleggFormComponents.Form includeButtons={false}>
                            <Block padBottom="l">
                                <GuidePanel>
                                    <FormattedMessage
                                        id={
                                            erLikEllerMindreEnnFireUkerTilUttaketStarter
                                                ? 'manglendeVedlegg.veileder'
                                                : 'manglendeVedlegg.uttaksplan.advarsel.forTidligUtenDokumentasjon'
                                        }
                                    />
                                </GuidePanel>
                            </Block>
                            {alleStierMedManglendeVedlegg.map((keyISoknad, index) => {
                                const key = keyISoknad.replace('søknad.', '');
                                const periode = _.get(søknad, key.replace('.vedlegg', '').split('.'));

                                const sendSenereVedlegg = alleSendSenereVedlegg.get(keyISoknad)!;
                                if (sendSenereVedlegg.type === AttachmentType.SEN_ENDRING) {
                                    return null;
                                }
                                return (
                                    <Block
                                        key={
                                            sendSenereVedlegg.type +
                                            periode?.tidsperiode?.fom +
                                            periode?.tidsperiode?.tom
                                        }
                                    >
                                        <Label>
                                            {intlUtils(
                                                intl,
                                                `manglendeVedlegg.title.${sendSenereVedlegg.type}`,
                                                getManglendeVedleggValues(sendSenereVedlegg.type, fornavnAnnenForelder)
                                            )}
                                        </Label>
                                        <ReadMore
                                            header={intlUtils(
                                                intl,
                                                `manglendeVedlegg.apneLabel.${sendSenereVedlegg.type}`,
                                                getManglendeVedleggValues(sendSenereVedlegg.type, fornavnAnnenForelder)
                                            )}
                                        >
                                            <div style={{ backgroundColor: '#f1f1f1', padding: '1.5rem' }}>
                                                <BodyShort>
                                                    {intlUtils(
                                                        intl,
                                                        `manglendeVedlegg.info.${sendSenereVedlegg.type}`,
                                                        getManglendeVedleggValues(
                                                            sendSenereVedlegg.type,
                                                            fornavnAnnenForelder
                                                        )
                                                    )}
                                                </BodyShort>
                                            </div>
                                        </ReadMore>
                                        {periode?.tidsperiode && periode?.type && (
                                            <Block margin="l">
                                                <BodyShort>
                                                    {intlUtils(
                                                        intl,
                                                        isAttachmentForPeriode(sendSenereVedlegg.type)
                                                            ? 'manglendeVedlegg.uttak.periode.tidsperiode'
                                                            : 'manglendeVedlegg.periode.tidsperiode',
                                                        {
                                                            type: intlUtils(
                                                                intl,
                                                                sendSenereVedlegg.type === AttachmentType.ANNEN_INNTEKT
                                                                    ? `inntektstype.${periode.type.toLowerCase()}`
                                                                    : periode.type
                                                            ),
                                                            fom: formatDate(periode.tidsperiode.fom),
                                                            tom: periode.tidsperiode.tom
                                                                ? formatDate(periode.tidsperiode.tom)
                                                                : '-',
                                                        }
                                                    )}
                                                </BodyShort>
                                            </Block>
                                        )}
                                        <FieldArray
                                            name={ManglendeVedleggFormField.vedlegg}
                                            render={() => {
                                                return (
                                                    <FormikFileUploader
                                                        key={`${ManglendeVedleggFormField.vedlegg}.${index}`}
                                                        name={`${ManglendeVedleggFormField.vedlegg}.${index}`}
                                                        legend=""
                                                        label={intlUtils(
                                                            intl,
                                                            'manglendeVedlegg.lastopp.manglende.vedlegg'
                                                        )}
                                                        attachments={
                                                            formValues.vedlegg &&
                                                            formValues.vedlegg.length > index &&
                                                            formValues.vedlegg[index]
                                                                ? formValues.vedlegg[index]
                                                                : []
                                                        }
                                                        attachmentType={sendSenereVedlegg.type}
                                                        skjemanummer={sendSenereVedlegg.skjemanummer}
                                                    />
                                                );
                                            }}
                                        />
                                    </Block>
                                );
                            })}
                            <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                                <Button disabled={isSubmitting} loading={isSubmitting}>
                                    {intlUtils(intl, 'søknad.gåVidere')}
                                </Button>
                            </Block>
                        </ManglendeVedleggFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default ManglendeVedlegg;
