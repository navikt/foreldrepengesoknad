import * as React from 'react';
import { StegID } from 'app/util/routing/stegConfig';
import { AppState } from 'app/redux/reducers';
import { findMissingAttachments, mapMissingAttachmentsOnSøknad } from 'app/util/attachments/missingAttachmentUtil';
import Steg, { StegProps } from 'app/components/steg/Steg';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from 'app/types/common';
import isAvailable from '../util/isAvailable';
import { SøkerinfoProps } from 'app/types/søkerinfo';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import VedleggSpørsmål from 'app/components/vedlegg-spørsmål/VedleggSpørsmål';
import { getSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { Attachment, InnsendingsType } from 'common/storage/attachment/types/Attachment';
import Søknad from 'app/types/søknad/Søknad';
import { soknadActionCreators } from 'app/redux/actions';
import _ from 'lodash';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import moment from 'moment';
import { findAllAttachments } from './manglendeVedleggUtil';
import getMessage from 'common/util/i18nUtils';
import VeilederInfo from 'app/components/veileder-info/VeilederInfo';
import { isAttachmentForPeriode } from 'common/storage/attachment/components/util';
import { Normaltekst } from 'nav-frontend-typografi';
import { formatDate } from 'app/util/dates/dates';

interface ReduxProps {
    stegProps: StegProps;
    søknad: Søknad;
    attachmentMap: Map<string, Attachment[]>;
}

type Props = SøkerinfoProps & ReduxProps & InjectedIntlProps & DispatchProps & HistoryProps;

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
                        tom: formatDate(periode.tidsperiode.tom)
                    })}
                </Normaltekst>
            </Block>
        );
    }

    render() {
        const { søknad, stegProps, attachmentMap, intl } = this.props;

        return (
            <Steg {...stegProps}>
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'manglendeVedlegg.veileder'
                        }
                    ]}
                />

                {[...Array.from(attachmentMap.entries())].map((am: [string, Attachment[]], index: number) => {
                    const key = am[0].replace('søknad.', '');
                    const attachments = _.get(søknad, key.split('.'));
                    const attachmentsToRender = Array.isArray(attachments)
                        ? attachments.filter(
                              (vedlegg: Attachment) => vedlegg.innsendingsType !== InnsendingsType.SEND_SENERE
                          )
                        : [];

                    const attachmentMapValue = am[1];

                    return (
                        <Block
                            key={index}
                            header={{
                                title: getMessage(intl, `manglendeVedlegg.title.${attachmentMapValue[0].type}`),
                                info: getMessage(intl, `manglendeVedlegg.info.${attachmentMapValue[0].type}`)
                            }}>
                            {isAttachmentForPeriode(attachmentMapValue[0].type) && this.renderPeriodeinfo(key)}
                            <VedleggSpørsmål
                                vedlegg={attachmentsToRender}
                                attachmentType={attachmentMapValue[0].type}
                                skjemanummer={attachmentMapValue[0].skjemanummer}
                                onChange={(updatedAttachments: Attachment[]) =>
                                    this.handleVedleggSpørsmålOnChange(updatedAttachments, key)
                                }
                            />
                        </Block>
                    );
                })}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): ReduxProps => {
    const { søknad, api } = state;
    const missingAttachments = findMissingAttachments(søknad, api, getSøknadsinfo(state)!);
    const attachmentMap = findAllAttachments(mapMissingAttachmentsOnSøknad(missingAttachments, _.cloneDeep(søknad)));

    const stegProps: StegProps = {
        id: StegID.MANGLENDE_VEDLEGG,
        renderFortsettKnapp:
            moment(Periodene(søknad.uttaksplan).getFørsteUttaksdag()).isAfter(moment().add(4, 'weeks')) ||
            missingAttachments.length === 0,
        history: props.history,
        renderFormTag: true,
        isAvailable: isAvailable(StegID.MANGLENDE_VEDLEGG, søknad, props.søkerinfo, getSøknadsinfo(state))
    };

    return {
        søknad,
        stegProps,
        attachmentMap
    };
};

export default injectIntl(connect<ReduxProps>(mapStateToProps)(ManglendeVedleggsteg));
