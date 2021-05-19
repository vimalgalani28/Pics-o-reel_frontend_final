import React from "react";

const Section = () => {
  return (
    <>
      {paintings.length === 0 && !openVotePaint && (
        <div className={classes.containerText}>
          <h1 className={classes.title}>
            <br></br>
            <span className={classes.colorText}>
              You haven't added any entries in wishlist
            </span>
          </h1>
        </div>
      )}
      {!openVotePaint ? (
        <>
          <Grid container spacing={4}>
            {paintings.map((paint) => {
              return (
                <Grid item xs={12} sm={6} key={paint._id}>
                  <Card className={classesCard.root}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          className={classesCard.avatar}
                        ></Avatar>
                      }
                      action={
                        <Button
                          color="primary"
                          aria-label="add to wishlist"
                          onClick={(e) => handleAddVoteList(paint, e)}
                        >
                          {props.voteEntries ? (
                            props.voteEntries.some(
                              (entry) => entry._id === paint._id
                            ) ? (
                              <CheckBoxTwoToneIcon />
                            ) : (
                              <CheckBoxOutlineBlankTwoToneIcon />
                            )
                          ) : (
                            <></>
                          )}
                        </Button>
                      }
                      title={paint.title}
                      subheader={moment(paint.createdAt).format("MMMM D, YYYY")}
                    />
                    <CardMedia
                      className={classesCard.media}
                      image={paint.imageThumbLink}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {paint.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing></CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <h3 style={{ color: "red" }}>{voteError}</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => giveVote("painting", e)}
          >
            Vote!
          </Button>
        </>
      ) : (
        <h1>Already voted!</h1>
      )}
    </>
  );
};

export default Section;
