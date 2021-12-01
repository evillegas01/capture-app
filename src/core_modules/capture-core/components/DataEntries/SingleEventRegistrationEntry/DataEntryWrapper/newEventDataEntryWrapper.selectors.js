// @flow
import { errorCreator } from 'capture-core-utils';
import log from 'loglevel';
import { createSelector } from 'reselect';
import { programCollection } from '../../../../metaDataMemoryStores/programCollection/programCollection';

const programIdSelector = state => state.currentSelections.programId;
const programStageIdSelector = state => state.router.location.query.stageId;

// $FlowFixMe[missing-annot] automated comment
export const makeFormFoundationSelector = () => createSelector(
    programIdSelector,
    programStageIdSelector,
    (programId: string, programStageId?: string) => {
        const program = programCollection.get(programId);
        if (!program) {
            log.error(errorCreator('programId not found')({ method: 'getFormFoundation' }));
            return null;
        }


        // $FlowFixMe[prop-missing] automated comment
        const stage = programStageId ? program.getStage(programStageId) : program.stage;
        if (!stage) {
            log.error(errorCreator('stage not found for program')({ method: 'getFormFoundation' }));
            return null;
        }

        return stage.stageForm;
    },
);

// $FlowFixMe[missing-annot] automated comment
export const makeStageSelector = () => createSelector(
    programIdSelector,
    programStageIdSelector,
    (programId: string, programStageId?: string) => {
        const program = programCollection.get(programId);
        if (!program) {
            log.error(errorCreator('programId not found')({ method: 'getFormFoundation' }));
            return null;
        }


        // $FlowFixMe[prop-missing] automated comment
        const stage = programStageId ? program.getStage(programStageId) : program.stage;
        if (!stage) {
            log.error(errorCreator('stage not found for program')({ method: 'getFormFoundation' }));
            return null;
        }

        return stage;
    },
);
