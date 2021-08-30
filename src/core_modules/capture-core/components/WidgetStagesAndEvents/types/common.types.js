// @flow
import type { Icon } from 'capture-core/metaData';
import { dataElementTypes } from '../../../metaData';

type StageOptions = {
    [code: string]: string;
}
export type StageDataElement = {
    id: string,
    name: string,
    type: $Keys<typeof dataElementTypes>,
    options: Array<StageOptions>
}

export type Stage = {
    id: string,
    name: string,
    description: string,
    icon?: Icon,
    dataElements: Array<StageDataElement>,
    hideDueDate?: boolean
}

export type StageCommonProps = {|
    onViewAll: (stageId: string) => void,
    onCreateNew: (stageId: string) => void,
    onEventClick: (eventId: string, stageId: string) => void
|}
