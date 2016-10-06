


export const CYCLE_RECRUITMENT_STATE = "CYCLE_RECRUITMENT_STATE";

export const createCycleRecrtuitmentStateAction = (className: string, specName: string) => {
    return {
        type: CYCLE_RECRUITMENT_STATE,
        className: className,
        specName: specName
    };
};