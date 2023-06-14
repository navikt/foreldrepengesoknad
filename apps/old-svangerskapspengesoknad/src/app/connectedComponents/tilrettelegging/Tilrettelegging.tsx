import { FunctionComponent } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentActionTypes } from 'app/redux/types/AttachmentAction';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { CustomFormikProps } from 'app/types/Formik';
import { FetchStatus } from 'app/types/FetchState';
import { finnArbeidsforholdNavn, getSøknadStepPath, getAllSteps, getAdjacentSteps } from 'app/utils/stepUtils';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { State } from 'app/redux/store';
import { StepProps } from 'app/components/step/Step';
import { Arbeidsforholdstype, Tilretteleggingstype, UferdigTilrettelegging } from 'app/types/Tilrettelegging';
import Action from 'app/redux/types/Action';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import FormikStep from 'app/components/formik-step/FormikStep';
import getMessage from 'common/util/i18nUtils';
import SøknadStep from 'app/types/SøknadStep';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import CheckboksGruppe from '../../formik/wrappers/CheckboksPanelGruppe';
import InfoBlock from 'common/components/info-block/InfoBlock';
import Textarea from '../../formik/wrappers/Textarea';
import LabelMedInfobox from 'common/components/label-med-infobox/LabelMedInfobox';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import AddTilrettelegging from './components/AddTilrettelegging';
import PictureScanningGuide from 'app/components/picture-scanning-guide/PictureScanningGuide';
import UtvidetInformasjon from 'app/components/utvidet-informasjon/UtvidetInformasjon';
import { tiMånederSiden, treUkerSiden, dagenFør } from '../../../common/util/datoUtils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@navikt/ds-react';

interface OwnProps {
    id: string;
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

interface StateProps {
    arbeidsforhold: Arbeidsforhold[];
    vedlegg: Attachment[];
    uploadAttachment: (attachment: Attachment, id: string) => void;
    deleteAttachment: (attachment: Attachment, id: string) => void;
}

type Props = OwnProps & StateProps & StepProps;

const initialValuesForTilrettelegginger = (tilrettelegging: UferdigTilrettelegging): UferdigTilrettelegging => {
    if (tilrettelegging.ingenTilrettelegging === undefined) {
        tilrettelegging.ingenTilrettelegging = [
            {
                slutteArbeidFom: undefined as any,
            },
        ];
    }
    if (tilrettelegging.delvisTilrettelegging === undefined) {
        tilrettelegging.delvisTilrettelegging = [
            {
                stillingsprosent: undefined as any,
                tilrettelagtArbeidFom: undefined as any,
            },
        ];
    }
    if (tilrettelegging.helTilrettelegging === undefined) {
        tilrettelegging.helTilrettelegging = [
            {
                tilrettelagtArbeidFom: undefined as any,
            },
        ];
    }
    return tilrettelegging;
};

const Tilrettelegging: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { id, step, formikProps, arbeidsforhold, vedlegg, uploadAttachment, deleteAttachment } = props;

    const { values, setFieldValue } = formikProps;

    const index = values.tilrettelegging.findIndex((t: any) => t.id === id);
    const tilrettelegging = values.tilrettelegging[index];
    const arbeidsgiversNavn = finnArbeidsforholdNavn(id, arbeidsforhold);
    const attachments = vedlegg.filter((v: Attachment) => tilrettelegging.vedlegg.includes(v.id));

    const erFrilans = tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER;
    const erSelvstendig = tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG;
    const erFrilansEllerSelvstendig = erFrilans || erSelvstendig;

    const getInputName = (name: string) => `tilrettelegging.${index}.${name}`;
    const tilretteleggingstypeName = getInputName('type');
    const valgteTilretteleggingstyper = get(values, tilretteleggingstypeName) || [];
    const { ingenTilrettelegging, delvisTilrettelegging, helTilrettelegging } = initialValuesForTilrettelegginger(
        values.tilrettelegging[index],
    );

