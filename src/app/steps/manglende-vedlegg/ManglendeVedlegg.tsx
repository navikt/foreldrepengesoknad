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
import { ManglendeVedleggFormComponents, ManglendeVedleggFormField } from './manglendeVedleggFormConfig';
import dayjs from 'dayjs';
import { UfødtBarn } from 'app/context/types/Barn';
import { manglendeVedleggQuestionsConfig } from './manglendeVedleggQuestionsConfig';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';
import { sorterPerioder } from '../uttaksplan-info/utils/Periodene';
import { finnAlleVedlegg, isAttachmentForPeriode } from './util';
import { Attachment, InnsendingsType } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { FieldArray } from 'formik';

export const attenUkerPluss3Number = 18 * 7 + 3;

const getManglendeVedleggValues = (type: AttachmentType, fornavnAnnenForelder: string) => {
    return type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
        ? {
              navn: fornavnAnnenForelder,
          }
        : undefined;
};

const ManglendeVedlegg: React.FunctionComponent = () => {
    const intl = useIntl();
    const søknad = useSøknad();
    const { barn, uttaksplan } = søknad;

    const onValidSubmitHandler = () => {
        return [];
    };

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.OPPSUMMERING);
    const onAvbrytSøknad = useAvbrytSøknad();

    const termindato = (barn as UfødtBarn).termindato;

    const fornavnAnnenForelder = isAnnenForelderOppgitt(søknad.annenForelder) ? søknad.annenForelder.fornavn : '';

    const førsteUttaksEllerUttsettelsesPeriode = uttaksplan
        .filter((p: Periode) => p.tidsperiode.fom !== undefined && !isInfoPeriode(p))
        .sort(sorterPerioder)
        .shift();

    const erLikEllerMindreEnnFireUkerTilUttaketStarter =
        førsteUttaksEllerUttsettelsesPeriode !== undefined &&
        dayjs(førsteUttaksEllerUttsettelsesPeriode.tidsperiode.fom).isSameOrBefore(dayjs().add(4, 'weeks'));

    const alleVedlegg = finnAlleVedlegg(søknad);
    return (
        <ManglendeVedleggFormComponents.FormikWrapper
            initialValues={{}}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = manglendeVedleggQuestionsConfig.getVisbility({
                    ...formValues,
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
                            {[...Array.from(alleVedlegg.entries())].map((am: [string, Attachment[]]) => {
                                const key = am[0].replace('søknad.', '');
                                const attachments = _.get(søknad, key.split('.'));
                                const attachmentsToRender = Array.isArray(attachments)
                                    ? attachments.filter(
                                          (vedlegg: Attachment) =>
                                              vedlegg.innsendingsType !== InnsendingsType.SEND_SENERE
                                      )
                                    : ([] as Attachment[]);

                                const periode = _.get(søknad, key.replace('.vedlegg', '').split('.'));

                                const attachmentMapValue = am[1];
                                return attachmentMapValue
                                    .filter((v) => v.type !== AttachmentType.SEN_ENDRING && !!v.filesize === false)
                                    .map((a, index) => (
                                        <div key={guid()}>
                                            <Block>
                                                <Element>
                                                    {intlUtils(
                                                        intl,
                                                        `manglendeVedlegg.title.${a.type}`,
                                                        getManglendeVedleggValues(a.type, fornavnAnnenForelder)
                                                    )}
                                                </Element>
                                                <UtvidetInformasjon
                                                    apneLabel={intlUtils(
                                                        intl,
                                                        `manglendeVedlegg.apneLabel.${a.type}`,
                                                        getManglendeVedleggValues(a.type, fornavnAnnenForelder)
                                                    )}
                                                >
                                                    <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                                                        <Normaltekst>
                                                            {intlUtils(
                                                                intl,
                                                                `manglendeVedlegg.info.${a.type}`,
                                                                getManglendeVedleggValues(a.type, fornavnAnnenForelder)
                                                            )}
                                                        </Normaltekst>
                                                    </div>
                                                </UtvidetInformasjon>
                                                {isAttachmentForPeriode(a.type) && (
                                                    <Block margin="l">
                                                        <Normaltekst>
                                                            {intlUtils(intl, 'manglendeVedlegg.periode.tidsperiode', {
                                                                type: periode.type,
                                                                fom: formatDate(periode.tidsperiode.fom),
                                                                tom: formatDate(periode.tidsperiode.tom),
                                                            })}
                                                        </Normaltekst>
                                                    </Block>
                                                )}
                                                <FieldArray
                                                    name={ManglendeVedleggFormField.vedlegg}
                                                    render={(test) => {
                                                        console.log(test);
                                                        return [
                                                            <FormikFileUploader
                                                                key={`${ManglendeVedleggFormField.vedlegg}.${index}`}
                                                                name={`${ManglendeVedleggFormField.vedlegg}.${index}`}
                                                                label={intlUtils(
                                                                    intl,
                                                                    'manglendeVedlegg.lastopp.manglende.vedlegg'
                                                                )}
                                                                attachments={
                                                                    formValues.vedlegg ? formValues.vedlegg[index] : []
                                                                }
                                                                attachmentType={a.type}
                                                                skjemanummer={a.skjemanummer}
                                                            />,
                                                        ];
                                                    }}
                                                />
                                            </Block>
                                            <Block
                                                visible={
                                                    a.type === AttachmentType.TERMINBEKREFTELSE &&
                                                    attachmentsToRender.length > 0
                                                }
                                            >
                                                <ManglendeVedleggFormComponents.DatePicker
                                                    name={ManglendeVedleggFormField.terminbekreftelseDato}
                                                    label={intlUtils(
                                                        intl,
                                                        'manglendevedlegg.terminbekreftelseDato.spørsmål'
                                                    )}
                                                    maxDate={dayjs().toDate()}
                                                    minDate={
                                                        termindato
                                                            ? dayjs(termindato)
                                                                  .subtract((attenUkerPluss3Number - 1) * 24, 'hours')
                                                                  .toDate()
                                                            : dayjs().subtract(1, 'years').toDate()
                                                    }
                                                />
                                            </Block>
                                        </div>
                                    ));
                            })}
                            <Block visible={true || visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
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
