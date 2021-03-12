import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector } from 'react-redux' ;
import { Link } from 'react-router-dom' ;
import './Category.css' ;

export default function ControlledOpenSelect({ categoryName }) {
  const categories = useSelector(state => state?.categories) ;
  const [category, setCategory] = React.useState(categoryName ? categoryName : 'all');
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{height: '100%'}}>
      <FormControl >
        
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          
        >
          <MenuItem value={'all'}><Link className='link' to='/'>All</Link></MenuItem>
            {categories?.map((item, index) => (
            <MenuItem key={index} value={item}>
            <Link className='link' to={`/${item}`}>{item}</Link>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
    </div>
  );
}