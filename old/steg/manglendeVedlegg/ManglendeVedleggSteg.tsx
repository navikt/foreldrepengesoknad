import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { connect } from 'react-redux';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import _ from 'lodash';
import moment from 'moment';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Steg, { StegProps } from 'app/components/applikasjon/steg/Steg';
import VedleggSpørsmål from 'app/components/skjema/vedleggSpørsmål/VedleggSpørsmål';
import { isAttachmentForPeriode } from 'app/components/storage/attachment/components/util';
import { Attachment, InnsendingsType } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import { soknadActionCreators } from 'app/redux/actions';
import søknadActions from 'app/redux/actions/søknad/søknadActionCreators';
import { AppState } from 'app/redux/reducers';
import { selectMissingAttachments } from 'app/selectors/attachmentsSelector';
import { selectSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { HistoryProps } from 'app/types/common';
import { SøkerinfoProps } from 'app/types/søkerinfo';
import { UfødtBarn } from 'app/types/søknad/Barn';
import Søknad from 'app/types/søknad/Søknad';
import { isInfoPeriode } from 'app/types/uttaksplan/periodetyper';
import { mapMissingAttachmentsOnSøknad } from 'app/util/attachments/missingAttachmentUtil';
import { formatDate } from 'app/util/dates/dates';
import { StegID } from 'app/util/routing/stegConfig';
import { sorterPerioder } from 'app/util/uttaksplan/Periodene';
import {
    getTerminbekreftelsedatoAvgrensninger,
    getTerminbekreftelseDatoRegler,
} from 'app/util/validation/terminbekreftelsedato';
import isAvailable from '../../util/steg/isAvailable';
import { findAllAttachments } from './manglendeVedleggUtil';
import søknadActionCreators from 'app/redux/actions/søknad/søknadActionCreators';
import routeConfig from 'app/util/routing/routeConfig';
import { logAmplitudeEvent, PageKeys } from '../old/amplitude/amplitude';

interface ReduxProps {
    stegProps: StegProps;
    søknad: Søknad;
    attachmentMap: Map<string, Attachment[]>;
    erLikEllerMindreEnnFireUkerTilUttaketStarter: boolean;
}

interface OwnProps {
    intl: IntlShape;
}

type Props = SøkerinfoProps & ReduxProps & OwnProps & DispatchProps & HistoryProps;

class ManglendeVedleggsteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleVedleggSpørsmålOnChange = this.handleVedleggSpørsmålOnChange.bind(this);

        if (!props.stegProps.isAvailable) {
            props.dispatch(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
            props.history.push(routeConfig.APP_ROUTE_PREFIX);
        }

        logAmplitudeEvent('sidevisning', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            pageKey: PageKeys.ManglendeVedlegg,
        });
    }

    handleVedleggSpørsmålOnChange(attachments: Attachment[], key: string) {
        const { søknad, dispatch } = this.props;
        _.set(søknad, key.split('.'), attachments);
        dispatch(soknadActionCreators.updateSøknad(søknad));
    }

    renderPeriodeinfo(key: string) {
        const { søknad, intl } = this.props;
        const periode = _.get(søknad, key.replace('.vedlegg', '').split('.'));
        return (
            <Block margin="xxs">
                <Normaltekst>
                    {getMessage(intl, 'manglendeVedlegg.periode.tidsperiode', {
                        type: periode.type,
                        fom: formatDate(periode.tidsperiode.fom),
                        tom: formatDate(periode.tidsperiode.tom),
                    })}
                </Normaltekst>
            </Block>
        );
    }

    render() {
        const {
            søknad,
            stegProps,
            attachmentMap,
            erLikEllerMindreEnnFireUkerTilUttaketStarter,
            intl,
            dispatch,
        } = this.props;

        return (
            <Steg {...stegProps}>
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: erLikEllerMindreEnnFireUkerTilUttaketStarter
                                ? 'manglendeVedlegg.veileder'
                                : 'uttaksplan.validering.advarsel.forTidligUtenDokumentasjon',
                        },
                    ]}
                />

                {[...Array.from(attachmentMap.entries())].map((am: [string, Attachment[]]) => {
                    const key = am[0].replace('søknad.', '');
                    const attachments = _.get(søknad, key.split('.'));
                    const attachmentsToRender = Array.isArray(attachments)
                        ? attachments.filter(
                              (vedlegg: Attachment) => vedlegg.innsendingsType !== InnsendingsType.SEND_SENERE
                          )
                        : [];

                    const attachmentMapValue = am[1];
                    return attachmentMapValue
                        .filter((v) => v.type !== AttachmentType.SEN_ENDRING && !!v.filesize === false)
                        .map((a) => (
                            <div key={guid()}>
                                <Block
                                    header={{
                                        title: getMessage(
                                            intl,
                                            `manglendeVedlegg.title.${a.type}`,
                                            a.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                                                ? {
                                                      navn: søknad.annenForelder.fornavn,
                                                  }
                                                : undefined
                                        ),
                                        info: getMessage(
                                            intl,
                                            `manglendeVedlegg.info.${a.type}`,
                                            a.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                                                ? {
                                                      navn: søknad.annenForelder.fornavn,
                                                  }
                                                : undefined
                                        ),
                                        apneLabel: getMessage(
                                            intl,
                                            `manglendeVedlegg.apneLabel.${a.type}`,
                                            a.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                                                ? {
                                                      navn: søknad.annenForelder.fornavn,
                                                  }
                                                : undefined
                                        ),
                                    }}
                                >
                                    {isAttachmentForPeriode(a.type) && this.renderPeriodeinfo(key)}
                                    <VedleggSpørsmål
                                        vedlegg={attachmentsToRender}
                                        attachmentType={a.type}
                                        skjemanummer={a.skjemanummer}
                                        onChange={(updatedAttachments: Attachment[]) =>
                                            this.handleVedleggSpørsmålOnChange(updatedAttachments, key)
                                        }
                                    />
                                </Block>

                                <Block
                                    visible={
                                        a.type === AttachmentType.TERMINBEKREFTELSE && attachmentsToRender.length > 0
                                    }
                                >
                                    <DatoInput
                                        id="terminbekreftelseDato"
                                        name="terminbekreftelseDato"
                                        label={getMessage(intl, 'terminbekreftelseDato.spørsmål')}
                                        onChange={(terminbekreftelseDato) => {
                                            dispatch(
                                                søknadActions.updateBarn({
                                                    terminbekreftelseDato,
                                                })
                                            );
                                        }}
                                        dato={(søknad.barn as UfødtBarn).terminbekreftelseDato}
                                        datoAvgrensinger={getTerminbekreftelsedatoAvgrensninger(
                                            ISOStringToDate((søknad.barn as UfødtBarn).termindato)
                                        )}
                                        validators={
                                            attachmentsToRender.length > 0
                                                ? getTerminbekreftelseDatoRegler(
                                                      (søknad.barn as UfødtBarn).terminbekreftelseDato,
                                                      ISOStringToDate((søknad.barn as UfødtBarn).termindato),
                                                      intl
                                                  )
                                                : []
                                        }
                                    />
                                </Block>
                            </div>
                        ));
                })}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): ReduxProps => {
    const { søknad } = state;
    const missingAttachments = selectMissingAttachments(state);
    const attachmentMap = findAllAttachments(mapMissingAttachmentsOnSøknad(missingAttachments, _.cloneDeep(søknad)));

    const førsteUttaksEllerUttsettelsesPeriode = søknad.uttaksplan
        .filter((p) => p.tidsperiode.fom !== undefined && !isInfoPeriode(p))
        .sort(sorterPerioder)
        .shift();

    const erLikEllerMindreEnnFireUkerTilUttaketStarter =
        førsteUttaksEllerUttsettelsesPeriode !== undefined &&
        moment(førsteUttaksEllerUttsettelsesPeriode.tidsperiode.fom).isSameOrBefore(moment().add(4, 'weeks'));

    const stegProps: StegProps = {
        id: StegID.MANGLENDE_VEDLEGG,
        renderFortsettKnapp: erLikEllerMindreEnnFireUkerTilUttaketStarter || missingAttachments.length === 0,
        history: props.history,
        renderFormTag: true,
        isAvailable: isAvailable(StegID.MANGLENDE_VEDLEGG, søknad, props.søkerinfo, selectSøknadsinfo(state)),
        renderAlleSpørsmålMåBesvares: true,
    };

    return {
        søknad,
        stegProps,
        attachmentMap,
        erLikEllerMindreEnnFireUkerTilUttaketStarter,
    };
};

export default injectIntl(connect<ReduxProps>(mapStateToProps)(ManglendeVedleggsteg));
