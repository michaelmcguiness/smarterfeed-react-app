import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { List, Tooltip } from "antd";
import moment from "moment";

import UpvoteButton from "../components/Post/UpvoteButton";
import CommentButton from "../components/Post/CommentButton";
import WithLoading from "../components/util/WithLoading";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { getTopDomain } from "../util/helperFunctions";

// use react-infinite scroller (see demo: https://ant.design/components/list/)

function Home() {
  const { loading, data: { getPosts: posts } = [] } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <WithLoading loading={loading}>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <UpvoteButton post={post} />
            <List.Item.Meta
              title={
                <Tooltip title={post.url}>
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </Tooltip>
              }
              description={`${post.username} • ${getTopDomain(
                post.url
              )} • ${moment(post.createdAt).fromNow(true)} ago`}
            />
            <CommentButton post={post} />
          </List.Item>
        )}
      />
    </WithLoading>
  );
}

export default Home;
