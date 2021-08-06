import './App.css';
import Photos from './component/Photos';
import { Button, List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import { IconButton } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  searchbar: {
    backgroundColor: '#ffffff',
    marginTop: '3rem',
    width: '40rem',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  list: {
    left: '27.5%',
    backgroundColor: '#ffffff',
    position: 'absolute',
    margin: '1rem', 
    width: '40rem',
  },
  list_button: {
    backgroundColor: 'red',
    left: '40%', 
    color: '#ffffff', 
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#8B0000',
    }
  }

}))

const suggestions = []

function App() {
  const classes = useStyles()
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const search = (e) => {
    setText(e.target.value)
    setOpen(true)
    setTimeout(() => {
      suggestions.push(e.target.value)
      const unique_array = [...new Set(suggestions)]
      localStorage.setItem("items", JSON.stringify(unique_array))
    }, 2000)
  }


  const close = () => {
    setOpen(false)
    localStorage.removeItem("items")
  }

  const suggestion = [JSON.parse(localStorage.getItem("items"))]
  const list = suggestion[0]
  const value = (e) => {
    setText(e.target.outerText)
  }


  return (
    <div className="App">
      <div className="Header">
        <Typography className={classes.text}>SEARCH PHOTOS</Typography>
        <TextField
          label="Search"
          className={classes.searchbar}
          onChange={search}
          value={text}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {open ? <List className={classes.list}>
          {list !== null || list !== undefined || list.length > 0 ? list.map((ele, id) => {

            return (
              <ListItem key={id} button dense role={undefined} onClick={value}>
                <ListItemText primary={ele} />
              </ListItem>
            )
          }) : <div>""</div>}
          <Button onClick={close} className={classes.list_button} >Clear</Button>
        </List> : ""}
      </div>
      <Photos text={text} />
    </div>
  );
}

export default App;
