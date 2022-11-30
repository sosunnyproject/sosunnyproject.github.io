import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import { Link, graphql } from "gatsby"
import * as containerStyles from "../components/container.module.css"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

export default function PortfolioPost({ node }) {
    const image = getImage(node.frontmatter?.featuredImage)
    console.log(image);

    return (
        <div key={node.id} className={containerStyles.portfolioCard}>
            <Link to={node.fields.slug} >
            <GatsbyImage 
                image={image}
                alt=""
                layout="fullWidth"
                width={480}
                aspectRatio={16/9}
            />
            <h3>
                {node.frontmatter.title}
            </h3>
            </Link>
            <h4>{node.frontmatter.date}</h4>
        </div>
    )
}
