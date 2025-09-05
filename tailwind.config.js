const { h } = require("vue");

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


        /**
         * old plate 
         * primary: '#496580',      
         * secondary: '#D9D9D9',
         * alt :'#FFDBBB'
         * 
         * #6C7A89
         * #4B5D67
         * **
         * #7393B3
         * #394867
         * 
         * #175354ff
         * 
         * ***
         * #456268
         * new default
         * #FFCC99
         * 
         * 
         * 


primary: '#456268',      
        secondary: '#D9D9D9',
        alt :'#FFDBBB',
        altButton:'#ffc58bff'








         */

       primary: '#0F172A',      
        secondary: '#D9D9D9',
        alt :'#FFDBBB',
        altButton:'#ffc58bff',
        darkAlt:'#334155'
        
        
      },
       backgroundImage: {
        //primary: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
      },
       keyframes: {
        spinCentered: {
          to: {
            transform: 'translate(-50%, -50%) rotate(360deg)',
          },
        },
        flipEndWrongWayUp:{
        
         '0%':   { transform: 'rotateY(0deg)', opacity: '1' },
          '50%':  { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { transform: 'rotateY(180deg)', opacity: '0',  },


        },
        flipEndfrontWayUp:{
                
                '100%':   { transform: 'rotateY(0deg)', opacity: '1',  },
                  '50%':  { opacity: '1' },
                  '49%': { opacity: '0' },
                  '0%': { transform: 'rotateY(180deg)',opacity: '0', },


                },
                shake: {
                   '0%':   { transform: 'translate(1px, 1px) rotate(0deg)' },
          '10%':  { transform: 'translate(-1px, -2px) rotate(-1deg)' },
          '20%':  { transform: 'translate(-3px, 0px) rotate(1deg)' },
          '30%':  { transform: 'translate(3px, 2px) rotate(0deg)' },
          '40%':  { transform: 'translate(1px, -1px) rotate(1deg)' },
          '50%':  { transform: 'translate(-1px, 2px) rotate(-1deg)' },
          '60%':  { transform: 'translate(-3px, 1px) rotate(0deg)' },
          '70%':  { transform: 'translate(3px, 1px) rotate(-1deg)' },
          '80%':  { transform: 'translate(-1px, -1px) rotate(1deg)' },
          '90%':  { transform: 'translate(1px, 2px) rotate(0deg)' },
          '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
       
                },
                grow:{




                  '0%': { transform: 'scale(1)' },
                  
                  '100%': { transform: 'scale(1.05)' } 
                },
                pulse:{
                  '0%': { transform: 'scale(1)' },
                  /**
                   * x then y
                   */
                  '50%': { transform: 'scale(1.05,1.5)',opacity: '0.5'},
                  /**
                   * so hides when its done
                   */

                  '70%':{ opacity: '0'},
                  '100%':{ transform: 'scale(1.05,1.5)',opacity: '0'
                    
                  },
                  
                },
                pulse2:{
                  '0%': { transform: 'scale(1)' },
                  /**
                   * x then y
                   */
                  '50%': { transform: 'scale(1.02,1.25)',opacity: '0.5'},
                  /**
                   * so hides when its done
                   */

                  '70%':{ opacity: '0'},
                  '100%':{ transform: 'scale(1.02,1.25)',opacity: '0'
                    
                  },
                  
                }



      },

      animation: {
        spinCentered: 'spinCentered 3s linear infinite', 
         flipEndWrongWayUp: 'flipEndWrongWayUp 0.5s linear forwards',
         flipEndfrontWayUp: 'flipEndfrontWayUp 0.5s linear forwards',
        shake: 'shake 8s infinite',
        grow: 'grow 1s linear forwards',
        pulse: 'pulse 1s linear',
        pulse2: 'pulse2 1s linear',
        
        
        },
    }
}
}