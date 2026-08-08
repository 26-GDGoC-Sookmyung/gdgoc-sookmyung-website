export type ActivityQuarter = 'Q1' | 'Q2' | 'Q3';

export type Activity = {
  id: string;
  quarter: ActivityQuarter;
  period: string;
  title: string;
  description: string[];
  imageFileName: string;
  imageUrl?: string;
};
