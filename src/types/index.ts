export type Id = string;

// survives JSON round-trip;
export type IsoDate = string;

export type Group = {
  id: Id;
  name: string;
  pinned: boolean;
};

export type MeetingSections = {
  promised: string;
  done: string;
  willDo: string;
  discussion: string;
  notes: string;
};

export type Meeting = {
  id: Id;
  groupId: Id;
  title: string;
  date: IsoDate;
  completed: boolean;
  sections: MeetingSections;
};
