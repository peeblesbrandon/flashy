// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import { Grid, Card, CardContent, CardActions, Typography, TextField, Button } from '@material-ui/core';


// // class Card extends React.Component {
// //     onCardClick = () => {
// //         // this.props.history.push(`/edit/${this.props.id}`);
// //     }

// //     render() {
//         // const {  }
// const Flashcard = (props) => {
//     const useStyles = makeStyles({
//         root: {
//             minWidth: 275,
//             background: "#eee",
//             margin: "1rem"
//         },
//         title: {
//             fontSize: 14,
//         },
//         pos: {
//             marginBottom: 12,
//         },
//     });
//     const classes = useStyles();
//     return (
//         <Card className={classes.root}>
//             <CardContent>
//                 <Typography className={classes.title} color="textSecondary" gutterBottom>
//                     {props.prompt}
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                     {props.answer}
//                 </Typography>
//             </CardContent>
//             {props.editMode &&
//                 // <CardActions>
//                 //     <Button size="small">Edit</Button>
//                 // </CardActions>
//                 <TextField // materialize css textarea wasnt autoresizing 
//                     id="description"
//                     label="Description"
//                     // placeholder="Placeholder"
//                     value={props.description}
//                     // className="col s12"
//                     style={{ marginBottom: "1rem" }}
//                     multiline
//                     // rowsMax={6}
//                     s={12}
//                     onChange={this.handleCardChange.bind(props.id)}
//                 />
//             }
//         </Card>
//     );
// }
// // }

// // Card.propTypes = {
// //     selectedDeck: PropTypes.object.isRequired
// // };

// // const mapStateToProps = state => ({
// //     // cardId: state.selectedDeck.data.
// // });

// // export default connect(
// //     mapStateToProps,
// //     { getDeckById }
// // )(withRouter(Deck));
// export default Flashcard;