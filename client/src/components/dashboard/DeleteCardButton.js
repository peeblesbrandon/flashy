import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CardHeader, IconButton } from '@material-ui/core';

export default function DeleteCardButton(props) {
    return (
        <div style={{ margin: '1rem', minWidth: 275 }}>
            <CardHeader
                style={{ padding: '5px' }}
                action={
                    <IconButton onClick={props.handleOpen} aria-label="delete">
                        <i className="small material-icons" style={{ padding: '0' }}>delete</i>
                    </IconButton>
                }
            />
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete this card?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone. Are you sure you wish to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={props.handleCardDelete} color="secondary" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}