// @flow
import i18n from '@dhis2/d2-i18n';
import { translatedStatusTypes } from 'capture-core/events/statusTypes';
import { useMemo } from 'react';
import type {
    MainColumnConfig,
    MetadataColumnConfig,
    EventWorkingListsColumnConfigs,
} from '..';
import { mainPropertyNames } from '../../../../events/mainPropertyNames.const';
import {
    type ProgramStage,
    dataElementTypes as elementTypeKeys,
} from '../../../../metaData';


const getDefaultMainConfig = (stage: ProgramStage): Array<MainColumnConfig> => {
    const baseFields = [{
        id: mainPropertyNames.EVENT_DATE,
        visible: true,
        // $FlowFixMe[prop-missing] automated comment
        type: elementTypeKeys.DATE,
        header: stage.stageForm.getLabel(mainPropertyNames.EVENT_DATE),
    }, {
        id: mainPropertyNames.EVENT_STATUS,
        visible: true,
        // $FlowFixMe[prop-missing] automated comment
        type: elementTypeKeys.TEXT,
        header: 'Status',
        options: [
            { text: i18n.t('Active'), value: 'ACTIVE' },
            { text: i18n.t('Completed'), value: 'COMPLETED' },
        ],
        resolveValue: translatedStatusTypes,
    }];

    const optionalFields = [];
    if (stage.enableUserAssignment) {
        optionalFields.push({
            id: mainPropertyNames.ASSIGNEE,
            visible: true,
            type: 'ASSIGNEE',
            header: 'Assigned to',
            apiName: 'assignedUser',
        });
    }
    return [...baseFields, ...optionalFields]
        .map(field => ({
            ...field,
            isMainProperty: true,
        }));
};

const getMetaDataConfig = (stage: ProgramStage): Array<MetadataColumnConfig> =>
    stage
        .stageForm
        .getElements()
        .map(({ id, displayInReports, type, formName, optionSet }) => ({
            id,
            visible: displayInReports,
            type,
            header: formName,
            options: optionSet && optionSet.options.map(({ text, value }) => ({ text, value })),
            multiValueFilter: !!optionSet,
        }));

export const useDefaultColumnConfig = (stage: ProgramStage): EventWorkingListsColumnConfigs =>
    useMemo(() => [
        ...getDefaultMainConfig(stage),
        ...getMetaDataConfig(stage),
    ], [stage]);
