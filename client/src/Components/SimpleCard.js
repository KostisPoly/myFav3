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

const useStyles = makeStyles({
    root: {
        paddingTop: '5vh',
        maxWidth: '70vw',
        margin: '0 auto'
    },
});

export default function ImgMediaCard(props) {
    const classes = useStyles();

    useEffect(() => {
        console.log(props);
        //document.body.style.backgroundImage = `url(${props.card.})`;
    }, []);

    switch (props.card.apiType) {
        case 'movie':
            return (
                <div>
                {props.card.title ? (
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
                    <Button size="small" color="primary" target="_blank" href={props.card.trailer}>
                        Watch Trailer
                    </Button>
                    <Link size="small" color="primary" href={props.card.trailer} target="_blank">
                        Watch Trailer
                    </Link>
                    <Typography variant="subtitle2" color="textSecondary">
                        Duration : {props.card.length}    
                    </Typography>
                    <Badge color="secondary" badgeContent={props.card.rating}>
                        <Icon>stars-sharp</Icon>
                    </Badge>
                    </CardActions>
                </Card>
                ) : (
                    <div>LOADING....</div>
                )}
                </div>
            );
        case 'show':
            return (
                <div>
                {props.card.name ? (
                    <Card className={classes.root}>
                    <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={props.card.name}
                        height="300"
                        image={props.card.image ? props.card.image.original : ''}
                        title={props.card.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        {props.card.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {props.card.summary}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Language : {props.card.language}    
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Network : {props.card.network}    
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Premiered : {props.card.premiered}    
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            status : {props.card.status}    
                        </Typography>
                        <Badge anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                    }}color="secondary"
                                badgeContent={props.card.rating}
                        >
                            <Icon>stars-sharp</Icon>
                        </Badge>
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" target="_blank" href={props.card.officialSite}>
                            Official Site
                        </Button>
                        <Link size="small" color="primary" href={props.card.url} target="_blank">
                            TvMaze
                        </Link>
                    </CardActions>
                </Card>
                ) : (
                    <div>LOADING....</div>
                )}
                </div>
            );
        default:
            return null;        
    }
    
}
