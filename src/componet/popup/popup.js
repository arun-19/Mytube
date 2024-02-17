
import { Fullscreen, VerifiedUser } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'

const PopupOwn=React.memo(({title="popup",open,wrapcomponent,closedialog,fullScreen=true,style={width:400}})=> {
 
  
  return (
    <>
    <Dialog sx={style} fullScreen={fullScreen} open={open}>
      <DialogTitle textAlign={"center"} boxShadow={"revert"} color={"darksalmon"}> <h3> <VerifiedUser/> {title}</h3></DialogTitle>
      <DialogContent>{wrapcomponent}</DialogContent>
      <DialogActions><Button onClick={closedialog}>close</Button></DialogActions>
    </Dialog>

    </>
  )
})


export default  PopupOwn;