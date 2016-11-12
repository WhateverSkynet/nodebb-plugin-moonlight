export namespace Recruitment {

  export type STATUS_NONE = "None";
  export type STATUS_LOW = "Low";
  export type STATUS_MEDIUM = "Medium";
  export type STATUS_HIGH = "High";
  
  export type Status = STATUS_NONE | STATUS_LOW | STATUS_MEDIUM | STATUS_HIGH;

  export interface Spec {
    name: string;
    status: string;
  }

  export interface Class {
    name: string;
    specs: Spec[];
  }

  export interface RecruitmentItem {
    class: string;
    spec?: string;
    role?: string;
    status: Status;
  }
};