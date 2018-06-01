import * as React from 'react';
import Vedlegg from './Vedlegg';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './vedlegg.less';
import { Attachment } from 'storage/attachment/types/Attachment';

interface Props {
    vedlegg: Attachment[];
    visFilstørrelse?: boolean;
    onDelete?: (file: Attachment) => void;
}

const VedleggListe: React.StatelessComponent<Props> = (props) => {
    const { vedlegg, visFilstørrelse, onDelete } = props;
    return (
        <ul className="vedleggListe">
            <TransitionGroup>
                {vedlegg.map((attachment, index) => (
                    <CSSTransition
                        classNames="transitionFade"
                        timeout={500}
                        key={index}>
                        <li>
                            <Vedlegg
                                attachment={attachment}
                                onDelete={onDelete}
                                visFilstørrelse={visFilstørrelse}
                            />
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};
export default VedleggListe;
