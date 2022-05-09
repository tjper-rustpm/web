module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      backgroundImage: {
        'airport-nameplate': "url('/src/imgs/nameplates/airport.png')",
        'beach-lighthouse-nameplate': "url('/src/imgs/nameplates/beachLighthouse.png')",
        'bil-oil-night-nameplate': "url('/src/imgs/nameplates/bigOilNight.png')",
        'forest-nameplate': "url('/src/imgs/nameplates/forest.png')",
        'island-lighthouse-nameplate': "url('/src/imgs/nameplates/islandLighthouse.png')",
        'junkyard-nameplate': "url('/src/imgs/nameplates/junkyard.png')",
        'mountain-night-nameplate': "url('/src/imgs/nameplates/mountainNight.png')",
        'oxum-nameplate': "url('/src/imgs/nameplates/oxum.png')",
        'sewer-night-nameplate': "url('/src/imgs/nameplates/sewerNight.png')",
        'tower-night-nameplate': "url('/src/imgs/nameplates/towerNight.png')",
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
