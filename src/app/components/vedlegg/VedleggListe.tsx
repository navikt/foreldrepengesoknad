import * as React from 'react';
import Vedlegg from './Vedlegg';
import { Attachment } from '../../types/Attachment';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './vedlegg.less';

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
