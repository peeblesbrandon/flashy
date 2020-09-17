import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateDeckDialog(props) {
    return (
        <div>
            <Dialog 
                open={props.open} 
                onClose={props.handleClose} 
                TransitionComponent={Transition} 
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">New deck</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="newTitle"
                        name="title"
                        label="Title"
                        placeholder="Enter a title for your new deck"
                        value={props.newTitle}
                        style={{ marginBottom: "1rem" }}
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                        onChange={props.handleChange}
                        error={props.createDeckError}
                        helperText={props.errorMsg}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={props.handleDeckCreate} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}