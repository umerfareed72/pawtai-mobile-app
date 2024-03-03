import React from 'react';
import Card from './Card';

const FlatCard = ({
  title,
  date,
  mention,
  likeCount,
  commentCount,
  renderImages,
  username,
  onPress,
  items,
  onPressLikes,
  onPlayVideo,
  onPressComment,
  isLiked,
  profileImage,
  firstLetter,
  createdDate,
  previousDate,
  index,
  onLongPress,
  disableLike,
  disableCardPress,
  isCommented
}) => {
  return (
    <>
      <Card
        showEmoji={true}
        title={title}
        date={date}
        // iswith={'with'}
        isSlash={'-'}
        // mention={mention}
        disableLike={disableLike}
        createdDate={createdDate}
        firstLetter={firstLetter}
        profileImage={profileImage}
        username={username}
        likeCount={likeCount}
        commentCount={commentCount}
        onPressLikes={onPressLikes}
        showReplyLikeButton={true}
        renderImages={renderImages}
        items={items?.attachments}
        isLiked={isLiked}
        onPress={onPress}
        onPressComment={onPressComment}
        onPlayVideo={onPlayVideo}
        previousDate={previousDate}
        index={index}
        onLongPress={onLongPress}
        disableCardPress={disableCardPress}
        isCommented={isCommented}
        
        ></Card>
    </>
  );
};

export default FlatCard;
