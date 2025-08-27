module.exports = {
  theme: {
    extend: {
      colors: {
        /*
        primary: '#265277',      // you can now use bg-primary, text-primary
        secondary: '#D9D9D9',
        alt :'#AEFF8B'
       primary: '#0F0E47',      // you can now use bg-primary, text-primary
        secondary: '#8686AC',
        alt :'#272757'
          primary: '#A8DCAB',      // you can now use bg-primary, text-primary
        secondary: '#519755',
        alt :'#DBAAA7'
        primary: '#331C08',      // you can now use bg-primary, text-primary
        secondary: '#664236',
        alt :'#CCBEB1'
        
        primary: '#496580',      // you can now use bg-primary, text-primary
        secondary: '#BADDFF',
        alt :'#FFDBBB'
        //change the button to top, so secondary, and whn hover stronger
 primary: '#ADBBDA',      // you can now use bg-primary, text-primary
        secondary: '#D9D9D9',
        alt :'#265277'

        */
       primary: '#496580',      // you can now use bg-primary, text-primary
        secondary: '#D9D9D9',
        alt :'#FFDBBB'
        
      },
       keyframes: {
        spinCentered: {
          to: {
            transform: 'translate(-50%, -50%) rotate(360deg)',
          },
        },
      },
      animation: {
        spinCentered: 'spinCentered 3s linear infinite', // change 3s to speed you want
      },
    }
}
}