import React from "react";

import { CardColumns } from "react-bootstrap";
import NoticeCard from "./notice-card";

const CardContainer = ({ notices }) => {
  return (
    <CardColumns>
      {
        notices.map(
        ({
          noticeId,
          quoteIndicator,
          createdAt,
          quoteAlignment,
          quoteCitation,
          body,
          title,
        }) => (
          <NoticeCard key={noticeId}
            id={noticeId}
            isQuote={quoteIndicator}
            title={title}
            body={body}
            timestamp={createdAt}
            alignment={quoteAlignment}
            citation={quoteCitation}
          />
        )
        )}
    </CardColumns>
  );
};

export default CardContainer;
