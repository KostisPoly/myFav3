import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
//import { Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        paddingTop: '5vh',
        maxWidth: '70vw',
        margin: '0 auto'
    },
});

// const LinkBehavior = React.forwardRef((props, ref) => (
//     <RouterLink ref={ref}  {...props} />
// ));

export default function ImgMediaCard(props) {
    const classes = useStyles();

    useEffect(() => {
        console.log(props);
        //document.body.style.backgroundImage = 'url(https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@.jpg)';
    }, []);

    if(!props.card.title){
        return <div>LOADING....</div>;
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                component="img"
            alt={props.card.title}
                height="300"
                image={props.card.poster}
                title={props.card.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {props.card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {props.card.plot}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary" target="_blank" href={props.card.trailer.link}>
                Watch Trailer
            </Button>
            <Link size="small" color="primary" href={props.card.trailer.link} target="_blank">
                Watch Trailer
            </Link>
            <Typography variant="subtitle2" color="textSecondary">
                Duration : {props.card.length}    
            </Typography>
            {/* <Typography variant="h5" color="textSecondary">
                {props.card.rating}    
            </Typography> */}
            <Badge color="secondary" badgeContent={props.card.rating}>
                <Icon>stars-sharp</Icon>
            </Badge>
            </CardActions>
        </Card>
    );
}
