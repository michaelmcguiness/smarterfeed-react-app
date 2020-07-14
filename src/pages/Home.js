import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { List } from "antd";
import moment from "moment";

import UpvoteButton from "../components/Post/UpvoteButton";
import CommentButton from "../components/Post/CommentButton";
import WithLoading from "../components/util/WithLoading";
import { FETCH_POSTS_QUERY } from "../util/graphql";

// use react-infinite scroller (see demo: https://ant.design/components/list/)

function getTopDomain(url) {
  const a = document.createElement("a");
  a.href = url;
  return a.hostname;
}

function Home() {
  const { loading, data: { getPosts: posts } = [] } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <WithLoading loading={loading}>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(item) => (
          <List.Item>
            <UpvoteButton upvoteCount={item.upvoteCount} />
            <List.Item.Meta
              title={
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              }
              description={`${getTopDomain(item.url)} | ${moment(
                item.createdAt
              ).fromNow(true)} ago`}
            />
            <CommentButton commentCount={item.commentCount} />
          </List.Item>
        )}
      />
    </WithLoading>
  );
}

export default Home;
