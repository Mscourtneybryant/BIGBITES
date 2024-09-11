const { createTheme } = require("@mui/material");

export const darkTheme=createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#ffff00"
        },
        secondary:{
            main:"#800020"
        },
        black:{
            main:"#000000"
        },
        background:{
            main:"#000000",
            default:"#0D0D0D",
            paper:"#0D0D0D"
        },
        textColor:{
            main:"#ffffff",
            secondary:"#000000"
        }
    }
})