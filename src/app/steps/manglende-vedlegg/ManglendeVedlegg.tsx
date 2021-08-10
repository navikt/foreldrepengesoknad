import { Block, formatDate, intlUtils, Step, UtvidetInformasjon } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import { Hovedknapp } from 'nav-frontend-knapper';
import _ from 'lodash';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isInfoPeriode, Periode } from 'uttaksplan/types/Periode';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import {
    ManglendeVedleggFormComponents,
    ManglendeVedleggFormData,
    ManglendeVedleggFormField,
} from './manglendeVedleggFormConfig';
import dayjs from 'dayjs';
import { manglendeVedleggQuestionsConfig } from './manglendeVedleggQuestionsConfig';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';
import { sorterPerioder } from '../uttaksplan-info/utils/Periodene';
import { finnSendSenereVedlegg, isAttachmentForPeriode } from './util';
import { AttachmentType } from 'app/types/AttachmentType';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { getInitValues } from './manglendeVedleggFormUtils';
import { FieldArray } from 'formik';

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
    const { uttaksplan } = søknad;

    const alleSendSenereVedlegg = finnSendSenereVedlegg(søknad);
    const alleStierMedManglendeVedlegg = Array.from(alleSendSenereVedlegg.keys());

    const onValidSubmitHandler = (values: Partial<ManglendeVedleggFormData>) => {
        values.vedlegg!.forEach((vedlegg, index) => {
            if (!!vedlegg) {
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

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.OPPSUMMERING);
    const onAvbrytSøknad = useAvbrytSøknad();

    const fornavnAnnenForelder = isAnnenForelderOppgitt(søknad.annenForelder) ? søknad.annenForelder.fornavn : '';

    const førsteUttaksEllerUttsettelsesPeriode = uttaksplan
        .filter((p: Periode) => p.tidsperiode.fom !== undefined && !isInfoPeriode(p))
        .sort(sorterPerioder)
        .shift();

    const erLikEllerMindreEnnFireUkerTilUttaketStarter =
        førsteUttaksEllerUttsettelsesPeriode !== undefined &&
        dayjs(førsteUttaksEllerUttsettelsesPeriode.tidsperiode.fom).isSameOrBefore(dayjs().add(4, 'weeks'));

    const manglendeVedleggTyper = Array.from(alleSendSenereVedlegg.values()).map((v) => v.type);

    return (
        <ManglendeVedleggFormComponents.FormikWrapper
            initialValues={getInitValues()}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = manglendeVedleggQuestionsConfig.getVisbility({
                    ...formValues,
                    manglendeVedleggTyper,
                    erLikEllerMindreEnnFireUkerTilUttaketStarter,
                });

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        backLinkHref={getPreviousStepHref('omBarnet')}
                        activeStepId="dokumentasjon"
                        pageTitle={intlUtils(intl, 'søknad.manglendeVedlegg')}
                        stepTitle={intlUtils(intl, 'søknad.manglendeVedlegg')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={() => null}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <ManglendeVedleggFormComponents.Form includeButtons={false}>
                            <Block padBottom="l">
                                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                    <FormattedMessage
                                        id={
                                            erLikEllerMindreEnnFireUkerTilUttaketStarter
                                                ? 'manglendeVedlegg.veileder'
                                                : 'manglendeVedlegg.uttaksplan.advarsel.forTidligUtenDokumentasjon'
                                        }
                                    />
                                </Veilederpanel>
                            </Block>
                            {alleStierMedManglendeVedlegg.map((keyISoknad, index) => {
                                const key = keyISoknad.replace('søknad.', '');
                                const periode = _.get(søknad, key.replace('.vedlegg', '').split('.'));

                                const sendSenereVedlegg = alleSendSenereVedlegg.get(keyISoknad)!;
                                if (sendSenereVedlegg.type === AttachmentType.SEN_ENDRING) {
                                    return null;
                                }
                                return (
                                    <Block key={sendSenereVedlegg.type}>
                                        <Element>
                                            {intlUtils(
                                                intl,
                                                `manglendeVedlegg.title.${sendSenereVedlegg.type}`,
                                                getManglendeVedleggValues(sendSenereVedlegg.type, fornavnAnnenForelder)
                                            )}
                                        </Element>
                                        <UtvidetInformasjon
                                            apneLabel={intlUtils(
                                                intl,
                                                `manglendeVedlegg.apneLabel.${sendSenereVedlegg.type}`,
                                                getManglendeVedleggValues(sendSenereVedlegg.type, fornavnAnnenForelder)
                                            )}
                                        >
                                            <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                                                <Normaltekst>
                                                    {intlUtils(
                                                        intl,
                                                        `manglendeVedlegg.info.${sendSenereVedlegg.type}`,
                                                        getManglendeVedleggValues(
                                                            sendSenereVedlegg.type,
                                                            fornavnAnnenForelder
                                                        )
                                                    )}
                                                </Normaltekst>
                                            </div>
                                        </UtvidetInformasjon>
                                        {periode?.tidsperiode && periode?.type && (
                                            <Block margin="l">
                                                <Normaltekst>
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
                                                </Normaltekst>
                                            </Block>
                                        )}
                                        <FieldArray
                                            name={ManglendeVedleggFormField.vedlegg}
                                            render={() => {
                                                return (
                                                    <FormikFileUploader
                                                        key={`${ManglendeVedleggFormField.vedlegg}.${index}`}
                                                        name={`${ManglendeVedleggFormField.vedlegg}.${index}`}
                                                        label={intlUtils(
                                                            intl,
                                                            'manglendeVedlegg.lastopp.manglende.vedlegg'
                                                        )}
                                                        attachments={
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
                                <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                            </Block>
                        </ManglendeVedleggFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default ManglendeVedlegg;
