import { Content } from '../../types';

export type ContentSearchProps = {
    isField?: boolean;
    listAction: (content: Content) => JSX.Element;
};
