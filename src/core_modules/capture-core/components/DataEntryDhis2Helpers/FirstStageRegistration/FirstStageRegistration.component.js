// @flow
import { withStyles } from '@material-ui/core';
import React, { } from 'react';
import { DataEntry } from '../../DataEntry/DataEntry.container';
import { WrappedDataEntry } from './WrappedDataEntry';

const styles = () => {};

const FirstStageRegistrationPlain = (props) => {
    const {
        firstStageMetaData,
        firstStageDataEntrySectionDefinitions,
        ...passOnProps
    } = props;


    return (<>
        <DataEntry
            {...passOnProps}
        />
        {firstStageMetaData && <WrappedDataEntry
            {...passOnProps}
            firstStageMetaData={firstStageMetaData}
            dataEntrySections={firstStageDataEntrySectionDefinitions}
            formFoundation={firstStageMetaData.stage?.stageForm}
        />}
    </>);
};


export const FirstStageRegistrationComponent = withStyles(styles)(FirstStageRegistrationPlain);
