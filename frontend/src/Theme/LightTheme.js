const { createTheme } = require("@mui/material");

export const lightTheme=createTheme({
    palette:{
        mode:"light",
        primary:{
            main:"#ffff00"
        },
        secondary:{
            main:"#FFA500"
        },
        white:{
            main:"#ffffff"
        },
        background:{
            main:"#000000",
            default:"#000000",
            paper:"#FDFCF7"
        },
        textColor:{
            main:"#ffffff",
            secondary:"#000000"
        }
    }
})