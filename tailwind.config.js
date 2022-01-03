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
    },
  },
  plugins: [],
};
