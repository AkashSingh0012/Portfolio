"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
interface CardProps {
  title: string;
  image: string;
  tags?: string[];
  route: string;
  priority?: boolean;
}

function Cardholder({ title, image, tags, route ,priority}: CardProps) {
  return (
    <Link href={route} className="CardBlock">
      <div className="ProjectImage">
        <Image src={image} alt={title} width={400} height={250}
        priority={priority} />
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