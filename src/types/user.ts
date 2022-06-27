export interface IPull {
  id: number;
  url: string;
  merged_at: Date;
}

export interface IUser {
  _id: string;
  github: string;
  pulls: IPull[];
  totalPulls: number;
  name: string;
  teammate: boolean;
}

export interface IPullFormatted {
  counter: number;
  values: {
    [key: string]: string;
  };
}
