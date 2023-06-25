import "./XChangeButton.css"
import {Text} from 'react-native';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const s = {
    fontStyle: 'italic',
};

function XChangeButton(txt = 'EMPTY', path = "", clr = '#E0D03B', styl = s) {

    return (
        <Link to={path}>
            <div class='button'>
                <Button sx={{backgroundColor: '#E0D03B'}} style={{width: '100%'}}>
                    <div class="button-text">
                        <Text style={styl}>{txt}</Text>
                    </div>
                </Button>
            </div>
       </Link>
    )
}

export default XChangeButton;