type TAchievementIconKeys = 'goldMedal' | 'silverMedal' | 'bronzeMedal';

interface IAchievements {
  iconName: TAchievementIconKeys;
  title: string;
  minStars: number;
}

const ACHIEVEMENTS: IAchievements[] = [
  {
    iconName: 'goldMedal',
    title: 'Gold Medal',
    minStars: 7,
  },
  {
    iconName: 'silverMedal',
    title: 'Silver Medal',
    minStars: 3,
  },
  {
    iconName: 'bronzeMedal',
    title: 'Bronze Medal',
    minStars: 1,
  },
];

export { ACHIEVEMENTS, TAchievementIconKeys };
