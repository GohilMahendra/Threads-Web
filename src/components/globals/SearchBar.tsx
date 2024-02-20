import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from "@mui/material"

const SearchBar = () =>
{
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
    return(
        <Box sx={{
            display:isSmallScreen?'none':'flex',
            flex:2

        }}></Box>
    )
}
export default SearchBar