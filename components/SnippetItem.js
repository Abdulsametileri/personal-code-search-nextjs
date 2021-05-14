import Card from "react-bootstrap/Card";
import Link from "next/link";
import snippetStyles from '@/styles/Snippet.module.scss'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spacer from "@/components/Spacer";
import React from "react";

const SnippetItem = ({snippet}) => {
  return (
    <Row>
      <Col sm={12} md={{span: 8, offset: 2}}>
        <Card className={snippetStyles.snippetContainer}>
          <Card.Body className="w-100">
            <Card.Title>{snippet.tag}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{snippet.description}</Card.Subtitle>
            <Spacer bottomVal={5}/>
            {snippet.rawText && <p style={{whiteSpace: "pre-wrap"}}>
              {snippet.rawText}
            </p>}
            {snippet.imageUrl && <Link
              href={'https://d1kvz0r50h32xh.cloudfront.net' + snippet.imageUrl.substr(snippet.imageUrl.lastIndexOf("/"))}>
              <a target="_blank">
                <Card.Img variant="bottom"
                          src={'https://d1kvz0r50h32xh.cloudfront.net' + snippet.imageUrl.substr(snippet.imageUrl.lastIndexOf("/"))}/>
              </a>
            </Link>}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default SnippetItem