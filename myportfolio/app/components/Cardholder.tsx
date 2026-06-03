"use client";

import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  image: string;
  tags?: string[];
  route: string;
}

function Cardholder({ title, image, tags, route }: CardProps) {
  return (
    <Link href={route} className="CardBlock">
      <div className="ProjectImage">
        <img src={image} alt={title} />
      </div>

      <div className="ProjectTitle">{title}</div>

      <div className="ProjectTags">
        {tags?.map((tag) => (
          <span key={tag} className="Tag">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default Cardholder;