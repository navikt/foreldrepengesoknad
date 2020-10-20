import * as React from 'react';
import { StegID } from 'app/util/routing/stegConfig';
import { AppState } from 'app/redux/reducers';
import { mapMissingAttachmentsOnSøknad } from 'app/util/attachments/missingAttachmentUtil';
import Steg, { StegProps } from 'app/components/applikasjon/steg/Steg';
import { injectIntl, IntlShape } from 'react-intl';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from 'app/types/common';
import isAvailable from '../../util/steg/isAvailable';
import { SøkerinfoProps } from 'app/types/søkerinfo';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import VedleggSpørsmål from 'app/components/skjema/vedleggSpørsmål/VedleggSpørsmål';
import { selectSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { Attachment, InnsendingsType } from 'app/components/storage/attachment/types/Attachment';
import Søknad from 'app/types/søknad/Søknad';
import { soknadActionCreators } from 'app/redux/actions';
import _ from 'lodash';
import { sorterPerioder } from 'app/util/uttaksplan/Periodene';
import moment from 'moment';
import { findAllAttachments } from './manglendeVedleggUtil';
import getMessage from 'common/util/i18nUtils';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import { isAttachmentForPeriode } from 'app/components/storage/attachment/components/util';
import { Normaltekst } from 'nav-frontend-typografi';
import { formatDate } from 'app/util/dates/dates';
import { isInfoPeriode } from 'app/types/uttaksplan/periodetyper';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import {
    getTerminbekreftelsedatoAvgrensninger,
    getTerminbekreftelseDatoRegler,
} from 'app/util/validation/terminbekreftelsedato';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import søknadActions from 'app/redux/actions/søknad/søknadActionCreators';
import { UfødtBarn } from 'app/types/søknad/Barn';
import { guid } from 'nav-frontend-js-utils';
import { selectMissingAttachments } from 'app/selectors/attachmentsSelector';

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
                                        inputId="terminbekreftelseDato"
                                        name="terminbekreftelseDato"
                                        label={getMessage(intl, 'terminbekreftelseDato.spørsmål')}
                                        onChange={(terminbekreftelseDato: Date) => {
                                            dispatch(
                                                søknadActions.updateBarn({
                                                    terminbekreftelseDato,
                                                })
                                            );
                                        }}
                                        dato={(søknad.barn as UfødtBarn).terminbekreftelseDato}
                                        datoAvgrensinger={getTerminbekreftelsedatoAvgrensninger(
                                            (søknad.barn as UfødtBarn).termindato
                                        )}
                                        validators={
                                            attachmentsToRender.length > 0
                                                ? getTerminbekreftelseDatoRegler(
                                                      (søknad.barn as UfødtBarn).terminbekreftelseDato,
                                                      (søknad.barn as UfødtBarn).termindato,
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
    };

    return {
        søknad,
        stegProps,
        attachmentMap,
        erLikEllerMindreEnnFireUkerTilUttaketStarter,
    };
};

export default injectIntl(connect<ReduxProps>(mapStateToProps)(ManglendeVedleggsteg));