    const frilansRisikoErOk = erFrilansEllerSelvstendig
        ? tilrettelegging.risikoFaktorer !== undefined && tilrettelegging.risikoFaktorer.length > 3
        : true;
    const visFrilansEllerSelvstendig = erFrilansEllerSelvstendig;
    const visVedlegg = visFrilansEllerSelvstendig ? frilansRisikoErOk : true;
    const visDel1 = frilansRisikoErOk && attachments.length > 0;
    const visDel2 = visDel1 === true && !!tilrettelegging.behovForTilretteleggingFom;
    const visIngenTilrettelegging = visDel2 && valgteTilretteleggingstyper.includes(Tilretteleggingstype.INGEN);
    const visDelvisTilrettelegging = visDel2 && valgteTilretteleggingstyper.includes(Tilretteleggingstype.DELVIS);
    const visHelTilrettelegging = visDel2 && valgteTilretteleggingstyper.includes(Tilretteleggingstype.HEL);
    const del1OgDel2ErOk =
        visDel2 &&
        valgteTilretteleggingstyper.length > 0 &&
        (visIngenTilrettelegging
            ? ingenTilrettelegging !== undefined && ingenTilrettelegging[0].slutteArbeidFom !== undefined
            : true) &&
        (visDelvisTilrettelegging
            ? delvisTilrettelegging !== undefined &&
              !isNaN(delvisTilrettelegging[0].stillingsprosent) &&
              delvisTilrettelegging[0].tilrettelagtArbeidFom !== undefined
            : true) &&
        (visHelTilrettelegging
            ? helTilrettelegging !== undefined && helTilrettelegging[0].tilrettelagtArbeidFom !== undefined
            : true);
    const visTiltakForTilrettelegging = del1OgDel2ErOk && visFrilansEllerSelvstendig;
    const tilretteleggingstiltakErOk = erFrilansEllerSelvstendig
        ? tilrettelegging.tilretteleggingstiltak !== undefined && tilrettelegging.tilretteleggingstiltak.length > 3
        : true;

    const visNesteKnapp = del1OgDel2ErOk && tilretteleggingstiltakErOk;

    const cleanupTilrettelegging = () => {
        if (visIngenTilrettelegging === false) {
            setFieldValue(getInputName('ingenTilrettelegging'), undefined);
        }
        if (visDelvisTilrettelegging === false) {
            setFieldValue(getInputName('delvisTilrettelegging'), undefined);
        }
        if (visHelTilrettelegging === false) {
            setFieldValue(getInputName('helTilrettelegging'), undefined);
        }

        console.log(values);
    };

    const navigateTo = useNavigate();

    const navigate = () => {
        cleanupTilrettelegging();
        const allSteps = getAllSteps(values.søknadsgrunnlag);
        const nextStep = getAdjacentSteps(step, allSteps)[1];
        const nextStepPath = getSøknadStepPath(nextStep.step, nextStep.subStep);
        navigateTo(nextStepPath, history);
    };

