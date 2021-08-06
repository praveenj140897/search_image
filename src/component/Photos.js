import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
      photos: {
          height: '20rem',
          width: '20rem',
          margin: '2rem',
          cursor: 'pointer'
      },
      popup: {
          height: '40rem',
          width: '40rem',
          position: 'absolute',
          transform: 'translate(80%)'
      },
      img:{
          height: '40rem',
          width: '40rem'
      },
      button: {
          position: 'absolute',
          backgroundColor: 'red',
          right: '1rem',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#8B0000',
          }
      }
}))    

export default function Photos(props){
    const classes = useStyles()
    const [pictures,setPictures] = useState([]);
    const [page,setPage] = useState(1);
    const [popupPicture,setPopupPicture] = useState([])
    const [open,setOpen] = useState(false)
    const search = props.text
    console.log('search',search)
    const alternative = search === undefined || search === ''?'dog':search

      const fetchPhoto = ()=>{  
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=270db7346329e8576d5922e6edf1fbf4&tags=${alternative}&per_page=12&page=${page}&format=json&nojsoncallback=1`).then(res=>{
      console.log(res.data)    
      let picArray = res.data.photos.photo.map((pic)=>{
            var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
            return (
                <img key={pic.id} onClick={imagePopup} className={classes.photos} src={srcPath} alt="gallery" />
            )
          })
          if(page>1)
          {
              setPictures([...pictures,picArray])
          }
          else{
          setPictures(picArray)}
      })}


    useEffect(()=>{
        window.addEventListener('scroll',firstEvent,true)
        fetchPhoto()
    },[page])

    useEffect(()=>{
       setPictures([])
       fetchPhoto()
    },[search])

    const imagePopup = (e) => {
        let filter = e.target.src
        setPopupPicture(filter)
        setOpen(true)        
    }

    
    const firstEvent = () => {
		console.log('e');
		var bottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight < 50;
        console.log('bottom',bottom)
        if(bottom){
			let pg = page + 1;
			setPage(pg);
		}
	}
    const close = ()=>{
        setOpen(false)
    }

    return (
        <>
        {open?<div style={{position: 'fixed'}}><div className={classes.popup}><img className={classes.img} src={popupPicture} alt="popup"/><Button className={classes.button} onClick={close}>X</Button></div></div>:""}
        <span>{pictures}</span>
        </>
    )
}