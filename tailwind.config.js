module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      backgroundImage: {
        'airport-nameplate': "url('/src/imgs/nameplates/airport.webp')",
        'beach-lighthouse-nameplate': "url('/src/imgs/nameplates/beachLighthouse.webp')",
        'big-oil-night-nameplate': "url('/src/imgs/nameplates/bigOilNight.webp')",
        'forest-nameplate': "url('/src/imgs/nameplates/forest.webp')",
        'island-lighthouse-nameplate': "url('/src/imgs/nameplates/islandLighthouse.webp')",
        'junkyard-nameplate': "url('/src/imgs/nameplates/junkyard.webp')",
        'mountain-night-nameplate': "url('/src/imgs/nameplates/mountainNight.webp')",
        'oxum-nameplate': "url('/src/imgs/nameplates/oxum.webp')",
        'sewer-night-nameplate': "url('/src/imgs/nameplates/sewerNight.webp')",
        'tower-night-nameplate': "url('/src/imgs/nameplates/towerNight.webp')",
      },
      gridTemplateColumns: {
        26: 'repeat(26, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        9: 'repeat(9, minmax(0, 1fr))',
      },
      gridColumnStart: {
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
      },
    },
  },
  plugins: [],
};