    return (
        <Applikasjonsside visTittel={true}>
            <FormikStep
                step={step}
                formikProps={formikProps}
                showNesteknapp={visNesteKnapp && vedlegg.filter((a) => !isAttachmentWithError(a)).length > 0}
                onValidFormSubmit={navigate}
            >
                <Block visible={visFrilansEllerSelvstendig}>
                    <Block margin="xs">
                        <Veilederinfo stil="kompakt" type="info">
                            <FormattedMessage
                                id="tilrettelegging.veileder.frilans.html"
                                values={{
                                    strong: (msg: any) => <strong>{msg}</strong>,
                                }}
                            />
                        </Veilederinfo>
                    </Block>
                    <Textarea
                        name={getInputName('risikoFaktorer')}
                        label={
                            visFrilansEllerSelvstendig
                                ? getMessage(intl, 'tilrettelegging.frilans.risikoFaktorer.frilansSN')
                                : getMessage(intl, 'tilrettelegging.frilans.risikoFaktorer')
                        }
                    />
                </Block>
                <Block visible={visVedlegg}>
                    <Block>
                        <Veilederinfo stil="kompakt" type="info">
                            <FormattedMessage
                                id={
                                    visFrilansEllerSelvstendig
                                        ? 'tilrettelegging.veileder.vedlegg.frilansSN'
                                        : 'tilrettelegging.veileder.vedlegg'
                                }
                            />
                        </Veilederinfo>
                    </Block>
                    <Block
                        header={{
                            title: visFrilansEllerSelvstendig
                                ? getMessage(intl, 'tilrettelegging.vedlegg.label.frilansSN')
                                : getMessage(intl, 'tilrettelegging.vedlegg.label'),
                        }}
                    >
                        <FieldArray
                            name={getInputName('vedlegg')}
                            render={({ push, remove }: FieldArrayRenderProps) => (
                                <AttachmentOverview
                                    attachmentType={AttachmentType.TILRETTELEGGING}
                                    skjemanummer={
                                        erFrilansEllerSelvstendig
                                            ? Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG
                                            : Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING
                                    }
                                    attachments={attachments}
                                    onFilesSelect={(files: Attachment[]) => {
                                        files.forEach((file) => {
                                            push(file.id);
                                            uploadAttachment(file, id);
                                        });
                                    }}
                                    onFileDelete={(files: Attachment[]) => {
                                        files.forEach((file) => {
                                            remove(tilrettelegging.vedlegg.indexOf(file.id));
                                            deleteAttachment(file, id);
                                        });
                                    }}
                                />
                            )}
                        />
                        <UtvidetInformasjon apneLabel="Les om hvordan ta et bra bilde">
                            <PictureScanningGuide />
                        </UtvidetInformasjon>
                    </Block>
                </Block>
                <Block visible={visDel1} margin="none">
                    <Block visible={tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.VIRKSOMHET}>
                        <Veilederinfo stil="kompakt" type="info">
                            <FormattedMessage
                                id="tilrettelegging.veileder.intro"
                                values={{
                                    arbeidsgiversNavn,
                                }}
                            />
                        </Veilederinfo>
                    </Block>
                    <Block header={{ title: getMessage(intl, 'tilrettelegging.del1'), stil: 'seksjon' }}>
                        <Block margin="xs">
                            <DatoInput
                                name={getInputName('behovForTilretteleggingFom')}
                                label={
                                    visFrilansEllerSelvstendig ? (
                                        <LabelMedInfobox
                                            title={getMessage(
                                                intl,
                                                'tilrettelegging.behovForTilretteleggingFom.label.frilansSN',
                                            )}
                                            info={getMessage(
                                                intl,
                                                'tilrettelegging.behovForTilretteleggingFom.infoBox.frilansSN',
                                            )}
                                        />
                                    ) : (
                                        <LabelMedInfobox
                                            title={getMessage(intl, 'tilrettelegging.behovForTilretteleggingFom.label')}
                                            info={getMessage(
                                                intl,
                                                'tilrettelegging.behovForTilretteleggingFom.infoBox',
                                            )}
                                        />
                                    )
                                }
                                datoAvgrensinger={{
                                    minDato: tiMånederSiden(values.barn.termindato!),
                                    maksDato: dagenFør(values.barn.termindato!),
                                }}
                            />
                        </Block>
                    </Block>
                </Block>
                <Block header={{ title: getMessage(intl, 'tilrettelegging.del2'), stil: 'seksjon' }} visible={visDel2}>
                    <CheckboksGruppe
                        label={
                            visFrilansEllerSelvstendig ? (
                                <LabelMedInfobox
                                    title={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.frilansSN')}
                                    info={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.frilansSN.infoBox')}
                                />
                            ) : (
                                <LabelMedInfobox
                                    title={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe')}
                                    info={getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.infoBox')}
                                />
                            )
                        }
                        name={tilretteleggingstypeName}
                        options={[
                            {
                                label: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.fullt'),
                                value: Tilretteleggingstype.HEL,
                            },
                            {
                                label: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.delvis'),
                                value: Tilretteleggingstype.DELVIS,
                            },
                            {
                                label: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.ingenting'),
                                value: Tilretteleggingstype.INGEN,
                            },
                        ]}
                    />
                </Block>
                <Block
                    visible={visHelTilrettelegging}
                    header={{
                        title: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.fullt'),
                        info: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.fullt.infoBox'),
                    }}
                >
                    <InfoBlock>
                        <FieldArray
                            name={getInputName('helTilrettelegging')}
                            render={(arrayHelpers: FieldArrayRenderProps) =>
                                tilrettelegging.helTilrettelegging !== undefined &&
                                tilrettelegging.helTilrettelegging.map((_helTil: any, ind: any, arr: any) => (
                                    <>
                                        <Block margin="xs">
                                            <AddTilrettelegging
                                                datoAvgrensninger={{
                                                    minDato: tilrettelegging.behovForTilretteleggingFom,
                                                    maksDato: treUkerSiden(values.barn.termindato!),
                                                }}
                                                datoInputName={`${getInputName(
                                                    'helTilrettelegging',
                                                )}.${ind}.tilrettelagtArbeidFom`}
                                                datoLabel={getMessage(
                                                    intl,
                                                    'tilrettelegging.hvordanKanDuJobbe.fullt.spørsmål',
                                                )}
                                                showDeleteButton={ind !== 0}
                                                delvisTilrettelegging={false}
                                                onDelete={() => arrayHelpers.remove(ind)}
                                            />
                                        </Block>
                                        <Block margin="xs" visible={arr.length - 1 === ind}>
                                            <Button
                                                variant="secondary"
                                                onClick={() => arrayHelpers.push({ tilrettelagtArbeidFom: undefined })}
                                                type="button"
                                                size="small"
                                            >
                                                {getMessage(intl, 'tilrettelegging.leggTilPeriode')}
                                            </Button>
                                        </Block>
                                    </>
                                ))
                            }
                        />
                    </InfoBlock>
                </Block>
                <Block
                    visible={visDelvisTilrettelegging}
                    header={{
                        title: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.delvis'),
                        info: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.delvis.infoBox'),
                    }}
                >
                    <InfoBlock>
                        <FieldArray
                            name={getInputName('delvisTilrettelegging')}
                            render={(arrayHelpers: FieldArrayRenderProps) =>
                                tilrettelegging.delvisTilrettelegging !== undefined &&
                                tilrettelegging.delvisTilrettelegging.map((_delTil: any, ind: any, arr: any) => (
                                    <>
                                        <Block margin="xs">
                                            <AddTilrettelegging
                                                datoAvgrensninger={{
                                                    minDato: tilrettelegging.behovForTilretteleggingFom,
                                                    maksDato: treUkerSiden(values.barn.termindato!),
                                                }}
                                                datoInputName={`${getInputName(
                                                    'delvisTilrettelegging',
                                                )}.${ind}.tilrettelagtArbeidFom`}
                                                datoLabel={getMessage(
                                                    intl,
                                                    'tilrettelegging.hvordanKanDuJobbe.delvis.spørsmål',
                                                )}
                                                prosentInputName={`${getInputName(
                                                    'delvisTilrettelegging',
                                                )}.${ind}.stillingsprosent`}
                                                prosentLabel={getMessage(
                                                    intl,
                                                    'tilrettelegging.stillingsprosent.label',
                                                )}
                                                showDeleteButton={ind !== 0}
                                                delvisTilrettelegging={true}
                                                onDelete={() => arrayHelpers.remove(ind)}
                                            />
                                        </Block>
                                        <Block margin="xs" visible={arr.length - 1 === ind}>
                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    arrayHelpers.push({
                                                        stillingsprosent: undefined,
                                                        tilrettelagtArbeidFom: undefined,
                                                    })
                                                }
                                                type="button"
                                                size="small"
                                            >
                                                {getMessage(intl, 'tilrettelegging.leggTilPeriode')}
                                            </Button>
                                        </Block>
                                    </>
                                ))
                            }
                        />
                    </InfoBlock>
                </Block>
                <Block
                    visible={visIngenTilrettelegging}
                    header={{
                        title: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.ingenting'),
                        info: getMessage(intl, 'tilrettelegging.hvordanKanDuJobbe.ingenting.infoBox'),
                    }}
                >
                    <InfoBlock>
                        <FieldArray
                            name={getInputName('ingenTilrettelegging')}
                            render={(arrayHelpers: any) =>
                                tilrettelegging.ingenTilrettelegging !== undefined &&
                                tilrettelegging.ingenTilrettelegging.map((_ingenTil: any, ind: any, arr: any) => (
                                    <>
                                        <Block margin="xs">
                                            <AddTilrettelegging
                                                datoAvgrensninger={{
                                                    minDato: tilrettelegging.behovForTilretteleggingFom,
                                                    maksDato: treUkerSiden(values.barn.termindato!),
                                                }}
                                                datoInputName={`${getInputName(
                                                    'ingenTilrettelegging',
                                                )}.${ind}.slutteArbeidFom`}
                                                datoLabel={getMessage(
                                                    intl,
                                                    'tilrettelegging.hvordanKanDuJobbe.ingenting.spørsmål',
                                                )}
                                                showDeleteButton={ind !== 0}
                                                delvisTilrettelegging={false}
                                                onDelete={() => arrayHelpers.remove(ind)}
                                            />
                                        </Block>
                                        <Block margin="xs" visible={arr.length - 1 === ind}>
                                            <Button
                                                variant="secondary"
                                                onClick={() => arrayHelpers.push({ slutteArbeidFom: undefined })}
                                                type="button"
                                                size="small"
                                            >
                                                {getMessage(intl, 'tilrettelegging.leggTilPeriode')}
                                            </Button>
                                        </Block>
                                    </>
                                ))
                            }
                        />
                    </InfoBlock>
                </Block>
                <Block visible={visTiltakForTilrettelegging}>
                    <Textarea
                        name={getInputName('tilretteleggingstiltak')}
                        label={getMessage(intl, 'tilrettelegging.tiltak')}
                    />
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => {
    const søkerinfo = state.api.søkerinfo;
    return {
        vedlegg: state.attachment.vedlegg.filter((v) => v.type === AttachmentType.TILRETTELEGGING),
        arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : undefined,
    };
};

const mapDispatchToProps = (dispatch: (action: Action) => void) => {
    return {
        uploadAttachment: (attachment: Attachment) =>
            dispatch({ type: AttachmentActionTypes.UPLOAD_ATTACHMENT_REQUEST, payload: { attachment } }),
        deleteAttachment: (attachment: Attachment) =>
            dispatch({ type: AttachmentActionTypes.DELETE_ATTACHMENT_REQUEST, payload: { attachment } }),
    };
};

// @ts-ignore Fiks
export default connect(mapStateToProps, mapDispatchToProps)(Tilrettelegging);
