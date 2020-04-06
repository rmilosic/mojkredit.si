import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';


function SelectFormProperties(props){
    return (
        <div>
            
            <Grid item xs={6}>
                <FormControl required>
                <InputLabel id="demo-simple-select-required-label">Vrsta</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={props['creditType']}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"stanovanjski"}>Stanovanjski</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
                </FormControl>
            </Grid>
            
            
            <Grid item xs={6}>
            <FormControl required>
            <InputLabel id="demo-simple-select-required-label">Vrsta</InputLabel>
            <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={10}
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
            </FormControl>
        </Grid>
        
            
        </div>
    )
}

export default SelectFormProperties;
