export interface IPull {
  id: number;
  url: string;
  merged_at: Date;
}
export interface Achievement {
  achievementDate: Date;

  title: string;
  tooltip: string;
  badge: {
    altText: string;
    src: string;
    width: number;
    height: number;
  };
}
export interface IUser {
  _id: string;
  github: string;
  pulls: IPull[];
  totalPulls: number;
  name: string;
  teammate: boolean;
  achievementsList: Array<Achievement>;
}

export interface IPullFormatted {
  counter: number;
  values: {
    [key: string]: string;
  };
}
