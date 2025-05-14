//Refactorizar este archivo
import { SelectOption } from "./select-option.model";

export class references {
  totalTime: number;
  churchName: string;
  mainPastorName: string;
  leavingReason: string;

  constructor(props: references) {
    this.totalTime = props.totalTime;
    this.churchName = props.churchName;
    this.mainPastorName = props.mainPastorName;
    this.leavingReason = props.leavingReason;
  }

  static empty(): references {
    return {
      totalTime: 0,
      churchName: '',
      mainPastorName: '',
      leavingReason: '',
    };
  }
}


export class MemberReference {
    id: number;
    references: references[];
    reasonsForCongregating: string;

    constructor(props: MemberReference) {
        this.id = props.id;
        this.references = props.references;
        this.reasonsForCongregating = props.reasonsForCongregating;
    }
    static empty(): MemberReference {
        return {
          id: 0,
          references: [],
          reasonsForCongregating : ''
      };
    }
}




export class MemberReferenceResponseModel {
  references: MemberReference[];
  reasonsForCongregating: string;

  constructor(props: ({ references: MemberReference[], reasonsForCongregating: string })) {
    this.references = props.references;
    this.reasonsForCongregating = props.reasonsForCongregating;
    }
}
